"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/constants";

export default function PropertyList({ initialProperties }) {
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id, title) {
    if (!confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) return;

    setDeletingId(id);
    const res = await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } else {
      alert("No se pudo eliminar la propiedad.");
    }
    setDeletingId(null);
  }

  if (properties.length === 0) {
    return (
      <p className="text-charcoal-light py-16 text-center">
        Aún no hay propiedades. Agrega la primera con el botón de arriba.
      </p>
    );
  }

  return (
    <div className="divide-y divide-gold/15 border-t border-b border-gold/15">
      {properties.map((p) => (
        <div key={p.id} className="flex items-center gap-5 py-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.images?.[0]}
            alt=""
            className="w-20 h-20 object-cover flex-shrink-0 bg-cream-dark"
          />

          <div className="flex-1 min-w-0">
            <p className="font-serif text-lg text-charcoal truncate">{p.title}</p>
            <p className="text-sm text-charcoal-light">
              {p.zone} · {p.type === "venta" ? "Venta" : "Renta"} ·{" "}
              {formatPrice(p.price, p.currency)}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href={`/propiedades/${p.slug}`}
              target="_blank"
              className="text-xs tracking-wide uppercase text-charcoal-light hover:text-charcoal transition-colors"
            >
              Ver
            </Link>
            <Link
              href={`/panel-selveo/${p.id}/editar`}
              className="text-xs tracking-wide uppercase text-gold-dark hover:text-charcoal transition-colors"
            >
              Editar
            </Link>
            <button
              onClick={() => handleDelete(p.id, p.title)}
              disabled={deletingId === p.id}
              className="text-xs tracking-wide uppercase text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
            >
              {deletingId === p.id ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
