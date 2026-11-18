import Image from "next/image";
import Link from "next/link";
import { Heart, Target, Eye, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Our Passion",
    description:
      "We love creating beautiful wedding experiences that celebrate every unique love story.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Our mission is to make wedding planning simple, enjoyable, and stress-free for every couple.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "We aim to become a trusted wedding planning platform where every dream celebration begins.",
  },
  {
    icon: Award,
    title: "Our Commitment",
    description:
      "We are committed to quality, creativity, and making every special moment unforgettable.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-rose-50 px-6 py-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
          About Us
        </p>

        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          Making Every Wedding Special
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-500">
          We believe every love story deserves a beautiful celebration. Our goal
          is to turn your wedding dreams into unforgettable memories.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12 lg:px-20">
        <div className="relative h-[350px] overflow-hidden rounded-3xl md:h-[480px]">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"
            alt="Beautiful wedding celebration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Our Story
          </p>

          <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            We Turn Your Wedding Dreams Into Reality
          </h2>

          <p className="mt-6 leading-8 text-gray-500">
            WedPlan was created with one simple idea: wedding planning should be
            exciting, not stressful. We bring essential wedding services
            together in one place so couples can plan their special day with
            confidence.
          </p>

          <p className="mt-4 leading-8 text-gray-500">
            From photography and venues to decoration and catering, we help you
            explore the possibilities and create a celebration that reflects
            your unique love story.
          </p>

          <Link
            href="/services"
            className="mt-8 inline-flex rounded-full bg-rose-500 px-7 py-3 font-semibold text-white transition hover:bg-rose-600"
          >
            Explore Our Services
          </Link>
        </div>
      </section>

      <section className="bg-rose-50/60 px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              What We Believe
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Our Values & Purpose
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
