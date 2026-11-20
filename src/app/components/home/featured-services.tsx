"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useApi } from "../../hooks/use-api";
import type { Service } from "../../types";
import { ServiceCard } from "../../components/services/service-card";
import { QueryState, EmptyState } from "../../components/shared/query-state";

export default function FeaturedServices() {
  const { data, loading, error, reload } = useApi<{
    services: Service[];
  }>("/services?limit=6", false);

  return (
    <section className="relative overflow-hidden bg-[#171815] px-5 py-24 sm:px-8 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Sparkles size={17} className="text-[#c6a477]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a477]">
                Curated For Your Celebration
              </span>
            </div>

            <h2 className="max-w-2xl font-serif text-4xl leading-tight text-[#faf9f6] sm:text-5xl lg:text-6xl">
              Discover Services
              <span className="block italic text-[#c6a477]">
                Worth Remembering.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              From intimate moments to grand celebrations, discover exceptional
              wedding professionals who make every detail unforgettable.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#c6a477]/50 pb-2 text-sm font-medium text-[#faf9f6] transition hover:border-[#c6a477] hover:text-[#c6a477]"
          >
            Explore All Services
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Services Grid */}
        <QueryState loading={loading} error={error} onRetry={reload}>
          {data?.services.length ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  variant="featured"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No services yet"
              text="Check back soon for new wedding services."
            />
          )}
        </QueryState>

        {/* Bottom note */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs tracking-wide text-white/40">
            YOUR DREAM WEDDING, BEAUTIFULLY PLANNED.
          </p>

          <Link
            href="/services"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a477] transition hover:text-white"
          >
            Find Your Perfect Match →
          </Link>
        </div>
      </div>
    </section>
  );
}
