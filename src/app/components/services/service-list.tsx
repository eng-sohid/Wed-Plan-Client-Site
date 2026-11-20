"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  LayoutGrid,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";

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

  const qs = new URLSearchParams({
    limit: "9",
    page: String(page),
  });

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

  const hasFilters = Boolean(search || category || location || sort);

  return (
    <div className="space-y-10">
      {/* Search and Filters */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#20211e] shadow-2xl shadow-black/10">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#526b50]/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-[#d8b68c]/[0.06] blur-[100px]" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          {/* Heading */}
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#d8b68c]/10 text-[#d8b68c]">
                <SlidersHorizontal size={21} />
              </div>

              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8b68c]">
                  Find Your Match
                </p>

                <h2 className="font-serif text-2xl text-[#faf9f6] sm:text-3xl">
                  Discover Your Perfect Service
                </h2>

                <p className="mt-2 text-xs leading-6 text-white/40 sm:text-sm">
                  Refine your search and find the right vendors for your day.
                </p>
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={reset}
                className="flex w-fit items-center gap-2 text-xs font-medium text-white/45 transition hover:text-[#d8b68c]"
              >
                <RotateCcw size={14} />
                Reset all filters
              </button>
            )}
          </div>

          {/* Search Field */}
          <div className="mb-5">
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Search services
            </label>

            <div className="group relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#d8b68c] transition-transform group-focus-within:scale-110" />

              <Input
                className="h-14 rounded-xl border-white/10 bg-[#171815] pl-12 pr-4 text-sm text-[#faf9f6] placeholder:text-white/30 transition-all focus-visible:border-[#d8b68c]/50 focus-visible:ring-2 focus-visible:ring-[#d8b68c]/10"
                placeholder="Try photography, catering, decoration..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Fields */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Category
              </label>

              <select
                className={`${selectCls} !h-12 !w-full !rounded-xl !border-white/10 !bg-[#171815] !text-white/75 focus:!border-[#d8b68c]/50`}
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
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                <MapPin size={12} className="text-[#d8b68c]" />
                Location
              </label>

              <select
                className={`${selectCls} !h-12 !w-full !rounded-xl !border-white/10 !bg-[#171815] !text-white/75 focus:!border-[#d8b68c]/50`}
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
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Sort By
              </label>

              <select
                className={`${selectCls} !h-12 !w-full !rounded-xl !border-white/10 !bg-[#171815] !text-white/75 focus:!border-[#d8b68c]/50`}
                value={sort}
                onChange={change(setSort)}
              >
                <option value="">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicator */}
          {hasFilters && (
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-5">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Active filters
              </span>

              {search && (
                <span className="rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/10 px-3 py-1.5 text-[10px] text-[#d8b68c]">
                  Search: {search}
                </span>
              )}

              {category && (
                <span className="rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/10 px-3 py-1.5 text-[10px] text-[#d8b68c]">
                  {category}
                </span>
              )}

              {location && (
                <span className="rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/10 px-3 py-1.5 text-[10px] text-[#d8b68c]">
                  {location}
                </span>
              )}

              {sort && (
                <span className="rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/10 px-3 py-1.5 text-[10px] text-[#d8b68c]">
                  {sort === "price_asc"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Service Results */}
      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.services.length ? (
          <>
            {/* Results Header */}
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8b68c]">
                  <Sparkles size={13} />
                  Curated For Your Celebration
                </div>

                <h2 className="font-serif text-2xl text-[#faf9f6] sm:text-3xl">
                  Explore Wedding Services
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  Showing{" "}
                  <span className="font-semibold text-[#d8b68c]">
                    {data.total}
                  </span>{" "}
                  service(s) found
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/35">
                <LayoutGrid size={15} />
                <span>Premium vendor collection</span>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((s) => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#20211e] p-5 sm:flex-row sm:px-7">
                <p className="text-xs text-white/40">
                  Page{" "}
                  <span className="font-semibold text-[#d8b68c]">{page}</span>{" "}
                  of {data.totalPages}
                </p>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="h-11 gap-2 rounded-full border-white/15 bg-[#171815] px-5 text-xs text-white/75 transition hover:border-[#d8b68c]/50 hover:bg-[#d8b68c] hover:text-[#171815] disabled:opacity-30"
                  >
                    <ArrowLeft size={15} />
                    Previous
                  </Button>

                  <span className="flex h-10 min-w-10 items-center justify-center rounded-full border border-[#d8b68c]/30 bg-[#d8b68c]/10 px-3 text-sm font-semibold text-[#d8b68c]">
                    {page}
                  </span>

                  <Button
                    variant="outline"
                    disabled={page >= data.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="h-11 gap-2 rounded-full border-white/15 bg-[#171815] px-5 text-xs text-white/75 transition hover:border-[#d8b68c]/50 hover:bg-[#d8b68c] hover:text-[#171815] disabled:opacity-30"
                  >
                    Next
                    <ArrowRight size={15} />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#20211e] px-5 py-16 text-center sm:py-20">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#d8b68c]/10 text-[#d8b68c]">
              <Search size={26} />
            </div>

            <EmptyState
              title="No services found"
              text="We couldn't find any services matching your search. Try adjusting your filters."
            />

            <Button
              variant="outline"
              onClick={reset}
              className="mt-6 h-11 gap-2 rounded-full border-[#d8b68c]/30 bg-[#171815] px-6 text-xs font-semibold text-[#d8b68c] transition hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              <RotateCcw size={14} />
              Clear All Filters
            </Button>
          </div>
        )}
      </QueryState>
    </div>
  );
}
