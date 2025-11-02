export default function About() {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="ne-glass rounded-3xl p-6">
        <h1 className="text-2xl font-semibold">About Neihon</h1>
        <p className="mt-2 text-brand-mute">
          Neihon helps teams ship faster by exposing live service health, human-readable docs, and a safe API playground.
        </p>
        <p className="mt-4 text-sm text-brand-mute">
          Questions? <a className="underline hover:text-brand-text" href="mailto:Founder@syn-agent.com">Contact us</a>.
        </p>
      </div>
    </main>
  );
}
