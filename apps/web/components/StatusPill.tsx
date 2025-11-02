export function StatusPill({ ok, ms }: { ok: boolean; ms: number | null }) {
  const state = ok ? (ms !== null && ms > 800 ? "slow" : "up") : "down";
  const color =
    state === "up"
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-600/40"
      : state === "slow"
        ? "bg-amber-500/20 text-amber-300 border-amber-600/40"
        : "bg-red-500/20 text-red-300 border-red-600/40";

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${color}`}>
      <span className="h-2 w-2 rounded-full bg-current opacity-80" />
      <span className="uppercase tracking-wide">{state}</span>
      {ms !== null && <span className="opacity-70">• {ms}ms</span>}
    </span>
  );
}
