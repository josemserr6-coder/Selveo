"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGES, dictionaries } from "./dictionary";

const STORAGE_KEY = "selveo_lang";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES.includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  function setLanguage(lang) {
    if (!LANGUAGES.includes(lang)) return;
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: dictionaries[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

const FALLBACK_VALUE = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: dictionaries[DEFAULT_LANGUAGE],
};

// Componentes compartidos entre páginas con y sin <LanguageProvider> (ej.
// PropertyCard) pueden usar este hook sin riesgo: fuera de un provider,
// simplemente devuelve el español por defecto en vez de fallar.
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx || FALLBACK_VALUE;
}

// Extrae un campo bilingüe { es, en } en el idioma actual, con respaldo a
// español si falta la traducción (para que nada se quede a medias).
export function pickLocalized(field, language) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[language] || field[DEFAULT_LANGUAGE] || "";
}

export function pickLocalizedList(field, language) {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  return field[language]?.length ? field[language] : field[DEFAULT_LANGUAGE] || [];
}
