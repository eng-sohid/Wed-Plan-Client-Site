"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#faf9f6]">
      <div className="container-width grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e8e6de] bg-white px-4 py-2">
            <Sparkles size={15} className="text-[#c5a46d]" />
            <span className="text-xs font-semibold tracking-wide text-[#526b50]">
              YOUR DREAM WEDDING STARTS HERE
            </span>
          </div>

          <h1 className="max-w-xl text-5xl leading-[1.15] font-semibold tracking-tight text-[#252820] sm:text-6xl lg:text-7xl">
            Every Love Story Deserves a{" "}
            <span className="font-serif italic text-[#526b50]">
              Perfect Day.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#77796f] sm:text-lg">
            Discover trusted wedding vendors, explore beautiful venues, and
            bring your dream celebration to life with WedPlan.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 rounded-full bg-[#526b50] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#40563e]"
            >
              Explore Wedding Services
              <ArrowUpRight size={18} />
            </Link>

            <Link
              href="#about"
              className="rounded-full border border-[#deddd4] px-7 py-4 text-sm font-semibold text-[#526b50] transition hover:bg-white"
            >
              Discover More
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-[#faf9f6] bg-[#d9c5aa]" />
              <div className="h-10 w-10 rounded-full border-2 border-[#faf9f6] bg-[#a8b49d]" />
              <div className="h-10 w-10 rounded-full border-2 border-[#faf9f6] bg-[#d7a99c]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#252820]">
                Made for your special day
              </p>
              <p className="text-xs text-[#77796f]">
                One platform. Endless possibilities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative mx-auto w-full max-w-[540px]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[220px] rounded-b-3xl bg-[#e9e8df]">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000"
              alt="Beautiful wedding celebration"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-[#e8e6de] bg-white p-4 shadow-lg sm:-left-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef1e9]">
              <Heart size={21} className="text-[#526b50]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#252820]">
                Your Day, Your Way
              </p>
              <p className="text-xs text-[#77796f]">Everything in one place</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
