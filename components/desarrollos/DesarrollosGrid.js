"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "@/components/desarrollos/ProjectCard";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ZONES } from "@/lib/constants";
import { PRICE_BANDS } from "@/lib/i18n/dictionary";
import { CloseIcon } from "@/components/icons";

export default function DesarrollosGrid({ developments }) {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [zone, setZone] = useState("todas");
  const [modality, setModality] = useState("");
  const [priceValue, setPriceValue] = useState("");

  useEffect(() => {
    const zoneParam = searchParams.get("zone");
    const modalityParam = searchParams.get("modality");
    const priceParam = searchParams.get("price");
    if (zoneParam) setZone(zoneParam);
    if (modalityParam) setModality(modalityParam);
    if (priceParam) setPriceValue(priceParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const priceBand = PRICE_BANDS.find((b) => b.value === priceValue);

  const zoneFilters = useMemo(
    () => [
      { key: "todas", name: t.filters.all },
      ...ZONES.map((z) => ({ key: z.key, name: t.zones[z.key] || z.key })),
    ],
    [t]
  );

  const filtered = useMemo(() => {
    return developments.filter((d) => {
      const zoneOk = zone === "todas" || d.zone === zone;
      const modalityOk =
        !modality || d.modality === modality || d.modality === "both";
      const priceOk =
        !priceBand || (d.priceFrom >= priceBand.min && d.priceFrom < priceBand.max);
      return zoneOk && modalityOk && priceOk;
    });
  }, [developments, zone, modality, priceBand]);

  const activeExtras = [
    modality && {
      key: "modality",
      label: t.modality[modality] || modality,
      clear: () => setModality(""),
    },
    priceBand && {
      key: "price",
      label: t.search.priceBands[priceBand.value],
      clear: () => setPriceValue(""),
    },
  ].filter(Boolean);

  return (
    <section id="grid" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-5">
            {t.section.title}
          </h1>
          <div className="divider-gold mx-auto mb-5" />
          <p className="text-charcoal-light text-sm md:text-base leading-relaxed">
            {t.section.subtitle}
          </p>
        </Reveal>

        <Reveal className="flex flex-wrap justify-center gap-2 mb-4" delay={1}>
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
          <p className="text-center text-charcoal-light py-16">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((development, i) => (
              <Reveal key={development.id} delay={(i % 3) + 1}>
                <ProjectCard development={development} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
