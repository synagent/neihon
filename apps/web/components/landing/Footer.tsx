import Link from "next/link";
import type { Route } from "next";
import Container from "@/components/ui/Container";

const routeLinks: Array<{ label: string; href: Route }> = [
  { label: "Docs", href: "/docs" },
  { label: "Playground", href: "/playground" },
  { label: "Calendar", href: "/calendar" }
];

const externalLinks = [{ label: "API Docs", href: "https://neihon-api.onrender.com/docs" }];

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-xl text-white">Neihon</p>
          <p className="text-sm text-brand-slate">© 2025 Neihon. hello@neihon.com</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-brand-slate">
          {routeLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-brand-gold">
              {link.label}
            </Link>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-brand-gold"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
