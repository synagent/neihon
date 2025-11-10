import Link from "next/link";
import type { Route } from "next";
import { Instagram, Linkedin, Mail } from "lucide-react";
import Container from "@/components/ui/Container";

const footerRoutes: Array<{ label: string; href: Route }> = [
  { label: "Home", href: "/" },
  { label: "Privacy", href: "/privacy" }
];

const footerAnchors = [
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" }
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/company/neihon", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com/neihon", icon: Instagram },
  { label: "Email", href: "mailto:hello@neihon.com", icon: Mail }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-xl text-white">Neihon</p>
          <p className="text-sm text-brand-slate">© {new Date().getFullYear()} Neihon AI · hello@neihon.com</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-brand-slate">
          {footerRoutes.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-brand-gold">
              {link.label}
            </Link>
          ))}
          {footerAnchors.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-brand-gold">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex gap-3 text-brand-slate">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="rounded-full border border-white/10 p-2 transition hover:border-brand-gold hover:text-brand-gold"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
