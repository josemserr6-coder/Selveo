"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/constants";
import { useLanguage, pickLocalized, pickLocalizedList } from "@/lib/i18n/LanguageContext";
import { BuildingIcon, MapPinIcon } from "@/components/icons";

export default function ProjectCard({ development }) {
  const { language, t } = useLanguage();
  const cover = development.images?.[0];
  const name = pickLocalized(development.name, language);
  const location = pickLocalized(development.location, language);
  const shortDescription = pickLocalized(development.shortDescription, language);
  const tags = pickLocalizedList(development.featureTags, language).slice(0, 3);
  const statusLabel = t.status[development.status];
  const modalityLabel = t.modality[development.modality];
  const isFractional = development.modality === "fractional" || development.modality === "both";

  return (
    <Link
      href={`/desarrollos/${development.slug}`}
      className="group block bg-cream-light border border-gold/10 hover:border-gold/40 hover:shadow-[0_20px_50px_-20px_rgba(62,61,59,0.35)] transition-all duration-500 ease-premium"
    >
      <div className="relative img-zoom aspect-[4/3] overflow-hidden">
        {cover && (
          <Image
            src={cover}
            alt={`${name} — ${location}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-cream/95 text-charcoal text-[11px] tracking-widest2 uppercase px-3 py-1.5">
            {statusLabel}
          </span>
          {isFractional && (
            <span className="bg-gold text-cream text-[11px] tracking-widest2 uppercase px-3 py-1.5">
              Fractional
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1.5 text-gold-dark text-xs tracking-wide uppercase mb-2">
          <MapPinIcon className="w-3.5 h-3.5" />
          {location}
        </div>

        <h3 className="font-serif text-xl text-charcoal leading-snug mb-2 group-hover:text-gold-dark transition-colors duration-300">
          {name}
        </h3>

        <p className="text-charcoal-light text-sm leading-relaxed mb-4 line-clamp-2">
          {shortDescription}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wide uppercase text-charcoal-light border border-gold/25 px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gold/15 pt-4">
          <div>
            <p className="text-[11px] tracking-widest2 uppercase text-charcoal-light">
              {t.card.priceFrom}
            </p>
            <p className="font-serif text-lg text-charcoal">
              {formatPrice(development.priceFrom, development.currency)}
            </p>
          </div>
          <div className="text-right">
            <p className="flex items-center gap-1.5 justify-end text-charcoal-light text-sm">
              <BuildingIcon className="w-4 h-4" />
              {t.card.units(development.unitsCount)}
            </p>
            <p className="text-[11px] text-gold-dark mt-1">{modalityLabel}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
