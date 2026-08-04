"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageToggle({ className = "" }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center border border-gold/40 bg-cream/90 backdrop-blur-sm text-xs tracking-widest2 uppercase ${className}`}
      role="group"
      aria-label="Idioma / Language"
    >
      <button
        type="button"
        onClick={() => setLanguage("es")}
        aria-pressed={language === "es"}
        className={`px-3 py-2 transition-colors duration-300 ${
          language === "es" ? "bg-charcoal text-cream" : "text-charcoal-light hover:text-charcoal"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`px-3 py-2 transition-colors duration-300 ${
          language === "en" ? "bg-charcoal text-cream" : "text-charcoal-light hover:text-charcoal"
        }`}
      >
        EN
      </button>
    </div>
  );
}
