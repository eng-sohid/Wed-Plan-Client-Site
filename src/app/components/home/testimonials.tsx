import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Recently Married",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "Our wedding day was absolutely magical! The team managed every little detail perfectly. We couldn't have asked for a better experience.",
  },
  {
    name: "Nusrat Jahan",
    role: "Recently Married",
    image: "https://i.pravatar.cc/150?img=44",
    review:
      "From decoration to photography, everything was beyond our expectations. They truly made our dream wedding come true.",
  },
  {
    name: "Tanvir Hasan",
    role: "Recently Married",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Professional, friendly, and incredibly organized. They made the entire wedding planning process stress-free for us.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-rose-50/60 px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Testimonials
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Love Stories & Happy Couples
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
            Don&apos;t just take our word for it. Hear what our happy couples have to
            say about their experience with us.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <Quote size={35} className="text-rose-300" />

                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={17} fill="currentColor" />
                  ))}
                </div>
              </div>

              <p className="min-h-28 text-sm leading-7 text-gray-600">
                &quot;{item.review}&quot;
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-gray-100 pt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>

                  <p className="mt-1 text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
