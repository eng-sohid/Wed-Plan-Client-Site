import Link from "next/link";
import { ArrowUpRight, MapPin, Heart, Sparkles } from "lucide-react";

import type { Service } from "../../types";
import { money } from "@/lib/format";
import { Avatar } from "../../components/shared/avatar";

type ServiceCardProps = {
  service: Service;
  variant?: "default" | "featured";
};

export function ServiceCard({
  service: s,
  variant = "default",
}: ServiceCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Link
      href={`/services/${s._id}`}
      className={`group relative block overflow-hidden transition-all duration-500 ${
        isFeatured
          ? "rounded-2xl border border-white/10 bg-[#20211e] shadow-2xl shadow-black/20"
          : "rounded-2xl border border-white/[0.08] bg-[#20211e] shadow-lg shadow-black/10 hover:-translate-y-2 hover:border-[#d8b68c]/40 hover:shadow-2xl hover:shadow-black/30"
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          isFeatured ? "h-[390px]" : "h-[250px]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.images?.[0] || "/images/placeholder.jpg"}
          alt={s.serviceName}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 transition-opacity duration-500 group-hover:from-black/90" />

        {/* Category Badge */}
        <div className="absolute left-5 top-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f0d6b5] shadow-lg backdrop-blur-md">
            <Sparkles size={12} />
            {s.category}
          </span>
        </div>

        {/* Decorative Heart */}
        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/90 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#d8b68c] group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
          <Heart size={17} strokeWidth={1.7} />
        </div>

        {/* Location on Image */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2 text-xs font-medium text-white/80">
          <MapPin size={15} className="text-[#d8b68c]" />
          <span>{s.location}</span>
        </div>

        {/* Featured Image Content */}
        {isFeatured && (
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8b68c]">
              A Beautiful Choice For Your Day
            </p>

            <h3 className="max-w-lg font-serif text-3xl leading-tight text-white sm:text-4xl">
              {s.serviceName}
            </h3>

            <div className="mt-6 flex items-end justify-between border-t border-white/20 pt-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                  Starting from
                </p>

                <p className="mt-1 font-serif text-2xl text-[#e0bd94]">
                  {money(s.price)}
                </p>
              </div>

              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:rotate-45 group-hover:border-[#d8b68c] group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
                <ArrowUpRight size={21} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Default Card Content */}
      {!isFeatured && (
        <div className="p-5 sm:p-6">
          {/* Service Name */}
          <div className="min-h-[58px]">
            <h3 className="line-clamp-2 font-serif text-xl font-medium leading-snug text-[#faf9f6] transition-colors duration-300 group-hover:text-[#d8b68c]">
              {s.serviceName}
            </h3>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-[#d8b68c]/30 via-white/10 to-transparent" />

          {/* Vendor */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="rounded-full border border-[#d8b68c]/30 p-[2px]">
              <Avatar src={s.vendorImage} name={s.vendorName} size={38} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
                Provided by
              </p>

              <p className="mt-1 truncate text-sm font-medium text-white/75 transition-colors group-hover:text-[#d8b68c]">
                {s.vendorBusinessName || s.vendorName}
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 group-hover:border-[#d8b68c]/40 group-hover:bg-[#d8b68c]/10 group-hover:text-[#d8b68c]">
              <ArrowUpRight size={17} />
            </div>
          </div>

          {/* Price and CTA */}
          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#171815] p-4">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                Starting from
              </p>

              <p className="mt-1 font-serif text-xl font-semibold text-[#d8b68c]">
                {money(s.price)}
              </p>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50 transition-colors duration-300 group-hover:text-[#d8b68c]">
              View Details
            </span>
          </div>
        </div>
      )}

      {/* Bottom Hover Accent */}
      {!isFeatured && (
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d8b68c] transition-all duration-500 group-hover:w-full" />
      )}
    </Link>
  );
}
