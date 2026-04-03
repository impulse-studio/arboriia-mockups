import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="fr" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F7F7F7] text-[#171717]">
        <GlobalNav />
        <div className="pt-10">{children}</div>
      </body>
    </html>
  );
}
