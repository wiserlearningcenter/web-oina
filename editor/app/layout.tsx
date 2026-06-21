import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Editor de contenidos — Nueva Acrópolis",
  description: "Sistema de contenidos para editar Acrópolis y Civis",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
