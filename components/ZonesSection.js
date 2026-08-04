"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ZONES } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ZonesSection() {
  const { t } = useLanguage();

  return (
    <section id="zonas" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-widest2 uppercase text-gold-dark mb-3">
            {t.home.zones.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-5">
            {t.home.zones.title}
          </h2>
          <div className="divider-gold mx-auto mb-5" />
          <p className="text-charcoal-light text-sm md:text-base leading-relaxed">
            {t.home.zones.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {ZONES.map((zone, i) => {
            const zoneName = t.zones[zone.key] || zone.name;
            return (
              <Reveal
                key={zone.key}
                delay={(i % 5) + 1}
                className={i === 4 ? "col-span-2 md:col-span-1" : ""}
              >
                <div className="group relative aspect-[3/4] overflow-hidden cursor-default">
                  <Image
                    src={zone.image}
                    alt={`Propiedades de lujo en ${zone.name}: ${zone.specialties.join(", ")}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/5" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-4 md:p-5">
                    <h3 className="font-serif text-lg md:text-xl text-cream mb-2.5">{zoneName}</h3>
                    <div className="w-8 h-px bg-gold mb-3 group-hover:w-14 transition-all duration-500 ease-premium" />
                    <p className="text-[10px] tracking-widest2 uppercase text-gold-light/90 mb-1.5">
                      {t.home.zones.specializeIn}
                    </p>
                    <p className="text-cream/80 text-[11px] md:text-xs leading-relaxed">
                      {zone.specialties.join(" · ")}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
