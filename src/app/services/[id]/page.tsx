"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import BookingForm from "./booking-form";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type Service = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

export default function ServiceDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${BASE_URL}/services/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Service not found!");
        }

        setService(data.service);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong!",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-200 border-t-rose-500" />
        </div>
      </>
    );
  }

  // Error State
  if (error || !service) {
    return (
      <>
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {error || "Service Not Found"}
          </h2>

          <Link
            href="/services"
            className="mt-6 rounded-full bg-rose-500 px-7 py-3 text-white transition hover:bg-rose-600"
          >
            Back to Services
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#fffaf9]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-rose-50 px-6 py-16 text-center md:py-24">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-rose-200/30 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mb-5 flex items-center justify-center gap-2 text-rose-500">
              <Sparkles size={18} />

              <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                WedPlan Exclusive Service
              </span>

              <Sparkles size={18} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              {service.title}
            </h1>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-gray-600">
              Make your special day unforgettable with our carefully selected
              wedding services.
            </p>

            <div className="mt-8 flex justify-center">
              <span className="rounded-full border border-rose-200 bg-white px-6 py-2 text-sm font-semibold text-rose-500 shadow-sm">
                {service.category}
              </span>
            </div>
          </div>
        </section>

        {/* Service Details Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <Link
            href="/services"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-rose-500"
          >
            <ArrowLeft size={18} />
            Back to Services
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Service Image */}
            <div className="group relative">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-2 border-rose-200" />

              <div className="relative h-[320px] overflow-hidden rounded-3xl shadow-xl md:h-[500px]">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={300}
                  />
                ) : (
                  <div className="flex h-[300px] items-center justify-center bg-gray-100">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* Service Information */}
            <div>
              <div className="mb-5 flex items-center gap-2 text-rose-500">
                <Heart size={18} />

                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Your Dream, Our Passion
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Make Your Wedding
                <span className="mt-2 block text-rose-500">Truly Special</span>
              </h2>

              <div className="my-7 h-1 w-20 rounded-full bg-rose-400" />

              <p className="text-lg leading-9 text-gray-600">
                {service.description}
              </p>

              <p className="mt-5 leading-8 text-gray-500">
                At WedPlan, we believe every wedding deserves something special.
                Our goal is to help you create beautiful memories that last
                forever.
              </p>

              {/* Booking Button */}
              <a
                href="#booking"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-rose-500 px-8 py-4 font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-1 hover:bg-rose-600"
              >
                Book This Service
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section
          id="booking"
          className="scroll-mt-24 bg-rose-50/60 px-6 py-16 md:py-24"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
                Start Your Journey
              </p>

              <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Book Your Dream Wedding
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
                Fill out the form below and let us help you make your special
                day unforgettable.
              </p>
            </div>

            <BookingForm serviceId={service._id} serviceTitle={service.title} />
          </div>
        </section>

        {/* Bottom Section */}
        <section className="bg-white px-6 py-16 text-center">
          <Heart className="mx-auto mb-5 text-rose-400" size={30} />

          <h2 className="text-3xl font-bold text-gray-900">
            Let&apos;s Make Your Day Beautiful
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
            Your dream wedding starts with the right plan. Let WedPlan help you
            make every moment memorable.
          </p>

          <Link
            href="/services"
            className="mt-8 inline-block rounded-full border border-rose-400 px-8 py-3 font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
          >
            Explore More Services
          </Link>
        </section>
      </main>
    </>
  );
}
