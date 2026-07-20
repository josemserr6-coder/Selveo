import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "properties.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function hasBlob() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ---------- Propiedades ----------

export async function getProperties() {
  if (hasBlob()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: "data/properties.json" });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  }

  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

export async function saveProperties(properties) {
  const json = JSON.stringify(properties, null, 2);

  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    await put("data/properties.json", json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return;
  }

  await fs.writeFile(DATA_PATH, json, "utf-8");
}

export async function getPropertyBySlug(slug) {
  const properties = await getProperties();
  return properties.find((p) => p.slug === slug) || null;
}

export async function getPropertyById(id) {
  const properties = await getProperties();
  return properties.find((p) => p.id === id) || null;
}

// ---------- Imágenes ----------

export async function uploadImage(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = (file.name?.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${filename}`, buffer, {
      access: "public",
      contentType: file.type || "image/jpeg",
      addRandomSuffix: true,
    });
    return blob.url;
  }

  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}
