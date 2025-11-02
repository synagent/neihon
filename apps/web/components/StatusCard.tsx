"use client";

import { useNeihonHealth, useNeihonRoot } from "@/hooks/useNeihon";

import { Card } from "./Card";
import { StatusPill } from "./StatusPill";

export default function StatusCard() {
  const { data: health, error: healthErr, loading: healthLoading, latency } = useNeihonHealth();
  const { data: root, error: rootErr, loading: rootLoading } = useNeihonRoot();

  const ok = !!health?.ok && !healthErr;

  return (
    <Card>
      <div className="max-w-xl w-full p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Neihon API</h2>
          <StatusPill ok={ok} ms={latency ?? null} />
        </div>

        <div className="text-sm text-brand-mute mb-4">
          Base URL:{" "}
          <code className="px-2 py-1 rounded-lg bg-black/40 border border-white/10">
            {process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com"}
          </code>
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="font-medium text-brand-text/90">/health</h3>
            {healthLoading && <p>Checking…</p>}
            {healthErr && <p className="text-red-400">Error: {healthErr}</p>}
            {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
          </section>

          <section>
            <h3 className="font-medium text-brand-text/90">/</h3>
            {rootLoading && <p>Loading…</p>}
            {rootErr && <p className="text-red-400">Error: {rootErr}</p>}
            {root && <pre>{JSON.stringify(root, null, 2)}</pre>}
          </section>
        </div>
      </div>
    </Card>
  );
}
