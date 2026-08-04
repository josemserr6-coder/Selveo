"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PRICE_BANDS, BEDROOM_OPTIONS } from "@/lib/i18n/dictionary";
import { ZONES } from "@/lib/constants";

const fieldClass =
  "w-full bg-transparent px-4 py-3 text-sm text-charcoal focus:outline-none appearance-none cursor-pointer";

export default function DesarrollosSearch({ className = "" }) {
  const { t } = useLanguage();
  const router = useRouter();

  const [zone, setZone] = useState("");
  const [type, setType] = useState("compra");
  const [bedrooms, setBedrooms] = useState("");
  const [priceBand, setPriceBand] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (zone) params.set("zone", zone);
    if (priceBand) params.set("price", priceBand);

    if (type === "compra") {
      if (bedrooms) params.set("bedrooms", bedrooms);
      router.push(`/?${params.toString()}#propiedades`);
    } else {
      if (type === "fractional") params.set("modality", "fractional");
      router.push(`/desarrollos?${params.toString()}#grid`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full bg-cream-light/95 backdrop-blur-sm border border-gold/30 shadow-[0_20px_50px_-20px_rgba(62,61,59,0.25)] ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y divide-gold/15 lg:divide-y-0 lg:divide-x">
        <div className="lg:col-span-1">
          <label className="block text-[10px] tracking-widest2 uppercase text-gold-dark px-4 pt-3">
            {t.search.zoneLabel}
          </label>
          <select value={zone} onChange={(e) => setZone(e.target.value)} className={fieldClass}>
            <option value="">{t.search.allZones}</option>
            {ZONES.map((z) => (
              <option key={z.key} value={z.key}>
                {t.zones[z.key] || z.key}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-1">
          <label className="block text-[10px] tracking-widest2 uppercase text-gold-dark px-4 pt-3">
            {t.search.typeLabel}
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
            <option value="compra">{t.search.types.compra}</option>
            <option value="inversion">{t.search.types.inversion}</option>
            <option value="fractional">{t.search.types.fractional}</option>
          </select>
        </div>

        {type === "compra" && (
          <div className="lg:col-span-1">
            <label className="block text-[10px] tracking-widest2 uppercase text-gold-dark px-4 pt-3">
              {t.search.bedroomsLabel}
            </label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className={fieldClass}
            >
              <option value="">{t.search.bedroomsAny}</option>
              {BEDROOM_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={type === "compra" ? "lg:col-span-1" : "lg:col-span-2"}>
          <label className="block text-[10px] tracking-widest2 uppercase text-gold-dark px-4 pt-3">
            {t.search.priceLabel}
          </label>
          <select
            value={priceBand}
            onChange={(e) => setPriceBand(e.target.value)}
            className={fieldClass}
          >
            <option value="">{t.search.priceAny}</option>
            {PRICE_BANDS.map((band) => (
              <option key={band.value} value={band.value}>
                {t.search.priceBands[band.value]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-stretch lg:col-span-1">
          <button
            type="submit"
            className="w-full bg-charcoal text-cream text-xs tracking-widest2 uppercase px-6 py-4 hover:bg-gold-dark transition-colors duration-300 ease-premium"
          >
            {t.search.submit}
          </button>
        </div>
      </div>
    </form>
  );
}
