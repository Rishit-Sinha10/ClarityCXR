"use client";

import { CircleAlert, RotateCcw } from "lucide-react";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-red-50 text-red-600">
        <CircleAlert className="size-5" aria-hidden />
      </span>
      <h1 className="mt-4 font-display text-xl font-medium text-ink">
        Something went wrong
      </h1>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        The dashboard could not finish loading. Try again, or return to the
        workspace overview.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        <RotateCcw className="size-3.5" aria-hidden />
        Try again
      </button>
    </div>
  );
}
