import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ana Laura - 15 Anos | Festa de Debutante",
  description: "Celebre os 15 anos da Ana Laura! Confirme sua presença, veja a lista de presentes e deixe seu recado especial.",
  keywords: ["Ana Laura", "15 anos", "debutante", "festa", "aniversário"],
  authors: [{ name: "Ana Laura 15 Anos" }],
  openGraph: {
    title: "Ana Laura - 15 Anos",
    description: "Celebre os 15 anos da Ana Laura! Confirme sua presença na festa.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
