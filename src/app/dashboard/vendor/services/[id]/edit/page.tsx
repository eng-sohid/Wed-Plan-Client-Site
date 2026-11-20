"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, PencilLine } from "lucide-react";
import Link from "next/link";

import { useApi } from "../../../../../hooks/use-api";
import type { Service } from "../../../../../types";
import ServiceForm from "../../../../../components/dashboard/service-form";

import { PageTitle } from "../../../../../components/shared/page-title";
import { QueryState } from "../../../../../components/shared/query-state";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error, reload } = useApi<{
    services: Service[];
  }>("/vendor/services");

  const service = data?.services.find((s) => s._id === id);

  return (
    <div className="space-y-7">
      <Link
        href="/dashboard/vendor/services"
        className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-[#d8b68c]"
      >
        <ArrowLeft size={16} />
        Back to My Services
      </Link>

      <PageTitle
        title="Edit Service"
        subtitle="Update your service details and keep your listing accurate."
      />

      <QueryState
        loading={loading}
        error={error || (!loading && !service ? "Service not found" : "")}
        onRetry={reload}
      >
        {service && (
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#20211e]">
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-5 sm:px-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d8b68c]/10 text-[#d8b68c]">
                <PencilLine size={20} />
              </div>

              <div>
                <h2 className="font-serif text-lg font-semibold text-[#faf9f6]">
                  Service Information
                </h2>
                <p className="text-xs text-white/40">
                  Make changes to your wedding service
                </p>
              </div>
            </div>

            {service.status === "approved" && (
              <div className="mx-5 mt-5 rounded-xl border border-[#d8b68c]/20 bg-[#d8b68c]/[0.06] px-4 py-3 text-sm text-[#d8b68c] sm:mx-7">
                Editing an approved service sends it back for review.
              </div>
            )}

            <div className="p-5 sm:p-7">
              <ServiceForm initial={service} />
            </div>
          </div>
        )}
      </QueryState>
    </div>
  );
}
