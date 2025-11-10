"use client";

import { CalendarDays, Mic, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";

const steps = [
  {
    title: "Speak",
    description: "Capture voice notes anywhere. Neihon parses intent, tone, and urgency in seconds.",
    icon: Mic
  },
  {
    title: "Plan",
    description: "Your words become prioritized tasks, agendas, and follow-ups synced to your calendar.",
    icon: CalendarDays
  },
  {
    title: "Grow",
    description: "Insights and nudges keep you improving with every conversation and commitment.",
    icon: TrendingUp
  }
];

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16" id="how-it-works">
      <Container>
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Workflow</p>
          <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">How Neihon keeps you moving</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="rounded-3xl border border-white/5 bg-white/[0.02] p-6"
              initial={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-heading text-xl text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-brand-slate">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
