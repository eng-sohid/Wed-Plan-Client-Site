"use client";

import { useApi } from "../../hooks/use-api";
import { StatCard } from "../../components/dashboard/stat-card";
import { PageTitle } from "../../components/shared/page-title";
import { QueryState } from "../../components/shared/query-state";

import { Sparkles } from "lucide-react";

interface Stats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export default function CustomerOverview() {
  const { data, loading, error, reload } = useApi<{ stats: Stats }>(
    "/customer/stats",
  );

  const s = data?.stats;

  return (
    <div className="space-y-7">
      <PageTitle
        title="My Dashboard"
        subtitle="Your personal wedding booking overview."
      />

      <div className="relative overflow-hidden rounded-2xl border border-[#d8b68c]/15 bg-[#20211e] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#526b50]/15 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#d8b68c]/10 text-[#d8b68c]">
            <Sparkles size={21} />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b68c]">
            Customer Overview
          </p>

          <h2 className="mt-2 max-w-xl font-serif text-2xl font-semibold text-[#faf9f6] sm:text-3xl">
            Your wedding journey, all in one place.
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
            Keep track of your booking requests and stay updated on the services
            you have chosen for your special day.
          </p>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h2 className="font-serif text-xl font-semibold text-[#faf9f6]">
            Booking Summary
          </h2>
          <p className="mt-1 text-sm text-white/40">
            An overview of all your booking activities.
          </p>
        </div>

        <QueryState loading={loading} error={error} onRetry={reload}>
          {s && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total Booking Requests" value={s.total} />

              <StatCard label="Pending Bookings" value={s.pending} />

              <StatCard label="Accepted Bookings" value={s.accepted} />

              <StatCard label="Rejected Bookings" value={s.rejected} />
            </div>
          )}
        </QueryState>
      </div>
    </div>
  );
}
