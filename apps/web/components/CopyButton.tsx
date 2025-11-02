"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="text-xs px-2 py-1 rounded-lg border border-white/10 hover:bg-white/5"
      aria-label="Copy to clipboard"
      type="button"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
