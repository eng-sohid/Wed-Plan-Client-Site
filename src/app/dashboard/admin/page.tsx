"use client";

import {
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import { useApi } from "../../hooks/use-api";
import { StatCard } from "../../components/dashboard/stat-card";
import { PageTitle } from "../../components/shared/page-title";
import { QueryState } from "../../components/shared/query-state";

interface Stats {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
}

export default function AdminOverview() {
  const { data, loading, error, reload } = useApi<{ stats: Stats }>(
    "/admin/stats",
  );

  const s = data?.stats;

  const stats = [
    {
      label: "Registered Users",
      value: s?.totalUsers ?? 0,
    },
    {
      label: "Total Vendors",
      value: s?.totalVendors ?? 0,
    },
    {
      label: "Total Customers",
      value: s?.totalCustomers ?? 0,
    },
    {
      label: "Total Services",
      value: s?.totalServices ?? 0,
    },
    {
      label: "Pending Services",
      value: s?.pendingServices ?? 0,
    },
    {
      label: "Total Transactions",
      value: s?.totalTransactions ?? 0,
    },
  ];

  return (
    <div className="space-y-8">
      <PageTitle
        title="Admin Overview"
        subtitle="Monitor your platform, users and business activities."
      />

      <QueryState loading={loading} error={error} onRetry={reload}>
        {s && (
          <>
            {/* Welcome Panel */}
            <section className="relative mb-7 overflow-hidden rounded-3xl border border-white/10 bg-[#20211e] p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#526b50]/20 blur-[90px]" />

              <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/10 px-3 py-1.5 text-xs font-medium text-[#d8b68c]">
                    <ShieldCheck size={14} />
                    Administrator Panel
                  </div>

                  <h2 className="font-serif text-2xl font-semibold text-[#faf9f6] sm:text-3xl">
                    Welcome to WedPlan
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/50">
                    Here&apos;s what&apos;s happening across your wedding planning
                    platform. Manage users, review services and monitor
                    transactions from one place.
                  </p>
                </div>

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#d8b68c]/10 text-[#d8b68c]">
                  <TrendingUp size={30} strokeWidth={1.5} />
                </div>
              </div>
            </section>

            {/* Statistics */}
            <div>
              <div className="mb-5">
                <h2 className="font-serif text-xl font-semibold text-[#faf9f6]">
                  Platform Statistics
                </h2>
                <p className="mt-1 text-sm text-white/40">
                  An overview of your platform&apos;s current performance.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                  />
                ))}
              </div>
            </div>

            {/* Platform Summary */}
            <section className="rounded-2xl border border-white/10 bg-[#20211e] p-5 sm:p-6">
              <h3 className="font-serif text-lg font-semibold text-[#faf9f6]">
                Platform Summary
              </h3>

              <p className="mt-1 text-sm text-white/40">
                A quick snapshot of your platform activity.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-white/40">Total Community</p>
                  <p className="mt-2 text-2xl font-semibold text-[#faf9f6]">
                    {s.totalUsers.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-white/30">
                    Registered accounts
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/40">Service Listings</p>
                  <p className="mt-2 text-2xl font-semibold text-[#faf9f6]">
                    {s.totalServices.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-white/30">
                    Total submitted services
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/40">Awaiting Review</p>
                  <p className="mt-2 text-2xl font-semibold text-[#d8b68c]">
                    {s.pendingServices.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-white/30">
                    Services pending approval
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
