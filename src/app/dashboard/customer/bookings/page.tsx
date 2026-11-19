"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import type { Booking } from "../../../types";
import { fmtDate, roseBtn } from "@/lib/format";
import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { StatusBadge } from "../../../components/shared/status-badge";
import { ConfirmButton } from "../../../components/shared/confirm-button";
import { Button } from "@/components/ui/button";

export default function MyBookingsPage() {
  const { data, loading, error, reload } = useApi<{ bookings: Booking[] }>(
    "/customer/bookings",
  );
  const [open, setOpen] = useState("");

  async function cancel(id: string) {
    try {
      await api(`/bookings/${id}/cancel`, { method: "PATCH" });
      toast.success("Booking cancelled");
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  return (
    <div>
      <PageTitle title="My Bookings" subtitle="Track your booking requests" />
      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.bookings.length ? (
          <div className="space-y-4">
            {data.bookings.map((b) => (
              <div
                key={b._id}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.serviceImage || "/images/placeholder.jpg"}
                    alt={b.serviceName}
                    className="h-28 w-full rounded-xl object-cover sm:w-40"
                  />
                  <div className="min-w-0 flex-1 space-y-1 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg font-semibold">
                        {b.serviceName}
                      </h3>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-gray-500">
                      Vendor: {b.vendorBusinessName || b.vendorName}
                    </p>
                    <p>
                      Event: {fmtDate(b.eventDate)} · {b.eventLocation}
                    </p>
                    <p className="text-gray-500">
                      Requested on {fmtDate(b.createdAt)}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setOpen(open === b._id ? "" : b._id)}
                      >
                        {open === b._id ? "Hide" : "View"} Details
                      </Button>
                      <Link
                        href={`/services/${b.serviceId}`}
                        className={`${roseBtn} inline-flex h-9 items-center justify-center rounded-md px-3 text-sm`}
                      >
                        View Service
                      </Link>
                      {b.status === "pending" && (
                        <ConfirmButton
                          label="Cancel Request"
                          confirmLabel="Yes, cancel"
                          onConfirm={() => cancel(b._id)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {open === b._id && (
                  <div className="mt-4 space-y-1 rounded-lg bg-rose-50 p-4 text-sm">
                    <p>
                      <span className="text-gray-500">Event Date:</span>{" "}
                      {fmtDate(b.eventDate)}
                    </p>
                    <p>
                      <span className="text-gray-500">Event Location:</span>{" "}
                      {b.eventLocation}
                    </p>
                    <p>
                      <span className="text-gray-500">Your message:</span>{" "}
                      {b.message || "No message"}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No bookings yet"
            text="Browse services and send your first booking request."
          />
        )}
      </QueryState>
    </div>
  );
}
