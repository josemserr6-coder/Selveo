"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/constants";

export default function DevelopmentList({ initialDevelopments }) {
  const router = useRouter();
  const [developments, setDevelopments] = useState(initialDevelopments);
  const [deletingId, setDeletingId] = useState(null);

  function nameOf(d) {
    return d.name?.es || d.name || "";
  }

  async function handleDelete(id, name) {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;

    setDeletingId(id);
    const res = await fetch(`/api/admin/developments/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDevelopments((prev) => prev.filter((d) => d.id !== id));
      router.refresh();
    } else {
      alert("No se pudo eliminar el desarrollo.");
    }
    setDeletingId(null);
  }

  if (developments.length === 0) {
    return (
      <p className="text-charcoal-light py-16 text-center">
        Aún no hay desarrollos. Agrega el primero con el botón de arriba.
      </p>
    );
  }

  return (
    <div className="divide-y divide-gold/15 border-t border-b border-gold/15">
      {developments.map((d) => (
        <div key={d.id} className="flex items-center gap-5 py-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={d.images?.[0]}
            alt=""
            className="w-20 h-20 object-cover flex-shrink-0 bg-cream-dark"
          />

          <div className="flex-1 min-w-0">
            <p className="font-serif text-lg text-charcoal truncate">{nameOf(d)}</p>
            <p className="text-sm text-charcoal-light">
              {d.zone} · Desde {formatPrice(d.priceFrom, d.currency)} · {d.unitsCount} unidades ·{" "}
              {d.status} · {d.modality}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href={`/desarrollos/${d.slug}`}
              target="_blank"
              className="text-xs tracking-wide uppercase text-charcoal-light hover:text-charcoal transition-colors"
            >
              Ver
            </Link>
            <Link
              href={`/panel-selveo/desarrollos/${d.id}/editar`}
              className="text-xs tracking-wide uppercase text-gold-dark hover:text-charcoal transition-colors"
            >
              Editar
            </Link>
            <button
              onClick={() => handleDelete(d.id, nameOf(d))}
              disabled={deletingId === d.id}
              className="text-xs tracking-wide uppercase text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
            >
              {deletingId === d.id ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
