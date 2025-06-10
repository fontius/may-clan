// File: app/layout.tsx

import Script from 'next/script';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Header from "@/components/Header"; // Import the Header component

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "May-Clan | Canada-Nigeria Shipping & Logistics",
  description: "May-Clan offers comprehensive vehicle shipping, freight forwarding, and customs clearance services between Canada and Nigeria",
  keywords: ["Canada to Nigeria shipping", "vehicle shipping", "freight forwarding", "customs clearance", "logistics", "international shipping"],
  openGraph: {
    title: "May-Clan | Canada-Nigeria Shipping & Logistics",
    description: "Reliable vehicle shipping and freight forwarding services between Canada and Nigeria",
    images: [
      {
        url: '/og/mayclan-og.webp',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "May-Clan | Canada-Nigeria Shipping & Logistics",
    description: "Reliable vehicle shipping and freight forwarding services between Canada and Nigeria",
    images: ['/og/may-clan-og-large.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`} 
      >
        <ActiveSectionContextProvider>
          <Header />
          {children}
        </ActiveSectionContextProvider>

        <Script
  strategy="afterInteractive"
  src="https://product-gallery.cloudinary.com/all.js"
  type="text/javascript"
/>
      </body>
    </html>
  );
}
