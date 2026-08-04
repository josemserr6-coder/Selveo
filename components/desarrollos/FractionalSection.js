"use client";

import ProjectCard from "@/components/desarrollos/ProjectCard";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FractionalSection({ developments }) {
  const { t } = useLanguage();
  const fractionalDevelopments = developments.filter(
    (d) => d.modality === "fractional" || d.modality === "both"
  );

  return (
    <section id="fractional" className="bg-cream-light py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-widest2 uppercase text-gold-dark mb-3">
            {t.fractional.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-5">
            {t.fractional.title}
          </h2>
          <div className="divider-gold mx-auto mb-5" />
          <p className="text-charcoal-light text-sm md:text-base leading-relaxed">
            {t.fractional.body}
          </p>
        </Reveal>

        {fractionalDevelopments.length === 0 ? (
          <p className="text-center text-charcoal-light py-16">{t.fractional.empty}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fractionalDevelopments.map((development, i) => (
              <Reveal key={development.id} delay={(i % 3) + 1}>
                <ProjectCard development={development} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
