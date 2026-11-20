"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  ShieldCheck,
  ShieldBan,
  Mail,
  BriefcaseBusiness,
  CalendarDays,
  X,
  Eye,
  UserRound,
} from "lucide-react";
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

  const { data, loading, error, reload } = useApi<{
    users: AppUser[];
  }>(`/admin/users?${qs}`);

  const details = useApi<{
    user: AppUser;
    services: number;
    bookings: number;
  }>(selected ? `/admin/users/${selected}` : null);

  async function block(u: AppUser) {
    try {
      const r = await api<{ message: string }>(`/admin/users/${u._id}/block`, {
        method: "PATCH",
        body: { isBlocked: !u.isBlocked },
      });

      toast.success(r.message);
      reload();

      if (selected === u._id) {
        details.reload();
      }
    } catch (e) {
      toast.error(errMsg(e));
    }
  }

  return (
    <div className="space-y-7">
      <PageTitle
        title="Manage Users"
        subtitle="Monitor registered accounts and manage platform access."
      />

      {/* Overview */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#20211e] p-6">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#526b50]/15 blur-[80px]" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#d8b68c]/10 text-[#d8b68c]">
            <Users size={27} strokeWidth={1.5} />
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-[#faf9f6]">
              User Management
            </h2>
            <p className="mt-1 text-sm text-white/40">
              Search accounts, review user information and control access.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-white/10 bg-[#20211e] p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <Search size={17} className="text-[#d8b68c]" />
          <h3 className="text-sm font-semibold text-[#faf9f6]">Find Users</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 border-white/10 bg-[#171815] pl-10 text-[#faf9f6] placeholder:text-white/30 focus-visible:ring-[#d8b68c]/40"
            />
          </div>

          <select
            className={`${selectCls} h-11 border-white/10 bg-[#171815] text-[#faf9f6]`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </section>

      {/* Selected User Details */}
      {selected && (
        <section className="overflow-hidden rounded-2xl border border-[#d8b68c]/20 bg-[#20211e]">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8b68c]/10 text-[#d8b68c]">
                <UserRound size={20} />
              </div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-[#faf9f6]">
                  User Details
                </h3>
                <p className="text-xs text-white/40">
                  Account information and activity
                </p>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSelected(null)}
              className="text-white/50 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="p-5">
            <QueryState
              loading={details.loading}
              error={details.error}
              onRetry={details.reload}
            >
              {details.data && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <Avatar
                      src={details.data.user.image}
                      name={details.data.user.name}
                      size={56}
                    />

                    <div>
                      <h4 className="text-lg font-semibold text-[#faf9f6]">
                        {details.data.user.name}
                      </h4>
                      <p className="text-sm text-white/40">
                        {details.data.user.email}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        details.data.user.isBlocked
                          ? "border-red-400/20 bg-red-400/10 text-red-400"
                          : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                      }`}
                    >
                      {details.data.user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-[#171815] p-4">
                      <p className="mb-2 flex items-center gap-2 text-xs text-white/40">
                        <UserRound size={14} />
                        Role
                      </p>
                      <p className="text-sm font-medium capitalize text-[#faf9f6]">
                        {details.data.user.role}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#171815] p-4">
                      <p className="mb-2 flex items-center gap-2 text-xs text-white/40">
                        <BriefcaseBusiness size={14} />
                        Business
                      </p>
                      <p className="text-sm font-medium text-[#faf9f6]">
                        {details.data.user.businessName || "-"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#171815] p-4">
                      <p className="mb-2 flex items-center gap-2 text-xs text-white/40">
                        <ShieldCheck size={14} />
                        Subscription
                      </p>
                      <p className="text-sm font-medium capitalize text-[#faf9f6]">
                        {details.data.user.subscriptionPlan || "free"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#171815] p-4">
                      <p className="mb-2 flex items-center gap-2 text-xs text-white/40">
                        <BriefcaseBusiness size={14} />
                        Services
                      </p>
                      <p className="text-sm font-medium text-[#faf9f6]">
                        {details.data.services}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#171815] p-4">
                      <p className="mb-2 flex items-center gap-2 text-xs text-white/40">
                        <CalendarDays size={14} />
                        Bookings
                      </p>
                      <p className="text-sm font-medium text-[#faf9f6]">
                        {details.data.bookings}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#171815] p-4">
                      <p className="mb-2 flex items-center gap-2 text-xs text-white/40">
                        <CalendarDays size={14} />
                        Joined
                      </p>
                      <p className="text-sm font-medium text-[#faf9f6]">
                        {fmtDate(details.data.user.createdAt)}
                      </p>
                    </div>
                  </div>

                  {details.data.user.role !== "admin" && (
                    <div className="flex justify-end border-t border-white/10 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => block(details.data!.user)}
                        className={
                          details.data.user.isBlocked
                            ? "border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10"
                            : "border-red-400/30 text-red-400 hover:bg-red-400/10"
                        }
                      >
                        {details.data.user.isBlocked ? (
                          <>
                            <ShieldCheck size={16} className="mr-2" />
                            Unblock User
                          </>
                        ) : (
                          <>
                            <ShieldBan size={16} className="mr-2" />
                            Block User
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </QueryState>
          </div>
        </section>
      )}

      {/* Users Table */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#20211e]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#faf9f6]">
              Registered Accounts
            </h3>
            <p className="mt-1 text-xs text-white/40">
              Manage platform members and permissions.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#171815] px-3 py-1.5 text-xs text-white/50">
            <Users size={14} />
            {data?.users.length ?? 0} users
          </div>
        </div>

        <QueryState loading={loading} error={error} onRetry={reload}>
          {data?.users.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#171815] text-[11px] uppercase tracking-wider text-white/35">
                  <tr>
                    <th className="px-5 py-4 font-medium">User</th>
                    <th className="px-5 py-4 font-medium">Role</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-t border-white/[0.06] transition hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={u.image} name={u.name} size={40} />

                          <div>
                            <p className="font-medium text-[#faf9f6]">
                              {u.name}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/40">
                              <Mail size={12} />
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs capitalize text-white/60">
                          {u.role}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
                            u.isBlocked
                              ? "border-red-400/20 bg-red-400/10 text-red-400"
                              : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {u.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelected(u._id)}
                            className="border-white/10 bg-transparent text-white/70 hover:border-[#d8b68c]/30 hover:bg-[#d8b68c]/10 hover:text-[#d8b68c]"
                          >
                            <Eye size={14} className="mr-1.5" />
                            View
                          </Button>

                          {u.role !== "admin" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => block(u)}
                              className={
                                u.isBlocked
                                  ? "border-emerald-400/20 bg-transparent text-emerald-400 hover:bg-emerald-400/10"
                                  : "border-red-400/20 bg-transparent text-red-400 hover:bg-red-400/10"
                              }
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
            <div className="p-6">
              <EmptyState title="No users found" />
            </div>
          )}
        </QueryState>
      </section>
    </div>
  );
}
