"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (bgRef.current) {
          const offset = window.scrollY * 0.3;
          bgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden flex items-center justify-center"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="https://picsum.photos/seed/selveo-hero-architecture/1920/1400"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cream/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-cream/55 to-cream" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl animate-fadeIn">
        <Image
          src="/logo.png?v=2"
          alt="Selveo"
          width={280}
          height={280}
          priority
          className="h-28 md:h-36 w-auto mb-8"
        />

        <h1 className="font-serif text-5xl md:text-7xl text-charcoal leading-[1.1] tracking-tight">
          Construye tu legado.
        </h1>

        <div className="divider-gold my-8" />

        <p className="font-sans text-sm md:text-base text-charcoal-light tracking-wide max-w-xl leading-relaxed">
          Propiedades residenciales y de lujo en Ciudad de México, Querétaro,
          Valle de Bravo, Malinalco y Estado de México.
        </p>

        <a
          href="#propiedades"
          className="group mt-10 inline-flex items-center gap-3 border border-gold/60 px-9 py-3.5 text-xs md:text-sm tracking-widest2 uppercase text-charcoal hover:bg-gold hover:text-cream hover:border-gold transition-all duration-500 ease-premium"
        >
          Ver propiedades
          <span className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}
