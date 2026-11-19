"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
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
      <div className="mb-8 grid gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search by service name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={selectCls}
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
          className={selectCls}
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
        <select className={selectCls} value={sort} onChange={change(setSort)}>
          <option value="">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.services.length ? (
          <>
            <p className="mb-4 text-sm text-gray-500">
              {data.total} service(s) found
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((s) => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {page} of {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4 text-center">
            <EmptyState
              title="No services found"
              text="Try changing your search or filters."
            />
            <Button variant="outline" onClick={reset}>
              Clear filters
            </Button>
          </div>
        )}
      </QueryState>
    </div>
  );
}
