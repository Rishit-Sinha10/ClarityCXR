import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function StudyNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-plate text-muted-foreground">
        <SearchX className="size-5" aria-hidden />
      </span>
      <h1 className="mt-4 font-display text-xl font-medium text-ink">
        Study not found
      </h1>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        This demo study does not exist. Return to Study History to browse the
        fictional records.
      </p>
      <Link
        href="/dashboard/history"
        className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        Back to Study History
      </Link>
    </div>
  );
}
