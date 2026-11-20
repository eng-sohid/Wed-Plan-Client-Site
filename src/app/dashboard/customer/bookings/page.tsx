"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  Store,
  Clock3,
  Eye,
  EyeOff,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import type { Booking } from "../../../types";
import { fmtDate } from "@/lib/format";

import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { StatusBadge } from "../../../components/shared/status-badge";
import { ConfirmButton } from "../../../components/shared/confirm-button";

export default function MyBookingsPage() {
  const { data, loading, error, reload } = useApi<{
    bookings: Booking[];
  }>("/customer/bookings");

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
    <div className="space-y-7">
      <PageTitle
        title="My Bookings"
        subtitle="Track your wedding service requests and booking updates."
      />

      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.bookings.length ? (
          <div className="space-y-4">
            {data.bookings.map((b) => (
              <article
                key={b._id}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#20211e] transition hover:border-[#d8b68c]/25"
              >
                <div className="flex flex-col gap-5 p-4 sm:flex-row sm:p-5">
                  <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-[#292a26] sm:h-36 sm:w-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.serviceImage || "/images/placeholder.jpg"}
                      alt={b.serviceName}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-xl font-semibold text-[#faf9f6]">
                        {b.serviceName}
                      </h3>
                      <StatusBadge status={b.status} />
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-sm text-white/45">
                      <Store size={15} className="shrink-0 text-[#d8b68c]" />
                      <span className="truncate">
                        Vendor: {b.vendorBusinessName || b.vendorName}
                      </span>
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-white/65">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-[#d8b68c]"
                        />
                        <span>Event: {fmtDate(b.eventDate)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-white/65">
                        <MapPin size={15} className="shrink-0 text-[#d8b68c]" />
                        <span className="truncate">{b.eventLocation}</span>
                      </div>
                    </div>

                    <p className="mt-3 flex items-center gap-2 text-xs text-white/35">
                      <Clock3 size={13} />
                      Requested on {fmtDate(b.createdAt)}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
                      <button
                        type="button"
                        onClick={() => setOpen(open === b._id ? "" : b._id)}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white/70 transition hover:border-[#d8b68c]/40 hover:text-[#d8b68c]"
                      >
                        {open === b._id ? (
                          <>
                            <EyeOff size={14} />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <Eye size={14} />
                            View Details
                          </>
                        )}
                      </button>

                      <Link
                        href={`/services/${b.serviceId}`}
                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#d8b68c] px-3 text-sm font-semibold text-[#171815] transition hover:bg-[#e7c9a3]"
                      >
                        View Service
                        <ExternalLink size={14} />
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
                  <div className="border-t border-white/[0.08] bg-[#171815] p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <MessageSquare size={17} className="text-[#d8b68c]" />
                      <h4 className="font-serif text-base font-semibold text-[#faf9f6]">
                        Booking Details
                      </h4>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-white/35">Event Date</p>
                        <p className="mt-1 text-sm text-white/75">
                          {fmtDate(b.eventDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/35">Event Location</p>
                        <p className="mt-1 text-sm text-white/75">
                          {b.eventLocation}
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <p className="text-xs text-white/35">Your Message</p>
                        <p className="mt-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm leading-6 text-white/65">
                          {b.message || "No message"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
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
