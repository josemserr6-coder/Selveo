export const dictionaries = {
  es: {
    languageName: "Español",
    hero: {
      slogan: "Construye tu legado.",
      tagline: "Tu próxima inversión, a un solo paso.",
      cta: "Ver desarrollos",
    },
    section: {
      title: "Nuestros Desarrollos",
      subtitle: "Proyectos exclusivos diseñados para inspirar tu legado.",
    },
    filters: {
      all: "Todas",
    },
    status: {
      preventa: "Preventa",
      disponible: "Disponible",
      ultimas_unidades: "Últimas unidades",
    },
    modality: {
      full: "Full Ownership",
      fractional: "Fractional",
      both: "Full Ownership & Fractional",
    },
    card: {
      priceFrom: "Desde",
      units: (n) => `${n} unidades`,
      viewDetail: "Ver desarrollo",
    },
    detail: {
      back: "Volver a desarrollos",
      priceFrom: "Precio desde",
      units: "Unidades",
      unitTypes: "Tipos de unidad",
      amenities: "Amenidades",
      description: "Descripción",
      modality: "Modalidad",
      whatsappCta: "Consultar disponibilidad",
      whatsappHint: "Te contactará un asesor de Selveo directamente.",
      otherIn: (zone) => `Otros desarrollos en ${zone}`,
    },
    whatsappMessage: (name) =>
      `Hola, me interesa conocer la disponibilidad de unidades en "${name}" de Selveo`,
    empty: "No hay desarrollos en esta zona por el momento.",
    notFound: {
      title: "No encontramos este desarrollo",
      body: "Puede que ya no esté disponible o que la dirección sea incorrecta.",
      cta: "Ver desarrollos",
    },
    zones: {
      CDMX: "Ciudad de México",
      "Querétaro": "Querétaro",
      "Valle de Bravo": "Valle de Bravo",
      Malinalco: "Malinalco",
      Edomex: "Estado de México",
    },
    search: {
      zoneLabel: "Zona",
      allZones: "Todas las zonas",
      typeLabel: "Tipo",
      types: { compra: "Compra", inversion: "Inversión", fractional: "Fractional" },
      bedroomsLabel: "Recámaras",
      bedroomsAny: "Cualquiera",
      priceLabel: "Precio",
      priceAny: "Cualquier precio",
      priceBands: {
        "0-3000000": "Hasta $3M",
        "3000000-6000000": "$3M – $6M",
        "6000000-10000000": "$6M – $10M",
        "10000000-": "Más de $10M",
      },
      submit: "Buscar",
    },
    fractional: {
      eyebrow: "Inversión inteligente",
      title: "Fractional: copropiedad de lujo",
      body: "Fractional es un modelo de copropiedad que te permite ser dueño de una fracción de una propiedad de lujo —desde 1/8 o 1/4— con todos los beneficios de la propiedad completa y una inversión de entrada mucho menor. Ideal para quienes buscan disfrutar y hacer crecer su patrimonio sin el compromiso de una propiedad de tiempo completo.",
      empty: "Aún no hay desarrollos en modalidad fractional disponibles.",
    },
    home: {
      hero: {
        subtitle:
          "Real Estate en las zonas más bellas de México — compra, venta y renta de propiedades",
        locations:
          "Casas y departamentos en Santa Fe, Polanco, Interlomas, Zibatá, Juriquilla, Valle de Bravo, Avándaro, Metepec, Huixquilucan y Malinalco.",
        cta: "Ver propiedades",
      },
      properties: {
        eyebrow: "Portafolio",
        title: "Propiedades de lujo en venta y renta",
        subtitle:
          "Una selección curada de residencias para comprar o rentar en las zonas donde operamos.",
        filterAll: "Todas",
        typeVenta: "Venta",
        typeRenta: "Renta",
        perMonth: "/mes",
        empty: "No hay propiedades que coincidan con estos filtros por el momento.",
        bedroomsChip: (n) => `${n}+ recámaras`,
      },
      about: {
        eyebrow: "Agencia inmobiliaria en México",
        heading: "Un criterio claro para decisiones importantes.",
        paragraph1:
          "En Selveo acompañamos a nuestros clientes en la compra, venta y renta de propiedades residenciales y de lujo, con un enfoque discreto, cercano y basado en la confianza. Cada propiedad que representamos es seleccionada con el mismo criterio con el que nuestros clientes construyen su patrimonio.",
        paragraph2:
          "Operamos en Ciudad de México, Querétaro, Valle de Bravo, Malinalco y el Estado de México, entendiendo que cada zona tiene su propio carácter y que cada cliente merece un servicio a la medida.",
        servicePurchase: "Compra de propiedades",
        serviceSale: "Venta de propiedades",
        serviceRent: "Renta de propiedades",
      },
      zones: {
        eyebrow: "Dónde compramos, vendemos y rentamos",
        title: "Zonas",
        subtitle:
          "Cinco regiones, decenas de colonias y pueblos donde ayudamos a comprar, vender y rentar con conocimiento local.",
        specializeIn: "Nos especializamos en",
      },
      contact: {
        eyebrow: "Contacto",
        heading: "Hablemos de tu próxima propiedad.",
        paragraph:
          "Escríbenos directamente por WhatsApp y con gusto te ayudaremos a comprar, vender o rentar la propiedad ideal para ti.",
        button: "Escríbenos por WhatsApp",
        whatsappMessage: "Hola, me interesa una propiedad de Selveo",
      },
    },
  },
  en: {
    languageName: "English",
    hero: {
      slogan: "Build your legacy.",
      tagline: "Your next investment, one step away.",
      cta: "View developments",
    },
    section: {
      title: "Our Developments",
      subtitle: "Exclusive projects designed to inspire your legacy.",
    },
    filters: {
      all: "All",
    },
    status: {
      preventa: "Pre-sale",
      disponible: "Available",
      ultimas_unidades: "Last units",
    },
    modality: {
      full: "Full Ownership",
      fractional: "Fractional",
      both: "Full Ownership & Fractional",
    },
    card: {
      priceFrom: "From",
      units: (n) => `${n} units`,
      viewDetail: "View development",
    },
    detail: {
      back: "Back to developments",
      priceFrom: "Price from",
      units: "Units",
      unitTypes: "Unit types",
      amenities: "Amenities",
      description: "Description",
      modality: "Modality",
      whatsappCta: "Check availability",
      whatsappHint: "A Selveo advisor will contact you directly.",
      otherIn: (zone) => `Other developments in ${zone}`,
    },
    whatsappMessage: (name) =>
      `Hi, I'm interested in the availability of units at "${name}" by Selveo`,
    empty: "There are no developments in this area yet.",
    notFound: {
      title: "We couldn't find this development",
      body: "It may no longer be available, or the link may be incorrect.",
      cta: "View developments",
    },
    zones: {
      CDMX: "Mexico City",
      "Querétaro": "Querétaro",
      "Valle de Bravo": "Valle de Bravo",
      Malinalco: "Malinalco",
      Edomex: "State of Mexico",
    },
    search: {
      zoneLabel: "Location",
      allZones: "All locations",
      typeLabel: "Type",
      types: { compra: "Buy", inversion: "Investment", fractional: "Fractional" },
      bedroomsLabel: "Bedrooms",
      bedroomsAny: "Any",
      priceLabel: "Price",
      priceAny: "Any price",
      priceBands: {
        "0-3000000": "Up to $3M",
        "3000000-6000000": "$3M – $6M",
        "6000000-10000000": "$6M – $10M",
        "10000000-": "$10M+",
      },
      submit: "Search",
    },
    fractional: {
      eyebrow: "Smart investment",
      title: "Fractional: luxury co-ownership",
      body: "Fractional is a co-ownership model that lets you own a share of a luxury property —from 1/8 or 1/4— with all the benefits of full ownership and a much lower entry investment. Ideal for those who want to enjoy and grow their wealth without the commitment of a full-time property.",
      empty: "There are no fractional developments available yet.",
    },
    home: {
      hero: {
        subtitle:
          "Real Estate in Mexico's most beautiful locations — buy, sell and rent properties",
        locations:
          "Houses and apartments in Santa Fe, Polanco, Interlomas, Zibatá, Juriquilla, Valle de Bravo, Avándaro, Metepec, Huixquilucan and Malinalco.",
        cta: "View properties",
      },
      properties: {
        eyebrow: "Portfolio",
        title: "Luxury properties for sale and rent",
        subtitle:
          "A curated selection of residences to buy or rent in the areas where we operate.",
        filterAll: "All",
        typeVenta: "Sale",
        typeRenta: "Rent",
        perMonth: "/mo",
        empty: "No properties match these filters right now.",
        bedroomsChip: (n) => `${n}+ bedrooms`,
      },
      about: {
        eyebrow: "Real estate agency in Mexico",
        heading: "A clear standard for important decisions.",
        paragraph1:
          "At Selveo we support our clients in buying, selling, and renting residential and luxury properties, with a discreet, close, and trust-based approach. Every property we represent is selected with the same standard our clients use to build their wealth.",
        paragraph2:
          "We operate in Mexico City, Querétaro, Valle de Bravo, Malinalco, and the State of Mexico, understanding that each area has its own character and that every client deserves a tailored service.",
        servicePurchase: "Property purchase",
        serviceSale: "Property sale",
        serviceRent: "Property rental",
      },
      zones: {
        eyebrow: "Where we buy, sell, and rent",
        title: "Locations",
        subtitle:
          "Five regions, dozens of neighborhoods and towns where we help you buy, sell, and rent with local expertise.",
        specializeIn: "We specialize in",
      },
      contact: {
        eyebrow: "Contact",
        heading: "Let's talk about your next property.",
        paragraph:
          "Message us directly on WhatsApp and we'll gladly help you buy, sell, or rent the ideal property for you.",
        button: "Message us on WhatsApp",
        whatsappMessage: "Hi, I'm interested in a property from Selveo",
      },
    },
  },
};

export const LANGUAGES = ["es", "en"];
export const DEFAULT_LANGUAGE = "es";

export const PRICE_BANDS = [
  { value: "0-3000000", min: 0, max: 3000000 },
  { value: "3000000-6000000", min: 3000000, max: 6000000 },
  { value: "6000000-10000000", min: 6000000, max: 10000000 },
  { value: "10000000-", min: 10000000, max: Infinity },
];

export const BEDROOM_OPTIONS = [1, 2, 3, 4];
