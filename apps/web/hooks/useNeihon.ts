import { useEffect, useState } from "react";
import { Neihon } from "@/lib/api";

type Health = { ok: boolean };
type RootInfo = { service: string; status: string; docs: string };

export function useNeihonHealth() {
  const [data, setData] = useState<Health | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const now = typeof performance !== "undefined" ? performance.now.bind(performance) : Date.now;
        const t0 = now();
        const d = await Neihon.health();
        const t1 = now();
        if (active) setData(d);
        if (active) setLatency(Math.round(t1 - t0));
      } catch (e: any) {
        if (active) setError(e?.message || String(e));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { data, error, loading, latency };
}

export function useNeihonRoot() {
  const [data, setData] = useState<RootInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const d = await Neihon.root();
        if (active) setData(d);
      } catch (e: any) {
        if (active) setError(e?.message || String(e));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { data, error, loading };
}
