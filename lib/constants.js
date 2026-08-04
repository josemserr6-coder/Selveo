export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

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
    image:
      "https://images.unsplash.com/photo-1760076000027-b4391b83850b?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Querétaro",
    name: "Querétaro",
    description:
      "Crecimiento, tranquilidad y arquitectura contemporánea en uno de los mercados más sólidos del país.",
    specialties: ["Zibatá", "Juriquilla"],
    image:
      "https://images.unsplash.com/photo-1679157381710-42b20b9eb032?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Valle de Bravo",
    name: "Valle de Bravo",
    description:
      "Casas de descanso frente al lago y el bosque, a la altura de quienes buscan escapar con estilo.",
    specialties: ["Avándaro", "Cerro Gordo", "Acatitlán"],
    image:
      "https://images.unsplash.com/photo-1783411887228-573b5a8fa503?w=900&h=1100&fit=crop&q=80",
  },
  {
    key: "Malinalco",
    name: "Malinalco",
    description:
      "Pueblo mágico, arquitectura tradicional y paz absoluta a menos de dos horas de la ciudad.",
    specialties: ["Barrio de Santa María", "Club de Golf Malinalco"],
    image:
      "https://images.unsplash.com/photo-1613754627343-622ea791af6e?w=900&h=1100&fit=crop&q=80",
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
    image:
      "https://images.unsplash.com/photo-1760415317943-e528cc71e54d?w=900&h=1100&fit=crop&q=80",
  },
];

export function formatPrice(price, currency = "MXN") {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
