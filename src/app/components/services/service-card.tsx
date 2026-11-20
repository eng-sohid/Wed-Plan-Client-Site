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
          : "rounded-2xl border bg-white shadow-sm hover:shadow-lg"
      } transition-all duration-500`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          isFeatured ? "h-[380px]" : "h-52"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.images?.[0] || "/images/placeholder.jpg"}
          alt={s.serviceName}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            isFeatured ? "opacity-80" : ""
          }`}
        />

        {isFeatured && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        )}

        {/* Category */}
        <span
          className={`absolute left-5 top-5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${
            isFeatured
              ? "border border-white/30 bg-black/30 text-white backdrop-blur-md"
              : "rounded-full bg-white/90 text-[#526b50]"
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
        <div className="space-y-3 p-5">
          <h3 className="line-clamp-1 font-serif text-lg font-semibold text-[#252820]">
            {s.serviceName}
          </h3>

          <p className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            {s.location}
          </p>

          <div className="flex items-center justify-between gap-2">
            <p className="text-lg font-bold text-[#526b50]">{money(s.price)}</p>

            <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600">
              <Avatar src={s.vendorImage} name={s.vendorName} size={24} />
              <span className="truncate">
                {s.vendorBusinessName || s.vendorName}
              </span>
            </div>
          </div>

          <div className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#526b50] px-4 text-sm font-medium text-white transition-colors group-hover:bg-[#40563e]">
            View Details
            <ArrowUpRight size={16} />
          </div>
        </div>
      )}
    </Link>
  );
}
