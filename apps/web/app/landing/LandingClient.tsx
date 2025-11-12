"use client";

import React from "react";
import { CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, PlayCircle, Shield, Gauge,
  Sparkles, Cpu, Workflow, GitBranch
} from "lucide-react";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.5, ease: "easeOut", delay: d },
});

export default function LandingClient() {
  return (
    <main className="min-h-dvh bg-bg text-zinc-200">
      {/* gradient background wash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 15% -15%, rgba(99,102,241,.20), transparent 60%), radial-gradient(900px 500px at 85% -10%, rgba(16,185,129,.12), transparent 60%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.95) 35%, rgba(0,0,0,.88))",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.95) 35%, rgba(0,0,0,.88))",
        }}
      />

      <Header />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <motion.div {...fade()}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Empowering Humans with Intelligent AI Systems
          </span>
        </motion.div>

        <motion.h1
          {...fade(.05)}
          className="mt-6 text-balance text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl lg:text-6xl"
        >
          Ship faster with <span className="text-accent">live health</span>, readable docs, and a safe API playground.
        </motion.h1>

        <motion.p {...fade(.1)} className="mt-4 max-w-2xl text-lg text-zinc-300/90">
          Learn, test, and integrate in minutes—without switching tools.
        </motion.p>

        <motion.div {...fade(.15)} className="mt-8 flex flex-wrap items-center gap-3">
          <a href="/docs" className="btn-primary">
            <BookOpen className="h-4 w-4" /> View Docs
          </a>
          <a href="/playground" className="btn-secondary">
            <PlayCircle className="h-4 w-4" /> Open Playground
          </a>
          <a href="/new-task" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-amber-200">
            Create Task <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div {...fade(.2)} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Uptime" value="99.98%" />
          <Stat label="p95 Latency" value="394 ms" />
          <Stat label="Docs Coverage" value="100%" />
          <Stat label="Sandbox Requests" value="1.2M+" />
        </motion.div>
      </section>

      <Divider />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-14 sm:py-16">
        <motion.h2 {...fade()} className="section-title">Built for modern AI teams</motion.h2>
        <motion.p {...fade(.05)} className="section-sub">
          One developer-first surface for health, docs, and a safe playground.
        </motion.p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon={<Shield className="h-5 w-5 text-accent" />} title="Safe by design" text="Isolated playground with rate limits, redaction, and guardrails." />
          <Feature icon={<Gauge className="h-5 w-5 text-accent" />}  title="Live service health" text="Latency, uptime, and error signals surfaced instantly." />
          <Feature icon={<BookOpen className="h-5 w-5 text-accent" />} title="Readable docs" text="Human-first guides and copy-paste snippets that stay in sync." />
          <Feature icon={<Cpu className="h-5 w-5 text-accent" />}     title="Observability" text="One dashboard for endpoints, throughput, and errors." />
          <Feature icon={<Workflow className="h-5 w-5 text-accent" />} title="Playground" text="Try real requests safely without leaking secrets." />
          <Feature icon={<GitBranch className="h-5 w-5 text-accent" />} title="Snippets" text="Production examples for Node, Python, and more." />
        </div>
      </section>

      <Divider />

      <PricingSection />

      <Divider />

      <TestimonialsSection />
      
      <Divider />

      <CTA />

      <Footer />
    </main>
  );
}

function Header() {
  // floating glass navbar with subtle border + blur
  return (
    <header className="sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.06] backdrop-blur supports-[backdrop-filter]:bg-white/[.06] px-4 py-2">
          <a href="/" className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-tr from-amber-400 to-yellow-300 shadow" />
            <span className="text-sm font-semibold tracking-wide text-accent">NEIHON</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-300">
            <a href="/docs" className="hover:text-accent">Docs</a>
            <a href="/playground" className="hover:text-accent">Playground</a>
            <a href="/calendar" className="hover:text-accent">Calendar</a>
            <a href="/api" className="hover:text-accent">API</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.05] p-4 backdrop-blur">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-lg font-semibold text-zinc-100">{value}</div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div {...fade(.05)} className="rounded-2xl border border-white/10 bg-white/[.05] p-5 backdrop-blur">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{text}</p>
    </motion.div>
  );
}

function Divider() {
  return <div className="border-t border-white/10" />;
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-14 sm:py-16">
      <div className="rounded-3xl border border-white/10 bg-white/[.07] p-6 sm:p-10 backdrop-blur">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-zinc-50">Ready to explore Neihon?</h3>
            <p className="mt-1 text-zinc-300">Open the Playground or start with the quick-start docs.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/playground" className="btn-primary"><PlayCircle className="h-4 w-4" /> Open Playground</a>
            <a href="/docs" className="btn-secondary"><BookOpen className="h-4 w-4" /> View Docs</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 text-xs text-zinc-400">
        © {new Date().getFullYear()} Neihon. All rights reserved.
      </div>
    </footer>
  );
}

/* ============================= */
/* ===== Added New Sections ==== */
/* ============================= */

function PricingSection() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      cadence: "/mo",
      blurb: "For evaluation and quick demos.",
      cta: { label: "Get Started", href: "/signup" },
      featured: false,
      perks: [
        "API Playground (sandboxed)",
        "Status dashboard",
        "100 requests/day",
        "Community support",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      cadence: "/mo",
      blurb: "For solo builders and small teams.",
      cta: { label: "Start Pro", href: "/signup" },
      featured: true,
      perks: [
        "5k requests/day",
        "Rate-limit controls",
        "Redaction & guardrails",
        "Email support",
      ],
    },
    {
      name: "Business",
      price: "$99",
      cadence: "/mo",
      blurb: "For production workloads and SLAs.",
      cta: { label: "Talk to Sales", href: "/contact" },
      featured: false,
      perks: [
        "50k requests/day",
        "SAML/SSO & audit logs",
        "Priority support",
        "Custom limits & regions",
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-14 sm:py-16">
      <h2 className="section-title">Simple, predictable pricing</h2>
      <p className="section-sub">
        Start free. Upgrade when you’re ready to scale.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={[
              "rounded-2xl border p-6 backdrop-blur",
              t.featured
                ? "border-white/20 bg-white/[.10] shadow-[0_0_0_1px_rgba(255,255,255,.06)]"
                : "border-white/10 bg-white/[.06]",
            ].join(" ")}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold text-zinc-100">{t.name}</h3>
              {t.featured && (
                <span className="rounded-full border border-amber-300/40 bg-amber-300/20 px-2 py-0.5 text-xs font-medium text-amber-200">
                  Popular
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-zinc-400">{t.blurb}</p>

            <div className="mt-5 flex items-end gap-1">
              <span className="text-3xl font-semibold text-zinc-50">{t.price}</span>
              <span className="text-sm text-zinc-400">{t.cadence}</span>
            </div>

            <ul className="mt-5 space-y-2 text-sm">
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <a href={t.cta.href} className={`mt-6 inline-flex ${t.featured ? "btn-primary" : "btn-secondary"}`}>
              {t.cta.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const items = [
    {
      name: "Adriana M.",
      role: "Head of Platform",
      quote:
        "Neihon gave us a single place to see health, read docs, and safely test calls. Onboarding time dropped from days to hours.",
    },
    {
      name: "Luis R.",
      role: "Senior Engineer",
      quote:
        "Readable docs + real playground is the combo we needed. The guardrails let juniors learn without risking prod data.",
    },
    {
      name: "Karla P.",
      role: "CTO",
      quote:
        "The best developer experience we’ve adopted this year. Our team ships faster and with fewer incidents.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-14 sm:py-16">
      <h2 className="section-title">Loved by fast-moving teams</h2>
      <p className="section-sub">What customers say about Neihon.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[.06] p-6 backdrop-blur"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-accent" />
              <Star className="h-4 w-4 text-accent" />
              <Star className="h-4 w-4 text-accent" />
              <Star className="h-4 w-4 text-accent" />
              <Star className="h-4 w-4 text-accent" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              “{t.quote}”
            </p>
            <div className="mt-4 text-sm font-medium text-zinc-100">
              {t.name}
            </div>
            <div className="text-xs text-zinc-400">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
