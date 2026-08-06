"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="bg-cream-light py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
          <div className="absolute -inset-4 border border-gold/30 hidden md:block" />
          <div className="relative w-full h-full overflow-hidden img-zoom">
            <Image
              src="https://images.unsplash.com/photo-1706034136283-c9b6a68d1eb8?w=900&h=1100&fit=crop&q=80"
              alt="Parque La Mexicana en Santa Fe, Ciudad de México, rodeado de condominios"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <p className="text-xs tracking-widest2 uppercase text-gold-dark mb-4">
            {t.home.about.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">
            {t.home.about.heading}
          </h2>
          <div className="divider-gold mb-6" />
          <p className="text-charcoal-light leading-relaxed mb-5">{t.home.about.paragraph1}</p>
          <p className="text-charcoal-light leading-relaxed">{t.home.about.paragraph2}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 pt-6 border-t border-gold/15 text-xs tracking-widest2 uppercase text-charcoal-light">
            <span>{t.home.about.servicePurchase}</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span>{t.home.about.serviceSale}</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span>{t.home.about.serviceRent}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
