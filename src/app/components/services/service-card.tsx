import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Service } from "../../types";
import { money, roseBtn } from "@/lib/format";
import { Avatar } from "../../components/shared/avatar";
import { Button } from "@/components/ui/button";

export function ServiceCard({ service: s }: { service: Service }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.images?.[0] || "/images/placeholder.jpg"}
          alt={s.serviceName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-rose-700">
          {s.category}
        </span>
      </div>
      <div className="space-y-3 p-5">
        <h3 className="line-clamp-1 font-serif text-lg font-semibold">
          {s.serviceName}
        </h3>
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          {s.location}
        </p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-bold text-rose-600">{money(s.price)}</p>
          <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600">
            <Avatar src={s.vendorImage} name={s.vendorName} size={24} />
            <span className="truncate">
              {s.vendorBusinessName || s.vendorName}
            </span>
          </div>
        </div>
        <Link
          href={`/services/${s._id}`}
          className={`inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${roseBtn}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
