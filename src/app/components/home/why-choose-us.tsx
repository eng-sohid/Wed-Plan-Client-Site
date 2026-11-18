import { Heart, Users, Wallet, Sparkles } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "Our professional team brings years of experience to make your wedding truly special.",
  },
  {
    icon: Heart,
    title: "Personalized Planning",
    description:
      "Every wedding is unique. We customize every detail according to your dreams.",
  },
  {
    icon: Wallet,
    title: "Budget Friendly",
    description:
      "Enjoy beautiful wedding arrangements with flexible packages for every budget.",
  },
  {
    icon: Sparkles,
    title: "Stress-Free Experience",
    description:
      "We handle every detail so you can relax and enjoy your special moments.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-rose-50/60 px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Why Choose Us
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Making Your Dream Wedding
            <span className="block text-rose-500">A Beautiful Reality</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-500">
            We believe every love story deserves a perfect celebration. Our team
            is here to make your special day unforgettable.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                  <Icon size={30} strokeWidth={1.7} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
