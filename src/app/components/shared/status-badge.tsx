const colors: Record<string, string> = {
  pending: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  accepted: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  paid: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  rejected: "border-red-400/20 bg-red-400/10 text-red-300",
  cancelled: "border-white/10 bg-white/5 text-white/50",
  expired: "border-white/10 bg-white/5 text-white/50",
  failed: "border-red-400/20 bg-red-400/10 text-red-300",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
        colors[status.toLowerCase()] ||
        "border-white/10 bg-white/5 text-white/60"
      }`}
    >
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
