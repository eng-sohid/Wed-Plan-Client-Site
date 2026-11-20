"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const weddingImage =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=2200&q=90";

const services = ["WEDDING PLANNING", "PHOTOGRAPHY", "DECORATION", "CATERING"];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b0c0b] px-3 pb-3 pt-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto min-h-[760px] max-w-[1600px] overflow-hidden rounded-[24px] bg-[#252724] sm:min-h-[820px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${weddingImage}")` }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

        {/* Decorative circles */}
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full border border-white/10" />
        <div className="absolute -right-20 top-40 h-[350px] w-[350px] rounded-full border border-white/10" />

        {/* Hero Content (navbar upore fixed thake, tai pt-28) */}
        <div className="relative z-10 flex min-h-[760px] flex-col sm:min-h-[820px]">
          <div className="flex flex-1 items-center px-6 pb-20 pt-28 sm:px-10 lg:px-16">
            {/* Vertical Navigation */}
            <div className="absolute left-7 top-1/2 hidden -translate-y-1/2 -rotate-180 flex-col items-center gap-10 [writing-mode:vertical-rl] lg:flex">
              {services.map((name) => (
                <Link
                  key={name}
                  href="/services"
                  className="text-[10px] tracking-[0.16em] text-white/65 transition hover:text-white"
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Main Heading */}
            <div className="mx-auto w-full max-w-6xl lg:pl-24">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <p className="mb-7 flex items-center gap-3 text-[10px] font-medium tracking-[0.35em] text-[#d8b68c] sm:text-xs">
                  <span className="h-px w-10 bg-[#d8b68c]" />
                  WHERE YOUR FOREVER BEGINS
                </p>

                <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[1.15] tracking-tight text-white sm:text-7xl lg:text-[100px]">
                  Your Dream
                  <br />
                  Wedding
                  <br />
                  <span className="italic text-[#d8b68c]">Starts Here.</span>
                </h1>

                <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-12">
                  <p className="max-w-sm text-sm leading-7 text-white/70 sm:text-base">
                    From unforgettable moments to extraordinary details,
                    discover everything you need to create your perfect
                    celebration.
                  </p>

                  <Link
                    href="/services"
                    className="group inline-flex w-fit items-center gap-4 border-b border-white/50 pb-3 text-xs tracking-[0.2em] text-white transition hover:border-[#d8b68c] hover:text-[#d8b68c]"
                  >
                    EXPLORE WEDDING SERVICES
                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <Link
                  href="/services"
                  aria-label="Explore wedding services"
                  className="group mt-12 flex h-16 w-16 items-center justify-center rounded-full border border-white/60 text-white transition duration-500 hover:rotate-45 hover:border-[#d8b68c] hover:bg-[#d8b68c] hover:text-black sm:mt-16"
                >
                  <ArrowDown size={22} />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom Details */}
          <div className="relative flex items-end justify-between px-6 pb-8 sm:px-10 lg:px-16">
            <p className="font-serif text-5xl font-bold tracking-tighter text-transparent opacity-40 [-webkit-text-stroke:1px_white] sm:text-7xl lg:text-8xl">
              WEDDING
            </p>

            <div className="hidden text-right sm:block">
              <p className="text-[10px] tracking-[0.3em] text-white/50">
                MADE WITH LOVE
              </p>
              <p className="mt-2 font-serif text-lg italic text-white/80">
                For your forever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
