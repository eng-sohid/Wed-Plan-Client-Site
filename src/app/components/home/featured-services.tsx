"use client";
import Link from "next/link";
import { useApi } from "../../hooks/use-api";
import type { Service } from "../../types";
import { ServiceCard } from "../../components/services/service-card";
import { QueryState, EmptyState } from "../../components/shared/query-state";
import { Button } from "@/components/ui/button";

export default function FeaturedServices() {
  const { data, loading, error, reload } = useApi<{ services: Service[] }>(
    "/services?limit=6",
    false,
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">
          Featured Wedding Services
        </h2>
        <p className="mt-2 text-gray-500">
          Hand-picked services from our approved vendors
        </p>
      </div>
      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.services.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((s) => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No services yet"
            text="Check back soon for new wedding services."
          />
        )}
      </QueryState>
      <div className="mt-10 text-center">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/services")}
        >
          View all services
        </Button>
      </div>
    </section>
  );
}
