"use client";
import { useApi } from "../../../hooks/use-api";
import type { Transaction } from "../../../types";
import { fmtDate } from "@/lib/format";
import { PageTitle } from "../../../components/shared/page-title";
import { QueryState, EmptyState } from "../../../components/shared/query-state";
import { StatusBadge } from "../../../components/shared/status-badge";

export default function TransactionsPage() {
  const { data, loading, error, reload } = useApi<{
    transactions: Transaction[];
  }>("/admin/transactions");
  return (
    <div>
      <PageTitle
        title="Transactions"
        subtitle="Read-only record of subscription payments"
      />
      <QueryState loading={loading} error={error} onRetry={reload}>
        {data?.transactions.length ? (
          <div className="overflow-x-auto rounded-2xl border bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-rose-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">Vendor</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.transactions.map((t) => (
                  <tr key={t._id} className="border-t">
                    <td className="p-3">
                      <p className="font-medium">{t.vendorName || "-"}</p>
                      <p className="text-xs text-gray-500">{t.vendorEmail}</p>
                    </td>
                    <td className="p-3 capitalize">{t.plan}</td>
                    <td className="p-3">
                      {t.amount} {t.currency?.toUpperCase()}
                    </td>
                    <td className="p-3">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="p-3">{fmtDate(t.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No transactions yet" />
        )}
      </QueryState>
    </div>
  );
}
