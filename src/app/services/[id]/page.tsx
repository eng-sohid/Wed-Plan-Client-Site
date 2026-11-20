"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BookingForm from "./booking-form";
import { ArrowLeft, ArrowUpRight, Heart, Sparkles } from "lucide-react";

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
      <main className="flex min-h-[70vh] items-center justify-center bg-[#171815]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b68c]/20 bg-[#20211e]">
            <Sparkles className="h-6 w-6 animate-pulse text-[#d8b68c]" />
          </div>
          <p className="text-xs tracking-[0.25em] text-white/40">
            LOADING SERVICE
          </p>
        </div>
      </main>
    );
  }

  // Error State
  if (error || !service) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#171815] px-5 text-center">
        <Heart size={36} className="mb-6 text-[#d8b68c]" />
        <h2 className="font-serif text-3xl text-[#faf9f6]">
          {error || "Service Not Found"}
        </h2>
        <p className="mt-4 text-sm text-white/45">
          Sorry, we couldn&apos;t find the service you&apos;re looking for.
        </p>
        <Link
          href="/services"
          className="mt-8 inline-flex items-center gap-2 bg-[#d8b68c] px-7 py-3 text-sm font-semibold text-[#171815] transition hover:bg-[#faf9f6]"
        >
          <ArrowLeft size={17} />
          Back to Services
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#171815]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-24 text-center sm:px-8 lg:py-32">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#d8b68c]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-7 flex items-center justify-center gap-3 text-[#d8b68c]">
            <Sparkles size={16} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] sm:text-xs">
              WedPlan Exclusive Service
            </span>
            <Sparkles size={16} />
          </div>

          <h1 className="font-serif text-4xl leading-tight text-[#faf9f6] sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/50 sm:text-base">
            Make your special day unforgettable with our carefully selected
            wedding services.
          </p>

          <div className="mt-9">
            <span className="inline-flex border border-[#d8b68c]/30 bg-[#d8b68c]/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#d8b68c]">
              {service.category}
            </span>
          </div>

          <div className="mx-auto mt-10 h-px w-20 bg-[#d8b68c]/50" />
        </div>
      </section>

      {/* Service Details Section */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <Link
          href="/services"
          className="mb-12 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#d8b68c]"
        >
          <ArrowLeft size={17} />
          Back to Services
        </Link>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Service Image */}
          <div className="group relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-[#d8b68c]/30" />

            <div className="relative h-[320px] overflow-hidden bg-[#20211e] sm:h-[420px] lg:h-[520px]">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-white/40">
                  No Image Available
                </div>
              )}
            </div>
          </div>

          {/* Service Information */}
          <div className="relative">
            <div className="mb-6 flex items-center gap-3 text-[#d8b68c]">
              <Heart size={19} />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                Your Dream, Our Passion
              </span>
            </div>

            <h2 className="font-serif text-3xl leading-tight text-[#faf9f6] sm:text-4xl lg:text-5xl">
              Make Your Wedding
              <span className="mt-2 block italic text-[#d8b68c]">
                Truly Special.
              </span>
            </h2>

            <div className="my-8 h-px w-20 bg-[#d8b68c]/60" />

            <p className="text-base leading-9 text-white/70">
              {service.description}
            </p>

            <p className="mt-6 text-sm leading-8 text-white/40">
              At WedPlan, we believe every wedding deserves something special.
              Our goal is to help you create beautiful memories that last
              forever.
            </p>

            <a
              href="#booking"
              className="group mt-9 inline-flex items-center gap-4 bg-[#d8b68c] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#171815] transition hover:bg-[#faf9f6]"
            >
              Book This Service
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section
        id="booking"
        className="scroll-mt-24 border-t border-white/10 bg-[#1c1d19] px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
              Start Your Journey
            </p>

            <h2 className="mt-5 font-serif text-3xl text-[#faf9f6] sm:text-4xl">
              Book Your Dream Wedding
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/45">
              Fill out the form below and let us help you make your special day
              unforgettable.
            </p>
          </div>

          <BookingForm serviceId={service._id} serviceTitle={service.title} />
        </div>
      </section>

      {/* Bottom Section */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#171815] px-5 py-20 text-center sm:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8b68c]/5 blur-[100px]" />

        <div className="relative mx-auto max-w-2xl">
          <Heart className="mx-auto mb-6 text-[#d8b68c]" size={30} />

          <h2 className="font-serif text-3xl text-[#faf9f6] sm:text-4xl">
            Let&apos;s Make Your Day
            <span className="block mt-2 italic text-[#d8b68c]">Beautiful.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/45">
            Your dream wedding starts with the right plan. Let WedPlan help you
            make every moment memorable.
          </p>

          <Link
            href="/services"
            className="mt-9 inline-flex items-center gap-3 border border-[#d8b68c]/40 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#d8b68c] transition hover:bg-[#d8b68c] hover:text-[#171815]"
          >
            Explore More Services
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
