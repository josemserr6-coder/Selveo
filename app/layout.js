import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";

const heading = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const SITE_NAME = "Selveo";
const DEFAULT_TITLE =
  "Selveo | Propiedades de lujo en CDMX, Querétaro, Valle de Bravo y más";
const DEFAULT_DESCRIPTION =
  "Selveo — bienes raíces residenciales y de lujo. Casas en venta y en renta en Santa Fe, Polanco, Interlomas, Zibatá, Juriquilla, Valle de Bravo, Avándaro, Metepec, Huixquilucan y Malinalco.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Selveo",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "propiedades de lujo",
    "casas en venta",
    "casas en renta",
    "bienes raíces México",
    "inmobiliaria de lujo",
    "Santa Fe",
    "Polanco",
    "Interlomas",
    "Zibatá",
    "Juriquilla",
    "Querétaro",
    "Valle de Bravo",
    "Avándaro",
    "Metepec",
    "Huixquilucan",
    "Malinalco",
  ],
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Selveo — Construye tu legado.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${heading.variable} ${body.variable}`}>
      <body className="font-sans antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
