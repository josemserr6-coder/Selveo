"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage, pickLocalized, pickLocalizedList } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/desarrollos/LanguageToggle";
import PropertyGallery from "@/components/PropertyGallery";
import ProjectCard from "@/components/desarrollos/ProjectCard";
import { formatPrice, buildWhatsAppLink } from "@/lib/constants";
import { BuildingIcon, MapPinIcon, CheckIcon } from "@/components/icons";

function ProjectDetailInner({ development, related }) {
  const { language, t } = useLanguage();

  const name = pickLocalized(development.name, language);
  const location = pickLocalized(development.location, language);
  const description = pickLocalized(development.description, language);
  const unitTypes = pickLocalized(development.unitTypes, language);
  const amenities = pickLocalizedList(development.amenities, language);
  const tags = pickLocalizedList(development.featureTags, language);
  const statusLabel = t.status[development.status];
  const modalityLabel = t.modality[development.modality];
  const isFractional = development.modality === "fractional" || development.modality === "both";
  const zoneLabel = t.zones[development.zone] || development.zone;
  const whatsappMessage = t.whatsappMessage(name);

  return (
    <main className="bg-cream min-h-screen pt-28 md:pt-32 pb-24 relative">
      <div className="absolute top-6 right-6 md:right-10 z-20">
        <LanguageToggle />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Link
          href="/desarrollos"
          className="inline-flex items-center gap-2 text-xs tracking-widest2 uppercase text-charcoal-light hover:text-gold-dark transition-colors mb-8"
        >
          &larr; {t.detail.back}
        </Link>

        <PropertyGallery images={development.images} title={`${name} — ${location}`} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-charcoal text-cream text-[11px] tracking-widest2 uppercase px-3 py-1.5">
                {statusLabel}
              </span>
              {isFractional && (
                <span className="bg-gold text-cream text-[11px] tracking-widest2 uppercase px-3 py-1.5">
                  Fractional
                </span>
              )}
              <span className="flex items-center gap-1.5 text-gold-dark text-xs tracking-wide uppercase">
                <MapPinIcon className="w-3.5 h-3.5" />
                {zoneLabel}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-2">
              {name}
            </h1>
            <p className="text-charcoal-light text-sm mb-6">{location}</p>

            <div className="flex flex-wrap items-center gap-8 text-charcoal-light text-sm border-y border-gold/15 py-5 mb-8">
              <span className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                {t.card.units(development.unitsCount)}
              </span>
              <span>{unitTypes}</span>
              <span className="text-gold-dark">{modalityLabel}</span>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] tracking-wide uppercase text-charcoal-light border border-gold/25 px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h2 className="font-serif text-xl text-charcoal mb-4">{t.detail.description}</h2>
            <p className="text-charcoal-light leading-relaxed whitespace-pre-line mb-10">
              {description}
            </p>

            {amenities.length > 0 && (
              <>
                <h2 className="font-serif text-xl text-charcoal mb-4">{t.detail.amenities}</h2>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-2 text-charcoal-light text-sm"
                    >
                      <CheckIcon className="w-4 h-4 text-gold-dark flex-shrink-0" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-32 bg-cream-light border border-gold/15 p-8">
              <p className="text-xs tracking-widest2 uppercase text-charcoal-light mb-2">
                {t.detail.priceFrom}
              </p>
              <p className="font-serif text-3xl text-charcoal mb-6">
                {formatPrice(development.priceFrom, development.currency)}
              </p>
              <a
                href={buildWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 text-sm tracking-wide uppercase hover:brightness-105 transition-all duration-300 text-center"
              >
                {t.detail.whatsappCta}
              </a>
              <p className="text-xs text-charcoal-light text-center mt-4">
                {t.detail.whatsappHint}
              </p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gold/15">
            <h2 className="font-serif text-2xl text-charcoal mb-8">
              {t.detail.otherIn(zoneLabel)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((d) => (
                <ProjectCard key={d.id} development={d} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProjectDetailContent({ development, related }) {
  return (
    <LanguageProvider>
      <ProjectDetailInner development={development} related={related} />
    </LanguageProvider>
  );
}
