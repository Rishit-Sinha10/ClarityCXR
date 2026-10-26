"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowUpRight, FileText, SearchX } from "lucide-react";
import {
  DEMO_REPORTS,
  formatStudyDate,
} from "@/lib/demo-data";
import { useDashboardSearch } from "@/components/dashboard/search-context";

export function ReportsList() {
  const { query, clearQuery } = useDashboardSearch();
  const normalized = query.trim().toLowerCase();

  const reports = useMemo(() => {
    if (!normalized) {
      return DEMO_REPORTS;
    }

    return DEMO_REPORTS.filter(
      (report) =>
        report.id.toLowerCase().includes(normalized) ||
        report.studyId.toLowerCase().includes(normalized) ||
        report.patientName.toLowerCase().includes(normalized),
    );
  }, [normalized]);

  if (reports.length === 0) {
    return (
      <div className="rounded-xl border border-hairline bg-card px-6 py-14 text-center shadow-[0_1px_2px_rgba(10,10,10,0.03)]">
        <span className="mx-auto grid size-10 place-items-center rounded-full bg-plate text-muted-foreground">
          <SearchX className="size-5" aria-hidden />
        </span>
        <p className="mt-3 text-sm font-medium text-ink">No reports found</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Nothing matches “{query.trim()}”. Try another report, Study ID, or
          patient name.
        </p>
        <button
          type="button"
          onClick={clearQuery}
          className="mt-4 rounded-md border border-hairline bg-card px-3 py-1.5 text-[11px] font-medium text-ink transition-colors hover:bg-plate"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_1px_2px_rgba(10,10,10,0.03)]">
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-4 sm:px-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-medium text-ink">Demo reports</h2>
            <span className="rounded-full border border-hairline bg-plate px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
              Illustrative
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {reports.length} of {DEMO_REPORTS.length} reports shown
          </p>
        </div>
      </div>

      <div className="divide-y divide-hairline">
        {reports.map((report) => (
          <article
            key={report.id}
            className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-plate/35 sm:flex-row sm:items-start sm:justify-between sm:px-5"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-hairline bg-plate/60 text-muted-foreground">
                <FileText className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[11px] font-medium text-ink">
                    {report.id}
                  </p>
                  <span
                    className={
                      report.status === "ready"
                        ? "rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700"
                        : "rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[9px] font-medium text-amber-800"
                    }
                  >
                    {report.status === "ready" ? "Ready" : "Draft"}
                  </span>
                  <span className="rounded-full border border-hairline bg-plate px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                    Demo
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-ink">
                  {report.patientName}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {report.studyId} · {formatStudyDate(report.createdAt)}
                </p>
                <p className="mt-2 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
                  {report.summary}
                </p>
              </div>
            </div>

            <Link
              href={`/dashboard/studies/${report.studyId}`}
              className="inline-flex shrink-0 items-center gap-1 self-start rounded-md border border-hairline bg-card px-2.5 py-1.5 text-[11px] font-medium text-ink transition-colors hover:bg-plate"
            >
              Open study
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </article>
        ))}
      </div>

      <div className="border-t border-hairline px-4 py-3 sm:px-5">
        <p className="text-[10px] text-muted-foreground">
          Report text is illustrative interface content. It is not AI-generated
          output and is not clinically validated.
        </p>
      </div>
    </div>
  );
}
