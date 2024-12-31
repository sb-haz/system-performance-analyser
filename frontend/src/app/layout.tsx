import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '@/components/Navbar'
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
  title: "System Performance Analyser",
  description: "System Performance Analyser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <div className="p-4 pt-12 pb-24 min-h-screen max-w-7xl mx-auto text-pink-500">
          {children}
        </div>
      </body>
    </html>
  );
}
