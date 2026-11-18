import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Wedding Photography",
    description:
      "Capture your beautiful wedding moments with professional photographers.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000",
  },
  {
    title: "Wedding Venues",
    description:
      "Discover beautiful venues to make your special day unforgettable.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1000",
  },
  {
    title: "Bridal Makeup",
    description:
      "Look stunning on your big day with expert bridal makeup artists.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1000",
  },
  {
    title: "Catering Services",
    description:
      "Delight your guests with delicious food and exceptional catering.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000",
  },
  {
    title: "Wedding Decoration",
    description:
      "Create a magical atmosphere with elegant wedding decorations.",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1000",
  },
  {
    title: "Wedding Planning",
    description:
      "Plan your dream wedding effortlessly with professional planners.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000",
  },
];

export default function FeaturedServices() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            What We Offer
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Our Featured Services
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Everything you need to create your perfect wedding celebration.
            Explore our exclusive wedding services.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {service.description}
                </p>

                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-rose-500 transition hover:gap-4"
                >
                  Explore Service <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
