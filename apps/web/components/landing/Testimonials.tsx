"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";

const testimonials = [
  { quote: "Neihon is like having a second brain that keeps my rituals on track.", author: "Mira Han — Beta User" },
  { quote: "Voice-to-plan is instant. Our team briefs went from hours to minutes.", author: "Luis Ortega — Strategy Lead" },
  { quote: "The API is beautifully simple, yet powerful enough for automation nerds.", author: "Sara Quinn — Head of Ops" }
];

export default function LandingTestimonials() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16">
      <Container>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-silver">Testimonials</p>
          <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">Loved by calm operators</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.author}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-glow"
              initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <p className="text-base italic text-brand-text/90">“{testimonial.quote}”</p>
              <p className="mt-6 text-sm text-brand-silver">{testimonial.author}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
