import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Neihon — Live API, Docs & Playground",
  description: "Live health, human-readable documentation, and a safe API playground.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Neihon",
    description: "Live health, documentation, and an API playground.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
