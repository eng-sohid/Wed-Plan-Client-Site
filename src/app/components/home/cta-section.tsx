import Link from "next/link";
import { Heart, ArrowUpRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#171815] px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden border border-[#d8b68c]/20 bg-[#20211e] px-7 py-20 text-center sm:px-12 lg:py-28">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full border border-[#d8b68c]/10" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full border border-[#d8b68c]/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c6a477]/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b68c]/40 text-[#d8b68c]">
            <Heart size={27} strokeWidth={1.4} />
          </div>

          <div className="mb-6 flex items-center justify-center gap-3">
            <Sparkles size={15} className="text-[#d8b68c]" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
              Your Journey Starts Here
            </p>
            <Sparkles size={15} className="text-[#d8b68c]" />
          </div>

          <h2 className="font-serif text-4xl leading-tight text-[#faf9f6] sm:text-5xl lg:text-6xl">
            Let&apos;s Make Your
            <span className="block italic text-[#d8b68c]">
              Dream Wedding Come True.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/50 sm:text-base">
            Every love story deserves a beautiful celebration. Let our expert
            team help you create unforgettable memories.
          </p>

          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-4 bg-[#d8b68c] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#171815] transition-all duration-300 hover:bg-[#faf9f6]"
          >
            Start Planning Now
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>

          <p className="mt-10 font-serif text-lg italic text-white/35">
            Because your forever deserves something extraordinary.
          </p>
        </div>
      </div>
    </section>
  );
}
