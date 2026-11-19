"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Two-step button (no browser confirm/alert)
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
      >
        {label}
      </Button>
    );
  }
  return (
    <span className="inline-flex gap-1">
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setAsk(false);
          onConfirm();
        }}
      >
        {confirmLabel}
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setAsk(false)}>
        No
      </Button>
    </span>
  );
}
