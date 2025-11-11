"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";
import Container from "@/components/ui/Container";

type HeroProps = {
  onJoin: () => void;
};

export default function LandingHero({ onJoin }: HeroProps) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-brand-night to-[#050505] py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.18),transparent_55%)]" />
      <AnimatedWave />
      <Container className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <motion.span
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-brand-silver"
            initial={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Voice + AI
          </motion.span>
          <motion.h1
            className="font-heading text-4xl text-white md:text-5xl lg:text-6xl"
            initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Your Day, Powered by Voice and AI.
          </motion.h1>
          <motion.p
            className="text-lg text-brand-slate"
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Neihon listens, plans, and helps you flow through every task. Speak naturally, and your AI companion takes
            care of the rest.
          </motion.p>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <Link
              href="/playground"
              className="btn-shimmer inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-night shadow-glow"
            >
              Try Playground
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={onJoin}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-gold hover:text-brand-gold"
            >
              Join Waitlist
            </button>
          </motion.div>
          <motion.div
            className="glass-panel inline-flex items-center gap-3 rounded-3xl border border-white/10 px-4 py-2 text-sm text-brand-slate"
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
              <Mic className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-white">Live voice companion</p>
              <p className="text-xs text-brand-silver">Instant capture · AI summaries · Shared agendas</p>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="relative rounded-[32px] border border-white/10 bg-white/[0.02] p-6 shadow-card"
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-brand-silver">
              Voice Session
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[0.6rem] text-emerald-300">Live</span>
            </div>
            <div className="flex flex-col gap-3">
              {[0.6, 0.9, 0.45, 0.8, 0.5, 0.95].map((height, index) => (
                <motion.span
                  key={index}
                  className="block rounded-full bg-gradient-to-r from-brand-gold/60 to-brand-gold/10"
                  style={{ height: `${height * 40}px` }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.4, 1, 0.4],
                          scaleX: [0.8, 1.05, 0.85]
                        }
                  }
                  transition={{
                    duration: 2.2,
                    delay: index * 0.08,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-brand-slate">
              “Good morning, Mira. I’ve outlined your top three priorities and synced the briefing with your team.”
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function AnimatedWave() {
  const bars = Array.from({ length: 32 });
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-8">
      <div className="flex w-[90%] max-w-4xl justify-between opacity-40">
        {bars.map((_, index) => (
          <motion.span
            key={index}
            className="block w-1 rounded-full bg-gradient-to-b from-brand-gold to-transparent"
            initial={{ height: 0 }}
            animate={{
              height: [`${Math.random() * 100 + 20}px`, `${Math.random() * 120 + 30}px`, `${Math.random() * 80 + 10}px`]
            }}
            transition={{
              duration: 2.4,
              delay: index * 0.05,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        ))}
      </div>
    </div>
  );
}
