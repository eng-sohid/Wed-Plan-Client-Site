import Link from "next/link";
import { XCircle } from "lucide-react";
import { roseBtn } from "@/lib/format";

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <XCircle className="h-16 w-16 text-red-500" />
      <h1 className="font-serif text-3xl font-bold">Payment Cancelled</h1>
      <p className="text-gray-500">
        No charges were made. You can upgrade to Premium any time.
      </p>
      <Link href="/dashboard/vendor/subscription" className={roseBtn}>
        Back to Subscription
      </Link>
    </div>
  );
}
