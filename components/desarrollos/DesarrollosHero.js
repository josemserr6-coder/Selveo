"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/desarrollos/LanguageToggle";
import DesarrollosSearch from "@/components/desarrollos/DesarrollosSearch";

export default function DesarrollosHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center py-36 md:py-44">
      {/* Fondo: degradado crema/dorado tenue, sin foto — el texto es protagonista */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-cream to-cream-dark" />
      <div
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[140%] md:w-[80%] aspect-square rounded-full animate-breathe"
        style={{
          background:
            "radial-gradient(circle, rgba(179,146,95,0.22) 0%, rgba(179,146,95,0.08) 45%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />

      <div className="absolute top-24 md:top-28 right-6 md:right-10 z-20">
        <LanguageToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl animate-fadeIn">
        <Image
          src="/logo.png?v=2"
          alt="Selveo"
          width={320}
          height={320}
          priority
          className="h-32 md:h-40 w-auto mb-6 drop-shadow-sm"
        />

        <p className="font-serif italic text-xl md:text-2xl text-charcoal">{t.hero.slogan}</p>

        <div className="divider-gold my-6" />

        <p className="font-sans text-sm md:text-base text-charcoal-light tracking-wide max-w-lg leading-relaxed mb-10">
          {t.hero.tagline}
        </p>

        <DesarrollosSearch className="max-w-3xl" />
      </div>
    </section>
  );
}
