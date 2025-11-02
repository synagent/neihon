"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem("theme") as Theme | null) ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  return (
    <button
      type="button"
      className="text-sm text-brand-mute hover:text-brand-text border border-white/10 rounded-xl px-3 py-1"
      onClick={() => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", next);
          document.documentElement.dataset.theme = next;
        }
      }}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
