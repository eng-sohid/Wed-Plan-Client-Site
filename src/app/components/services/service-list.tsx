"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { useApi } from "../../hooks/use-api";
import { CATEGORIES, type Service } from "../../types";
import { ServiceCard } from "./service-card";
import { QueryState, EmptyState } from "../../components/shared/query-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { selectCls } from "@/lib/format";

export default function ServiceList() {
  const sp = useSearchParams();
  const [search, setSearch] = useState(sp.get("search") || "");
  const [debounced, setDebounced] = useState(search);
  const [category, setCategory] = useState(sp.get("category") || "");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  const qs = new URLSearchParams({ limit: "9", page: String(page) });

  if (debounced) qs.set("search", debounced);
  if (category) qs.set("category", category);
  if (location) qs.set("location", location);
  if (sort) qs.set("sort", sort);

  const { data, loading, error, reload } = useApi<{
    services: Service[];
    total: number;
    totalPages: number;
  }>(`/services?${qs}`, false);

  const filters = useApi<{ locations: string[] }>(
    "/services/meta/filters",
    false,
  );

  const change =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value);
      setPage(1);
    };

  const reset = () => {
    setSearch("");
    setDebounced("");
    setCategory("");
    setLocation("");
    setSort("");
    setPage(1);
  };

  return (
    <div>
      {/* Search and Filters */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-white/10 bg-[#20211e] p-5 shadow-xl shadow-black/10 sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#526b50]/10 blur-[100px]" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-[#d8b68c]/20 bg-[#d8b68c]/10 text-[#d8b68c]">
              <SlidersHorizontal size={18} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-[#faf9f6]">
                Find Your Perfect Service
              </h2>
              <p className="mt-1 text-xs text-white/40">
                Search and refine your wedding essentials
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8b68c]" />

              <Input
                className="h-12 border-white/10 bg-[#171815] pl-10 text-sm text-[#faf9f6] placeholder:text-white/30 focus-visible:border-[#d8b68c]/50 focus-visible:ring-[#d8b68c]/20"
                placeholder="Search by service name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className={`${selectCls} !h-12 !border-white/10 !bg-[#171815] !text-white/70 focus:!border-[#d8b68c]/50`}
              value={category}
              onChange={change(setCategory)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className={`${selectCls} !h-12 !border-white/10 !bg-[#171815] !text-white/70 focus:!border-[#d8b68c]/50`}
              value={location}
              onChange={change(setLocation)}
            >
              <option value="">All Locations</option>
              {filters.data?.locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <select
              className={`${selectCls} !h-12 !border-white/10 !bg-[#171815] !text-white/70 focus:!border-[#d8b68c]/50`}
              value={sort}
              onChange={change(setSort)}
            >
              <option value="">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.services.length ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-white/50">
                Showing{" "}
                <span className="font-semibold text-[#d8b68c]">
                  {data.total}
                </span>{" "}
                service(s) found
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((s) => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>

            {data.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-5">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="border-white/15 bg-[#20211e] text-[#faf9f6] hover:border-[#d8b68c]/50 hover:bg-[#292a26] hover:text-[#d8b68c]"
                >
                  Previous
                </Button>

                <span className="text-sm text-white/50">
                  Page{" "}
                  <span className="font-semibold text-[#d8b68c]">{page}</span>{" "}
                  of {data.totalPages}
                </span>

                <Button
                  variant="outline"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage(page + 1)}
                  className="border-white/15 bg-[#20211e] text-[#faf9f6] hover:border-[#d8b68c]/50 hover:bg-[#292a26] hover:text-[#d8b68c]"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-5 py-10 text-center">
            <EmptyState
              title="No services found"
              text="Try changing your search or filters."
            />

            <Button
              variant="outline"
              onClick={reset}
              className="border-[#d8b68c]/30 bg-[#20211e] text-[#d8b68c] hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              Clear filters
            </Button>
          </div>
        )}
      </QueryState>
    </div>
  );
}
