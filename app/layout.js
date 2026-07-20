import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "Selveo | Construye tu legado.",
  description:
    "Selveo — bienes raíces residenciales y de lujo en CDMX, Querétaro, Valle de Bravo, Malinalco y Estado de México.",
  icons: {
    icon: "/logo.png?v=2",
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
