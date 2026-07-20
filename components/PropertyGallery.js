"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";

export default function PropertyGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev]);

  if (!images?.length) return null;

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-dark group">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label="Ampliar imagen"
        />
        {images.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt={`${title} - foto ${i + 1}`}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 70vw"
            className={`object-cover transition-opacity duration-700 ease-premium ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-cream/80 text-charcoal hover:bg-cream transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Foto siguiente"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-cream/80 text-charcoal hover:bg-cream transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
            <span className="absolute bottom-4 right-4 z-20 bg-charcoal/70 text-cream text-xs px-3 py-1 tracking-wide">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto thin-scrollbar pb-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-24 h-16 overflow-hidden border transition-all duration-300 ${
                i === active ? "border-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-charcoal/95 flex items-center justify-center px-4 animate-fadeIn"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Cerrar"
            className="absolute top-6 right-6 text-cream hover:text-gold-light transition-colors"
          >
            <CloseIcon className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto anterior"
            className="absolute left-4 md:left-8 text-cream hover:text-gold-light transition-colors"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active]}
              alt={`${title} - foto ${active + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Foto siguiente"
            className="absolute right-4 md:right-8 text-cream hover:text-gold-light transition-colors"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
