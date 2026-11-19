import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

// Wrong role holle user nijer dashboard e chole jabe
export async function requireRole(role: string) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  const current = session.user.role || "customer";
  if (current !== role) redirect(`/dashboard/${current}`);
  return session;
}
