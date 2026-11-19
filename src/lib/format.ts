export const money = (n: number) => `$${Number(n).toLocaleString()}`;

export const fmtDate = (d?: string | Date | null) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

export const roseBtn = "bg-rose-600 text-white hover:bg-rose-700";

export const selectCls =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-rose-300";
