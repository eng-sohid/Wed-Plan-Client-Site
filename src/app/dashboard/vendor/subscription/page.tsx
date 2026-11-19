"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Crown } from "lucide-react";
import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import { fmtDate } from "@/lib/format";
import UpgradeButton from "../../../components/dashboard/upgrade-button";
import { PageTitle } from "../../../components/shared/page-title";
import { QueryState } from "../../../components/shared/query-state";
import { ConfirmButton } from "../../../components/shared/confirm-button";

const free = [
  "Maximum 3 active services",
  "Basic vendor dashboard",
  "Booking request management",
];
const premium = [
  "Unlimited active services",
  "Premium Vendor badge",
  "All Free plan features",
];

function Plan({
  title,
  price,
  items,
  current,
  children,
}: {
  title: string;
  price: string;
  items: string[];
  current: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm ${title === "Premium" ? "border-rose-400 ring-2 ring-rose-200" : ""}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif text-xl font-bold">
          {title === "Premium" && <Crown className="h-5 w-5 text-amber-500" />}
          {title}
        </h3>
        {current && (
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-700">
            Current plan
          </span>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold text-rose-600">{price}</p>
      <ul className="my-5 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            {i}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

export default function SubscriptionPage() {
  const { data, loading, error, reload } = useApi<{
    stats: { subscriptionPlan: string; subscriptionExpiresAt: string | null };
  }>("/vendor/stats");
  const [busy, setBusy] = useState(false);
  const isPremium = data?.stats.subscriptionPlan === "premium";

  async function cancel() {
    setBusy(true);
    try {
      const r = await api<{ message: string }>(
        "/payments/cancel-subscription",
        { method: "POST" },
      );
      toast.success(r.message);
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageTitle
        title="Subscription"
        subtitle="Choose the plan that fits your business"
      />
      <QueryState loading={loading} error={error} onRetry={reload}>
        <div className="grid max-w-3xl gap-6 md:grid-cols-2">
          <Plan title="Free" price="$0" items={free} current={!isPremium} />
          <Plan
            title="Premium"
            price="$20 / month"
            items={premium}
            current={isPremium}
          >
            {isPremium ? (
              <div className="space-y-3 text-sm">
                <p className="text-gray-500">
                  Active until {fmtDate(data?.stats.subscriptionExpiresAt)}
                </p>
                <ConfirmButton
                  label="Cancel subscription"
                  confirmLabel="Yes, cancel"
                  disabled={busy}
                  onConfirm={cancel}
                />
              </div>
            ) : (
              <UpgradeButton />
            )}
          </Plan>
        </div>
      </QueryState>
    </div>
  );
}
