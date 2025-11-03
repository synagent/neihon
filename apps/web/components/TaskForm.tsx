"use client";

import { useEffect, useMemo, useState } from "react";
import VoiceButton from "./VoiceButton";

type TaskInput = {
  title: string;
  notes?: string;
  dueDate?: string;
  dueTime?: string;
  priority?: "low" | "normal" | "high";
};

function buildICS(t: TaskInput) {
  const uid = `${Date.now()}@neihon`;
  const dt = t.dueDate && t.dueTime ? `${t.dueDate} ${t.dueTime}` : t.dueDate ? `${t.dueDate} 09:00` : "";
  const start = dt ? new Date(dt) : null;
  const end = start ? new Date(start.getTime() + 30 * 60 * 1000) : null;

  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Neihon//Tasks//EN",
    "BEGIN:VTODO",
    `UID:${uid}`,
    `SUMMARY:${(t.title || "").replace(/\n/g, " ")}`,
    t.notes ? `DESCRIPTION:${t.notes.replace(/\n/g, "\\n")}` : "",
    t.priority ? `PRIORITY:${t.priority === "high" ? 1 : t.priority === "normal" ? 5 : 9}` : "",
    start ? `DTSTART:${fmt(start)}` : "",
    end ? `DUE:${fmt(end)}` : "",
    "END:VTODO",
    "END:VCALENDAR",
  ].filter(Boolean);

  return new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
}

export default function TaskForm() {
  const [form, setForm] = useState<TaskInput>({ title: "", priority: "normal" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = form.title.trim().length > 0;

  const icsBlob = useMemo(() => {
    if (!form.title.trim()) return null;
    return buildICS(form);
  }, [form]);

  const icsUrl = useMemo(() => {
    if (!icsBlob) return null;
    return URL.createObjectURL(icsBlob);
  }, [icsBlob]);

  useEffect(() => {
    return () => {
      if (icsUrl) {
        URL.revokeObjectURL(icsUrl);
      }
    };
  }, [icsUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          notes: form.notes?.trim() || undefined,
          due_at: form.dueDate && form.dueTime ? `${form.dueDate}T${form.dueTime}:00` : undefined,
          priority: form.priority,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setResult(data);
    } catch (err: any) {
      setError(err?.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-brand-mute block mb-1">Title *</label>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm"
            placeholder="e.g., Call the client about policy update"
            value={form.title}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            required
          />
          <VoiceButton
            label="Dictate"
            onResult={(txt) => setForm((s) => ({ ...s, title: (s.title ? s.title + " " : "") + txt }))}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-brand-mute block mb-1">Notes</label>
        <div className="flex gap-2">
          <textarea
            rows={4}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm"
            placeholder="Optional details…"
            value={form.notes || ""}
            onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          />
          <VoiceButton
            label="Dictate"
            onResult={(txt) => setForm((s) => ({ ...s, notes: (s.notes ? s.notes + " " : "") + txt }))}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="text-sm text-brand-mute block mb-1">Due date</label>
          <input
            type="date"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm"
            value={form.dueDate || ""}
            onChange={(e) => setForm((s) => ({ ...s, dueDate: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-sm text-brand-mute block mb-1">Due time</label>
          <input
            type="time"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm"
            value={form.dueTime || ""}
            onChange={(e) => setForm((s) => ({ ...s, dueTime: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-sm text-brand-mute block mb-1">Priority</label>
          <select
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm"
            value={form.priority}
            onChange={(e) => setForm((s) => ({ ...s, priority: e.target.value as any }))}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="px-4 py-2 rounded-2xl text-sm font-medium bg-brand-gold text-black hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Creating…" : "Create task"}
        </button>

        {icsUrl && (
          <a
            href={icsUrl}
            download={`task-${Date.now()}.ics`}
            className="text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5"
          >
            Download .ics
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {result && (
        <pre className="mt-2 text-xs bg-black/40 border border-white/10 rounded-xl p-3 overflow-auto">
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
