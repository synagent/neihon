export type Role = "Admin" | "Maintainer" | "Viewer";

export default function RoleBadge({ role }: { role: Role }) {
  const map: Record<Role, string> = {
    Admin: "bg-red-500/15 text-red-300 border-red-600/40",
    Maintainer: "bg-amber-500/15 text-amber-300 border-amber-600/40",
    Viewer: "bg-emerald-500/15 text-emerald-300 border-emerald-600/40",
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${map[role]}`}>
      <span className="h-2 w-2 rounded-full bg-current opacity-80" />
      {role}
    </span>
  );
}
