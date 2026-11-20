"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { api } from "@/lib/api";

type PaymentState = "checking" | "paid" | "pending";

export default function PaymentSuccessPage() {
  const [state, setState] = useState<PaymentState>("checking");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("session_id");

    if (!id) {
      const timeout = setTimeout(() => setState("pending"), 0);
      return () => clearTimeout(timeout);
    }

    let tries = 0;
    let stop = false;
    let retryTimeout: ReturnType<typeof setTimeout> | undefined;

    async function poll() {
      try {
        const d = await api<{ status: string }>(`/payments/session/${id}`);

        if (d.status === "paid") {
          if (!stop) setState("paid");
          return;
        }
      } catch {
        // Retry below
      }

      tries++;

      if (stop) return;

      if (tries < 10) {
        retryTimeout = setTimeout(poll, 2000);
      } else {
        setState("pending");
      }
    }

    poll();

    return () => {
      stop = true;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#171815] px-5 py-16 text-[#faf9f6]">
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] ${
          state === "paid"
            ? "bg-emerald-500/[0.08]"
            : state === "pending"
              ? "bg-amber-500/[0.08]"
              : "bg-[#d8b68c]/[0.08]"
        }`}
      />

      <div className="relative w-full max-w-lg rounded-3xl border border-white/[0.08] bg-[#20211e] px-7 py-12 text-center shadow-2xl md:px-12">
        {state === "checking" && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/[0.07]">
              <Loader2
                className="h-10 w-10 animate-spin text-[#d8b68c]"
                strokeWidth={1.5}
              />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
              Payment Verification
            </p>

            <h1 className="mt-4 font-serif text-3xl md:text-4xl">
              Confirming Your{" "}
              <span className="italic text-[#d8b68c]">Payment</span>
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/45">
              Please wait while we verify your payment with Stripe. This may
              take a few moments.
            </p>

            <div className="mt-9 flex items-center justify-center gap-2 text-xs text-white/35">
              <ShieldCheck size={15} className="text-[#d8b68c]" />
              Secure payment verification
            </div>
          </>
        )}

        {state === "paid" && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08]">
              <CheckCircle2
                className="h-10 w-10 text-emerald-400"
                strokeWidth={1.5}
              />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
              Payment Successful
            </p>

            <h1 className="mt-4 font-serif text-3xl md:text-4xl">
              Premium{" "}
              <span className="italic text-emerald-400">Activated!</span>
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/45">
              Thank you for choosing WedPlan Premium. Your payment has been
              verified and you can now publish unlimited services.
            </p>

            <div className="mt-9 flex items-center justify-center gap-2 text-xs text-white/35">
              <ShieldCheck size={15} className="text-emerald-400" />
              Your payment has been verified by Stripe
            </div>

            <Link
              href="/dashboard/vendor/subscription"
              className="group mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d8b68c] px-7 py-4 text-sm font-semibold text-[#171815] transition hover:bg-[#e7cba9]"
            >
              Go to Subscription
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </>
        )}

        {state === "pending" && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/[0.08]">
              <Clock className="h-10 w-10 text-amber-400" strokeWidth={1.5} />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
              Payment Processing
            </p>

            <h1 className="mt-4 font-serif text-3xl md:text-4xl">
              Payment Is <span className="italic text-amber-400">Pending</span>
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/45">
              Your payment is being processed. Premium will activate
              automatically once Stripe confirms your payment. Please check your
              subscription page in a minute.
            </p>

            <div className="mt-9 flex items-center justify-center gap-2 text-xs text-white/35">
              <ShieldCheck size={15} className="text-[#d8b68c]" />
              Waiting for server-side payment confirmation
            </div>

            <Link
              href="/dashboard/vendor/subscription"
              className="group mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#d8b68c]/40 px-7 py-4 text-sm font-semibold text-[#d8b68c] transition hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              Go to Subscription
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
