import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Taranis Electrical - Professional Electrical Services",
  description: "Professional electrical services across the UK. EV charging, solar PV, battery storage, domestic and commercial electrical work. Licensed, insured, and certified.",
  keywords: "electrical services, electrician, EV charging, solar PV, battery storage, domestic electrical, commercial electrical, EICR, UK",
  authors: [{ name: "Taranis Electrical" }],
  openGraph: {
    title: "Taranis Electrical - Professional Electrical Services",
    description: "Professional electrical services across the UK. EV charging, solar PV, battery storage, domestic and commercial electrical work.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taranis Electrical - Professional Electrical Services",
    description: "Professional electrical services across the UK. EV charging, solar PV, battery storage, domestic and commercial electrical work.",
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
