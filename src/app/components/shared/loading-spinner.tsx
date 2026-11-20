import { Loader2, Sparkles } from "lucide-react";

export function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-white/50">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b68c]/20 bg-[#20211e]">
        <Loader2 className="h-6 w-6 animate-spin text-[#d8b68c]" />
        <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-[#d8b68c]/70" />
      </div>

      <p className="text-xs font-medium tracking-[0.2em] text-white/50">
        {label}
      </p>
    </div>
  );
}
