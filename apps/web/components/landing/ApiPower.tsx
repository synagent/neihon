"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";

const partners = [
  { name: "OpenAI", accent: "from-brand-gold/80 to-brand-gold/30" },
  { name: "Vercel", accent: "from-white/80 to-white/20" },
  { name: "Render", accent: "from-brand-silver to-brand-silver/20" }
];

export default function ApiPower() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16">
      <Container>
        <div className="glass-panel rounded-[32px] border border-white/10 p-8 text-center shadow-card">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">API Power</p>
          <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">Built for Humans and Developers</h2>
          <p className="mt-4 text-brand-slate">
            Simple integration, limitless automation. Architect flows with the same stack powering modern AI products.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="rounded-3xl border border-white/10 bg-white/[0.02] px-4 py-6 text-2xl font-semibold text-white"
                initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${partner.accent}`}
                >
                  <span className="text-sm uppercase tracking-[0.3em] text-brand-night">{partner.name[0]}</span>
                </div>
                <p className="mt-4 text-lg">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
