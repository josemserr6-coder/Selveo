import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyCard from "@/components/PropertyCard";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getPropertyBySlug, getProperties } from "@/lib/store";
import { formatPrice, buildWhatsAppLink, SITE_URL } from "@/lib/constants";
import { BedIcon, BathIcon, AreaIcon, MapPinIcon } from "@/components/icons";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) {
    return { title: "Propiedad no encontrada" };
  }

  const typeLabel = property.type === "venta" ? "en venta" : "en renta";
  const priceLabel = `${formatPrice(property.price, property.currency)}${
    property.type === "renta" ? "/mes" : ""
  }`;
  const mentionsZone = property.title.toLowerCase().includes(property.zone.toLowerCase());
  const title = mentionsZone
    ? `${property.title} — ${typeLabel}`
    : `${property.title} — ${typeLabel} en ${property.zone}`;
  const description = `Casa ${typeLabel} en ${property.zone}: ${property.title}. ${property.bedrooms} recámaras, ${property.bathrooms} baños, ${property.area} m². ${priceLabel}. ${property.description}`.slice(
    0,
    160
  );
  const image = property.images?.[0];
  const path = `/propiedades/${property.slug}`;

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
        ? [{ url: image, width: 1200, height: 800, alt: property.title }]
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

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const allProperties = await getProperties();
  const related = allProperties
    .filter((p) => p.id !== property.id && p.zone === property.zone)
    .slice(0, 3);

  const message = `Hola, me interesa la propiedad "${property.title}" de Selveo`;
  const path = `/propiedades/${property.slug}`;

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${SITE_URL}${path}`,
    image: property.images,
    datePosted: property.createdAt,
    about: {
      "@type": "Residence",
      name: property.title,
      numberOfRooms: property.bedrooms,
      numberOfBathroomsTotal: property.bathrooms,
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.area,
        unitCode: "MTK",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: property.zone,
        addressCountry: "MX",
      },
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency || "MXN",
      availability: "https://schema.org/InStock",
      businessFunction:
        property.type === "venta"
          ? "https://schema.org/Sell"
          : "https://schema.org/LeaseOut",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <Header forceSolid />
      <main className="bg-cream min-h-screen pt-28 md:pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Link
            href="/#propiedades"
            className="inline-flex items-center gap-2 text-xs tracking-widest2 uppercase text-charcoal-light hover:text-gold-dark transition-colors mb-8"
          >
            &larr; Volver a propiedades
          </Link>

          <PropertyGallery
            images={property.images}
            title={`${property.title} — ${
              property.type === "venta" ? "casa en venta" : "casa en renta"
            } en ${property.zone}`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-charcoal text-cream text-[11px] tracking-widest2 uppercase px-3 py-1.5">
                  {property.type === "venta" ? "Venta" : "Renta"}
                </span>
                <span className="flex items-center gap-1.5 text-gold-dark text-xs tracking-wide uppercase">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  {property.zone}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-6">
                {property.title}
              </h1>

              <div className="flex items-center gap-8 text-charcoal-light text-sm border-y border-gold/15 py-5 mb-8">
                <span className="flex items-center gap-2">
                  <BedIcon className="w-5 h-5" />
                  {property.bedrooms} recámaras
                </span>
                <span className="flex items-center gap-2">
                  <BathIcon className="w-5 h-5" />
                  {property.bathrooms} baños
                </span>
                <span className="flex items-center gap-2">
                  <AreaIcon className="w-5 h-5" />
                  {property.area} m²
                </span>
              </div>

              <h2 className="font-serif text-xl text-charcoal mb-4">Descripción</h2>
              <p className="text-charcoal-light leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-32 bg-cream-light border border-gold/15 p-8">
                <p className="text-xs tracking-widest2 uppercase text-charcoal-light mb-2">
                  {property.type === "venta" ? "Precio de venta" : "Renta mensual"}
                </p>
                <p className="font-serif text-3xl text-charcoal mb-6">
                  {formatPrice(property.price, property.currency)}
                  {property.type === "renta" && (
                    <span className="text-base text-charcoal-light"> /mes</span>
                  )}
                </p>
                <a
                  href={buildWhatsAppLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 text-sm tracking-wide uppercase hover:brightness-105 transition-all duration-300"
                >
                  Preguntar por WhatsApp
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
                Otras propiedades en {property.zone}
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
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
