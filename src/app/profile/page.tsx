import { redirect } from "next/navigation";
import { getSession } from "@/lib/guard";

export default async function ProfileRedirect() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  const role = session.user.role || "customer";
  redirect(`/dashboard/${role}/profile`);
}
