import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
        {label}
      </Label>

      {children}
    </div>
  );
}
