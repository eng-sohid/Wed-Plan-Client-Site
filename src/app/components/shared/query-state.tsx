import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./loading-spinner";
import { AlertCircle, RefreshCw, Inbox } from "lucide-react";

export function QueryState({
  loading,
  error,
  onRetry,
  children,
}: {
  loading: boolean;
  error: string;
  onRetry?: () => void;
  children: ReactNode;
}) {
  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/15 bg-[#20211e] px-5 py-10 text-center sm:px-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>

        <p className="mx-auto mb-5 max-w-lg text-sm leading-6 text-red-300/80">
          {error}
        </p>

        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="rounded-lg border-white/15 bg-white/5 text-white/80 hover:border-[#d8b68c]/40 hover:bg-[#d8b68c]/10 hover:text-[#d8b68c]"
          >
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            Try again
          </Button>
        )}
      </div>
    );
  }

  return <>{children}</>;
}

export function EmptyState({ title, text }: { title: string; text?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-[#20211e]/60 px-5 py-12 text-center sm:px-8">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d8b68c]/20 bg-[#d8b68c]/10">
        <Inbox className="h-6 w-6 text-[#d8b68c]" />
      </div>

      <p className="font-serif text-lg font-semibold text-[#faf9f6]">{title}</p>

      {text && (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
          {text}
        </p>
      )}
    </div>
  );
}
