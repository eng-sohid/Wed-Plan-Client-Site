"use client";

import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  BriefcaseBusiness,
  MessageSquare,
  Check,
  X,
  Mail,
} from "lucide-react";

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
  const { data, loading, error, reload } = useApi<{
    bookings: Booking[];
  }>("/vendor/bookings");

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
    <div className="space-y-7">
      <PageTitle
        title="Booking Requests"
        subtitle="Review customer requests and manage your upcoming wedding events."
      />

      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.bookings.length ? (
          <div className="space-y-4">
            {data.bookings.map((b) => (
              <article
                key={b._id}
                className="rounded-2xl border border-white/[0.08] bg-[#20211e] p-5 transition hover:border-[#d8b68c]/25 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar
                      src={b.customerImage}
                      name={b.customerName}
                      size={48}
                    />

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-[#faf9f6]">
                        {b.customerName}
                      </h3>

                      <p className="mt-1 flex items-center gap-1.5 text-xs text-white/40">
                        <Mail size={13} />
                        <span className="truncate">{b.customerEmail}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <StatusBadge status={b.status} />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 rounded-xl border border-white/[0.06] bg-[#171815] p-4 sm:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <BriefcaseBusiness
                      size={17}
                      className="mt-0.5 shrink-0 text-[#d8b68c]"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                        Service
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-white/85">
                        {b.serviceName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={17}
                      className="mt-0.5 shrink-0 text-[#d8b68c]"
                    />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                        Event Date
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/85">
                        {fmtDate(b.eventDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-[#d8b68c]"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                        Location
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-white/85">
                        {b.eventLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {b.message && (
                  <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d8b68c]">
                      <MessageSquare size={14} />
                      Customer Message
                    </div>

                    <p className="text-sm leading-6 text-white/60">
                      “{b.message}”
                    </p>
                  </div>
                )}

                {b.status === "pending" && (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
                    <Button
                      size="sm"
                      onClick={() => act(b._id, "accepted")}
                      className="bg-[#d8b68c] text-[#171815] hover:bg-[#e7c9a3]"
                    >
                      <Check size={15} className="mr-1.5" />
                      Accept Request
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => act(b._id, "rejected")}
                      className="border-red-400/20 bg-red-400/[0.05] text-red-400 hover:bg-red-400/10 hover:text-red-300"
                    >
                      <X size={15} className="mr-1.5" />
                      Reject
                    </Button>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No booking requests yet"
            text="When customers book your services, their requests will appear here."
          />
        )}
      </QueryState>
    </div>
  );
}
