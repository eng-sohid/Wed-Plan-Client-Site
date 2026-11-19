import { redirect } from "next/navigation";
import { getSession } from "@/lib/guard";

export default async function DashboardIndex() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  redirect(`/dashboard/${session.user.role || "customer"}`);
}
