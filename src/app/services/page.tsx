import { Suspense } from "react";
import ServiceList from "../components/services/service-list";
import { LoadingSpinner } from "../components/shared/loading-spinner";

export const metadata = { title: "Browse Services — WedPlan" };

export default function ServicesPage() {
  return (
    <>
      <section className="bg-rose-50 px-4 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
          Our Services
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-gray-900 sm:text-5xl">
          Everything For Your Dream Wedding
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Explore our exclusive wedding services and let us make your special
          day truly unforgettable.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <Suspense fallback={<LoadingSpinner />}>
          <ServiceList />
        </Suspense>
      </div>
    </>
  );
}
