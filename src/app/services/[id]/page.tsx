"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BookingForm from "./booking-form";
import { publicApi } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  Sparkles,
  ImageIcon,
  MapPin,
} from "lucide-react";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images?: string[];
  vendorName?: string;
  vendorBusinessName?: string;
  vendorImage?: string;
};

export default function ServiceDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: session, isPending } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await publicApi<{ service: Service }>(`/services/${id}`);
        setService(data.service);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#171815] px-5">
        <div className="flex flex-col items-center gap-5">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#20211e]">
            <Sparkles className="h-7 w-7 animate-pulse text-[#d8b68c]" />
            <div className="absolute inset-0 animate-ping rounded-2xl border border-[#d8b68c]/10" />
          </div>

          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#d8b68c]">
              LOADING SERVICE
            </p>
            <p className="mt-2 text-xs text-white/35">
              Preparing something beautiful...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (error || !service) {
    return (
      <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#171815] px-5 text-center">
        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#d8b68c]/10">
          <Heart size={30} className="text-[#d8b68c]" />
        </div>

        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
          Something Went Wrong
        </p>

        <h2 className="font-serif text-3xl text-[#faf9f6] sm:text-4xl">
          {error || "Service Not Found"}
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-white/45">
          Sorry, we couldn&apos;t find the service you&apos;re looking for.
          Please explore our other wedding services.
        </p>

        <Link
          href="/services"
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b68c] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#171815] transition hover:bg-[#faf9f6]"
        >
          <ArrowLeft size={16} />
          Back to Services
        </Link>
      </main>
    );
  }

  const images = service.images ?? [];
  const serviceImage = images[activeImage] || images[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[#171815]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/[0.08] px-5 pb-24 pt-32 text-center sm:px-8 lg:pb-32 lg:pt-40">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#d8b68c]/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/[0.06] px-5 py-2.5">
            <Sparkles size={14} className="text-[#d8b68c]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8b68c]">
              WedPlan Exclusive Service
            </span>
            <Sparkles size={14} className="text-[#d8b68c]" />
          </div>

          <h1 className="font-serif text-4xl leading-tight text-[#faf9f6] sm:text-5xl lg:text-6xl">
            {service.serviceName}
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/45 sm:text-base">
            Discover exceptional wedding services and let us help you create
            unforgettable memories for your special day.
          </p>

          <div className="mt-9">
            <span className="inline-flex rounded-full border border-[#d8b68c]/30 bg-[#d8b68c]/[0.06] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8b68c]">
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
          className="mb-12 inline-flex items-center gap-3 text-xs font-medium text-white/45 transition hover:text-[#d8b68c]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:border-[#d8b68c]/40 hover:bg-[#d8b68c]/10">
            <ArrowLeft size={16} />
          </span>
          Back to Services
        </Link>

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Service Images */}
          <div>
            <div className="group relative">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-[#d8b68c]/30" />

              <div className="relative h-[320px] overflow-hidden rounded-2xl bg-[#20211e] sm:h-[430px] lg:h-[540px]">
                {serviceImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={serviceImage}
                    alt={service.serviceName}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-white/35">
                    <ImageIcon size={42} strokeWidth={1} />
                    <p className="text-xs uppercase tracking-[0.2em]">
                      No Image Available
                    </p>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-md">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    {service.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={img + i}
                    src={img}
                    alt={`${service.serviceName} ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-28 shrink-0 cursor-pointer rounded-lg object-cover transition ${
                      i === activeImage
                        ? "ring-2 ring-[#d8b68c]"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Service Information */}
          <div className="relative">
            <div className="mb-7 flex items-center gap-3 text-[#d8b68c]">
              <Heart size={19} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
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

            {/* Price & Location */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.07] bg-[#20211e] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Price
                </p>
                <p className="mt-2 font-serif text-3xl text-[#d8b68c]">
                  ${Number(service.price).toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-[#20211e] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Location
                </p>
                <p className="mt-2 flex items-center gap-2 text-lg text-white/80">
                  <MapPin size={18} className="shrink-0 text-[#d8b68c]" />
                  {service.location}
                </p>
              </div>
            </div>

            {/* Vendor */}
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#20211e] p-5">
              {service.vendorImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.vendorImage}
                  alt={service.vendorName || "Vendor"}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8b68c] font-semibold text-black">
                  {(service.vendorName || "V").charAt(0).toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Vendor
                </p>
                <p className="mt-1 truncate text-white/85">
                  {service.vendorBusinessName ||
                    service.vendorName ||
                    "WedPlan Vendor"}
                </p>
                {service.vendorBusinessName && service.vendorName && (
                  <p className="truncate text-xs text-white/40">
                    {service.vendorName}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#20211e] p-6 sm:p-7">
              <p className="whitespace-pre-line text-base leading-9 text-white/75">
                {service.description}
              </p>
            </div>

            <p className="mt-6 text-sm leading-8 text-white/40">
              At WedPlan, we believe every wedding deserves something special.
              Our goal is to help you create beautiful memories that last
              forever.
            </p>

            <a
              href="#booking"
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#d8b68c] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#171815] transition hover:bg-[#faf9f6]"
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
        className="scroll-mt-24 border-t border-white/[0.08] bg-[#1c1d19] px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mb-5 inline-flex items-center gap-3 text-[#d8b68c]">
              <span className="h-px w-8 bg-[#d8b68c]/50" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                Start Your Journey
              </span>
              <span className="h-px w-8 bg-[#d8b68c]/50" />
            </div>

            <h2 className="font-serif text-3xl text-[#faf9f6] sm:text-4xl lg:text-5xl">
              Book Your Dream Wedding
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/45">
              Fill out the form below and let us help you make your special day
              unforgettable.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#20211e] p-5 shadow-2xl shadow-black/10 sm:p-8">
            {isPending ? (
              <p className="py-6 text-center text-sm text-white/50">
                Loading...
              </p>
            ) : role === "customer" ? (
              <BookingForm
                serviceId={service._id}
                serviceTitle={service.serviceName}
              />
            ) : (
              <p className="py-6 text-center text-sm leading-7 text-white/55">
                {role === "vendor"
                  ? "Vendors cannot book services. Please sign in with a customer account to book."
                  : role === "admin"
                    ? "Admins cannot submit booking requests."
                    : "Please sign in as a customer to book this service."}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#171815] px-5 py-20 text-center sm:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8b68c]/[0.05] blur-[100px]" />

        <div className="relative mx-auto max-w-2xl">
          <Heart className="mx-auto mb-7 text-[#d8b68c]" size={30} />

          <h2 className="font-serif text-3xl text-[#faf9f6] sm:text-4xl">
            Let&apos;s Make Your Day
            <span className="mt-2 block italic text-[#d8b68c]">Beautiful.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/45">
            Your dream wedding starts with the right plan. Let WedPlan help you
            make every moment memorable.
          </p>

          <Link
            href="/services"
            className="mt-9 inline-flex items-center gap-3 rounded-full border border-[#d8b68c]/40 px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d8b68c] transition hover:bg-[#d8b68c] hover:text-[#171815]"
          >
            Explore More Services
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
