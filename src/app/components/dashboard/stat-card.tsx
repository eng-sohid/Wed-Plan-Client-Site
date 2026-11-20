import { TrendingUp } from "lucide-react";

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#20211e] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d8b68c]/30 hover:shadow-xl hover:shadow-black/20 sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#526b50]/10 blur-3xl transition-all duration-500 group-hover:bg-[#526b50]/20" />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
            {label}
          </p>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d8b68c]/15 bg-[#d8b68c]/10">
            <TrendingUp className="h-4 w-4 text-[#d8b68c]" />
          </div>
        </div>

        <p className="mt-5 break-words font-serif text-3xl font-semibold capitalize tracking-tight text-[#faf9f6] sm:text-4xl">
          {value}
        </p>

        <div className="mt-4 h-px w-full bg-white/10">
          <div className="h-px w-1/3 bg-[#d8b68c]/60 transition-all duration-500 group-hover:w-2/3" />
        </div>

        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
          WedPlan Overview
        </p>
      </div>
    </div>
  );
}
