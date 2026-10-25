export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const WHATSAPP_NUMBER = "5215569647334";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola, me interesa una propiedad de Selveo";

export function buildWhatsAppLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Fuente única de verdad de las zonas donde opera Selveo. Todo el sitio
// (público y panel de admin) deriva de aquí: para agregar una zona nueva,
// basta con añadir un objeto a este arreglo.
export const ZONES = [
  {
    key: "CDMX",
    name: "Ciudad de México",
    country: "México",
    currency: "MXN",
    description:
      "Vida urbana, cultura y las zonas residenciales más codiciadas de la capital.",
    specialties: ["Santa Fe", "Interlomas", "Polanco"],
    image:
      "https://images.unsplash.com/photo-1760076000027-b4391b83850b?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Querétaro",
    name: "Querétaro",
    country: "México",
    currency: "MXN",
    description:
      "Crecimiento, tranquilidad y arquitectura contemporánea en uno de los mercados más sólidos del país.",
    specialties: ["Zibatá", "Juriquilla"],
    image:
      "https://images.unsplash.com/photo-1679157381710-42b20b9eb032?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Valle de Bravo",
    name: "Valle de Bravo",
    country: "México",
    currency: "MXN",
    description:
      "Casas de descanso frente al lago y el bosque, a la altura de quienes buscan escapar con estilo.",
    specialties: ["Avándaro", "Cerro Gordo", "Acatitlán"],
    image:
      "https://images.unsplash.com/photo-1783411887228-573b5a8fa503?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Malinalco",
    name: "Malinalco",
    country: "México",
    currency: "MXN",
    description:
      "Pueblo mágico, arquitectura tradicional y paz absoluta a menos de dos horas de la ciudad.",
    specialties: ["Barrio de Santa María", "Club de Golf Malinalco"],
    image:
      "https://images.unsplash.com/photo-1613754627343-622ea791af6e?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Edomex",
    name: "Estado de México",
    country: "México",
    currency: "MXN",
    description:
      "Zonas residenciales consolidadas, con excelente conectividad y plusvalía.",
    specialties: [
      "Metepec",
      "Naucalpan de Juárez",
      "Atizapán de Zaragoza (Zona Esmeralda)",
      "Huixquilucan",
    ],
    image:
      "https://images.unsplash.com/photo-1760415317943-e528cc71e54d?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Miami",
    name: "Miami",
    country: "Estados Unidos",
    currency: "USD",
    description:
      "Real estate de lujo frente al mar, con torres residenciales y comunidades exclusivas en el sur de Florida.",
    specialties: ["Brickell", "Coral Gables", "Key Biscayne"],
    image:
      "https://images.unsplash.com/photo-1748380606470-168becfa7da4?w=900&h=1100&fit=crop&q=80",
  },
];

// Solo las claves, para validación en las API routes y valores de <select>.
export const ZONE_KEYS = ZONES.map((z) => z.key);

// Países en el orden en que aparecen, para agrupar el selector del panel.
export const COUNTRIES = [...new Set(ZONES.map((z) => z.country))];

// Zonas agrupadas por país: { "México": [...], "Estados Unidos": [...] }
export const ZONES_BY_COUNTRY = COUNTRIES.map((country) => ({
  country,
  zones: ZONES.filter((z) => z.country === country),
}));

// Moneda de una zona (MXN para las zonas de México, USD para Miami). Si la
// zona no existe o no trae moneda definida, cae en MXN por seguridad.
export function getZoneCurrency(zoneKey) {
  return ZONES.find((z) => z.key === zoneKey)?.currency || "MXN";
}

export function formatPrice(price, currency = "MXN") {
  const formatted = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(price);
  return `${formatted} ${currency}`;
}
