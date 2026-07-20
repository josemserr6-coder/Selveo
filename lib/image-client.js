const MAX_WIDTH = 1920;
const JPEG_QUALITY = 0.8;

function isHeicFile(file) {
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  return (
    type === "image/heic" ||
    type === "image/heif" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

function renameToJpeg(name) {
  const base = (name || "foto").replace(/\.[^./]+$/, "");
  return `${base}.jpg`;
}

async function convertHeicToJpeg(file) {
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: JPEG_QUALITY });
  return Array.isArray(result) ? result[0] : result;
}

// Convierte HEIC/HEIF a JPEG si hace falta, y redimensiona/comprime la
// imagen en el navegador antes de subirla (fotos del carrete del iPhone
// pueden pesar varios MB y superan el límite de tamaño de request de Vercel).
export async function processImageFile(file) {
  let working = file;

  if (isHeicFile(file)) {
    try {
      working = await convertHeicToJpeg(file);
    } catch {
      working = file;
    }
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(working);
  } catch {
    return working instanceof File
      ? working
      : new File([working], renameToJpeg(file.name), { type: "image/jpeg" });
  }

  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
  if (!blob) {
    return working instanceof File ? working : file;
  }

  return new File([blob], renameToJpeg(file.name), { type: "image/jpeg" });
}
