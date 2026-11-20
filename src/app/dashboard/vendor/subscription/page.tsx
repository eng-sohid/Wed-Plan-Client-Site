"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Check,
  Crown,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  XCircle,
} from "lucide-react";
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
  const isPremium = title === "Premium";

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${
        isPremium
          ? "border-[#d8b68c]/35 bg-gradient-to-b from-[#29251f] to-[#20211e] shadow-xl shadow-[#d8b68c]/5"
          : "border-white/10 bg-[#20211e]"
      }`}
    >
      {isPremium && (
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d8b68c]/10 blur-3xl" />
      )}

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
              isPremium
                ? "border-[#d8b68c]/25 bg-[#d8b68c]/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            {isPremium ? (
              <Crown className="h-5 w-5 text-[#d8b68c]" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-white/50" />
            )}
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[#faf9f6]">
              {title}
            </h3>
            <p className="mt-0.5 text-xs text-white/40">
              {isPremium ? "Grow without limits" : "Start your journey"}
            </p>
          </div>
        </div>

        {current && (
          <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            Current plan
          </span>
        )}
      </div>

      <div className="relative mt-8">
        <p className="font-serif text-4xl font-semibold text-[#faf9f6]">
          {price}
        </p>
        <p className="mt-2 text-xs text-white/40">
          {isPremium ? "Billed monthly" : "Forever free"}
        </p>
      </div>

      <div className="relative my-7 h-px bg-white/10" />

      <div className="relative flex-1">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
          What&apos;s included
        </p>

        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isPremium
                    ? "bg-[#d8b68c]/10 text-[#d8b68c]"
                    : "bg-white/5 text-white/50"
                }`}
              >
                <Check className="h-3 w-3" />
              </span>

              <span className="text-sm leading-5 text-white/65">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-8">{children}</div>
    </div>
  );
}

export default function SubscriptionPage() {
  const { data, loading, error, reload } = useApi<{
    stats: {
      subscriptionPlan: string;
      subscriptionExpiresAt: string | null;
    };
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
    <div className="space-y-7">
      <PageTitle
        title="Subscription"
        subtitle="Choose the plan that fits your business and unlock more opportunities."
      />

      <QueryState loading={loading} error={error} onRetry={reload}>
        <section className="relative overflow-hidden rounded-3xl border border-[#d8b68c]/15 bg-[#20211e] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#526b50]/15 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#d8b68c]">
                <Sparkles className="h-4 w-4" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Your Membership
                </span>
              </div>

              <h2 className="font-serif text-2xl font-semibold capitalize text-[#faf9f6]">
                {data?.stats.subscriptionPlan || "Free"} Plan
              </h2>

              <p className="mt-2 text-sm text-white/45">
                {isPremium
                  ? "Enjoy your premium vendor benefits."
                  : "Upgrade to unlock unlimited active services."}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <CalendarDays className="h-5 w-5 text-[#d8b68c]" />

              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">
                  {isPremium ? "Active Until" : "Membership"}
                </p>

                <p className="mt-1 text-sm font-medium text-[#faf9f6]">
                  {isPremium
                    ? fmtDate(data?.stats.subscriptionExpiresAt)
                    : "No expiration"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="font-serif text-xl font-semibold text-[#faf9f6]">
              Choose Your Plan
            </h2>
            <p className="mt-1 text-sm text-white/40">
              Compare features and select what works best for you.
            </p>
          </div>

          <div className="grid max-w-4xl gap-6 md:grid-cols-2">
            <Plan title="Free" price="$0" items={free} current={!isPremium} />

            <Plan
              title="Premium"
              price="$20 / month"
              items={premium}
              current={isPremium}
            >
              {isPremium ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-emerald-300">
                    <Check className="h-4 w-4" />
                    Your Premium membership is active
                  </div>

                  <ConfirmButton
                    label="Cancel subscription"
                    confirmLabel="Yes, cancel"
                    disabled={busy}
                    onConfirm={cancel}
                  />

                  {busy && (
                    <p className="text-xs text-white/40">
                      Processing cancellation...
                    </p>
                  )}
                </div>
              ) : (
                <UpgradeButton />
              )}
            </Plan>
          </div>
        </section>
      </QueryState>
    </div>
  );
}
