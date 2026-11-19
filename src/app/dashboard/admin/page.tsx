"use client";
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
  return (
    <div>
      <PageTitle title="Admin Overview" subtitle="Platform at a glance" />
      <QueryState loading={loading} error={error} onRetry={reload}>
        {s && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Registered Users" value={s.totalUsers} />
            <StatCard label="Total Vendors" value={s.totalVendors} />
            <StatCard label="Total Customers" value={s.totalCustomers} />
            <StatCard label="Total Services" value={s.totalServices} />
            <StatCard label="Pending Services" value={s.pendingServices} />
            <StatCard label="Total Transactions" value={s.totalTransactions} />
          </div>
        )}
      </QueryState>
    </div>
  );
}
