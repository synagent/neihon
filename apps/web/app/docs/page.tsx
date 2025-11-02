type OpenAPI = {
  info?: { title?: string; version?: string; description?: string };
  paths?: Record<string, Record<string, { summary?: string; description?: string }>>;
};

export default async function DocsPage() {
  const base = process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";
  const res = await fetch(`${base}/openapi.json`, { cache: "no-store" });
  const spec = (await res.json()) as OpenAPI;

  const entries: Array<{ method: string; path: string; summary: string }> = [];
  if (spec.paths) {
    for (const path of Object.keys(spec.paths)) {
      for (const method of Object.keys(spec.paths[path])) {
        const item = spec.paths[path][method];
        entries.push({ method: method.toUpperCase(), path, summary: item.summary || "" });
      }
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="ne-glass rounded-3xl p-6">
        <h1 className="text-2xl font-semibold mb-1">{spec?.info?.title || "API Docs"}</h1>
        <p className="text-sm text-brand-mute">v{spec?.info?.version || "unknown"}</p>
      </div>

      <div className="grid gap-3">
        {entries.length === 0 && <p className="text-brand-mute">No endpoints found.</p>}
        {entries.map((e, i) => (
          <div key={`${e.method}-${e.path}-${i}`} className="ne-glass rounded-2xl p-4 flex items-start justify-between">
            <div className="flex flex-col">
              <div className="text-xs text-brand-mute">{e.method}</div>
              <div className="font-mono">{e.path}</div>
            </div>
            <div className="text-sm text-brand-mute max-w-[60%]">{e.summary}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
