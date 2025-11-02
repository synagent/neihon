export const API_URL =
  process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";

async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...(init?.headers || {}) },
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} on ${path}: ${text}`);
  }

  return (await res.json()) as T;
}

export const Neihon = {
  root: () => getJSON<{ service: string; status: string; docs: string }>("/"),
  health: () => getJSON<{ ok: boolean }>("/health")
};
