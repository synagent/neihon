"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function LivePreview() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Live Preview</p>
          <h2 className="font-heading text-3xl text-white md:text-4xl">Test the workflow in the Playground</h2>
          <p className="text-brand-slate">
            Prototype prompts, test real APIs, and see how Neihon orchestrates everything in seconds. The playground is
            built for both teams and solo operators.
          </p>
          <Link
            href="/playground"
            className="inline-flex items-center text-sm font-semibold text-brand-gold underline-offset-4 hover:underline"
          >
            Open Full Playground →
          </Link>
        </div>
        <motion.div
          className="overflow-hidden rounded-[32px] border border-white/10 bg-black/70 shadow-card"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            src="/playground"
            title="Neihon Playground preview"
            loading="lazy"
            className="h-[420px] w-full border-0"
          />
        </motion.div>
      </Container>
    </section>
  );
}
