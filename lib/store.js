import { promises as fs } from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export function hasBlob() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// Crea un par get/save respaldado por un archivo JSON: usa Vercel Blob si
// está configurado (producción), o el disco duro local (desarrollo).
function createJsonCollection(filename) {
  const dataPath = path.join(process.cwd(), "data", filename);
  const blobPathname = `data/${filename}`;

  async function getAll() {
    if (hasBlob()) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: blobPathname });
      if (!blobs.length) return [];
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (!res.ok) return [];
      return res.json();
    }

    try {
      const raw = await fs.readFile(dataPath, "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async function saveAll(items) {
    const json = JSON.stringify(items, null, 2);

    if (hasBlob()) {
      const { put } = await import("@vercel/blob");
      await put(blobPathname, json, {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
      });
      return;
    }

    await fs.writeFile(dataPath, json, "utf-8");
  }

  return { getAll, saveAll };
}

// ---------- Propiedades individuales ----------

const propertiesCollection = createJsonCollection("properties.json");
export const getProperties = propertiesCollection.getAll;
export const saveProperties = propertiesCollection.saveAll;

export async function getPropertyBySlug(slug) {
  const properties = await getProperties();
  return properties.find((p) => p.slug === slug) || null;
}

export async function getPropertyById(id) {
  const properties = await getProperties();
  return properties.find((p) => p.id === id) || null;
}

// ---------- Desarrollos / condominios ----------

const developmentsCollection = createJsonCollection("developments.json");
export const getDevelopments = developmentsCollection.getAll;
export const saveDevelopments = developmentsCollection.saveAll;

export async function getDevelopmentBySlug(slug) {
  const developments = await getDevelopments();
  return developments.find((d) => d.slug === slug) || null;
}

export async function getDevelopmentById(id) {
  const developments = await getDevelopments();
  return developments.find((d) => d.id === id) || null;
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

// Borra fotos que ya no están asociadas a ninguna propiedad o desarrollo (al
// eliminar uno, o al quitar fotos de uno existente en una edición).
export async function deleteImages(urls) {
  if (!urls?.length) return;

  const blobUrls = urls.filter((url) => /\.public\.blob\.vercel-storage\.com\//.test(url));
  const localUrls = urls.filter((url) => url.startsWith("/uploads/"));

  if (blobUrls.length && hasBlob()) {
    const { del } = await import("@vercel/blob");
    await del(blobUrls).catch(() => {});
  }

  await Promise.all(
    localUrls.map((url) =>
      fs.unlink(path.join(process.cwd(), "public", url)).catch(() => {})
    )
  );
}
