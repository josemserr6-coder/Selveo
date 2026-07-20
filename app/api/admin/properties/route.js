import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getProperties, saveProperties, uploadImage } from "@/lib/store";
import { makeUniqueSlug } from "@/lib/slug";

export const runtime = "nodejs";

const ZONES = ["CDMX", "Querétaro", "Valle de Bravo", "Malinalco", "Edomex"];
const TYPES = ["venta", "renta"];

export async function GET() {
  const properties = await getProperties();
  return NextResponse.json(properties);
}

export async function POST(request) {
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

  const files = formData.getAll("images").filter((f) => typeof f === "object" && f.size > 0);
  if (files.length === 0) {
    return NextResponse.json({ error: "Agrega al menos una foto" }, { status: 400 });
  }

  const images = [];
  for (const file of files) {
    const url = await uploadImage(file);
    images.push(url);
  }

  const properties = await getProperties();
  const slug = makeUniqueSlug(title, properties.map((p) => p.slug));

  const newProperty = {
    id: randomUUID(),
    slug,
    title,
    zone,
    type,
    price,
    currency: "MXN",
    bedrooms: Number.isFinite(bedrooms) ? bedrooms : 0,
    bathrooms: Number.isFinite(bathrooms) ? bathrooms : 0,
    area: Number.isFinite(area) ? area : 0,
    description,
    images,
    featured: false,
    createdAt: new Date().toISOString(),
  };

  properties.push(newProperty);
  await saveProperties(properties);

  return NextResponse.json(newProperty, { status: 201 });
}
