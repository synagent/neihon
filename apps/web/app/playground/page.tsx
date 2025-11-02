"use client";

import { useEffect, useState } from "react";

import CopyButton from "@/components/CopyButton";

export default function Playground() {
  const base = process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";
  const [path, setPath] = useState("/health");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">("GET");
  const [token, setToken] = useState("");
  const [body, setBody] = useState<string>("");
  const [out, setOut] = useState<string>("");
  const [ms, setMs] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const [origin, setOrigin] = useState("");

  const url = `${base}${path}`;
  const proxyUrl = `/api/proxy?path=${encodeURIComponent(path)}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (method !== "GET" && useProxy) {
      setUseProxy(false);
    }
  }, [method, useProxy]);

  const actualMethod = useProxy ? "GET" : method;
  const targetUrl = useProxy ? proxyUrl : url;
  const curlTarget = useProxy ? (origin ? `${origin}${proxyUrl}` : proxyUrl) : url;

  const curl = [
    "curl",
    "-s",
    "-X",
    actualMethod,
    `"${curlTarget}"`,
    ...(!useProxy && token.trim() ? ["-H", `"Authorization: Bearer ${token.trim()}"`] : []),
    "-H",
    "\"Accept: application/json\"",
    ...(!useProxy && actualMethod !== "GET" && actualMethod !== "DELETE" && body.trim()
      ? ["-H", `"Content-Type: application/json"`, "-d", `'${body.replace(/'/g, "'\\''")}'`]
      : [])
  ].join(" ");

  const displayUrl = useProxy ? curlTarget : url;

  async function run() {
    setLoading(true);
    setOut("");
    setMs(null);
    const t0 = performance.now();
    try {
      const headers: Record<string, string> = { Accept: "application/json" };
      if (!useProxy && token.trim()) {
        headers.Authorization = `Bearer ${token.trim()}`;
      }

      const init: RequestInit = { method: actualMethod, headers, cache: "no-store" };
      if (!useProxy && actualMethod !== "GET" && actualMethod !== "DELETE" && body.trim()) {
        headers["Content-Type"] = "application/json";
        init.body = body;
      }

      const res = await fetch(targetUrl, init);
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
        <p className="text-sm text-brand-mute mt-1">Test live endpoints with different methods and auth.</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <select
            className="rounded-xl bg-brand-panel border border-white/10 px-3 py-2 text-sm text-brand-text"
            value={method}
            onChange={(e) => setMethod(e.target.value as "GET" | "POST" | "PUT" | "DELETE")}
          >
            {["GET", "POST", "PUT", "DELETE"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <input
            className="sm:col-span-3 rounded-xl bg-brand-panel border border-white/10 px-3 py-2 text-sm text-brand-text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="/health"
          />
        </div>

        <input
          className="mt-3 w-full rounded-xl bg-brand-panel border border-white/10 px-3 py-2 text-sm text-brand-text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Bearer token (optional)"
        />

        {method !== "GET" && method !== "DELETE" && (
          <textarea
            className="mt-3 w-full rounded-xl bg-brand-panel border border-white/10 px-3 py-2 text-sm font-mono text-brand-text"
            rows={5}
            placeholder='{"key":"value"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={run}
            disabled={loading}
            className="px-4 py-2 rounded-2xl text-sm font-medium bg-brand-gold text-black hover:opacity-90 disabled:opacity-60"
            type="button"
          >
            {loading ? "Running…" : `Send ${actualMethod}`}
          </button>
          <div className="text-xs text-brand-mute break-all font-mono flex-1">
            <div className="flex items-center justify-between gap-2">
              <span>cURL</span>
              <CopyButton text={curl} />
            </div>
            <div className="mt-1">{curl}</div>
          </div>
        </div>

        <label className="mt-3 inline-flex items-center gap-2 text-sm text-brand-mute">
          <input
            type="checkbox"
            checked={useProxy}
            onChange={(e) => setUseProxy(e.target.checked)}
            disabled={method !== "GET"}
          />
          Use proxy (GET only; avoid CORS / enable rate limits)
        </label>

        <div className="mt-4 text-xs text-brand-mute break-all">{displayUrl}</div>
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
