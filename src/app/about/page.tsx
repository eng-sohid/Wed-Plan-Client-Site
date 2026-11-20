import Image from "next/image";
import Link from "next/link";
import { Heart, Target, Eye, Award, ArrowUpRight } from "lucide-react";

const values = [
  {
    icon: Heart,
    number: "01",
    title: "Our Passion",
    description:
      "We love creating beautiful wedding experiences that celebrate every unique love story.",
  },
  {
    icon: Target,
    number: "02",
    title: "Our Mission",
    description:
      "Our mission is to make wedding planning simple, enjoyable, and stress-free for every couple.",
  },
  {
    icon: Eye,
    number: "03",
    title: "Our Vision",
    description:
      "We aim to become a trusted wedding planning platform where every dream celebration begins.",
  },
  {
    icon: Award,
    number: "04",
    title: "Our Commitment",
    description:
      "We are committed to quality, creativity, and making every special moment unforgettable.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#171815] text-[#faf9f6]">
      {/* Hero */}
      <section className="relative border-b border-white/[0.06] px-6 py-24 text-center md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#526b50]/15 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#d8b68c]">
            The Story Behind WedPlan
          </p>

          <h1 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Making Every Wedding
            <span className="mt-2 block italic text-[#d8b68c]">Special</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/50 md:text-base">
            We believe every love story deserves a beautiful celebration. Our
            goal is to turn your wedding dreams into unforgettable memories.
          </p>

          <div className="mx-auto mt-10 h-px w-20 bg-[#d8b68c]/60" />
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28 lg:px-20">
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-28 w-28 border-l border-t border-[#d8b68c]/50" />

          <div className="relative h-[360px] overflow-hidden rounded-2xl md:h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"
              alt="Beautiful wedding celebration"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -right-3 rounded-xl border border-white/10 bg-[#20211e] px-6 py-5 shadow-2xl md:-right-6">
            <p className="font-serif text-2xl italic text-[#d8b68c]">
              Your Day,
            </p>
            <p className="mt-1 text-xs tracking-[0.2em] text-white/50">
              YOUR STORY
            </p>
          </div>

          <div className="absolute -bottom-4 -left-4 h-20 w-20 border-b border-l border-[#d8b68c]/50" />
        </div>

        <div className="pt-5 md:pl-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
            Our Story
          </p>

          <h2 className="font-serif text-3xl leading-tight md:text-5xl">
            We Turn Your Wedding Dreams Into{" "}
            <span className="italic text-[#d8b68c]">Reality</span>
          </h2>

          <p className="mt-7 text-sm leading-8 text-white/50">
            WedPlan was created with one simple idea: wedding planning should be
            exciting, not stressful. We bring essential wedding services
            together in one place so couples can plan their special day with
            confidence.
          </p>

          <p className="mt-5 text-sm leading-8 text-white/50">
            From photography and venues to decoration and catering, we help you
            explore the possibilities and create a celebration that reflects
            your unique love story.
          </p>

          <Link
            href="/services"
            className="group mt-9 inline-flex items-center gap-4 rounded-full border border-[#d8b68c]/50 px-7 py-3.5 text-sm font-medium text-[#d8b68c] transition hover:bg-[#d8b68c] hover:text-[#171815]"
          >
            Explore Our Services
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/[0.06] bg-[#1c1d19] px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
              What We Believe
            </p>

            <h2 className="font-serif text-3xl md:text-5xl">
              Our Values &{" "}
              <span className="italic text-[#d8b68c]">Purpose</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40">
              Everything we do is guided by the values that make every
              celebration meaningful.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#20211e] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#d8b68c]/40 hover:bg-[#252620]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.2em] text-white/25">
                      {item.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/[0.07] text-[#d8b68c] transition group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="mt-8 font-serif text-xl">{item.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-white/40">
                    {item.description}
                  </p>

                  <div className="mt-7 h-px w-10 bg-[#d8b68c]/50 transition-all duration-300 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
