"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";

export type WaitlistPayload = {
  name: string;
  email: string;
  useCase: string;
};

type WaitlistCTAProps = {
  onSubmit: (payload: WaitlistPayload) => Promise<{ ok: boolean; message?: string }>;
};

export default function WaitlistCTA({ onSubmit }: WaitlistCTAProps) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<WaitlistPayload>({ name: "", email: "", useCase: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage(null);
    const result = await onSubmit(form);
    if (result.ok) {
      setStatus("success");
      setMessage("Thank you! You’re on the list.");
      setForm({ name: "", email: "", useCase: "" });
    } else {
      setStatus("error");
      setMessage(result.message ?? "Something went wrong. Try again.");
    }
  }

  return (
    <section className="py-20">
      <Container>
        <motion.div
          className="glass-panel rounded-[32px] border border-white/10 p-8 shadow-card"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Waitlist</p>
              <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">Join the Future of Voice Productivity</h2>
              <p className="mt-3 text-brand-slate">Tell us how you’d use Neihon and we’ll send private invites soon.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Name"
                id="waitlist-name"
                value={form.name}
                onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
                placeholder="Ada Lovelace"
              />
              <InputField
                label="Email"
                id="waitlist-email"
                type="email"
                value={form.email}
                onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                placeholder="you@studio.com"
              />
              <TextareaField
                label="Use case"
                id="waitlist-usecase"
                value={form.useCase}
                onChange={(value) => setForm((prev) => ({ ...prev, useCase: value }))}
                placeholder="Voice planning, daily rituals, exec showcases..."
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-shimmer inline-flex w-full items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-night shadow-glow disabled:opacity-60"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
              {message && (
                <p className={`text-sm ${status === "error" ? "text-red-400" : "text-brand-gold"}`}>{message}</p>
              )}
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

type InputFieldProps = {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function InputField({ label, id, type = "text", value, onChange, placeholder }: InputFieldProps) {
  return (
    <label htmlFor={id} className="block text-xs uppercase tracking-[0.3em] text-brand-silver">
      {label}
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-brand-gold"
      />
    </label>
  );
}

type TextareaFieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function TextareaField({ label, id, value, onChange, placeholder }: TextareaFieldProps) {
  return (
    <label htmlFor={id} className="block text-xs uppercase tracking-[0.3em] text-brand-silver">
      {label}
      <textarea
        id={id}
        rows={3}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-brand-gold"
      />
    </label>
  );
}
