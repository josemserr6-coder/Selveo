import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getProperties, saveProperties, uploadImage } from "@/lib/store";
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

export async function GET() {
  const properties = await getProperties();
  return NextResponse.json(properties);
}

export async function POST(request) {
  const contentType = request.headers.get("content-type") || "";
  let fields;
  let images;

  if (contentType.includes("application/json")) {
    // Las fotos ya se subieron directo a Vercel Blob desde el navegador;
    // aquí solo llega el registro con las URLs finales.
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

    const files = formData.getAll("images").filter((f) => typeof f === "object" && f.size > 0);
    images = [];
    for (const file of files) {
      images.push(await uploadImage(file));
    }
  }

  if (!fieldsAreValid(fields)) {
    return NextResponse.json({ error: "Faltan datos requeridos o son inválidos" }, { status: 400 });
  }

  if (images.length === 0) {
    return NextResponse.json({ error: "Agrega al menos una foto" }, { status: 400 });
  }

  const properties = await getProperties();
  const slug = makeUniqueSlug(fields.title, properties.map((p) => p.slug));

  const newProperty = {
    id: randomUUID(),
    slug,
    title: fields.title,
    zone: fields.zone,
    type: fields.type,
    price: fields.price,
    currency: "MXN",
    bedrooms: Number.isFinite(fields.bedrooms) ? fields.bedrooms : 0,
    bathrooms: Number.isFinite(fields.bathrooms) ? fields.bathrooms : 0,
    area: Number.isFinite(fields.area) ? fields.area : 0,
    description: fields.description,
    images,
    featured: false,
    createdAt: new Date().toISOString(),
  };

  properties.push(newProperty);
  await saveProperties(properties);

  return NextResponse.json(newProperty, { status: 201 });
}
