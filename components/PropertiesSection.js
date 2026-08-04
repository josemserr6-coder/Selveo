"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import { ZONES } from "@/lib/constants";
import { PRICE_BANDS } from "@/lib/i18n/dictionary";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CloseIcon } from "@/components/icons";

export default function PropertiesSection({ properties }) {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [zone, setZone] = useState("todas");
  const [type, setType] = useState("todas");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [priceValue, setPriceValue] = useState("");

  useEffect(() => {
    const zoneParam = searchParams.get("zone");
    const bedroomsParam = searchParams.get("bedrooms");
    const priceParam = searchParams.get("price");
    if (zoneParam) setZone(zoneParam);
    if (bedroomsParam) setMinBedrooms(bedroomsParam);
    if (priceParam) setPriceValue(priceParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoneFilters = useMemo(
    () => [
      { key: "todas", name: t.filters.all },
      ...ZONES.map((z) => ({ key: z.key, name: t.zones[z.key] || z.key })),
    ],
    [t]
  );

  const typeFilters = [
    { key: "todas", name: t.filters.all },
    { key: "venta", name: t.home.properties.typeVenta },
    { key: "renta", name: t.home.properties.typeRenta },
  ];

  const priceBand = PRICE_BANDS.find((b) => b.value === priceValue);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const zoneOk = zone === "todas" || p.zone === zone;
      const typeOk = type === "todas" || p.type === type;
      const bedroomsOk = !minBedrooms || p.bedrooms >= Number(minBedrooms);
      const priceOk = !priceBand || (p.price >= priceBand.min && p.price < priceBand.max);
      return zoneOk && typeOk && bedroomsOk && priceOk;
    });
  }, [properties, zone, type, minBedrooms, priceBand]);

  const activeExtras = [
    minBedrooms && {
      key: "bedrooms",
      label: t.home.properties.bedroomsChip(minBedrooms),
      clear: () => setMinBedrooms(""),
    },
    priceBand && {
      key: "price",
      label: t.search.priceBands[priceBand.value],
      clear: () => setPriceValue(""),
    },
  ].filter(Boolean);

  return (
    <section id="propiedades" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-widest2 uppercase text-gold-dark mb-3">
            {t.home.properties.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-5">
            {t.home.properties.title}
          </h2>
          <div className="divider-gold mx-auto mb-5" />
          <p className="text-charcoal-light text-sm md:text-base leading-relaxed">
            {t.home.properties.subtitle}
          </p>
        </Reveal>

        <Reveal className="flex flex-col items-center gap-5 mb-4" delay={1}>
          <div className="flex flex-wrap justify-center gap-2">
            {zoneFilters.map((f) => (
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
            {typeFilters.map((f) => (
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

        {activeExtras.length > 0 && (
          <Reveal className="flex flex-wrap justify-center gap-2 mb-10" delay={1}>
            {activeExtras.map((extra) => (
              <button
                key={extra.key}
                onClick={extra.clear}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-wide uppercase bg-gold/10 text-gold-dark border border-gold/30 hover:bg-gold/20 transition-colors duration-300"
              >
                {extra.label}
                <CloseIcon className="w-3 h-3" />
              </button>
            ))}
          </Reveal>
        )}

        <div className={activeExtras.length > 0 ? "mt-0" : "mt-10"} />

        {filtered.length === 0 ? (
          <p className="text-center text-charcoal-light py-16">{t.home.properties.empty}</p>
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
