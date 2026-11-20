"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  Plus,
  MapPin,
  Tag,
  Power,
  Pencil,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import type { Service } from "../../../types";
import { money } from "@/lib/format";

import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { StatusBadge } from "../../../components/shared/status-badge";
import { ConfirmButton } from "../../../components/shared/confirm-button";
import { Button } from "@/components/ui/button";

export default function MyServicesPage() {
  const { data, loading, error, reload } = useApi<{
    services: Service[];
  }>("/vendor/services");

  async function toggle(s: Service) {
    try {
      const res = await api<{ message: string }>(
        `/services/${s._id}/availability`,
        {
          method: "PATCH",
          body: { isActive: !s.isActive },
        },
      );

      toast.success(res.message);
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  async function remove(id: string) {
    try {
      await api(`/services/${id}`, { method: "DELETE" });
      toast.success("Service deleted");
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  return (
    <div className="space-y-7">
      <PageTitle
        title="My Services"
        subtitle="Manage and monitor the wedding services you offer."
        action={
          <Link
            href="/dashboard/vendor/services/add"
            className="inline-flex items-center gap-2 rounded-xl bg-[#d8b68c] px-4 py-2.5 text-sm font-semibold text-[#171815] transition hover:bg-[#e7c9a3]"
          >
            <Plus size={17} />
            Add Service
          </Link>
        }
      />

      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.services.length ? (
          <div className="space-y-4">
            {data.services.map((s) => (
              <article
                key={s._id}
                className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#20211e] transition hover:border-[#d8b68c]/30"
              >
                <div className="flex flex-col gap-5 p-4 sm:flex-row sm:p-5">
                  <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-[#292a26] sm:h-36 sm:w-48">
                    {s.images?.[0] ? (
                      <img
                        src={s.images[0]}
                        alt={s.serviceName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/20">
                        <ImageIcon size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-xl font-semibold text-[#faf9f6]">
                          {s.serviceName}
                        </h3>

                        <StatusBadge status={s.status} />

                        {!s.isActive && (
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                            Inactive
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/45">
                        <span className="inline-flex items-center gap-1.5">
                          <Tag size={14} />
                          {s.category}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {s.location}
                        </span>
                      </div>

                      <p className="mt-3 font-serif text-2xl font-semibold text-[#d8b68c]">
                        {money(s.price)}
                      </p>

                      {s.status === "rejected" && (
                        <p className="mt-2 text-xs text-red-400">
                          Rejected services are hidden from customers.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggle(s)}
                        className="border-white/10 bg-white/[0.04] text-white/75 hover:border-[#d8b68c]/40 hover:bg-[#d8b68c]/10 hover:text-[#d8b68c]"
                      >
                        <Power size={14} className="mr-1.5" />
                        {s.isActive ? "Deactivate" : "Activate"}
                      </Button>

                      <Link
                        href={`/dashboard/vendor/services/${s._id}/edit`}
                        className="inline-flex h-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/75 transition hover:border-[#d8b68c]/40 hover:bg-[#d8b68c]/10 hover:text-[#d8b68c]"
                      >
                        <Pencil size={14} className="mr-1.5" />
                        Edit
                      </Link>

                      <ConfirmButton
                        label="Delete"
                        confirmLabel="Yes, delete"
                        onConfirm={() => remove(s._id)}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No services yet"
            text="Add your first wedding service to get started."
          />
        )}
      </QueryState>
    </div>
  );
}
