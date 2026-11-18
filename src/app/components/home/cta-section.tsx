import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 lg:px-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-rose-500 px-8 py-16 text-center md:px-16 md:py-24">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-white/10" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <Heart size={42} fill="white" className="mx-auto mb-6 text-white" />

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-rose-100">
            Your Journey Starts Here
          </p>

          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            Let&apos;s Make Your Dream Wedding Come True!
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-rose-50">
            Every love story deserves a beautiful celebration. Let our expert
            team help you create unforgettable memories.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-rose-600 transition hover:bg-rose-50"
          >
            Start Planning Now
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
