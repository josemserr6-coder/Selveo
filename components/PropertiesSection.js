"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import { ZONES } from "@/lib/constants";

const ZONE_FILTERS = [{ key: "todas", name: "Todas" }, ...ZONES.map((z) => ({ key: z.key, name: z.key }))];
const TYPE_FILTERS = [
  { key: "todas", name: "Todas" },
  { key: "venta", name: "Venta" },
  { key: "renta", name: "Renta" },
];

export default function PropertiesSection({ properties }) {
  const [zone, setZone] = useState("todas");
  const [type, setType] = useState("todas");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const zoneOk = zone === "todas" || p.zone === zone;
      const typeOk = type === "todas" || p.type === type;
      return zoneOk && typeOk;
    });
  }, [properties, zone, type]);

  return (
    <section id="propiedades" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-widest2 uppercase text-gold-dark mb-3">Portafolio</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-5">Propiedades</h2>
          <div className="divider-gold mx-auto mb-5" />
          <p className="text-charcoal-light text-sm md:text-base leading-relaxed">
            Una selección curada de residencias y propiedades de lujo en venta
            y renta.
          </p>
        </Reveal>

        <Reveal className="flex flex-col items-center gap-5 mb-14" delay={1}>
          <div className="flex flex-wrap justify-center gap-2">
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
          </div>

          <div className="flex gap-2">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setType(f.key)}
                className={`px-5 py-2 text-xs tracking-widest2 uppercase border transition-all duration-300 ease-premium ${
                  type === f.key
                    ? "bg-gold text-cream border-gold"
                    : "border-gold/30 text-charcoal-light hover:border-gold hover:text-charcoal"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="text-center text-charcoal-light py-16">
            No hay propiedades que coincidan con estos filtros por el momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property, i) => (
              <Reveal key={property.id} delay={(i % 3) + 1}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
