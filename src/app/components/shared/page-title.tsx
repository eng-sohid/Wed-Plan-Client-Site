import type { ReactNode } from "react";

export function PageTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-7 bg-[#d8b68c]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8b68c]">
            WedPlan Dashboard
          </span>
        </div>

        <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#faf9f6] sm:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
