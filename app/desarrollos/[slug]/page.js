import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import DevelopmentCard from "@/components/DevelopmentCard";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getDevelopmentBySlug, getDevelopments } from "@/lib/store";
import { formatPrice, buildWhatsAppLink, SITE_URL } from "@/lib/constants";
import { BuildingIcon, MapPinIcon, CheckIcon } from "@/components/icons";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const development = await getDevelopmentBySlug(slug);
  if (!development) {
    return { title: "Desarrollo no encontrado" };
  }

  const priceLabel = formatPrice(development.priceFrom, development.currency);
  const title = `${development.name} — desarrollo en ${development.zone}`;
  const description = `${development.name}, desarrollo en ${development.zone} desde ${priceLabel}. ${development.unitsCount} unidades, ${development.unitTypes}. ${development.description}`.slice(
    0,
    160
  );
  const image = development.images?.[0];
  const path = `/desarrollos/${development.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      images: image
        ? [{ url: image, width: 1200, height: 800, alt: development.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function DevelopmentDetailPage({ params }) {
  const { slug } = await params;
  const development = await getDevelopmentBySlug(slug);
  if (!development) notFound();

  const allDevelopments = await getDevelopments();
  const related = allDevelopments
    .filter((d) => d.id !== development.id && d.zone === development.zone)
    .slice(0, 3);

  const message = `Hola, me interesa conocer la disponibilidad de unidades en "${development.name}" de Selveo`;
  const path = `/desarrollos/${development.slug}`;

  const developmentSchema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: development.name,
    description: development.description,
    url: `${SITE_URL}${path}`,
    image: development.images,
    numberOfAccommodationUnits: development.unitsCount,
    address: {
      "@type": "PostalAddress",
      addressLocality: development.zone,
      addressCountry: "MX",
    },
    amenityFeature: (development.amenities || []).map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    offers: {
      "@type": "AggregateOffer",
      lowPrice: development.priceFrom,
      priceCurrency: development.currency || "MXN",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(developmentSchema) }}
      />
      <Header forceSolid />
      <main className="bg-cream min-h-screen pt-28 md:pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Link
            href="/#desarrollos"
            className="inline-flex items-center gap-2 text-xs tracking-widest2 uppercase text-charcoal-light hover:text-gold-dark transition-colors mb-8"
          >
            &larr; Volver a desarrollos
          </Link>

          <PropertyGallery
            images={development.images}
            title={`${development.name} — desarrollo en ${development.zone}`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-charcoal text-cream text-[11px] tracking-widest2 uppercase px-3 py-1.5">
                  Desarrollo
                </span>
                <span className="flex items-center gap-1.5 text-gold-dark text-xs tracking-wide uppercase">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  {development.zone}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-6">
                {development.name}
              </h1>

              <div className="flex items-center gap-8 text-charcoal-light text-sm border-y border-gold/15 py-5 mb-8">
                <span className="flex items-center gap-2">
                  <BuildingIcon className="w-5 h-5" />
                  {development.unitsCount} unidades
                </span>
                <span>{development.unitTypes}</span>
              </div>

              <h2 className="font-serif text-xl text-charcoal mb-4">Descripción</h2>
              <p className="text-charcoal-light leading-relaxed whitespace-pre-line mb-10">
                {development.description}
              </p>

              {development.amenities?.length > 0 && (
                <>
                  <h2 className="font-serif text-xl text-charcoal mb-4">Amenidades</h2>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {development.amenities.map((amenity) => (
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
                  Precio desde
                </p>
                <p className="font-serif text-3xl text-charcoal mb-6">
                  {formatPrice(development.priceFrom, development.currency)}
                </p>
                <a
                  href={buildWhatsAppLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 text-sm tracking-wide uppercase hover:brightness-105 transition-all duration-300 text-center"
                >
                  Consultar disponibilidad y unidades
                </a>
                <p className="text-xs text-charcoal-light text-center mt-4">
                  Te contactará un asesor de Selveo directamente.
                </p>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-24 pt-16 border-t border-gold/15">
              <h2 className="font-serif text-2xl text-charcoal mb-8">
                Otros desarrollos en {development.zone}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((d) => (
                  <DevelopmentCard key={d.id} development={d} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
