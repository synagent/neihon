"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { WaitlistPayload } from "./WaitlistCTA";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: WaitlistPayload) => Promise<{ ok: boolean; message?: string }>;
};

export default function WaitlistModal({ open, onClose, onSubmit }: WaitlistModalProps) {
  const [form, setForm] = useState<WaitlistPayload>({ name: "", email: "", useCase: "" });
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 100);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);
    const result = await onSubmit(form);
    if (result.ok) {
      setForm({ name: "", email: "", useCase: "" });
      setStatus("idle");
      onClose();
    } else {
      setStatus("idle");
      setError(result.message ?? "Something went wrong.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-brand-night/95 p-6 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Waitlist</p>
                <h3 className="mt-2 font-heading text-2xl text-white">Join the list</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-brand-slate hover:border-brand-gold hover:text-brand-gold"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-xs uppercase tracking-[0.3em] text-brand-silver">
                Name
                <input
                  ref={firstFieldRef}
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-brand-gold"
                  placeholder="Your name"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.3em] text-brand-silver">
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-brand-gold"
                  placeholder="team@neihon.com"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.3em] text-brand-silver">
                Use case
                <textarea
                  rows={3}
                  required
                  value={form.useCase}
                  onChange={(event) => setForm((prev) => ({ ...prev, useCase: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-brand-gold"
                  placeholder="Daily planning, meet recaps, workflow automation..."
                />
              </label>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-shimmer inline-flex w-full items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-night shadow-glow disabled:opacity-60"
              >
                {status === "loading" ? "Submitting..." : "Join Waitlist"}
              </button>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
