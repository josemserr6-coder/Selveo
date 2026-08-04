import Header from "@/components/Header";
import HomePageContent from "@/components/HomePageContent";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getProperties } from "@/lib/store";
import { SITE_URL, ZONES } from "@/lib/constants";

export const revalidate = 0;

export default async function HomePage() {
  const properties = await getProperties();
  const sorted = [...properties].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Selveo",
    description:
      "Selveo es una agencia inmobiliaria en México especializada en la compra, venta y renta de propiedades residenciales y de lujo en Santa Fe, Polanco, Interlomas, Zibatá, Juriquilla, Valle de Bravo, Avándaro, Metepec, Huixquilucan y Malinalco.",
    slogan: "Construye tu legado.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: "+52 55 6964 7334",
    priceRange: "$$$",
    areaServed: ZONES.map((zone) => ({ "@type": "City", name: zone.name })),
    knowsAbout: ZONES.flatMap((zone) => zone.specialties),
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Compra de propiedades",
          description:
            "Acompañamiento para comprar casas y departamentos residenciales y de lujo.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Venta de propiedades",
          description: "Estrategia y visibilidad para vender tu casa o propiedad.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Renta de propiedades",
          description: "Renta de casas y departamentos residenciales y de lujo.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desarrollos y preventas",
          description:
            "Venta de unidades en desarrollos y condominios de nueva construcción.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fractional (propiedad fraccionada)",
          description:
            "Inversión inmobiliaria en copropiedad fractional en desarrollos seleccionados.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <Header />
      <HomePageContent properties={sorted} />
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
