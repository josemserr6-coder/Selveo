import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { getDevelopments, saveDevelopments, uploadImage } from "@/lib/store";
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

export async function GET() {
  const developments = await getDevelopments();
  return NextResponse.json(developments);
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
      name: formData.get("name"),
      zone: formData.get("zone"),
      priceFrom: formData.get("priceFrom"),
      unitTypes: formData.get("unitTypes"),
      unitsCount: formData.get("unitsCount"),
      description: formData.get("description"),
      amenities: formData.get("amenities"),
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

  const developments = await getDevelopments();
  const slug = makeUniqueSlug(fields.name, developments.map((d) => d.slug));

  const newDevelopment = {
    id: randomUUID(),
    slug,
    name: fields.name,
    zone: fields.zone,
    priceFrom: fields.priceFrom,
    currency: "MXN",
    unitTypes: fields.unitTypes,
    unitsCount: fields.unitsCount,
    amenities: fields.amenities,
    description: fields.description,
    images,
    createdAt: new Date().toISOString(),
  };

  developments.push(newDevelopment);
  await saveDevelopments(developments);

  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  return NextResponse.json(newDevelopment, { status: 201 });
}
