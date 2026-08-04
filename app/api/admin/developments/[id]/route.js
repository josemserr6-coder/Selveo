import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDevelopments, saveDevelopments, uploadImage, deleteImages } from "@/lib/store";
import { makeUniqueSlug } from "@/lib/slug";

export const runtime = "nodejs";

const ZONES = ["CDMX", "Querétaro", "Valle de Bravo", "Malinalco", "Edomex"];
const STATUSES = ["preventa", "disponible", "ultimas_unidades"];
const MODALITIES = ["full", "fractional", "both"];

function asJson(raw, fallback) {
  if (raw == null) return fallback;
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function bilingualText(raw) {
  const obj = asJson(raw, {});
  return {
    es: (obj.es || "").toString().trim(),
    en: (obj.en || "").toString().trim(),
  };
}

function bilingualList(raw) {
  const obj = asJson(raw, {});
  const clean = (list) =>
    Array.isArray(list) ? list.map((v) => v.toString().trim()).filter(Boolean) : [];
  return { es: clean(obj.es), en: clean(obj.en) };
}

function normalizeFields(data) {
  return {
    zone: (data.zone || "").toString(),
    status: (data.status || "").toString(),
    modality: (data.modality || "").toString(),
    priceFrom: Number(data.priceFrom),
    unitsCount: Number(data.unitsCount),
    name: bilingualText(data.name),
    location: bilingualText(data.location),
    shortDescription: bilingualText(data.shortDescription),
    description: bilingualText(data.description),
    unitTypes: bilingualText(data.unitTypes),
    featureTags: bilingualList(data.featureTags),
    amenities: bilingualList(data.amenities),
  };
}

function fieldsAreValid(f) {
  return (
    !!f.name.es &&
    !!f.name.en &&
    ZONES.includes(f.zone) &&
    STATUSES.includes(f.status) &&
    MODALITIES.includes(f.modality) &&
    Number.isFinite(f.priceFrom) &&
    Number.isFinite(f.unitsCount) &&
    !!f.unitTypes.es &&
    !!f.unitTypes.en
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
      zone: formData.get("zone"),
      status: formData.get("status"),
      modality: formData.get("modality"),
      priceFrom: formData.get("priceFrom"),
      unitsCount: formData.get("unitsCount"),
      name: formData.get("name"),
      location: formData.get("location"),
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      unitTypes: formData.get("unitTypes"),
      featureTags: formData.get("featureTags"),
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
  const slug =
    fields.name.es === (current.name?.es || current.name)
      ? current.slug
      : makeUniqueSlug(fields.name.es, otherSlugs);

  const updated = {
    ...current,
    slug,
    zone: fields.zone,
    status: fields.status,
    modality: fields.modality,
    priceFrom: fields.priceFrom,
    unitsCount: fields.unitsCount,
    name: fields.name,
    location: fields.location,
    shortDescription: fields.shortDescription,
    description: fields.description,
    unitTypes: fields.unitTypes,
    featureTags: fields.featureTags,
    amenities: fields.amenities,
    images,
  };

  developments[index] = updated;
  await saveDevelopments(developments);

  // Fotos que estaban antes y ya no forman parte del desarrollo: se borran
  // de Blob (o del disco local) para no dejar archivos huérfanos.
  const removedImages = current.images.filter((url) => !images.includes(url));
  await deleteImages(removedImages);

  revalidatePath("/desarrollos");
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

  revalidatePath("/desarrollos");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/desarrollos/${deleted.slug}`);

  return NextResponse.json({ ok: true });
}
