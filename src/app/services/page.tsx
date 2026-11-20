import { Suspense } from "react";
import { ArrowDown, Sparkles, Heart, Gem } from "lucide-react";

import ServiceList from "../components/services/service-list";
import { LoadingSpinner } from "../components/shared/loading-spinner";

export const metadata = {
  title: "Browse Services — WedPlan",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#171815]">
      {/* Hero Section */}
      <section className="relative flex min-h-[540px] items-center justify-center overflow-hidden border-b border-white/[0.08] px-5 py-24 text-center sm:min-h-[620px] sm:px-8 lg:min-h-[680px]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-40 -top-32 h-[450px] w-[450px] rounded-full bg-[#526b50]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#d8b68c]/[0.07] blur-[130px]" />

        {/* Decorative Rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] sm:h-[560px] sm:w-[560px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8b68c]/[0.06] sm:h-[440px] sm:w-[440px]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/[0.06] px-5 py-2.5">
            <Sparkles size={13} className="text-[#d8b68c]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
              Discover WedPlan
            </span>
            <Sparkles size={13} className="text-[#d8b68c]" />
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl leading-[1.12] tracking-tight text-[#faf9f6] sm:text-6xl lg:text-7xl">
            Every Detail.
            <span className="mt-2 block italic text-[#d8b68c]">
              Beautifully Planned.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-white/45 sm:text-base">
            From the first inspiration to the final celebration, discover
            exceptional wedding services and trusted professionals who bring
            your dream day to life.
          </p>

          {/* Decorative Divider */}
          <div className="mx-auto mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d8b68c]/60" />
            <Heart size={15} className="text-[#d8b68c]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d8b68c]/60" />
          </div>

          {/* Explore Indicator */}
          <a
            href="#services"
            className="group mx-auto mt-12 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 transition hover:text-[#d8b68c]"
          >
            Explore Services
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition group-hover:border-[#d8b68c]/50 group-hover:bg-[#d8b68c]/10">
              <ArrowDown
                size={14}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </span>
          </a>
        </div>

        {/* Side Decoration */}
        <div className="pointer-events-none absolute bottom-10 left-8 hidden items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/20 lg:flex">
          <Gem size={13} className="text-[#d8b68c]/50" />
          <span>Curated With Love</span>
        </div>

        <div className="pointer-events-none absolute bottom-10 right-8 hidden text-[9px] uppercase tracking-[0.25em] text-white/20 lg:block">
          Your Day. Your Story.
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ServiceList />
        </Suspense>
      </section>
    </main>
  );
}
