import Container from "@/components/ui/Container";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="py-20">
      <Container className="space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-silver">Privacy</span>
        <h1 className="font-heading text-4xl text-brand-text">Privacy Policy</h1>
        <p className="text-brand-slate max-w-3xl">
          Neihon is committed to safeguarding your data. A full policy is in progress — in the meantime, reach out to{" "}
          <a href="mailto:privacy@neihon.com" className="text-brand-gold underline underline-offset-4">
            privacy@neihon.com
          </a>{" "}
          for any questions or takedown requests.
        </p>
        <Link
          href="/#contact"
          className="inline-flex w-fit items-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-brand-text/80 hover:border-brand-gold hover:text-brand-text"
        >
          Back to homepage
        </Link>
      </Container>
    </main>
  );
}
