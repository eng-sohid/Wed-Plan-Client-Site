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
      <div className="flex min-h-screen items-center justify-center bg-[#171815] px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-red-400/15 bg-[#20211e] p-8 text-center shadow-2xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10">
            <span className="text-2xl text-red-400">!</span>
          </div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8b68c]">
            WedPlan Account Security
          </p>

          <h1 className="mt-3 font-serif text-3xl font-semibold text-[#faf9f6]">
            Account Blocked
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/45">
            Your account has been blocked by an administrator. Please contact
            support for further assistance.
          </p>
        </div>
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
