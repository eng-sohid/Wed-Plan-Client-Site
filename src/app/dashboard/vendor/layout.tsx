import { requireRole } from "@/lib/guard";
export const instant = false;

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("vendor");
  return children;
}
