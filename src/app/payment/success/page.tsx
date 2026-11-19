"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Clock } from "lucide-react";
import { api } from "@/lib/api";
import { roseBtn } from "@/lib/format";

// Ei page KOKHONO Premium activate kore na. Shudhu server ke poll kore,
// ar server Stripe webhook verify howar por vendor ke Premium dey.
export default function PaymentSuccessPage() {
  const [state, setState] = useState<"checking" | "paid" | "pending">(
    "checking",
  );

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
        /* retry below */
      }
      tries++;
      if (stop) return;
      if (tries < 10) setTimeout(poll, 2000);
      else setState("pending");
    }
    poll();
    return () => {
      stop = true;
    };
  }, []);

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      {state === "checking" && (
        <>
          <Loader2 className="h-14 w-14 animate-spin text-rose-500" />
          <h1 className="font-serif text-3xl font-bold">
            Confirming your payment...
          </h1>
          <p className="text-gray-500">
            Please wait while we verify the payment with Stripe.
          </p>
        </>
      )}
      {state === "paid" && (
        <>
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h1 className="font-serif text-3xl font-bold">Premium Activated!</h1>
          <p className="text-gray-500">
            Thank you! You can now publish unlimited services.
          </p>
          <Link
            href="/dashboard/vendor/subscription"
            className={roseBtn}
          >
            Go to Subscription
          </Link>
        </>
      )}
      {state === "pending" && (
        <>
          <Clock className="h-16 w-16 text-amber-500" />
          <h1 className="font-serif text-3xl font-bold">
            Payment is being processed
          </h1>
          <p className="text-gray-500">
            Premium will activate automatically once Stripe confirms your
            payment. Check your subscription page in a minute.
          </p>
          <Link
            href="/dashboard/vendor/subscription"
            className={roseBtn}
          >
            Go to Subscription
          </Link>
        </>
      )}
    </div>
  );
}
