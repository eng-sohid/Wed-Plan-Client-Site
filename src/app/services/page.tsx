import { Suspense } from "react";
import ServiceList from "../components/services/service-list";
import { LoadingSpinner } from "../components/shared/loading-spinner";

export const metadata = { title: "Browse Services — WedPlan" };

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#171815]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-24 text-center sm:px-8 lg:py-32">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#d8b68c]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
            Discover WedPlan
          </p>

          <h1 className="font-serif text-4xl leading-tight text-[#faf9f6] sm:text-5xl lg:text-6xl">
            Everything For Your
            <span className="block italic text-[#d8b68c]">Dream Wedding.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/50 sm:text-base">
            Explore our exclusive wedding services and let us make your special
            day truly unforgettable.
          </p>

          <div className="mx-auto mt-10 h-px w-20 bg-[#d8b68c]/50" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <Suspense fallback={<LoadingSpinner />}>
          <ServiceList />
        </Suspense>
      </div>
    </main>
  );
}
