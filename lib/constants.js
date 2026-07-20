export const WHATSAPP_NUMBER = "5215569647334";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola, me interesa una propiedad de Selveo";

export function buildWhatsAppLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const ZONES = [
  {
    key: "CDMX",
    name: "Ciudad de México",
    description:
      "Vida urbana, cultura y las colonias más codiciadas: Polanco, Roma, Condesa y más.",
    image: "https://picsum.photos/seed/selveo-zona-cdmx/900/1100",
  },
  {
    key: "Querétaro",
    name: "Querétaro",
    description:
      "Crecimiento, tranquilidad y arquitectura contemporánea en uno de los mercados más sólidos del país.",
    image: "https://picsum.photos/seed/selveo-zona-queretaro/900/1100",
  },
  {
    key: "Valle de Bravo",
    name: "Valle de Bravo",
    description:
      "Casas de descanso frente al lago y el bosque, a la altura de quienes buscan escapar con estilo.",
    image: "https://picsum.photos/seed/selveo-zona-valle/900/1100",
  },
  {
    key: "Malinalco",
    name: "Malinalco",
    description:
      "Pueblo mágico, arquitectura tradicional y paz absoluta a menos de dos horas de la ciudad.",
    image: "https://picsum.photos/seed/selveo-zona-malinalco/900/1100",
  },
  {
    key: "Edomex",
    name: "Estado de México",
    description:
      "Zonas residenciales consolidadas como Interlomas y Santa Fe, con excelente conectividad.",
    image: "https://picsum.photos/seed/selveo-zona-edomex/900/1100",
  },
];

export function formatPrice(price, currency = "MXN") {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
