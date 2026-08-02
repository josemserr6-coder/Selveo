import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertiesSection from "@/components/PropertiesSection";
import AboutSection from "@/components/AboutSection";
import ZonesSection from "@/components/ZonesSection";
import ContactSection from "@/components/ContactSection";
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
      "Selveo — bienes raíces residenciales y de lujo. Casas en venta y en renta en Santa Fe, Polanco, Interlomas, Zibatá, Juriquilla, Valle de Bravo, Avándaro, Metepec, Huixquilucan y Malinalco.",
    slogan: "Construye tu legado.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: "+52 55 6964 7334",
    priceRange: "$$$",
    areaServed: ZONES.map((zone) => ({ "@type": "City", name: zone.name })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <PropertiesSection properties={sorted} />
        <AboutSection />
        <ZonesSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
