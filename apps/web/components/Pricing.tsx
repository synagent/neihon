"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Capture ideas and try daily summaries.",
    highlights: ["3 voice captures/day", "Basic planner", "Email summaries"],
    featured: false
  },
  {
    name: "Pro",
    price: "$29",
    description: "Full AI workflow with team sharing.",
    highlights: ["Unlimited captures", "Shared agendas", "AI nudges & insights"],
    featured: true
  },
  {
    name: "Ultimate",
    price: "$79",
    description: "Advanced controls and concierge support.",
    highlights: ["Private workspace", "Custom integrations", "Priority support"],
    featured: false
  }
];

type PricingProps = {
  onJoin: () => void;
};

export default function Pricing({ onJoin }: PricingProps) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16" id="pricing">
      <Container>
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Pricing</p>
          <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">Start Free. Upgrade Anytime.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={
                  tier.featured
                    ? "border-brand-gold bg-brand-navy/40 p-6 shadow-glow"
                    : "border-white/10 bg-white/[0.02] p-6"
                }
                as="article"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-2xl text-white">{tier.name}</h3>
                  {tier.featured && (
                    <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-brand-gold">
                      Best
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-brand-slate">{tier.description}</p>
                <p className="mt-6 text-4xl font-semibold text-white">{tier.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-brand-text/80">
                  {tier.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-gold" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={onJoin}
                  className={`btn-shimmer mt-6 inline-flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold ${
                    tier.featured
                      ? "border-transparent bg-brand-gold text-brand-night"
                      : "border-white/15 text-brand-text hover:border-brand-gold"
                  }`}
                >
                  Join Waitlist
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
