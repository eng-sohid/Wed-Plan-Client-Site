import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./loading-spinner";

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
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="mb-3 text-sm text-red-700">{error}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
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
    <div className="rounded-xl border border-dashed bg-white p-10 text-center">
      <p className="font-serif text-lg font-semibold text-gray-800">{title}</p>
      {text && <p className="mt-1 text-sm text-gray-500">{text}</p>}
    </div>
  );
}
