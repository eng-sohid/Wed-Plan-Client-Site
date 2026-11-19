"use client";
import { useParams } from "next/navigation";
import { useApi } from "../../../../../hooks/use-api";
import type { Service } from "../../../../../types";
import ServiceForm from "../../../../../components/dashboard/service-form";
import { PageTitle } from "../../../../../components/shared/page-title";
import { QueryState } from "../../../../../components/shared/query-state";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, reload } = useApi<{ services: Service[] }>(
    "/vendor/services",
  );
  const service = data?.services.find((s) => s._id === id);

  return (
    <div>
      <PageTitle
        title="Edit Service"
        subtitle="Editing an approved service sends it back for review"
      />
      <QueryState
        loading={loading}
        error={error || (!loading && !service ? "Service not found" : "")}
        onRetry={reload}
      >
        {service && <ServiceForm initial={service} />}
      </QueryState>
    </div>
  );
}
