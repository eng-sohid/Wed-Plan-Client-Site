import {
  Search,
  CalendarCheck,
  HeartHandshake,
  PartyPopper,
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
    <section className="bg-white px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Simple Process
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
            How It Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
            Planning your dream wedding has never been easier. Just follow these
            four simple steps.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                  <Icon size={34} strokeWidth={1.6} />

                  <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
