import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function CustomerDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check login
  if (!session) {
    redirect("/sign-in");
  }

  // Verify customer role
  const role = session.user.role as string | null | undefined;

  if (role !== "customer") {
    if (role === "vendor") {
      redirect("/dashboard/vendor");
    }

    if (role === "admin") {
      redirect("/dashboard/admin");
    }

    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-rose-500">Customer Dashboard</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Welcome, {session.user.name}!
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your wedding bookings from here.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Bookings", value: "0" },
          { title: "Pending Bookings", value: "0" },
          { title: "Accepted Bookings", value: "0" },
          { title: "Rejected Bookings", value: "0" },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{item.title}</p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Dashboard Navigation */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Link
          href="/dashboard/customer/bookings"
          className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>

          <p className="mt-2 text-gray-500">
            View and manage your wedding service bookings.
          </p>
        </Link>

        <Link
          href="/dashboard/customer/profile"
          className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>

          <p className="mt-2 text-gray-500">
            Manage your personal information.
          </p>
        </Link>
      </div>
    </div>
  );
}
