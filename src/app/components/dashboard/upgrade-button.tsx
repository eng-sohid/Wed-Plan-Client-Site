"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { api, errMsg } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { roseBtn } from "@/lib/format";

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  async function upgrade() {
    setLoading(true);
    try {
      const data = await api<{ url: string }>(
        "/payments/create-checkout-session",
        { method: "POST" },
      );
      window.location.href = data.url;
    } catch (e) {
      toast.error(errMsg(e));
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={upgrade}
      disabled={loading}
      className={`w-full ${roseBtn}`}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting to Stripe...
        </>
      ) : (
        "Upgrade to Premium"
      )}
    </Button>
  );
}
