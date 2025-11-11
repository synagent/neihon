"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Brain, CalendarRange, Mic } from "lucide-react";
import Container from "@/components/ui/Container";

const steps = [
  {
    title: "Speak",
    description: "Capture ideas, commitments, and coaching moments in your own words.",
    icon: Mic
  },
  {
    title: "Plan",
    description: "Neihon turns every note into a prioritized plan with reminders and context.",
    icon: CalendarRange
  },
  {
    title: "Flow",
    description: "Stay in the zone with nudges, summaries, and calm automation across your day.",
    icon: Brain
  }
];

export default function WhyNeihon() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16">
      <Container>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Why Neihon</p>
          <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">Speak → Plan → Flow</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-2xl text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-brand-slate">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
