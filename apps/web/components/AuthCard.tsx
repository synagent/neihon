import type { ReactNode } from "react";

export default function AuthCard({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="ne-glass rounded-3xl p-6 w-full max-w-md">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
