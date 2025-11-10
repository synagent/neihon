"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

const testimonials = [
  {
    quote: "Neihon feels like a chief of staff that never sleeps. My mornings start organized.",
    name: "Lea Park",
    title: "Head of Operations, Aster",
    company: "Aster"
  },
  {
    quote: "Voice capture is wild — the AI keeps the context from every client call.",
    name: "Marco Díaz",
    title: "Principal Advisor",
    company: "Atlas Mutual"
  },
  {
    quote: "It plans, nudges, and reminds with empathy. I stopped juggling five different apps.",
    name: "Priya N.",
    title: "Product Lead",
    company: "Northwind"
  }
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Testimonials</p>
          <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">Trusted by calm operators</h2>
        </div>
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              className="min-w-[260px] snap-start md:min-w-0"
              initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-white/5 bg-white/[0.02] p-6">
                <p className="text-base italic text-brand-text/90">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-4">
                  <Image
                    src="/placeholder/avatar.jpg"
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading text-white">{item.name}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-slate">{item.title}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
