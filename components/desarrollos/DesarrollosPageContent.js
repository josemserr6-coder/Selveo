"use client";

import { Suspense } from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import DesarrollosHero from "@/components/desarrollos/DesarrollosHero";
import DesarrollosGrid from "@/components/desarrollos/DesarrollosGrid";
import FractionalSection from "@/components/desarrollos/FractionalSection";

export default function DesarrollosPageContent({ developments }) {
  return (
    <LanguageProvider>
      <main>
        <DesarrollosHero />
        <Suspense fallback={null}>
          <DesarrollosGrid developments={developments} />
        </Suspense>
        <FractionalSection developments={developments} />
      </main>
    </LanguageProvider>
  );
}
