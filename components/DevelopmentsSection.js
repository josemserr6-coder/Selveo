"use client";

import { useMemo, useState } from "react";
import DevelopmentCard from "@/components/DevelopmentCard";
import Reveal from "@/components/Reveal";
import { ZONES } from "@/lib/constants";

const ZONE_FILTERS = [{ key: "todas", name: "Todas" }, ...ZONES.map((z) => ({ key: z.key, name: z.key }))];

export default function DevelopmentsSection({ developments }) {
  const [zone, setZone] = useState("todas");

  const filtered = useMemo(() => {
    if (zone === "todas") return developments;
    return developments.filter((d) => d.zone === zone);
  }, [developments, zone]);

  if (developments.length === 0) return null;

  return (
    <section id="desarrollos" className="bg-cream-light py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-widest2 uppercase text-gold-dark mb-3">
            Preventa y nuevos condominios
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-5">
            Desarrollos de lujo
          </h2>
          <div className="divider-gold mx-auto mb-5" />
          <p className="text-charcoal-light text-sm md:text-base leading-relaxed">
            Condominios completos con unidades disponibles para comprar,
            desde departamentos de una recámara hasta residencias amplias.
          </p>
        </Reveal>

        <Reveal className="flex flex-wrap justify-center gap-2 mb-14" delay={1}>
          {ZONE_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setZone(f.key)}
              className={`px-4 py-2 text-xs tracking-wide uppercase border transition-all duration-300 ease-premium ${
                zone === f.key
                  ? "bg-charcoal text-cream border-charcoal"
                  : "border-gold/30 text-charcoal-light hover:border-gold hover:text-charcoal"
              }`}
            >
              {f.name}
            </button>
          ))}
        </Reveal>

        {filtered.length === 0 ? (
          <p className="text-center text-charcoal-light py-16">
            No hay desarrollos en esta zona por el momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((development, i) => (
              <Reveal key={development.id} delay={(i % 3) + 1}>
                <DevelopmentCard development={development} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
