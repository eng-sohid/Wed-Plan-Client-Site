import {
  Search,
  CalendarCheck,
  HeartHandshake,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore Services",
    description:
      "Browse our wedding services and discover everything you need for your special day.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Choose Your Date",
    description:
      "Select your preferred wedding date and discuss your requirements with our team.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Plan Together",
    description:
      "Work with our experienced team to customize every detail of your dream wedding.",
  },
  {
    number: "04",
    icon: PartyPopper,
    title: "Celebrate Your Day",
    description:
      "Relax and enjoy your beautiful wedding while we take care of the arrangements.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#171815] px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#c6a477]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d8b68c]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
              Simple Process
            </span>
            <span className="h-px w-10 bg-[#d8b68c]" />
          </div>

          <h2 className="font-serif text-4xl text-[#faf9f6] sm:text-5xl lg:text-6xl">
            How It <span className="italic text-[#d8b68c]">Works.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
            Planning your dream wedding has never been easier. Follow four
            simple steps and let us take care of the details.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, icon: Icon, title, description }, index) => (
            <div key={number} className="group relative text-center">
              <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center border border-white/15 bg-[#20211e] text-[#d8b68c] transition-all duration-500 group-hover:border-[#d8b68c] group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
                <Icon size={35} strokeWidth={1.4} />

                <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#d8b68c] font-serif text-sm font-semibold text-[#171815]">
                  {number}
                </span>
              </div>

              <h3 className="font-serif text-xl text-[#faf9f6] transition-colors group-hover:text-[#d8b68c]">
                {title}
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-white/45">
                {description}
              </p>

              {index !== steps.length - 1 && (
                <ArrowRight
                  size={20}
                  className="absolute -right-7 top-10 hidden text-[#d8b68c]/30 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
