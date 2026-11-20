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
    <section className="relative overflow-hidden bg-[#171815] px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d8b68c]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
              Testimonials
            </span>
            <span className="h-px w-10 bg-[#d8b68c]" />
          </div>

          <h2 className="font-serif text-4xl leading-tight text-[#faf9f6] sm:text-5xl lg:text-6xl">
            Love Stories &
            <span className="block italic text-[#d8b68c]">Happy Couples.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            Don&apos;t just take our word for it. Hear what our happy couples
            have to say about their experience with us.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className="group relative flex flex-col border border-white/10 bg-[#20211e] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#d8b68c]/50 hover:bg-[#252720] sm:p-9"
            >
              <div className="mb-7 flex items-center justify-between">
                <Quote
                  size={38}
                  strokeWidth={1.2}
                  className="text-[#d8b68c]/70 transition-colors group-hover:text-[#d8b68c]"
                />

                <span className="font-serif text-sm text-white/20">
                  0{index + 1}
                </span>
              </div>

              <div className="mb-5 flex gap-1 text-[#d8b68c]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={15}
                    fill="currentColor"
                    strokeWidth={1}
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-8 text-white/65">
                &ldquo;{item.review}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-full border border-[#d8b68c]/40 object-cover"
                />

                <div>
                  <h3 className="font-serif text-lg text-[#faf9f6]">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/40">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
