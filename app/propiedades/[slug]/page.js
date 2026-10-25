import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import PropertyDetailContent from "@/components/PropertyDetailContent";
import { getPropertyBySlug, getProperties } from "@/lib/store";
import { formatPrice, getZoneCurrency, SITE_URL } from "@/lib/constants";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) {
    return { title: "Propiedad no encontrada" };
  }

  const title = property.title?.es ?? property.title;
  const description = property.description?.es ?? property.description ?? "";
  const currency = property.currency || getZoneCurrency(property.zone);

  const typeLabel = property.type === "venta" ? "en venta" : "en renta";
  const priceLabel = `${formatPrice(property.price, currency)}${
    property.type === "renta" ? "/mes" : ""
  }`;
  const mentionsZone = title.toLowerCase().includes(property.zone.toLowerCase());
  const metaTitle = mentionsZone
    ? `${title} — ${typeLabel}`
    : `${title} — ${typeLabel} en ${property.zone}`;
  const metaDescription = `Casa ${typeLabel} en ${property.zone}: ${title}. ${property.bedrooms} recámaras, ${property.bathrooms} baños, ${property.area} m². ${priceLabel}. ${description}`.slice(
    0,
    160
  );
  const image = property.images?.[0];
  const path = `/propiedades/${property.slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: metaTitle,
      description: metaDescription,
      url: path,
      images: image
        ? [{ url: image, width: 1200, height: 800, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
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

  const title = property.title?.es ?? property.title;
  const description = property.description?.es ?? property.description ?? "";
  const currency = property.currency || getZoneCurrency(property.zone);
  const path = `/propiedades/${property.slug}`;

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    image: property.images,
    datePosted: property.createdAt,
    about: {
      "@type": "Residence",
      name: title,
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
      priceCurrency: currency,
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
      <PropertyDetailContent property={property} related={related} />
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
