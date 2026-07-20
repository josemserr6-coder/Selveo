"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "/#propiedades", label: "Propiedades" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#zonas", label: "Zonas" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header({ forceSolid = false }) {
  const [scrolledState, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = forceSolid || scrolledState;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-premium ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md py-3 shadow-[0_1px_0_0_rgba(179,146,95,0.25)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <Image
            src="/logo.png?v=2"
            alt="Selveo"
            width={160}
            height={160}
            priority
            className={`w-auto transition-all duration-500 ease-premium ${
              scrolled ? "h-14" : "h-[4.5rem]"
            }`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link font-sans text-[13px] tracking-widest2 uppercase text-charcoal/80 hover:text-charcoal transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden relative flex flex-col gap-[6px] w-8 h-8 items-end justify-center"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px bg-charcoal transition-all duration-300 ease-premium ${
              menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
            }`}
          />
          <span
            className={`block h-px bg-charcoal transition-all duration-300 ease-premium ${
              menuOpen ? "w-6 opacity-0" : "w-4"
            }`}
          />
          <span
            className={`block h-px bg-charcoal transition-all duration-300 ease-premium ${
              menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-premium ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-7 py-10 bg-cream/95 backdrop-blur-md border-t border-gold/20">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-xl text-charcoal"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
