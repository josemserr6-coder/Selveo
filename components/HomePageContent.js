"use client";

import { Suspense } from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import Hero from "@/components/Hero";
import PropertiesSection from "@/components/PropertiesSection";
import AboutSection from "@/components/AboutSection";
import ZonesSection from "@/components/ZonesSection";
import ContactSection from "@/components/ContactSection";

export default function HomePageContent({ properties }) {
  return (
    <LanguageProvider>
      <main>
        <Hero />
        <Suspense fallback={null}>
          <PropertiesSection properties={properties} />
        </Suspense>
        <AboutSection />
        <ZonesSection />
        <ContactSection />
      </main>
    </LanguageProvider>
  );
}
