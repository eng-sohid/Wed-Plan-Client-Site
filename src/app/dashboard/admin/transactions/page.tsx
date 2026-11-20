"use client";

import {
  CreditCard,
  ReceiptText,
  Wallet,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

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
    <div className="space-y-7">
      <PageTitle
        title="Transactions"
        subtitle="Monitor subscription payments and transaction records."
      />

      {/* Header Panel */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#20211e] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#526b50]/20 blur-[90px]" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#d8b68c]/10 text-[#d8b68c]">
              <CreditCard size={27} strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-[#faf9f6] sm:text-2xl">
                Payment Records
              </h2>
              <p className="mt-1 text-sm text-white/40">
                A complete overview of vendor subscription transactions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#171815] px-4 py-2 text-xs text-white/50">
            <ReceiptText size={15} className="text-[#d8b68c]" />
            Read-only records
          </div>
        </div>
      </section>

      {/* Transactions */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#20211e]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#faf9f6]">
              All Transactions
            </h3>
            <p className="mt-1 text-xs text-white/40">
              Vendor payment history and subscription details.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#171815] px-3 py-1.5 text-xs text-white/50">
            <Wallet size={14} className="text-[#d8b68c]" />
            {data?.transactions.length ?? 0} records
          </div>
        </div>

        <QueryState loading={loading} error={error} onRetry={reload}>
          {data?.transactions.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#171815] text-[11px] uppercase tracking-wider text-white/35">
                  <tr>
                    <th className="px-5 py-4 font-medium">Vendor</th>
                    <th className="px-5 py-4 font-medium">Plan</th>
                    <th className="px-5 py-4 font-medium">Amount</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 text-right font-medium">Type</th>
                  </tr>
                </thead>

                <tbody>
                  {data.transactions.map((t) => (
                    <tr
                      key={t._id}
                      className="border-t border-white/[0.06] transition hover:bg-white/[0.025]"
                    >
                      {/* Vendor */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d8b68c]/15 bg-[#d8b68c]/10 text-[#d8b68c]">
                            <Wallet size={17} />
                          </div>

                          <div>
                            <p className="font-medium text-[#faf9f6]">
                              {t.vendorName || "-"}
                            </p>
                            <p className="mt-0.5 text-xs text-white/40">
                              {t.vendorEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/10 px-3 py-1 text-xs font-medium capitalize text-[#d8b68c]">
                          {t.plan}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#faf9f6]">
                          {t.amount} {t.currency?.toUpperCase()}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/30">
                          Payment amount
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={t.status} />
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-white/60">
                          <CalendarDays size={14} className="text-white/30" />
                          {fmtDate(t.createdAt)}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-xs text-white/40">
                          Subscription
                          <ArrowUpRight size={13} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <EmptyState title="No transactions yet" />
            </div>
          )}
        </QueryState>
      </section>
    </div>
  );
}
