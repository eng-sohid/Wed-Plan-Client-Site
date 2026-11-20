import { Heart, Users, Wallet, Sparkles, ArrowUpRight } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Users,
    title: "Experienced Team",
    description:
      "Our professional team brings years of experience to make your wedding truly special.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Personalized Planning",
    description:
      "Every wedding is unique. We customize every detail according to your dreams.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Budget Friendly",
    description:
      "Enjoy beautiful wedding arrangements with flexible packages for every budget.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Stress-Free Experience",
    description:
      "We handle every detail so you can relax and enjoy your special moments.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#171815] px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 grid gap-7 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d8b68c]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
                Why Choose WedPlan
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#faf9f6] sm:text-5xl lg:text-6xl">
              More Than Planning.
              <span className="block italic text-[#d8b68c]">
                Creating Memories.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/50 md:justify-self-end sm:text-base">
            Every love story deserves a beautiful celebration. Our team is here
            to make your special day unforgettable, from the first idea to the
            final detail.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ number, icon: Icon, title, description }) => (
            <div
              key={number}
              className="group relative min-h-[290px] overflow-hidden border border-white/10 bg-[#20211e] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#d8b68c]/50 hover:bg-[#252720] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-white/15 transition-colors group-hover:text-[#d8b68c]">
                  {number}
                </span>

                <span className="flex h-12 w-12 items-center justify-center border border-white/10 text-[#d8b68c] transition-all duration-500 group-hover:border-[#d8b68c] group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
                  <Icon size={23} strokeWidth={1.5} />
                </span>
              </div>

              <div className="mt-12">
                <h3 className="font-serif text-xl text-[#faf9f6] transition-colors group-hover:text-[#d8b68c]">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/45">
                  {description}
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="absolute bottom-7 right-7 text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#d8b68c]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
