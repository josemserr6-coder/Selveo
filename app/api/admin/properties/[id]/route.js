import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getProperties, saveProperties, uploadImage, deleteImages } from "@/lib/store";
import { makeUniqueSlug } from "@/lib/slug";

export const runtime = "nodejs";

const ZONES = ["CDMX", "Querétaro", "Valle de Bravo", "Malinalco", "Edomex"];
const TYPES = ["venta", "renta"];

function normalizeFields(data) {
  return {
    title: (data.title || "").toString().trim(),
    zone: (data.zone || "").toString(),
    type: (data.type || "").toString(),
    price: Number(data.price),
    bedrooms: Number(data.bedrooms),
    bathrooms: Number(data.bathrooms),
    area: Number(data.area),
    description: (data.description || "").toString().trim(),
  };
}

function fieldsAreValid(f) {
  return !!f.title && ZONES.includes(f.zone) && TYPES.includes(f.type) && Number.isFinite(f.price);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const properties = await getProperties();
  const index = properties.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
  }

  const contentType = request.headers.get("content-type") || "";
  let fields;
  let images;

  if (contentType.includes("application/json")) {
    // Las fotos ya se subieron directo a Vercel Blob desde el navegador;
    // aquí llega el registro con el arreglo final de URLs (viejas + nuevas).
    const body = await request.json().catch(() => ({}));
    fields = normalizeFields(body);
    images = Array.isArray(body.images) ? body.images.filter((url) => typeof url === "string") : [];
  } else {
    const formData = await request.formData();
    fields = normalizeFields({
      title: formData.get("title"),
      zone: formData.get("zone"),
      type: formData.get("type"),
      price: formData.get("price"),
      bedrooms: formData.get("bedrooms"),
      bathrooms: formData.get("bathrooms"),
      area: formData.get("area"),
      description: formData.get("description"),
    });

    let existingImages = [];
    try {
      existingImages = JSON.parse(formData.get("existingImages") || "[]");
    } catch {
      existingImages = [];
    }

    const files = formData.getAll("images").filter((f) => typeof f === "object" && f.size > 0);
    const newImages = [];
    for (const file of files) {
      newImages.push(await uploadImage(file));
    }

    images = [...existingImages, ...newImages];
  }

  if (!fieldsAreValid(fields)) {
    return NextResponse.json({ error: "Faltan datos requeridos o son inválidos" }, { status: 400 });
  }

  if (images.length === 0) {
    return NextResponse.json({ error: "La propiedad debe tener al menos una foto" }, { status: 400 });
  }

  const current = properties[index];
  const otherSlugs = properties.filter((p) => p.id !== id).map((p) => p.slug);
  const slug = fields.title === current.title ? current.slug : makeUniqueSlug(fields.title, otherSlugs);

  const updated = {
    ...current,
    title: fields.title,
    slug,
    zone: fields.zone,
    type: fields.type,
    price: fields.price,
    bedrooms: Number.isFinite(fields.bedrooms) ? fields.bedrooms : 0,
    bathrooms: Number.isFinite(fields.bathrooms) ? fields.bathrooms : 0,
    area: Number.isFinite(fields.area) ? fields.area : 0,
    description: fields.description,
    images,
  };

  properties[index] = updated;
  await saveProperties(properties);

  // Fotos que estaban antes y ya no forman parte de la propiedad: se borran
  // de Blob (o del disco local) para no dejar archivos huérfanos.
  const removedImages = current.images.filter((url) => !images.includes(url));
  await deleteImages(removedImages);

  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/propiedades/${current.slug}`);
  if (slug !== current.slug) {
    revalidatePath(`/propiedades/${slug}`);
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const properties = await getProperties();
  const deleted = properties.find((p) => p.id === id);
  const next = properties.filter((p) => p.id !== id);

  if (!deleted) {
    return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
  }

  await saveProperties(next);
  await deleteImages(deleted.images);

  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/propiedades/${deleted.slug}`);

  return NextResponse.json({ ok: true });
}
