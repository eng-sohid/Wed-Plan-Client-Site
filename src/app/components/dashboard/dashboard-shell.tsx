"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  CalendarCheck,
  Crown,
  UserCog,
  Users,
  Receipt,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Avatar } from "../shared/avatar";

const nav = {
  vendor: [
    { href: "/dashboard/vendor", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/vendor/services",
      label: "My Services",
      icon: Briefcase,
    },
    {
      href: "/dashboard/vendor/services/add",
      label: "Add Service",
      icon: PlusCircle,
    },
    {
      href: "/dashboard/vendor/bookings",
      label: "Booking Requests",
      icon: CalendarCheck,
    },
    {
      href: "/dashboard/vendor/subscription",
      label: "Subscription",
      icon: Crown,
    },
    {
      href: "/dashboard/vendor/profile",
      label: "Profile Settings",
      icon: UserCog,
    },
  ],
  customer: [
    { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/customer/bookings",
      label: "My Bookings",
      icon: CalendarCheck,
    },
    {
      href: "/dashboard/customer/profile",
      label: "Profile Settings",
      icon: UserCog,
    },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
    {
      href: "/dashboard/admin/services",
      label: "Manage Services",
      icon: Briefcase,
    },
    {
      href: "/dashboard/admin/transactions",
      label: "Transactions",
      icon: Receipt,
    },
  ],
} as const;

export default function DashboardShell({
  role,
  name,
  image,
  children,
}: {
  role: string;
  name: string;
  image?: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = nav[role as keyof typeof nav] || nav.customer;
  const dashboardPath = `/dashboard/${role}`;

  const sidebar = (
    <div className="flex h-full flex-col px-4 py-5">
      {/* Brand */}
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 px-2"
        onClick={() => setOpen(false)}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8b68c]">
          <Sparkles className="h-5 w-5 text-[#171815]" />
        </div>
        <span className="font-serif text-2xl font-semibold tracking-tight text-[#faf9f6]">
          Wed<span className="text-[#d8b68c]">Plan.</span>
        </span>
      </Link>

      {/* User Profile */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-[#20211e] p-4">
        <div className="flex items-center gap-3">
          <Avatar src={image} name={name} size={44} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#faf9f6]">
              {name}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8b68c]">
              {role}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-white/40">Account active</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-3 px-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
          Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== dashboardPath && pathname.startsWith(`${href}/`));

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "border border-[#d8b68c]/20 bg-[#d8b68c]/10 text-[#d8b68c]"
                  : "border border-transparent text-white/50 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                  active
                    ? "text-[#d8b68c]"
                    : "text-white/35 group-hover:text-[#d8b68c]"
                }`}
              />

              <span className="flex-1">{label}</span>

              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#d8b68c]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="mt-8 rounded-2xl border border-[#d8b68c]/15 bg-gradient-to-br from-[#d8b68c]/10 to-transparent p-4">
        <Sparkles className="mb-3 h-5 w-5 text-[#d8b68c]" />

        <p className="font-serif text-lg text-[#faf9f6]">
          Your dream day,
          <br />
          beautifully planned.
        </p>

        <Link
          href="/services"
          onClick={() => setOpen(false)}
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#d8b68c] transition hover:text-[#f0d4b3]"
        >
          Explore Services
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl bg-[#171815]">
      {/* Desktop Sidebar */}
      <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] w-64 shrink-0 border-r border-white/10 bg-[#171815] lg:block">
        {sidebar}
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-[280px] border-r border-white/10 bg-[#171815] shadow-2xl">
            <div className="flex items-center justify-end px-4 pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-lg border border-white/10 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {sidebar}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="min-w-0 flex-1 bg-[#171815]">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#171815]/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open sidebar"
              className="rounded-lg border border-white/10 p-2 text-white/70 transition hover:border-[#d8b68c]/30 hover:text-[#d8b68c]"
            >
              <Menu className="h-5 w-5" />
            </button>

            <span className="font-serif text-lg text-[#faf9f6]">
              {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
              <span className="italic text-[#d8b68c]">Dashboard</span>
            </span>
          </div>

          <Avatar src={image} name={name} size={36} />
        </div>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-76px)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
