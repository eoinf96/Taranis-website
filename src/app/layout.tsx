import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Taranis Electrical - Electrician in Hemel Hempstead",
  description: "NAPIT-approved electrician based in Hemel Hempstead. Domestic and commercial installations, rewires, fuse board upgrades, lighting, sockets, and maintenance contracts. Over 10 years experience.",
  keywords: "electrician, Hemel Hempstead, electrical services, domestic electrician, commercial electrician, rewire, fuse board, consumer unit, NAPIT, Hertfordshire",
  authors: [{ name: "Taranis Electrical" }],
  openGraph: {
    title: "Taranis Electrical - Electrician in Hemel Hempstead",
    description: "NAPIT-approved electrician based in Hemel Hempstead. Domestic and commercial installations, rewires, fuse board upgrades and more.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taranis Electrical - Electrician in Hemel Hempstead",
    description: "NAPIT-approved electrician based in Hemel Hempstead. Domestic and commercial installations, rewires, fuse board upgrades and more.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
