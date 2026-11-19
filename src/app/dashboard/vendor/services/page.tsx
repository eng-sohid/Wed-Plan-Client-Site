"use client";
import Link from "next/link";
import { toast } from "sonner";
import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import type { Service } from "../../../types";
import { money, roseBtn } from "@/lib/format";
import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { StatusBadge } from "../../../components/shared/status-badge";
import { ConfirmButton } from "../../../components/shared/confirm-button";
import { Button } from "@/components/ui/button";

export default function MyServicesPage() {
  const { data, loading, error, reload } = useApi<{ services: Service[] }>(
    "/vendor/services",
  );

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
    <div>
      <PageTitle
        title="My Services"
        subtitle="Manage the services you offer"
        action={
          <Link href="/dashboard/vendor/services/add" className={roseBtn}>
            Add Service
          </Link>
        }
      />
      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.services.length ? (
          <div className="space-y-4">
            {data.services.map((s) => (
              <div
                key={s._id}
                className="flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.images?.[0] || "/images/placeholder.jpg"}
                  alt={s.serviceName}
                  className="h-32 w-full rounded-xl object-cover sm:w-44"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-semibold">
                      {s.serviceName}
                    </h3>
                    <StatusBadge status={s.status} />
                    {!s.isActive && (
                      <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {s.category} · {s.location}
                  </p>
                  <p className="mt-1 font-bold text-rose-600">
                    {money(s.price)}
                  </p>
                  {s.status === "rejected" && (
                    <p className="mt-1 text-xs text-red-600">
                      Rejected services are hidden from customers.
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggle(s)}
                    >
                      {s.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Link href={`/dashboard/vendor/services/${s._id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                    <ConfirmButton
                      label="Delete"
                      confirmLabel="Yes, delete"
                      onConfirm={() => remove(s._id)}
                    />
                  </div>
                </div>
              </div>
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
