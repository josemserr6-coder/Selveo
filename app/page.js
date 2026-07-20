import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertiesSection from "@/components/PropertiesSection";
import AboutSection from "@/components/AboutSection";
import ZonesSection from "@/components/ZonesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getProperties } from "@/lib/store";

export const revalidate = 0;

export default async function HomePage() {
  const properties = await getProperties();
  const sorted = [...properties].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
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
