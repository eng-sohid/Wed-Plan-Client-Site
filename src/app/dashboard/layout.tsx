import { redirect } from "next/navigation";
import { getSession } from "@/lib/guard";
import DashboardShell from "../components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  if (
    (session.user as typeof session.user & { isBlocked?: boolean }).isBlocked
  ) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-red-600">
          Account Blocked
        </h1>
        <p className="mt-3 text-gray-600">
          Your account has been blocked by an administrator. Please contact
          support.
        </p>
      </div>
    );
  }

  return (
    <DashboardShell
      role={session.user.role || "customer"}
      name={session.user.name}
      image={session.user.image}
    >
      {children}
    </DashboardShell>
  );
}
