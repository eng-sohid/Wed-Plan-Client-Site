"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/layout/navbar";

type Service = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/services");

        if (!response.ok) {
          throw new Error("Failed to fetch services!");
        }

        const data = await response.json();

        setServices(data.services);
      } catch (error) {
        console.error("Services Fetch Error:", error);
        setError("Unable to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <section className="bg-rose-50 px-6 py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Our Services
          </p>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Everything For Your Dream Wedding
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-500">
            Explore our exclusive wedding services and let us make your special
            day truly unforgettable.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Explore Our Services
            </h2>
            <p className="mt-2 text-gray-500">
              Find everything you need in one place.
            </p>
          </div>

          {loading ? (
            <p className="py-16 text-center text-gray-500">
              Loading services...
            </p>
          ) : error ? (
            <p className="py-16 text-center text-red-500">{error}</p>
          ) : services.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No services available right now.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-500">
                      {service.category}
                    </span>

                    <h3 className="mt-4 text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-500">
                      {service.description}
                    </p>

                    <Link
                      href={`/services/${service._id}`}
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-rose-500 transition hover:gap-4"
                    >
                      Explore Details <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
