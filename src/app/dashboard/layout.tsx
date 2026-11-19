import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check authentication
  if (!session) {
    redirect("/sign-in");
  }

  // Get user role
  const role = session.user.role as string;

  // Check valid dashboard role
  if (!["customer", "vendor", "admin"].includes(role)) {
    redirect("/sign-in");
  }

  // Role-based navigation
  const navigation = {
    customer: [
      { name: "Overview", href: "/dashboard/customer" },
      { name: "My Bookings", href: "/dashboard/customer/bookings" },
      { name: "Profile Settings", href: "/dashboard/customer/profile" },
    ],

    vendor: [
      { name: "Overview", href: "/dashboard/vendor" },
      { name: "My Services", href: "/dashboard/vendor/services" },
      { name: "Add Service", href: "/dashboard/vendor/add-service" },
      { name: "Booking Requests", href: "/dashboard/vendor/bookings" },
      { name: "Subscription", href: "/dashboard/vendor/subscription" },
      { name: "Profile Settings", href: "/dashboard/vendor/profile" },
    ],

    admin: [
      { name: "Overview", href: "/dashboard/admin" },
      { name: "Manage Users", href: "/dashboard/admin/users" },
      { name: "Manage Services", href: "/dashboard/admin/services" },
      { name: "Transactions", href: "/dashboard/admin/transactions" },
    ],
  };

  const navItems = navigation[role as keyof typeof navigation];

  const roleTitle = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="min-h-screen bg-rose-50/60 md:flex">
      {/* Sidebar */}
      <aside className="w-full border-b border-rose-100 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 block text-2xl font-bold tracking-tight text-rose-600"
        >
          WedPlan
        </Link>

        {/* User Information */}
        <div className="mb-8 rounded-xl bg-rose-50 p-4">
          <p className="font-semibold text-gray-900">{session.user.name}</p>

          <p className="mt-1 break-all text-xs text-gray-500">
            {session.user.email}
          </p>

          <span className="mt-3 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold capitalize text-rose-600">
            {roleTitle}
          </span>
        </div>

        {/* Navigation */}
        <nav>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Dashboard Menu
          </p>

          <div className="flex flex-wrap gap-2 md:flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-rose-50 hover:text-rose-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Back to Website */}
        <Link
          href="/"
          className="mt-8 inline-block rounded-xl border border-rose-200 px-4 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          ← Back to Website
        </Link>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
