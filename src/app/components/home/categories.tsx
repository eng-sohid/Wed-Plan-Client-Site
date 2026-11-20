import Link from "next/link";
import {
  Camera,
  Building2,
  Flower2,
  UtensilsCrossed,
  Sparkles,
  Shirt,
  ArrowUpRight,
} from "lucide-react";

const items = [
  { name: "Photography & Videography", icon: Camera },
  { name: "Wedding Venues", icon: Building2 },
  { name: "Decoration & Florist", icon: Flower2 },
  { name: "Catering Services", icon: UtensilsCrossed },
  { name: "Makeup & Styling", icon: Sparkles },
  { name: "Wedding Fashion", icon: Shirt },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#171815] px-5 py-24 sm:px-8 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#c6a477]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Sparkles size={16} className="text-[#d8b68c]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
                Explore Our Collection
              </span>
            </div>

            <h2 className="max-w-2xl font-serif text-4xl leading-tight text-[#faf9f6] sm:text-5xl lg:text-6xl">
              Everything You Need
              <span className="block italic text-[#d8b68c]">
                For Your Big Day.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/50 sm:text-base">
            Discover every essential wedding service in one place. Find the
            right professionals to bring your celebration to life.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ name, icon: Icon }, index) => (
            <Link
              key={name}
              href={`/services?category=${encodeURIComponent(name)}`}
              className="group relative flex min-h-48 items-center justify-between overflow-hidden border border-white/10 bg-[#20211e] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#d8b68c]/50 hover:bg-[#252720] hover:shadow-[0_18px_45px_rgba(0,0,0,0.2)] sm:p-9"
            >
              <div>
                <span className="mb-7 flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.03] text-[#d8b68c] transition-all duration-500 group-hover:border-[#d8b68c] group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
                  <Icon size={25} strokeWidth={1.5} />
                </span>

                <span className="mb-2 block text-[10px] font-medium tracking-[0.25em] text-[#c6a477]">
                  CATEGORY 0{index + 1}
                </span>

                <h3 className="max-w-[230px] font-serif text-xl leading-snug text-[#faf9f6] transition-colors group-hover:text-[#d8b68c] sm:text-2xl">
                  {name}
                </h3>
              </div>

              <span className="absolute bottom-7 right-7 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#d8b68c] transition-all duration-500 group-hover:rotate-45 group-hover:border-[#d8b68c] group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
                <ArrowUpRight size={19} />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] tracking-[0.25em] text-white/35">
            MAKE EVERY DETAIL COUNT
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
