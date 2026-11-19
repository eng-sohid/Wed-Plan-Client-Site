import { requireRole } from "@/lib/guard";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("customer");
  return children;
}
