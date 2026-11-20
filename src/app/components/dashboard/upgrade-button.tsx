"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Crown, ArrowUpRight } from "lucide-react";
import { api, errMsg } from "@/lib/api";
import { Button } from "@/components/ui/button";

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
      className="group h-12 w-full rounded-xl border border-[#d8b68c]/30 bg-[#d8b68c] font-semibold text-[#171815] shadow-lg shadow-[#d8b68c]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e8c9a3] hover:shadow-[#d8b68c]/20 disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting to Stripe...
        </>
      ) : (
        <>
          <Crown className="mr-2 h-4 w-4" />
          Upgrade to Premium
          <ArrowUpRight className="ml-auto h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </>
      )}
    </Button>
  );
}
