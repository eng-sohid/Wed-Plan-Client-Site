"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api, errMsg } from "@/lib/api";
import { useApi } from "../../../hooks/use-api";
import type { AppUser } from "../../../types";
import { fmtDate, selectCls } from "@/lib/format";
import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { Avatar } from "../../../components/shared/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ManageUsersPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [role, setRole] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const qs = new URLSearchParams();
  if (debounced) qs.set("search", debounced);
  if (role) qs.set("role", role);

  const { data, loading, error, reload } = useApi<{ users: AppUser[] }>(
    `/admin/users?${qs}`,
  );
  const details = useApi<{ user: AppUser; services: number; bookings: number }>(
    selected ? `/admin/users/${selected}` : null,
  );

  async function block(u: AppUser) {
    try {
      const r = await api<{ message: string }>(`/admin/users/${u._id}/block`, {
        method: "PATCH",
        body: { isBlocked: !u.isBlocked },
      });
      toast.success(r.message);
      reload();
      if (selected === u._id) details.reload();
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  return (
    <div>
      <PageTitle title="Manage Users" subtitle="View, search and block users" />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={selectCls}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {selected && (
        <div className="mb-5 rounded-2xl border border-rose-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold">User Details</h3>
            <Button size="sm" variant="ghost" onClick={() => setSelected(null)}>
              Close
            </Button>
          </div>
          <QueryState
            loading={details.loading}
            error={details.error}
            onRetry={details.reload}
          >
            {details.data && (
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-gray-500">Name:</span>{" "}
                  {details.data.user.name}
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  {details.data.user.email}
                </p>
                <p>
                  <span className="text-gray-500">Role:</span>{" "}
                  <span className="capitalize">{details.data.user.role}</span>
                </p>
                <p>
                  <span className="text-gray-500">Status:</span>{" "}
                  {details.data.user.isBlocked ? "Blocked" : "Active"}
                </p>
                <p>
                  <span className="text-gray-500">Business:</span>{" "}
                  {details.data.user.businessName || "-"}
                </p>
                <p>
                  <span className="text-gray-500">Plan:</span>{" "}
                  <span className="capitalize">
                    {details.data.user.subscriptionPlan || "free"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Services:</span>{" "}
                  {details.data.services}
                </p>
                <p>
                  <span className="text-gray-500">Bookings:</span>{" "}
                  {details.data.bookings}
                </p>
                <p>
                  <span className="text-gray-500">Joined:</span>{" "}
                  {fmtDate(details.data.user.createdAt)}
                </p>
              </div>
            )}
          </QueryState>
        </div>
      )}

      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.users.length ? (
          <div className="overflow-x-auto rounded-2xl border bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-rose-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar src={u.image} name={u.name} size={36} />
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 capitalize">{u.role}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs ${u.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                      >
                        {u.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelected(u._id)}
                        >
                          View
                        </Button>
                        {u.role !== "admin" && (
                          <Button
                            size="sm"
                            variant={u.isBlocked ? "default" : "destructive"}
                            onClick={() => block(u)}
                          >
                            {u.isBlocked ? "Unblock" : "Block"}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No users found" />
        )}
      </QueryState>
    </div>
  );
}
