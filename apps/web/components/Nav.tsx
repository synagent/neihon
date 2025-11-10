"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" }
];

type NavProps = {
  onJoin: () => void;
};

export default function Nav({ onJoin }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-brand-night/70 backdrop-blur-xl">
      <nav className="container flex items-center justify-between py-4" aria-label="Primary">
        <Link href="/" className="flex items-center gap-3 text-brand-text" onClick={() => setIsOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-navy text-lg font-semibold text-brand-gold">
            N
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-lg">Neihon</span>
            <span className="text-xs uppercase tracking-[0.2em] text-brand-slate">Voice · AI</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6 text-sm text-brand-slate">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-brand-text">
                {item.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onJoin()}
            className="btn-shimmer relative inline-flex items-center rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-night shadow-glow"
          >
            Join Waitlist
          </button>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="space-y-4 border-t border-white/5 bg-brand-night/95 px-6 py-6 text-brand-slate">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-base font-medium text-brand-text/80"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onJoin();
            }}
            className="btn-shimmer inline-flex w-full items-center justify-center rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-night"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </header>
  );
}
