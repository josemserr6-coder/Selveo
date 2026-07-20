import { NextResponse } from "next/server";
import { getProperties, saveProperties, uploadImage } from "@/lib/store";
import { makeUniqueSlug } from "@/lib/slug";

export const runtime = "nodejs";

const ZONES = ["CDMX", "Querétaro", "Valle de Bravo", "Malinalco", "Edomex"];
const TYPES = ["venta", "renta"];

export async function PUT(request, { params }) {
  const { id } = await params;
  const properties = await getProperties();
  const index = properties.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
  }

  const formData = await request.formData();

  const title = (formData.get("title") || "").toString().trim();
  const zone = (formData.get("zone") || "").toString();
  const type = (formData.get("type") || "").toString();
  const price = Number(formData.get("price"));
  const bedrooms = Number(formData.get("bedrooms"));
  const bathrooms = Number(formData.get("bathrooms"));
  const area = Number(formData.get("area"));
  const description = (formData.get("description") || "").toString().trim();

  if (!title || !ZONES.includes(zone) || !TYPES.includes(type) || !Number.isFinite(price)) {
    return NextResponse.json({ error: "Faltan datos requeridos o son inválidos" }, { status: 400 });
  }

  let existingImages = [];
  try {
    existingImages = JSON.parse(formData.get("existingImages") || "[]");
  } catch {
    existingImages = [];
  }

  const files = formData.getAll("images").filter((f) => typeof f === "object" && f.size > 0);
  const newImages = [];
  for (const file of files) {
    const url = await uploadImage(file);
    newImages.push(url);
  }

  const images = [...existingImages, ...newImages];
  if (images.length === 0) {
    return NextResponse.json({ error: "La propiedad debe tener al menos una foto" }, { status: 400 });
  }

  const current = properties[index];
  const otherSlugs = properties.filter((p) => p.id !== id).map((p) => p.slug);
  const slug = title === current.title ? current.slug : makeUniqueSlug(title, otherSlugs);

  const updated = {
    ...current,
    title,
    slug,
    zone,
    type,
    price,
    bedrooms: Number.isFinite(bedrooms) ? bedrooms : 0,
    bathrooms: Number.isFinite(bathrooms) ? bathrooms : 0,
    area: Number.isFinite(area) ? area : 0,
    description,
    images,
  };

  properties[index] = updated;
  await saveProperties(properties);

  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const properties = await getProperties();
  const next = properties.filter((p) => p.id !== id);

  if (next.length === properties.length) {
    return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
  }

  await saveProperties(next);
  return NextResponse.json({ ok: true });
}
