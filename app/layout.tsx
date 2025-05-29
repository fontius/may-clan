// File: app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Header from "@/components/Header"; // Import the Header component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GREYMATTER",
  description: "Fire and Security service provider",
  keywords: ["fire safety", "security systems", "alarm systems", "cctv", "access control", "fire protection"],
  openGraph: {
    title: "GREYMATTER - Fire & Security Solutions",
    description: "Professional fire safety and security system services",
    images: [
      {
        url: '/og/home-default.png',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "GREYMATTER - Fire & Security Solutions",
    description: "Professional fire safety and security system services",
    images: ['/og/home-default.png'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // UPDATED PADDING
      >
        <ActiveSectionContextProvider>
          <Header />
          {children}
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
