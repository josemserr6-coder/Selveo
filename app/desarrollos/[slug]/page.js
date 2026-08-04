import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ProjectDetailContent from "@/components/desarrollos/ProjectDetailContent";
import { getDevelopmentBySlug, getDevelopments } from "@/lib/store";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const development = await getDevelopmentBySlug(slug);
  if (!development) {
    return { title: "Desarrollo no encontrado" };
  }

  const name = development.name?.es || development.name;
  const location = development.location?.es || development.zone;
  const description = development.description?.es || "";
  const priceLabel = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: development.currency || "MXN",
    maximumFractionDigits: 0,
  }).format(development.priceFrom);

  const title = `${name} — desarrollo en ${location}`;
  const metaDescription = `${name}, desarrollo en ${location} desde ${priceLabel}. ${development.unitsCount} unidades. ${description}`.slice(
    0,
    160
  );
  const image = development.images?.[0];
  const path = `/desarrollos/${development.slug}`;

  return {
    title,
    description: metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description: metaDescription,
      url: path,
      images: image
        ? [{ url: image, width: 1200, height: 800, alt: name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
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

  const name = development.name?.es || development.name;
  const location = development.location?.es || development.zone;
  const description = development.description?.es || "";
  const amenities = development.amenities?.es || [];
  const path = `/desarrollos/${development.slug}`;

  const developmentSchema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name,
    description,
    url: `${SITE_URL}${path}`,
    image: development.images,
    numberOfAccommodationUnits: development.unitsCount,
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
      addressCountry: "MX",
    },
    amenityFeature: amenities.map((amenityName) => ({
      "@type": "LocationFeatureSpecification",
      name: amenityName,
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
      <ProjectDetailContent development={development} related={related} />
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
