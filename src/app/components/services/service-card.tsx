import Link from "next/link";
import { ArrowUpRight, MapPin, Heart } from "lucide-react";
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
      className={`group relative block overflow-hidden ${
        isFeatured
          ? "rounded-sm bg-[#171815]"
          : "rounded-xl border border-white/10 bg-[#20211e] shadow-lg shadow-black/10 hover:-translate-y-1 hover:border-[#d8b68c]/40"
      } transition-all duration-500`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          isFeatured ? "h-[380px]" : "h-56"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.images?.[0] || "/images/placeholder.jpg"}
          alt={s.serviceName}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            isFeatured ? "opacity-80" : "opacity-90"
          }`}
        />

        <div
          className={`absolute inset-0 ${
            isFeatured
              ? "bg-gradient-to-t from-black via-black/20 to-transparent"
              : "bg-gradient-to-t from-black/60 via-transparent to-transparent"
          }`}
        />

        {/* Category */}
        <span
          className={`absolute left-4 top-4 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${
            isFeatured
              ? "border border-white/30 bg-black/30 text-white backdrop-blur-md"
              : "border border-white/20 bg-black/30 text-[#d8b68c] backdrop-blur-md"
          }`}
        >
          {s.category}
        </span>

        {/* Favorite decoration */}
        {isFeatured && (
          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition group-hover:bg-[#c6a477]">
            <Heart size={17} />
          </div>
        )}

        {/* Featured content */}
        {isFeatured && (
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <p className="mb-3 flex items-center gap-2 text-xs text-white/75">
              <MapPin size={14} />
              {s.location}
            </p>

            <h3 className="font-serif text-2xl text-white sm:text-3xl">
              {s.serviceName}
            </h3>

            <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Starting from
                </p>
                <p className="mt-1 text-lg font-semibold text-[#d7b58a]">
                  {money(s.price)}
                </p>
              </div>

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Default card content */}
      {!isFeatured && (
        <div className="space-y-4 p-5">
          <div>
            <h3 className="line-clamp-1 font-serif text-xl font-medium text-[#faf9f6] transition-colors group-hover:text-[#d8b68c]">
              {s.serviceName}
            </h3>

            <p className="mt-3 flex items-center gap-2 text-sm text-white/45">
              <MapPin className="h-4 w-4 shrink-0 text-[#d8b68c]" />
              {s.location}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                Starting from
              </p>
              <p className="mt-1 text-lg font-semibold text-[#d8b68c]">
                {money(s.price)}
              </p>
            </div>

            <div className="flex min-w-0 items-center gap-2 text-sm text-white/50">
              <Avatar src={s.vendorImage} name={s.vendorName} size={24} />
              <span className="truncate">
                {s.vendorBusinessName || s.vendorName}
              </span>
            </div>
          </div>

          <div className="flex h-10 w-full items-center justify-center gap-2 border border-[#d8b68c]/30 bg-[#d8b68c]/10 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#d8b68c] transition-all duration-300 group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
            View Details
            <ArrowUpRight size={16} />
          </div>
        </div>
      )}
    </Link>
  );
}
