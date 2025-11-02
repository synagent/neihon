"use client";

import { useEffect, useState } from "react";

import { StatusPill } from "@/components/StatusPill";

type Item = { id: string; label: string; path: string };
type Entry = Item & { ok: boolean; ms: number | null; error?: string };

const SERVICES: Item[] = [
  { id: "root", label: "Root", path: "/" },
  { id: "health", label: "Health", path: "/health" },
  { id: "docs", label: "Docs", path: "/docs" }
];

export default function ServiceMap() {
  const base = process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";
  const [data, setData] = useState<Entry[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const results: Entry[] = await Promise.all(
        SERVICES.map(async (s) => {
          const url = `${base}${s.path}`;
          const t0 = performance.now();
          try {
            const res = await fetch(url, { cache: "no-store" });
            const ok = res.ok;
            const t1 = performance.now();
            return { ...s, ok, ms: Math.round(t1 - t0) };
          } catch (e: any) {
            const t1 = performance.now();
            return { ...s, ok: false, ms: Math.round(t1 - t0), error: e?.message || String(e) };
          }
        })
      );
      if (mounted) setData(results);
    })();

    return () => {
      mounted = false;
    };
  }, [base]);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {data.map((entry) => (
        <div key={entry.id} className="ne-glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-brand-text">{entry.label}</div>
            <StatusPill ok={entry.ok} ms={entry.ms} />
          </div>
          <div className="mt-2 text-xs text-brand-mute break-all">{`${base}${entry.path}`}</div>
          {!entry.ok && entry.error && <div className="mt-1 text-xs text-red-400">{entry.error}</div>}
        </div>
      ))}
    </div>
  );
}
