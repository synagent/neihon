"use client";

import { useState } from "react";

import CopyButton from "@/components/CopyButton";

export default function Playground() {
  const base = process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";
  const [path, setPath] = useState("/health");
  const [out, setOut] = useState<string>("");
  const [ms, setMs] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const url = `${base}${path}`;

  async function run() {
    setLoading(true);
    setOut("");
    setMs(null);
    const t0 = performance.now();
    try {
      const res = await fetch(url, { cache: "no-store" });
      const txt = await res.text();
      const t1 = performance.now();
      setMs(Math.round(t1 - t0));
      setOut(() => {
        try {
          return JSON.stringify(JSON.parse(txt), null, 2);
        } catch {
          return txt;
        }
      });
    } catch (e: any) {
      setOut(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="ne-glass rounded-3xl p-6">
        <h1 className="text-xl font-semibold">API Playground</h1>
        <p className="text-sm text-brand-mute mt-1">Try GET requests against the live API.</p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="text-sm text-brand-mute" htmlFor="path">
            Path
          </label>
          <input
            id="path"
            className="w-full sm:w-auto flex-1 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="/health"
          />
          <button
            onClick={run}
            disabled={loading}
            className="px-4 py-2 rounded-2xl text-sm font-medium bg-brand-gold text-black hover:opacity-90 disabled:opacity-60"
            type="button"
          >
            {loading ? "Running…" : "Send GET"}
          </button>
        </div>

        <div className="mt-4 text-xs text-brand-mute break-all">{url}</div>
        <div className="mt-2 text-xs text-brand-mute">{ms !== null && <>Latency: {ms}ms</>}</div>

        <div className="mt-4 relative">
          <div className="absolute right-2 top-2">
            <CopyButton text={out} />
          </div>
          <pre className="min-h-[180px]">{out || (loading ? "Loading…" : "Response will appear here")}</pre>
        </div>
      </div>
    </main>
  );
}
