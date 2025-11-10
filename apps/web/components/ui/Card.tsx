import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export default function Card({ children, className, as: Component = "div" }: CardProps) {
  return (
    <Component
      className={cn(
        "glass-panel relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-card transition hover:border-white/10",
        className
      )}
    >
      {children}
    </Component>
  );
}
