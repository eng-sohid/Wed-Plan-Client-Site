import Link from "next/link";
import { XCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#171815] px-5 py-16 text-[#faf9f6]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.07] blur-[110px]" />

      <div className="relative w-full max-w-lg rounded-3xl border border-white/[0.08] bg-[#20211e] px-7 py-12 text-center shadow-2xl md:px-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-400/20 bg-red-400/[0.08]">
          <XCircle className="h-10 w-10 text-red-400" strokeWidth={1.5} />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
          Payment Status
        </p>

        <h1 className="mt-4 font-serif text-3xl md:text-4xl">
          Payment <span className="italic text-red-400">Cancelled</span>
        </h1>

        <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/45">
          No charges were made. Your payment was not completed. You can upgrade
          to Premium whenever you&apos;re ready.
        </p>

        <div className="mt-9 flex items-center justify-center gap-2 text-xs text-white/35">
          <ShieldCheck size={15} className="text-[#d8b68c]" />
          Your account and subscription remain unchanged
        </div>

        <Link
          href="/dashboard/vendor/subscription"
          className="group mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d8b68c] px-7 py-4 text-sm font-semibold text-[#171815] transition hover:bg-[#e7cba9]"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Subscription
        </Link>
      </div>
    </main>
  );
}
