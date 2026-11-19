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

  const sidebar = (
    <div className="flex h-full flex-col gap-1 p-4">
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-rose-50 p-3">
        <Avatar src={image} name={name} size={40} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="text-xs capitalize text-rose-600">{role}</p>
        </div>
      </div>
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-rose-600 text-white" : "text-gray-700 hover:bg-rose-50"}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="mx-auto flex max-w-7xl">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r bg-white lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 border-b bg-white px-4 py-3 lg:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
            {open ? <X /> : <Menu />}
          </button>
          <span className="font-medium capitalize">{role} Dashboard</span>
        </div>
        <div className="p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
