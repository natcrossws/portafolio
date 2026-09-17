import type { Metadata } from "next";
import { Bodoni_Moda, Caveat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nataly Melo — Software Engineer → Creative Technologist",
  description:
    "Portafolio de Nataly Melo: ingeniera de software que hace arte con código.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${bodoni.variable} ${caveat.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
