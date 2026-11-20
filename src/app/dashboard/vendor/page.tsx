"use client";

import { useApi } from "../../hooks/use-api";
import { StatCard } from "../../components/dashboard/stat-card";
import { PageTitle } from "../../components/shared/page-title";
import { QueryState } from "../../components/shared/query-state";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Crown,
  Sparkles,
} from "lucide-react";

interface Stats {
  totalServices: number;
  activeServices: number;
  pendingBookings: number;
  acceptedBookings: number;
  subscriptionPlan: string;
}

export default function VendorOverview() {
  const { data, loading, error, reload } = useApi<{ stats: Stats }>(
    "/vendor/stats",
  );

  const s = data?.stats;

  return (
    <div className="space-y-7">
      <PageTitle
        title="Vendor Overview"
        subtitle="A quick look at your business performance and activities."
      />

      <QueryState loading={loading} error={error} onRetry={reload}>
        {s && (
          <>
            {/* Welcome Panel */}
            <section className="relative overflow-hidden rounded-3xl border border-[#d8b68c]/15 bg-[#20211e] p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#526b50]/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#d8b68c]/5 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="max-w-xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/10 px-3 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#d8b68c]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8b68c]">
                      Vendor Workspace
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-semibold text-[#faf9f6] sm:text-3xl">
                    Your business at a glance.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    Manage your wedding services, track booking requests, and
                    grow your business with WedPlan.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8b68c]/20 bg-[#d8b68c]/10">
                    <Crown className="h-5 w-5 text-[#d8b68c]" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                      Current Plan
                    </p>
                    <p className="mt-1 font-serif text-lg font-semibold capitalize text-[#faf9f6]">
                      {s.subscriptionPlan || "Free"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Statistics */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <h2 className="font-serif text-xl font-semibold text-[#faf9f6]">
                  Business Overview
                </h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard label="Total Services" value={s.totalServices} />

                <StatCard label="Active Services" value={s.activeServices} />

                <StatCard
                  label="Pending Booking Requests"
                  value={s.pendingBookings}
                />

                <StatCard
                  label="Accepted Bookings"
                  value={s.acceptedBookings}
                />

                <StatCard label="Current Plan" value={s.subscriptionPlan} />
              </div>
            </section>

            {/* Quick Summary */}
            <section className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#20211e] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d8b68c]/10">
                  <BriefcaseBusiness className="h-5 w-5 text-[#d8b68c]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Services Published</p>
                  <p className="mt-1 text-xl font-semibold text-[#faf9f6]">
                    {s.activeServices}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#20211e] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                  <Clock3 className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Awaiting Response</p>
                  <p className="mt-1 text-xl font-semibold text-[#faf9f6]">
                    {s.pendingBookings}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#20211e] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Confirmed Bookings</p>
                  <p className="mt-1 text-xl font-semibold text-[#faf9f6]">
                    {s.acceptedBookings}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </QueryState>
    </div>
  );
}
