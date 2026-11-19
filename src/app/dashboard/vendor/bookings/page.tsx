"use client";
import { toast } from "sonner";
import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import type { Booking } from "../../../types";
import { fmtDate } from "@/lib/format";
import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { StatusBadge } from "../../../components/shared/status-badge";
import { Avatar } from "../../../components/shared/avatar";
import { Button } from "@/components/ui/button";

export default function VendorBookingsPage() {
  const { data, loading, error, reload } = useApi<{ bookings: Booking[] }>(
    "/vendor/bookings",
  );

  async function act(id: string, status: "accepted" | "rejected") {
    try {
      await api(`/bookings/${id}/status`, {
        method: "PATCH",
        body: { status },
      });
      toast.success(`Booking ${status}`);
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  return (
    <div>
      <PageTitle
        title="Booking Requests"
        subtitle="Review requests from customers"
      />
      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.bookings.length ? (
          <div className="space-y-4">
            {data.bookings.map((b) => (
              <div
                key={b._id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={b.customerImage}
                      name={b.customerName}
                      size={44}
                    />
                    <div>
                      <p className="font-semibold">{b.customerName}</p>
                      <p className="text-xs text-gray-500">{b.customerEmail}</p>
                    </div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                  <p>
                    <span className="text-gray-500">Service:</span>{" "}
                    {b.serviceName}
                  </p>
                  <p>
                    <span className="text-gray-500">Event Date:</span>{" "}
                    {fmtDate(b.eventDate)}
                  </p>
                  <p>
                    <span className="text-gray-500">Location:</span>{" "}
                    {b.eventLocation}
                  </p>
                </div>
                {b.message && (
                  <p className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-gray-700">
                    “{b.message}”
                  </p>
                )}
                {b.status === "pending" && (
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 text-white hover:bg-green-700"
                      onClick={() => act(b._id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => act(b._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No booking requests yet" />
        )}
      </QueryState>
    </div>
  );
}
