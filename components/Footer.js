import Image from "next/image";
import { ZONES, buildWhatsAppLink } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Image
            src="/logo.png?v=2"
            alt="Selveo"
            width={200}
            height={200}
            className="h-20 w-auto mb-5 brightness-0 invert opacity-90"
          />
          <p className="font-sans text-sm leading-relaxed max-w-sm text-cream/60">
            Bienes raíces residenciales y de lujo. Acompañamos a nuestros
            clientes en la venta y renta de propiedades seleccionadas con
            criterio, discreción y trato cercano.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base text-cream mb-4">Zonas</h4>
          <ul className="space-y-2 text-sm text-cream/60">
            {ZONES.map((z) => (
              <li key={z.key}>{z.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-cream mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light transition-colors"
              >
                WhatsApp: +52 55 6964 7334
              </a>
            </li>
            <li>
              <a href="/#contacto" className="hover:text-gold-light transition-colors">
                Formas de contacto
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40 tracking-wide">
          <p>&copy; {year} Selveo. Todos los derechos reservados.</p>
          <p className="italic font-serif text-gold-light/70">Construye tu legado.</p>
        </div>
      </div>
    </footer>
  );
}
