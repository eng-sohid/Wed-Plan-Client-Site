"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Search,
  MapPin,
  Store,
  CheckCircle2,
  XCircle,
  Trash2,
  Layers3,
} from "lucide-react";
import { toast } from "sonner";

import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import { CATEGORIES, type Service } from "../../../types";
import { money, selectCls } from "@/lib/format";

import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { StatusBadge } from "../../../components/shared/status-badge";
import { ConfirmButton } from "../../../components/shared/confirm-button";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ManageServicesPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const qs = new URLSearchParams();
  if (debounced) qs.set("search", debounced);
  if (status) qs.set("status", status);
  if (category) qs.set("category", category);

  const { data, loading, error, reload } = useApi<{
    services: Service[];
  }>(`/admin/services?${qs}`);

  async function setSt(id: string, st: string) {
    try {
      const r = await api<{ message: string }>(`/admin/services/${id}/status`, {
        method: "PATCH",
        body: { status: st },
      });

      toast.success(r.message);
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  async function remove(id: string) {
    try {
      await api(`/admin/services/${id}`, {
        method: "DELETE",
      });

      toast.success("Service deleted");
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  return (
    <div className="space-y-7">
      <PageTitle
        title="Manage Services"
        subtitle="Review vendor listings and maintain service quality across WedPlan."
      />

      {/* Header Panel */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#20211e] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#526b50]/20 blur-[90px]" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#d8b68c]/10 text-[#d8b68c]">
              <BriefcaseBusiness size={27} strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-[#faf9f6] sm:text-2xl">
                Service Moderation
              </h2>
              <p className="mt-1 text-sm text-white/40">
                Review, approve and manage vendor service listings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#171815] px-4 py-2 text-xs text-white/50">
            <Layers3 size={15} className="text-[#d8b68c]" />
            {data?.services.length ?? 0} services
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-white/10 bg-[#20211e] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Search size={17} className="text-[#d8b68c]" />
          <h3 className="text-sm font-semibold text-[#faf9f6]">
            Filter Services
          </h3>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            />

            <Input
              placeholder="Search service name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 border-white/10 bg-[#171815] pl-10 text-[#faf9f6] placeholder:text-white/30 focus-visible:ring-[#d8b68c]/40"
            />
          </div>

          <select
            className={`${selectCls} h-11 border-white/10 bg-[#171815] text-[#faf9f6]`}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            className={`${selectCls} h-11 border-white/10 bg-[#171815] text-[#faf9f6]`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Services Table */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#20211e]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#faf9f6]">
              Service Listings
            </h3>
            <p className="mt-1 text-xs text-white/40">
              Review and manage submitted vendor services.
            </p>
          </div>

          <span className="rounded-full border border-white/10 bg-[#171815] px-3 py-1.5 text-xs text-white/50">
            {data?.services.length ?? 0} results
          </span>
        </div>

        <QueryState loading={loading} error={error} onRetry={reload}>
          {data?.services.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-[#171815] text-[11px] uppercase tracking-wider text-white/35">
                  <tr>
                    <th className="px-5 py-4 font-medium">Service</th>
                    <th className="px-5 py-4 font-medium">Vendor</th>
                    <th className="px-5 py-4 font-medium">Price</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.services.map((s) => (
                    <tr
                      key={s._id}
                      className="border-t border-white/[0.06] transition hover:bg-white/[0.025]"
                    >
                      {/* Service */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.images?.[0] || "/images/placeholder.jpg"}
                            alt=""
                            className="h-14 w-16 shrink-0 rounded-xl border border-white/10 object-cover"
                          />

                          <div className="max-w-[230px]">
                            <p className="font-medium text-[#faf9f6]">
                              {s.serviceName}
                            </p>

                            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/40">
                              <MapPin size={12} />
                              {s.location}
                            </p>

                            <p className="mt-1 text-[11px] text-[#d8b68c]/70">
                              {s.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Vendor */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Store size={15} className="shrink-0 text-white/30" />

                          <span className="text-white/70">
                            {s.vendorBusinessName || s.vendorName}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-[#faf9f6]">
                          {money(s.price)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={s.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap justify-end gap-2">
                          {s.status !== "approved" && (
                            <Button
                              size="sm"
                              className="border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 shadow-none hover:bg-emerald-400/20"
                              onClick={() => setSt(s._id, "approved")}
                            >
                              <CheckCircle2 size={14} className="mr-1.5" />
                              Approve
                            </Button>
                          )}

                          {s.status !== "rejected" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/10 bg-transparent text-white/60 hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
                              onClick={() => setSt(s._id, "rejected")}
                            >
                              <XCircle size={14} className="mr-1.5" />
                              Reject
                            </Button>
                          )}

                          <ConfirmButton
                            label="Delete"
                            confirmLabel="Yes, delete"
                            onConfirm={() => remove(s._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <EmptyState title="No services found" />
            </div>
          )}
        </QueryState>
      </section>
    </div>
  );
}
