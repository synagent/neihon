// apps/web/app/landing/page.tsx
import { ArrowRight, BookOpen, PlayCircle, Shield, Gauge, Sparkles } from "lucide-react";

export const metadata = {
  title: "Neihon — Landing",
  description:
    "Neihon helps teams ship faster with live service health, human-readable docs, and a safe API playground.",
};

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-[#0b1220] text-zinc-200">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 10%, rgba(99,102,241,.20), transparent 60%), radial-gradient(600px 300px at 80% 20%, rgba(16,185,129,.12), transparent 60%)",
          maskImage:
            "radial-gradient(75% 55% at 50% 0%, rgba(0,0,0,.9), transparent 70%)",
        }}
      />

      {/* Nav (simple) */}
      <header className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-amber-400 to-yellow-300 shadow" />
            <span className="text-sm font-semibold tracking-wide text-amber-300">
              NEIHON
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-300">
            <a href="/docs" className="hover:text-amber-300">Docs</a>
            <a href="/playground" className="hover:text-amber-300">Playground</a>
            <a href="/calendar" className="hover:text-amber-300">Calendar</a>
            <a href="/api" className="hover:text-amber-300">API</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-5xl px-6 pt-10 pb-12 sm:pt-16 sm:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Empowering Humans with Intelligent AI Systems</span>
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl">
            Ship faster with live service health, human-readable docs, and a safe API playground.
          </h1>

          <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-300/90">
            Neihon unifies status, documentation, and testing into a single developer-first
            experience. Learn, test, and integrate in minutes.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
              Create Task
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Quick features */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Feature
              icon={<Shield className="h-4 w-4 text-amber-300" />}
              title="Safe by design"
              text="Isolated API playground with rate-limits and guardrails."
            />
            <Feature
              icon={<Gauge className="h-4 w-4 text-amber-300" />}
              title="Live service health"
              text="Latency, uptime, and errors surfaced in one glance."
            />
            <Feature
              icon={<BookOpen className="h-4 w-4 text-amber-300" />}
              title="Readable docs"
              text="Human-first guides, code snippets, and quick starts."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-zinc-400">
          © {new Date().getFullYear()} Neihon. All rights reserved.
        </div>
      </footer>
    </main>
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
    <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{text}</p>
    </div>
  );
}
