"use client";

import { Brain, CalendarCheck2, Cloud, Sparkles } from "lucide-react";
import type { ComponentProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

const features = [
  {
    title: "Speech-to-Text Precision",
    description: "Studio-grade capture that understands accents, pacing, and nuance.",
    icon: MicSparkles
  },
  {
    title: "Personalized AI",
    description: "Neihon learns your rituals, automatically adapting tone and context.",
    icon: Brain
  },
  {
    title: "Smart Daily Planner",
    description: "Automatic agendas with calendar sync, reminders, and shareable briefs.",
    icon: CalendarCheck2
  },
  {
    title: "Cloud Sync",
    description: "Secure storage across devices with audit trails and team visibility.",
    icon: Cloud
  }
];

type IconProps = ComponentProps<typeof Sparkles>;

function MicSparkles(props: IconProps) {
  return <Sparkles {...props} />;
}

export default function Features() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16" id="features">
      <Container>
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Features</p>
          <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">Built for calm focus</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-gold hover:shadow-glow">
                <feature.icon className="h-8 w-8 text-brand-gold transition group-hover:scale-110" />
                <h3 className="mt-4 font-heading text-2xl text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-brand-slate">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
