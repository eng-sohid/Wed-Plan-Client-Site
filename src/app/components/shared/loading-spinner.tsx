import { Loader2 } from "lucide-react";

export function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 text-gray-500">
      <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
