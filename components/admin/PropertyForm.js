"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { processImageFile } from "@/lib/image-client";

const ZONES = ["CDMX", "Querétaro", "Valle de Bravo", "Malinalco", "Edomex"];

export default function PropertyForm({ property = null }) {
  const router = useRouter();
  const isEdit = !!property;

  const [title, setTitle] = useState(property?.title || "");
  const [zone, setZone] = useState(property?.zone || ZONES[0]);
  const [type, setType] = useState(property?.type || "venta");
  const [price, setPrice] = useState(property?.price ?? "");
  const [bedrooms, setBedrooms] = useState(property?.bedrooms ?? "");
  const [bathrooms, setBathrooms] = useState(property?.bathrooms ?? "");
  const [area, setArea] = useState(property?.area ?? "");
  const [description, setDescription] = useState(property?.description || "");
  const [existingImages, setExistingImages] = useState(property?.images || []);
  const [newFiles, setNewFiles] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [progressLabel, setProgressLabel] = useState("");
  const [processingPhotos, setProcessingPhotos] = useState(false);
  const [blobEnabled, setBlobEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/admin/upload-status")
      .then((res) => res.json())
      .then((data) => setBlobEnabled(!!data.blobEnabled))
      .catch(() => setBlobEnabled(false));
  }, []);

  const newPreviews = useMemo(() => newFiles.map((f) => URL.createObjectURL(f)), [newFiles]);
  useEffect(() => {
    return () => newPreviews.forEach((src) => URL.revokeObjectURL(src));
  }, [newPreviews]);

  async function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;

    setError("");
    setProcessingPhotos(true);
    try {
      const processed = [];
      for (const file of files) {
        processed.push(await processImageFile(file));
      }
      setNewFiles((prev) => [...prev, ...processed]);
    } catch {
      setError("No se pudieron procesar una o más fotos. Intenta de nuevo.");
    } finally {
      setProcessingPhotos(false);
    }
  }

  function removeExisting(url) {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  }

  function removeNew(index) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (existingImages.length + newFiles.length === 0) {
      setError("Agrega al menos una foto.");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/properties/${property.id}` : "/api/admin/properties";
      const method = isEdit ? "PUT" : "POST";
      let res;

      if (blobEnabled) {
        let uploadedUrls = [];
        if (newFiles.length > 0) {
          setProgressLabel(`Subiendo fotos (0/${newFiles.length})...`);
          const { upload } = await import("@vercel/blob/client");
          let done = 0;
          uploadedUrls = await Promise.all(
            newFiles.map(async (file) => {
              const result = await upload(`uploads/${file.name}`, file, {
                access: "public",
                handleUploadUrl: "/api/admin/upload",
              });
              done += 1;
              setProgressLabel(`Subiendo fotos (${done}/${newFiles.length})...`);
              return result.url;
            })
          );
        }

        setProgressLabel("Guardando...");
        res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            zone,
            type,
            price,
            bedrooms,
            bathrooms,
            area,
            description,
            images: [...existingImages, ...uploadedUrls],
          }),
        });
      } else {
        setProgressLabel("Guardando...");
        const formData = new FormData();
        formData.set("title", title);
        formData.set("zone", zone);
        formData.set("type", type);
        formData.set("price", price);
        formData.set("bedrooms", bedrooms);
        formData.set("bathrooms", bathrooms);
        formData.set("area", area);
        formData.set("description", description);
        if (isEdit) {
          formData.set("existingImages", JSON.stringify(existingImages));
        }
        newFiles.forEach((file) => formData.append("images", file));

        res = await fetch(url, { method, body: formData });
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ocurrió un error al guardar.");
        setSaving(false);
        setProgressLabel("");
        return;
      }

      router.push("/panel-selveo");
      router.refresh();
    } catch (err) {
      setError("Ocurrió un error al guardar. Intenta de nuevo.");
      setSaving(false);
      setProgressLabel("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm text-charcoal-light mb-2">Título</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold"
          placeholder="Ej. Penthouse con vista panorámica en Polanco"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-charcoal-light mb-2">Zona</label>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold"
          >
            {ZONES.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-charcoal-light mb-2">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="venta">Venta</option>
            <option value="renta">Renta</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-charcoal-light mb-2">
          Precio (MXN{type === "renta" ? " / mes" : ""})
        </label>
        <input
          required
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm text-charcoal-light mb-2">Recámaras</label>
          <input
            required
            type="number"
            min="0"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-sm text-charcoal-light mb-2">Baños</label>
          <input
            required
            type="number"
            min="0"
            step="0.5"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-sm text-charcoal-light mb-2">m²</label>
          <input
            required
            type="number"
            min="0"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-charcoal-light mb-2">Descripción</label>
        <textarea
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold resize-y"
        />
      </div>

      <div>
        <label className="block text-sm text-charcoal-light mb-2">Fotos</label>

        {(existingImages.length > 0 || newPreviews.length > 0) && (
          <div className="flex flex-wrap gap-3 mb-4">
            {existingImages.map((url) => (
              <div key={url} className="relative w-24 h-24 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExisting(url)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-charcoal text-cream text-xs flex items-center justify-center"
                  aria-label="Quitar foto"
                >
                  &times;
                </button>
              </div>
            ))}
            {newPreviews.map((src, i) => (
              <div key={src} className="relative w-24 h-24 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeNew(i)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-charcoal text-cream text-xs flex items-center justify-center"
                  aria-label="Quitar foto"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          accept="image/*,.heic,.heif"
          multiple
          disabled={processingPhotos}
          onChange={handleFileChange}
          className="block w-full text-sm text-charcoal-light file:mr-4 file:py-2.5 file:px-5 file:border file:border-gold/40 file:bg-transparent file:text-charcoal file:text-sm file:cursor-pointer hover:file:border-gold disabled:opacity-50"
        />
        {processingPhotos && (
          <p className="text-xs text-gold-dark mt-2">Procesando fotos...</p>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={saving || processingPhotos}
          className="bg-charcoal text-cream px-8 py-3 text-sm tracking-widest2 uppercase hover:bg-gold-dark transition-colors duration-300 disabled:opacity-50"
        >
          {saving
            ? progressLabel || "Guardando..."
            : isEdit
              ? "Guardar cambios"
              : "Publicar propiedad"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/panel-selveo")}
          className="text-sm text-charcoal-light hover:text-charcoal transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
