"use client";
import { useApi } from "../../hooks/use-api";
import { StatCard } from "../../components/dashboard/stat-card";
import { PageTitle } from "../../components/shared/page-title";
import { QueryState } from "../../components/shared/query-state";

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
    <div>
      <PageTitle title="My Dashboard" subtitle="Your wedding booking summary" />
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
  );
}
