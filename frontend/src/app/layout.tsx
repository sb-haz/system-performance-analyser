import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand, Nunito, Comfortaa, Varela_Round } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import Navbar from '@/components/Navbar'
import "./globals.css";

// fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});
const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-varela-round",
});

// metadata
export const metadata: Metadata = {
  title: "System Bench",
  description: "System Performance Analyser",
  icons: {
    icon: '/favicon.png'
  }
};

// root
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      {/* <body className={`${quicksand.variable} ${geistMono.variable} font-quicksand antialiased`}> */}
      {/* <body className={`${nunito.variable} ${geistMono.variable} font-nunito antialiased`}> */}
      {/* <body className={`${comfortaa.variable} ${geistMono.variable} font-comfortaa antialiased`}> */}
      <body className={`${varelaRound.variable} ${geistMono.variable} font-varelaround antialiased`}>

        <Navbar />
        <div className="p-4 pt-12 pb-24 min-h-screen max-w-7xl mx-auto text-pink-500">
          {children}
        </div>
        <Analytics /> {/* vercel analytics */}
      </body>
    </html>
  );
}