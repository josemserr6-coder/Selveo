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
      "Vida urbana, cultura y las zonas residenciales más codiciadas de la capital.",
    specialties: ["Santa Fe", "Interlomas", "Polanco"],
    image: "https://picsum.photos/seed/selveo-zona-cdmx/900/1100",
  },
  {
    key: "Querétaro",
    name: "Querétaro",
    description:
      "Crecimiento, tranquilidad y arquitectura contemporánea en uno de los mercados más sólidos del país.",
    specialties: ["Zibatá", "Juriquilla"],
    image:
      "https://images.unsplash.com/photo-1777556597830-368613d1d26d?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Valle de Bravo",
    name: "Valle de Bravo",
    description:
      "Casas de descanso frente al lago y el bosque, a la altura de quienes buscan escapar con estilo.",
    specialties: ["Avándaro", "Cerro Gordo", "Acatitlán"],
    image: "https://picsum.photos/seed/selveo-zona-valle/900/1100",
  },
  {
    key: "Malinalco",
    name: "Malinalco",
    description:
      "Pueblo mágico, arquitectura tradicional y paz absoluta a menos de dos horas de la ciudad.",
    specialties: ["Barrio de Santa María", "Club de Golf Malinalco"],
    image:
      "https://images.unsplash.com/photo-1695596254299-c541eee4eef7?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Edomex",
    name: "Estado de México",
    description:
      "Zonas residenciales consolidadas, con excelente conectividad y plusvalía.",
    specialties: [
      "Metepec",
      "Naucalpan de Juárez",
      "Atizapán de Zaragoza (Zona Esmeralda)",
      "Huixquilucan",
    ],
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
