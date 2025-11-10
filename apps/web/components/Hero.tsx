"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mic, PlayCircle } from "lucide-react";
import { useState } from "react";
import Container from "@/components/ui/Container";

type HeroProps = {
  onJoin: () => void;
};

export default function Hero({ onJoin }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const [recording, setRecording] = useState<"idle" | "recording" | "done">("idle");
  const [recordMessage, setRecordMessage] = useState<string | null>(null);

  async function handleRecordDemo() {
    try {
      setRecording("recording");
      setRecordMessage(null);
      const res = await fetch("/api/voice-demo", { method: "POST" });
      const data = await res.json();
      setRecording("done");
      setRecordMessage(data?.transcript ?? "Your note is ready.");
      setTimeout(() => setRecording("idle"), 2000);
    } catch {
      setRecording("idle");
      setRecordMessage("Demo unavailable. Please try again.");
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-night to-[#050505]" id="top">
      <Container className="py-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-brand-silver"
              initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PlayCircle className="h-4 w-4 text-brand-gold" />
              Voice-first productivity
            </motion.span>
            <motion.h1
              className="font-heading text-4xl text-white md:text-5xl lg:text-6xl"
              initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
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
              Neihon listens, plans, and keeps you focused on what matters. Capture thoughts aloud, spin them into
              clear agendas, and move through your day with confidence.
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <a
                href="#contact"
                className="btn-shimmer inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-night shadow-glow"
              >
                Try the Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={onJoin}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-gold hover:text-brand-gold"
              >
                Join Waitlist
              </button>
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/[0.02] p-4 text-sm text-brand-slate"
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">Voice preview</span>
                <button
                  type="button"
                  onClick={handleRecordDemo}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-silver transition hover:border-brand-gold hover:text-brand-gold"
                >
                  <Mic className={cnRecordingIcon(recording)} />
                  {recording === "recording" ? "Listening..." : "Record"}
                </button>
              </div>
              <p className="text-sm text-brand-slate">{recordMessage ?? "Tap record to preview Neihon’s voice model."}</p>
            </motion.div>
          </div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative glass-panel overflow-hidden rounded-[32px] border border-white/10 p-6">
              <div className="absolute inset-0 -z-10 bg-grid-light bg-grid-size opacity-40" />
              <Image
                src="/placeholder/waveform.svg"
                alt="Voice waveform"
                width={320}
                height={200}
                className="h-auto w-full animate-pulse"
                priority
              />
              <div className="mt-4 space-y-1 text-sm text-brand-slate">
                <p className="font-heading text-white">Neihon Daily Companion</p>
                <p>“I’ve reserved time for your deep work block and shared the summary with the team.”</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function cnRecordingIcon(state: "idle" | "recording" | "done") {
  const base = "h-4 w-4 transition";
  if (state === "recording") return `${base} text-brand-gold animate-pulse`;
  if (state === "done") return `${base} text-emerald-300`;
  return `${base} text-brand-silver`;
}
