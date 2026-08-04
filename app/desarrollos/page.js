import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import DesarrollosPageContent from "@/components/desarrollos/DesarrollosPageContent";
import { getDevelopments } from "@/lib/store";

export const revalidate = 0;

export const metadata = {
  title: "Desarrollos de lujo en México",
  description:
    "Desarrollos y condominios exclusivos de Selveo en Zibatá, Valle de Bravo, Malinalco e Interlomas. Compra completa (Full Ownership) o copropiedad fractional.",
  alternates: { canonical: "/desarrollos" },
};

export default async function DesarrollosPage() {
  const developments = await getDevelopments();
  const sorted = [...developments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      <Header />
      <DesarrollosPageContent developments={sorted} />
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
