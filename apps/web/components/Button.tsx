import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-2xl text-sm font-medium transition focus-visible:outline-none";
  const styles =
    variant === "primary"
      ? "bg-brand-gold text-black hover:opacity-90 active:opacity-80 shadow-card"
      : "text-brand-text/80 hover:text-brand-text border border-white/10";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
