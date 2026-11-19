"use client";
import { useApi } from "../../hooks/use-api";
import { StatCard } from "../../components/dashboard/stat-card";
import { PageTitle } from "../../components/shared/page-title";
import { QueryState } from "../../components/shared/query-state";

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
    <div>
      <PageTitle
        title="Vendor Overview"
        subtitle="A quick look at your business"
      />
      <QueryState loading={loading} error={error} onRetry={reload}>
        {s && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Total Services" value={s.totalServices} />
            <StatCard label="Active Services" value={s.activeServices} />
            <StatCard
              label="Pending Booking Requests"
              value={s.pendingBookings}
            />
            <StatCard label="Accepted Bookings" value={s.acceptedBookings} />
            <StatCard label="Current Plan" value={s.subscriptionPlan} />
          </div>
        )}
      </QueryState>
    </div>
  );
}
