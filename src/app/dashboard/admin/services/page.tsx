"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import { CATEGORIES, type Service } from "../../../types";
import { money, selectCls } from "@/lib/format";
import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { StatusBadge } from "../../../components/shared/status-badge";
import { ConfirmButton } from "../../../components/shared/confirm-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ManageServicesPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const qs = new URLSearchParams();
  if (debounced) qs.set("search", debounced);
  if (status) qs.set("status", status);
  if (category) qs.set("category", category);

  const { data, loading, error, reload } = useApi<{ services: Service[] }>(
    `/admin/services?${qs}`,
  );

  async function setSt(id: string, st: string) {
    try {
      const r = await api<{ message: string }>(`/admin/services/${id}/status`, {
        method: "PATCH",
        body: { status: st },
      });
      toast.success(r.message);
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  async function remove(id: string) {
    try {
      await api(`/admin/services/${id}`, { method: "DELETE" });
      toast.success("Service deleted");
      reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  return (
    <div>
      <PageTitle
        title="Manage Services"
        subtitle="Review, approve, reject or delete services"
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Input
          placeholder="Search by service name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={selectCls}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          className={selectCls}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.services.length ? (
          <div className="overflow-x-auto rounded-2xl border bg-white">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-rose-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">Service</th>
                  <th className="p-3">Vendor</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.services.map((s) => (
                  <tr key={s._id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.images?.[0] || "/images/placeholder.jpg"}
                          alt=""
                          className="h-12 w-16 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">{s.serviceName}</p>
                          <p className="text-xs text-gray-500">
                            {s.category} · {s.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      {s.vendorBusinessName || s.vendorName}
                    </td>
                    <td className="p-3">{money(s.price)}</td>
                    <td className="p-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap justify-end gap-2">
                        {s.status !== "approved" && (
                          <Button
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => setSt(s._id, "approved")}
                          >
                            Approve
                          </Button>
                        )}
                        {s.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSt(s._id, "rejected")}
                          >
                            Reject
                          </Button>
                        )}
                        <ConfirmButton
                          label="Delete"
                          confirmLabel="Yes, delete"
                          onConfirm={() => remove(s._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No services found" />
        )}
      </QueryState>
    </div>
  );
}
