import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arboriia — Mockups",
  description: "Maquettes interactives de la plateforme Arboriia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-900">
        <GlobalNav />
        <div className="pt-10">{children}</div>
      </body>
    </html>
  );
}
