"use client";

import { useEffect, useMemo, useState } from "react";

type OpenAPI = {
  info?: { title?: string; version?: string; description?: string };
  paths?: Record<
    string,
    Record<
      string,
      {
        summary?: string;
        description?: string;
        tags?: string[];
      }
    >
  >;
};

type Endpoint = {
  method: string;
  path: string;
  summary: string;
  tag: string;
};

export default function DocsPage() {
  const base = process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";
  const [meta, setMeta] = useState<{ title?: string; version?: string }>({});
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch(`${base}/openapi.json`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const spec = (await res.json()) as OpenAPI;
        if (!active) return;

        const eps: Endpoint[] = [];
        if (spec.paths) {
          for (const path of Object.keys(spec.paths)) {
            for (const method of Object.keys(spec.paths[path])) {
              const item = spec.paths[path][method];
              const tag = item.tags?.[0] || path.split("/")[1] || "general";
              eps.push({
                method: method.toUpperCase(),
                path,
                summary: item.summary || item.description || "",
                tag,
              });
            }
          }
        }

        setMeta({ title: spec.info?.title, version: spec.info?.version });
        setEndpoints(eps);
        setOpenGroups((prev) => {
          const next = { ...prev };
          for (const ep of eps) {
            if (next[ep.tag] === undefined) next[ep.tag] = true;
          }
          return next;
        });
      } catch (e: any) {
        if (!active) return;
        setError(e?.message || String(e));
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [base]);

  const filtered = useMemo(() => {
    const query = filter.trim().toLowerCase();
    const groups = new Map<string, Endpoint[]>();

    endpoints.forEach((ep) => {
      const haystack = `${ep.method} ${ep.path} ${ep.summary}`.toLowerCase();
      if (query && !haystack.includes(query)) return;
      if (!groups.has(ep.tag)) groups.set(ep.tag, []);
      groups.get(ep.tag)!.push(ep);
    });

    return Array.from(groups.entries()).map(([tag, items]) => ({ tag, items }));
  }, [endpoints, filter]);

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="ne-glass rounded-3xl p-6 space-y-2">
        <h1 className="text-2xl font-semibold">{meta.title || "API Docs"}</h1>
        <p className="text-sm text-brand-mute">v{meta.version || "unknown"}</p>
        <input
          className="mt-3 w-full rounded-xl bg-brand-panel border border-white/10 px-3 py-2 text-sm text-brand-text"
          placeholder="Filter endpoints..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          type="search"
        />
      </div>

      {loading && <p className="text-brand-mute">Loading specification…</p>}
      {error && !loading && <p className="text-red-400">Failed to load docs: {error}</p>}

      {!loading && !error && filtered.length === 0 && <p className="text-brand-mute">No endpoints found.</p>}

      <div className="space-y-4">
        {filtered.map(({ tag, items }) => {
          const isOpen = openGroups[tag] ?? true;
          return (
            <div key={tag} className="ne-glass rounded-3xl p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                onClick={() => setOpenGroups((prev) => ({ ...prev, [tag]: !isOpen }))}
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-mute">{tag}</span>
                <span className="text-xs text-brand-mute">{isOpen ? "Hide" : "Show"}</span>
              </button>
              {isOpen && (
                <div className="mt-4 space-y-3">
                  {items.map((e, idx) => (
                    <div key={`${e.method}-${e.path}-${idx}`} className="rounded-2xl border border-white/10 bg-brand-panel p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-brand-mute">{e.method}</span>
                        <span className="font-mono text-sm text-brand-text break-all">{e.path}</span>
                      </div>
                      {e.summary && <p className="mt-2 text-sm text-brand-mute">{e.summary}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
