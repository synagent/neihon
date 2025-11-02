"use client";

import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export default function FormInput({ label, hint, error, className = "", ...props }: Props) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-brand-mute">{label}</span>
      <input
        {...props}
        className={`w-full rounded-xl bg-brand-panel border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 ring-offset-0 ring-brand-gold/70 text-brand-text placeholder:text-brand-mute/70 ${className}`.trim()}
      />
      {hint && !error && <span className="text-xs text-brand-mute">{hint}</span>}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
