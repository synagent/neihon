"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  PlayCircle,
  Shield,
  Gauge,
  Sparkles,
  Cpu,
  Workflow,
  GitBranch,
  CheckCircle2,
} from "lucide-react";
import React from "react";

export default function LandingClient() {
  return (
    <main className="min-h-dvh bg-[#0A1220] text-zinc-200 antialiased">
      {/* Background accents */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(800px 400px at 10% -10%, rgba(99,102,241,.20), transparent 60%), radial-gradient(700px 350px at 90% 0%, rgba(16,185,129,.12), transparent 60%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.85) 40%, rgba(0,0,0,.7))",
        }}
      />

      <Header />

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16 sm:pt-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800/70 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Empowering Humans with Intelligent AI Systems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-balance text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl lg:text-6xl"
          >
            Ship faster with live service health, human-readable docs, and a safe
            API playground.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-2xl text-pretty text-lg text-zinc-300/90"
          >
            Neihon unifies status, documentation, and testing into a single
            developer-first experience. Learn, test, and integrate in minutes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black shadow hover:brightness-95 active:brightness-90"
            >
              <BookOpen className="h-4 w-4" />
              View Docs
            </a>
            <a
              href="/playground"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/70 bg-zinc-900/40 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:border-zinc-600"
            >
              <PlayCircle className="h-4 w-4" />
              Open Playground
            </a>
            <a
              href="/new-task"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-300 hover:text-amber-200"
            >
              Create Task <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            <Stat label="Uptime" value="99.98%" />
            <Stat label="p95 Latency" value="394 ms" />
            <Stat label="Docs Coverage" value="100%" />
            <Stat label="Sandbox Requests" value="1.2M+" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative border-t border-zinc-800/60">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <div className="grid gap-5 sm:grid-cols-3">
            <Feature
              icon={<Shield className="h-5 w-5 text-amber-300" />}
              title="Safe by design"
              text="Isolated API playground with rate-limits, key redaction, and guardrails."
            />
            <Feature
              icon={<Gauge className="h-5 w-5 text-amber-300" />}
              title="Live service health"
              text="Latency, uptime, and error signals visible at a glance."
            />
            <Feature
              icon={<BookOpen className="h-5 w-5 text-amber-300" />}
              title="Readable docs"
              text="Human-first guides, quick starts, and copy-paste code."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-t border-zinc-800/60">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-50">
                From idea to integration in minutes
              </h2>
              <p className="mt-3 max-w-xl text-zinc-300">
                Neihon removes friction across discovery, testing, and launch.
                Experiment safely, then copy working snippets into your stack.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <Check />
                  Explore live endpoints with real responses in the sandbox.
                </li>
                <li className="flex items-start gap-2">
                  <Check />
                  Docs stay in sync with services—no stale examples.
                </li>
                <li className="flex items-start gap-2">
                  <Check />
                  Copy production-ready code samples for Node, Python, and more.
                </li>
              </ul>

              <div className="mt-6 flex gap-3">
                <a
                  href="/docs/get-started"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black shadow hover:brightness-95"
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/calendar"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/70 bg-zinc-900/50 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:border-zinc-600"
                >
                  Book a demo
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MiniCard
                icon={<Cpu className="h-5 w-5 text-amber-300" />}
                title="Observability"
                text="Status, latency, and errors in one dashboard."
              />
              <MiniCard
                icon={<Workflow className="h-5 w-5 text-amber-300" />}
                title="Playground"
                text="Try requests safely with masked keys."
              />
              <MiniCard
                icon={<GitBranch className="h-5 w-5 text-amber-300" />}
                title="Snippets"
                text="Copy integrations for common stacks."
              />
              <MiniCard
                icon={<Shield className="h-5 w-5 text-amber-300" />}
                title="Policies"
                text="Built-in rate limiting and abuse protection."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-zinc-800/60">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/40 p-6 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl font-semibold text-zinc-50">
                  Ready to explore Neihon?
                </h3>
                <p className="mt-1 text-zinc-300">
                  Open the playground or start with the quick-start docs.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/playground"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black shadow hover:brightness-95"
                >
                  <PlayCircle className="h-4 w-4" />
                  Open Playground
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/70 bg-zinc-900/50 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:border-zinc-600"
                >
                  <BookOpen className="h-4 w-4" />
                  View Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---------- small components ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800/60 backdrop-blur supports-[backdrop-filter]:bg-[#0A1220]/70">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-amber-400 to-yellow-300 shadow" />
          <span className="text-sm font-semibold tracking-wide text-amber-300">
            NEIHON
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-300">
          <a href="/docs" className="hover:text-amber-300">Docs</a>
          <a href="/playground" className="hover:text-amber-300">Playground</a>
          <a href="/calendar" className="hover:text-amber-300">Calendar</a>
          <a href="/api" className="hover:text-amber-300">API</a>
        </nav>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-lg font-semibold text-zinc-100">{value}</div>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-5">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{text}</p>
    </div>
  );
}

function MiniCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-semibold text-zinc-100">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{text}</p>
    </div>
  );
}

function Check() {
  return <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-300" />;
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800/60">
      <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-zinc-400">
        © {new Date().getFullYear()} Neihon. All rights reserved.
      </div>
    </footer>
  );
}
