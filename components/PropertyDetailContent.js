"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage, pickLocalized } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/desarrollos/LanguageToggle";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyCard from "@/components/PropertyCard";
import { formatPrice, buildWhatsAppLink, getZoneCurrency } from "@/lib/constants";
import { BedIcon, BathIcon, AreaIcon, MapPinIcon } from "@/components/icons";

function PropertyDetailInner({ property, related }) {
  const { language, t } = useLanguage();

  const title = pickLocalized(property.title, language);
  const description = pickLocalized(property.description, language);
  const typeLabel = property.type === "venta" ? t.propertyDetail.typeVenta : t.propertyDetail.typeRenta;
  const zoneLabel = t.zones[property.zone] || property.zone;
  const currency = property.currency || getZoneCurrency(property.zone);
  const whatsappMessage = t.propertyWhatsappMessage(title);

  return (
    <main className="bg-cream min-h-screen pt-28 md:pt-32 pb-24 relative">
      <div className="absolute top-6 right-6 md:right-10 z-20">
        <LanguageToggle />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Link
          href="/#propiedades"
          className="inline-flex items-center gap-2 text-xs tracking-widest2 uppercase text-charcoal-light hover:text-gold-dark transition-colors mb-8"
        >
          &larr; {t.propertyDetail.back}
        </Link>

        <PropertyGallery
          images={property.images}
          title={`${title} — ${zoneLabel}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-charcoal text-cream text-[11px] tracking-widest2 uppercase px-3 py-1.5">
                {typeLabel}
              </span>
              <span className="flex items-center gap-1.5 text-gold-dark text-xs tracking-wide uppercase">
                <MapPinIcon className="w-3.5 h-3.5" />
                {zoneLabel}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-6">
              {title}
            </h1>

            <div className="flex items-center gap-8 text-charcoal-light text-sm border-y border-gold/15 py-5 mb-8">
              <span className="flex items-center gap-2">
                <BedIcon className="w-5 h-5" />
                {property.bedrooms} {t.propertyDetail.bedrooms}
              </span>
              <span className="flex items-center gap-2">
                <BathIcon className="w-5 h-5" />
                {property.bathrooms} {t.propertyDetail.bathrooms}
              </span>
              <span className="flex items-center gap-2">
                <AreaIcon className="w-5 h-5" />
                {property.area} m²
              </span>
            </div>

            <h2 className="font-serif text-xl text-charcoal mb-4">{t.propertyDetail.description}</h2>
            <p className="text-charcoal-light leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-32 bg-cream-light border border-gold/15 p-8">
              <p className="text-xs tracking-widest2 uppercase text-charcoal-light mb-2">
                {property.type === "venta" ? t.propertyDetail.priceSale : t.propertyDetail.priceRent}
              </p>
              <p className="font-serif text-3xl text-charcoal mb-6">
                {formatPrice(property.price, currency)}
                {property.type === "renta" && (
                  <span className="text-base text-charcoal-light"> {t.propertyDetail.perMonth}</span>
                )}
              </p>
              <a
                href={buildWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 text-sm tracking-wide uppercase hover:brightness-105 transition-all duration-300"
              >
                {t.propertyDetail.whatsappCta}
              </a>
              <p className="text-xs text-charcoal-light text-center mt-4">
                {t.propertyDetail.whatsappHint}
              </p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gold/15">
            <h2 className="font-serif text-2xl text-charcoal mb-8">
              {t.propertyDetail.otherIn(zoneLabel)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PropertyDetailContent({ property, related }) {
  return (
    <LanguageProvider>
      <PropertyDetailInner property={property} related={related} />
    </LanguageProvider>
  );
}
