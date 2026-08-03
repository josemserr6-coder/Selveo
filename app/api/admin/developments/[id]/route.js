import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDevelopments, saveDevelopments, uploadImage, deleteImages } from "@/lib/store";
import { makeUniqueSlug } from "@/lib/slug";

export const runtime = "nodejs";

const ZONES = ["CDMX", "Querétaro", "Valle de Bravo", "Malinalco", "Edomex"];

function normalizeAmenities(raw) {
  let list = raw;
  if (typeof raw === "string") {
    try {
      list = JSON.parse(raw);
    } catch {
      list = [];
    }
  }
  if (!Array.isArray(list)) return [];
  return list.map((a) => a.toString().trim()).filter(Boolean);
}

function normalizeFields(data) {
  return {
    name: (data.name || "").toString().trim(),
    zone: (data.zone || "").toString(),
    priceFrom: Number(data.priceFrom),
    unitTypes: (data.unitTypes || "").toString().trim(),
    unitsCount: Number(data.unitsCount),
    description: (data.description || "").toString().trim(),
    amenities: normalizeAmenities(data.amenities),
  };
}

function fieldsAreValid(f) {
  return (
    !!f.name &&
    ZONES.includes(f.zone) &&
    Number.isFinite(f.priceFrom) &&
    !!f.unitTypes &&
    Number.isFinite(f.unitsCount)
  );
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const developments = await getDevelopments();
  const index = developments.findIndex((d) => d.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Desarrollo no encontrado" }, { status: 404 });
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
      name: formData.get("name"),
      zone: formData.get("zone"),
      priceFrom: formData.get("priceFrom"),
      unitTypes: formData.get("unitTypes"),
      unitsCount: formData.get("unitsCount"),
      description: formData.get("description"),
      amenities: formData.get("amenities"),
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
    return NextResponse.json({ error: "El desarrollo debe tener al menos una foto" }, { status: 400 });
  }

  const current = developments[index];
  const otherSlugs = developments.filter((d) => d.id !== id).map((d) => d.slug);
  const slug = fields.name === current.name ? current.slug : makeUniqueSlug(fields.name, otherSlugs);

  const updated = {
    ...current,
    name: fields.name,
    slug,
    zone: fields.zone,
    priceFrom: fields.priceFrom,
    unitTypes: fields.unitTypes,
    unitsCount: fields.unitsCount,
    amenities: fields.amenities,
    description: fields.description,
    images,
  };

  developments[index] = updated;
  await saveDevelopments(developments);

  // Fotos que estaban antes y ya no forman parte del desarrollo: se borran
  // de Blob (o del disco local) para no dejar archivos huérfanos.
  const removedImages = current.images.filter((url) => !images.includes(url));
  await deleteImages(removedImages);

  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/desarrollos/${current.slug}`);
  if (slug !== current.slug) {
    revalidatePath(`/desarrollos/${slug}`);
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const developments = await getDevelopments();
  const deleted = developments.find((d) => d.id === id);
  const next = developments.filter((d) => d.id !== id);

  if (!deleted) {
    return NextResponse.json({ error: "Desarrollo no encontrado" }, { status: 404 });
  }

  await saveDevelopments(next);
  await deleteImages(deleted.images);

  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/desarrollos/${deleted.slug}`);

  return NextResponse.json({ ok: true });
}
