"use client";

import Link from "next/link";
import { useDeferredValue, useMemo } from "react";
import { ArrowRight, ArrowUpRight, SearchX } from "lucide-react";
import {
  DEMO_STUDIES,
  filterStudies,
  formatStudyDate,
} from "@/lib/demo-data";
import { useDashboardSearch } from "./search-context";
import { StatusBadge } from "./status-badge";
import { StudyThumbnail } from "./study-thumbnail";

export function StudyTable({
  title = "Recent X-ray Studies",
  description = "A fictional review queue for interface demonstration.",
  showViewAll = true,
}: {
  title?: string;
  description?: string;
  showViewAll?: boolean;
}) {
  const { query, clearQuery } = useDashboardSearch();
  const deferredQuery = useDeferredValue(query);

  const studies = useMemo(
    () => filterStudies(DEMO_STUDIES, deferredQuery),
    [deferredQuery],
  );

  const hasQuery = query.trim().length > 0;

  return (
    <section
      aria-labelledby="recent-studies-heading"
      className="rounded-xl border border-hairline bg-card shadow-[0_1px_2px_rgba(10,10,10,0.03)]"
    >
      <div className="flex flex-col gap-2 border-b border-hairline px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="recent-studies-heading"
              className="text-sm font-medium text-ink"
            >
              {title}
            </h2>
            <span className="rounded-full border border-hairline bg-plate px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
              Demo data
            </span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {showViewAll && (
          <Link
            href="/dashboard/history"
            className="inline-flex shrink-0 items-center gap-1 self-start text-[11px] font-medium text-accent-ink transition-colors hover:text-accent sm:self-auto"
          >
            View all
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            Recent chest X-ray studies in the demonstration workspace
          </caption>
          <thead>
            <tr className="border-b border-hairline bg-plate/45">
              <th
                scope="col"
                className="w-[68px] px-4 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                X-ray
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Study ID
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Patient
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Findings summary
              </th>
              <th
                scope="col"
                className="px-4 py-2.5 text-right font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {studies.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState query={query} onClear={clearQuery} />
                </td>
              </tr>
            ) : (
              studies.map((study) => (
                <tr
                  key={study.id}
                  className="border-b border-hairline/80 transition-colors last:border-b-0 hover:bg-plate/35"
                >
                  <td className="px-4 py-3">
                    <StudyThumbnail
                      variant={study.variant}
                      className="h-12 w-10"
                      label={`Illustrative thumbnail for ${study.id}`}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/dashboard/studies/${study.id}`}
                      className="font-mono text-[11px] font-medium text-ink transition-colors hover:text-accent-ink"
                    >
                      {study.id}
                    </Link>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                      CXR · PA
                    </p>
                  </td>
                  <td className="px-3 py-3">
                    <p className="text-xs font-medium text-ink">
                      {study.patientName}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {study.age} yrs · {study.sex}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-[11px] text-muted-foreground">
                    {formatStudyDate(study.date)}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={study.status} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex max-w-[240px] items-start gap-2">
                      <span className="mt-0.5 shrink-0 rounded border border-hairline bg-plate px-1 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                        Demo
                      </span>
                      <span className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                        {study.findingSummary}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/studies/${study.id}`}
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-medium text-accent-ink transition-colors hover:bg-accent-soft"
                    >
                      View details
                      <ArrowRight className="size-3" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-hairline md:hidden">
        {studies.length === 0 ? (
          <EmptyState query={query} onClear={clearQuery} />
        ) : (
          studies.map((study) => (
            <article key={study.id} className="p-4">
              <div className="flex items-start gap-3">
                <StudyThumbnail
                  variant={study.variant}
                  className="h-16 w-14 shrink-0"
                  label={`Illustrative thumbnail for ${study.id}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-ink">
                        {study.patientName}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                        {study.id}
                      </p>
                    </div>
                    <StatusBadge status={study.status} className="shrink-0" />
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    {formatStudyDate(study.date)} · {study.age} yrs · {study.sex}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-lg border border-hairline bg-plate/45 px-3 py-2">
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                  Illustrative finding
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink/80">
                  {study.findingSummary}
                </p>
              </div>

              <Link
                href={`/dashboard/studies/${study.id}`}
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-accent-ink"
              >
                View details
                <ArrowRight className="size-3" aria-hidden />
              </Link>
            </article>
          ))
        )}
      </div>

      <div className="flex flex-col gap-1 border-t border-hairline px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-[10px] text-muted-foreground" aria-live="polite">
          Showing {studies.length} of {DEMO_STUDIES.length} demo studies
          {hasQuery ? ` for “${query.trim()}”` : ""}
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/80">
          Fictional patients · Not for clinical use
        </p>
      </div>
    </section>
  );
}

function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="grid size-10 place-items-center rounded-full bg-plate text-muted-foreground">
        <SearchX className="size-5" aria-hidden />
      </span>
      <p className="mt-3 text-sm font-medium text-ink">No studies found</p>
      <p className="mt-1 max-w-sm text-[11px] leading-relaxed text-muted-foreground">
        {query.trim()
          ? `Nothing matches “${query.trim()}”. Try another Study ID or patient name.`
          : "There are no studies in this demo workspace."}
      </p>
      {query.trim() && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 rounded-md border border-hairline bg-card px-3 py-1.5 text-[11px] font-medium text-ink transition-colors hover:bg-plate"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
