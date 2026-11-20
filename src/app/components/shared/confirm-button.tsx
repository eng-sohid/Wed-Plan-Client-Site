"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, X } from "lucide-react";

export function ConfirmButton({
  label,
  confirmLabel = "Yes, sure",
  onConfirm,
  disabled,
}: {
  label: string;
  confirmLabel?: string;
  onConfirm: () => void;
  disabled?: boolean;
}) {
  const [ask, setAsk] = useState(false);

  if (!ask) {
    return (
      <Button
        size="sm"
        variant="outline"
        disabled={disabled}
        onClick={() => setAsk(true)}
        className="rounded-lg border-white/15 bg-white/5 text-white/70 transition hover:border-[#d8b68c]/40 hover:bg-[#d8b68c]/10 hover:text-[#d8b68c]"
      >
        {label}
      </Button>
    );
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setAsk(false);
          onConfirm();
        }}
        className="rounded-lg"
      >
        <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
        {confirmLabel}
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => setAsk(false)}
        className="rounded-lg border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
      >
        <X className="mr-1 h-3.5 w-3.5" />
        No
      </Button>
    </span>
  );
}
