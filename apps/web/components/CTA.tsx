"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Container from "@/components/ui/Container";

export type WaitlistPayload = {
  name: string;
  email: string;
  useCase: string;
};

type CTAProps = {
  onSubmit: (payload: WaitlistPayload) => Promise<{ ok: boolean; message?: string }>;
};

export default function CTA({ onSubmit }: CTAProps) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<WaitlistPayload>({ name: "", email: "", useCase: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage(null);
    const result = await onSubmit(form);
    if (result.ok) {
      setStatus("success");
      setMessage("Thanks for joining! We just logged your interest.");
      setForm({ name: "", email: "", useCase: "" });
    } else {
      setStatus("error");
      setMessage(result.message ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="py-20" id="contact">
      <Container>
        <motion.div
          className="glass-panel rounded-[32px] border border-white/10 px-6 py-10 md:px-12"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Final call</p>
              <h2 className="font-heading text-3xl text-white md:text-4xl">
                “Neihon isn’t just an assistant — it’s your daily companion.”
              </h2>
              <p className="text-sm text-brand-slate max-w-xl">
                Share how you would use Neihon and we’ll reach out with early access moments, product drops, and private
                demos.
              </p>
              <a
                href="#contact"
                className="btn-shimmer inline-flex items-center rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-night shadow-glow"
              >
                Experience the Future
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-[0.3em] text-brand-silver">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-brand-gold"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-brand-silver">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-brand-gold"
                  placeholder="you@studio.com"
                />
              </div>
              <div>
                <label htmlFor="useCase" className="text-xs uppercase tracking-[0.3em] text-brand-silver">
                  Use case
                </label>
                <textarea
                  id="useCase"
                  name="useCase"
                  rows={3}
                  required
                  value={form.useCase}
                  onChange={(event) => setForm((prev) => ({ ...prev, useCase: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-brand-gold"
                  placeholder="Daily briefings, board prep, coaching..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-shimmer inline-flex w-full items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-night shadow-glow disabled:opacity-70"
              >
                {status === "submitting" ? "Sending..." : "Join Waitlist"}
              </button>
              {message && (
                <p className={`text-xs ${status === "error" ? "text-red-400" : "text-brand-gold"}`}>{message}</p>
              )}
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
