import Reveal from "@/components/Reveal";
import { buildWhatsAppLink } from "@/lib/constants";

export default function ContactSection() {
  return (
    <section id="contacto" className="relative bg-charcoal py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_50%_0%,#B3925F,transparent_60%)]" />
      <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="text-xs tracking-widest2 uppercase text-gold-light mb-4">
            Contacto
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-6 leading-tight">
            Hablemos de tu próxima propiedad.
          </h2>
          <div className="divider-gold mx-auto mb-8" />
          <p className="text-cream/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Escríbenos directamente por WhatsApp y con gusto te ayudaremos a
            encontrar, vender o rentar la propiedad ideal para ti.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 text-sm md:text-base tracking-widest2 uppercase hover:brightness-105 hover:scale-[1.02] transition-all duration-400 ease-premium shadow-lg"
          >
            <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.394.653 4.632 1.789 6.553L4 29l7.637-1.752A11.93 11.93 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3Zm0 21.75a9.7 9.7 0 0 1-4.94-1.354l-.354-.21-4.53 1.04 1.07-4.415-.232-.362A9.69 9.69 0 0 1 5.75 15c0-5.652 4.599-10.25 10.251-10.25S26.25 9.348 26.25 15 20.652 24.75 16.001 24.75Zm5.593-7.646c-.306-.153-1.81-.893-2.09-.995-.28-.102-.484-.153-.688.153-.203.306-.79.995-.968 1.199-.178.204-.356.23-.662.077-.306-.153-1.293-.477-2.463-1.522-.91-.812-1.525-1.815-1.703-2.121-.178-.306-.019-.472.134-.624.138-.137.306-.357.459-.535.153-.178.204-.306.306-.51.102-.204.05-.383-.026-.535-.077-.153-.688-1.659-.943-2.271-.248-.596-.5-.516-.688-.525l-.586-.01c-.204 0-.535.077-.815.383-.28.306-1.07 1.046-1.07 2.552 0 1.505 1.096 2.96 1.249 3.164.153.204 2.157 3.294 5.228 4.62.73.315 1.3.503 1.744.643.733.233 1.4.2 1.928.121.588-.088 1.81-.74 2.065-1.454.255-.714.255-1.326.178-1.454-.076-.128-.28-.204-.586-.357Z" />
            </svg>
            Escríbenos por WhatsApp
          </a>
          <p className="text-cream/40 text-sm mt-6">+52 55 6964 7334</p>
        </Reveal>
      </div>
    </section>
  );
}
