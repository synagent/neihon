import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusCard from "@/components/StatusCard";
import ServiceMap from "@/components/ServiceMap";
import RoleBadge from "@/components/RoleBadge";

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="ne-glass rounded-3xl p-8 md:p-10 mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Neihon</h1>
          <p className="mt-2 text-sm md:text-base text-brand-mute max-w-2xl">
            Neihon helps teams ship faster by exposing live service health, human-readable docs, and a safe API playground—so devs can test, learn, and integrate in minutes.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/docs" className="px-4 py-2 rounded-2xl text-sm font-medium bg-brand-gold text-black hover:opacity-90">
              View Docs
            </a>
            <a
              href="/playground"
              className="px-4 py-2 rounded-2xl text-sm font-medium border border-white/10 text-brand-text/80 hover:text-brand-text"
            >
              Open Playground
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-brand-mute">
            <span>Roles:</span>
            <RoleBadge role="Admin" />
            <RoleBadge role="Maintainer" />
            <RoleBadge role="Viewer" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 space-y-8">
        <div className="flex items-center justify-center">
          <StatusCard />
        </div>
        <ServiceMap />
      </section>

      <Footer />
    </main>
  );
}
