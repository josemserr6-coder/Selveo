import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PropertyNotFound() {
  return (
    <>
      <Header forceSolid />
      <main className="bg-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-24">
        <h1 className="font-serif text-3xl text-charcoal mb-4">
          No encontramos esta propiedad
        </h1>
        <p className="text-charcoal-light mb-8">
          Puede que ya no esté disponible o que la dirección sea incorrecta.
        </p>
        <Link
          href="/#propiedades"
          className="border border-gold/60 px-8 py-3 text-sm tracking-widest2 uppercase text-charcoal hover:bg-gold hover:text-cream hover:border-gold transition-all duration-500"
        >
          Ver propiedades
        </Link>
      </main>
      <Footer />
    </>
  );
}
