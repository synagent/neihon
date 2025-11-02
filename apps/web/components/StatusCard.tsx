"use client";

import { useNeihonHealth, useNeihonRoot } from "@/hooks/useNeihon";

import { Card } from "./Card";
import { Skeleton } from "./Skeleton";
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
            {healthLoading ? (
              <Skeleton className="h-20" />
            ) : health ? (
              <pre>{JSON.stringify(health, null, 2)}</pre>
            ) : (
              <p className="text-brand-mute">{healthErr ? `No data • ${healthErr}` : "No data"}</p>
            )}
          </section>

          <section>
            <h3 className="font-medium text-brand-text/90">/</h3>
            {rootLoading ? (
              <Skeleton className="h-20" />
            ) : root ? (
              <pre>{JSON.stringify(root, null, 2)}</pre>
            ) : (
              <p className="text-brand-mute">{rootErr ? `No data • ${rootErr}` : "No data"}</p>
            )}
          </section>
        </div>
      </div>
    </Card>
  );
}
