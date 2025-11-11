// apps/web/app/landing/page.tsx
import type { Metadata } from "next";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "Neihon — AI Services Playground",
  description:
    "Ship faster with live service health, human-readable docs, and a safe API playground.",
};

export default function Page() {
  return <LandingClient />;
}
