import type { Metadata } from "next";

const siteUrl = "https://neihon.com";
const siteName = "Neihon";
const description = "Neihon listens, plans, and keeps you focused on what matters.";

export const seoMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Neihon — Voice-AI Daily Companion",
    template: "%s · Neihon"
  },
  description,
  applicationName: siteName,
  themeColor: "#0A0A0A",
  openGraph: {
    type: "website",
    siteName,
    title: "Neihon — Voice-AI Daily Companion",
    description,
    url: siteUrl,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Neihon interface preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Neihon — Voice-AI Daily Companion",
    description,
    site: "@neihon",
    creator: "@neihon"
  },
  alternates: {
    canonical: siteUrl
  }
};
