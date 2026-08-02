import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  return (
    <section id="nosotros" className="bg-cream-light py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
          <div className="absolute -inset-4 border border-gold/30 hidden md:block" />
          <div className="relative w-full h-full overflow-hidden img-zoom">
            <Image
              src="https://picsum.photos/seed/selveo-nosotros/900/1100"
              alt="Selveo — inmobiliaria de propiedades residenciales y de lujo en México"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <p className="text-xs tracking-widest2 uppercase text-gold-dark mb-4">
            Agencia inmobiliaria en México
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">
            Un criterio claro para decisiones importantes.
          </h2>
          <div className="divider-gold mb-6" />
          <p className="text-charcoal-light leading-relaxed mb-5">
            En Selveo acompañamos a nuestros clientes en la compra, venta y
            renta de propiedades residenciales y de lujo, con un enfoque
            discreto, cercano y basado en la confianza. Cada propiedad que
            representamos es seleccionada con el mismo criterio con el que
            nuestros clientes construyen su patrimonio.
          </p>
          <p className="text-charcoal-light leading-relaxed">
            Operamos en Ciudad de México, Querétaro, Valle de Bravo,
            Malinalco y el Estado de México, entendiendo que cada zona tiene
            su propio carácter y que cada cliente merece un servicio a la
            medida.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 pt-6 border-t border-gold/15 text-xs tracking-widest2 uppercase text-charcoal-light">
            <span>Compra de propiedades</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span>Venta de propiedades</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span>Renta de propiedades</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
