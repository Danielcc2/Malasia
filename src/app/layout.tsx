import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malaysia Travel Guide - Tu Agente de Viaje",
  description:
    "Guia completa de viaje a Malasia: clima, ciudades, rutas, conversor de moneda y mas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
