"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, FileText, SearchX } from "lucide-react";
import { DEMO_REPORTS, formatStudyDate } from "@/lib/demo-data";
import { useDashboardSearch } from "@/components/dashboard/search-context";

type Study = {
  id: string;
  filename: string;
  size_bytes: number;
  status: string;
  created_at: string;
};

export function ReportsList() {
  const { query, clearQuery } = useDashboardSearch();
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchStudies = useCallback(async () => {
    if (!BackendURL) {
      setError("Backend URL is not configured.");
      setLoading(false);
      return;
    }

    try {
      setError("");

      const response = await fetch(`${BackendURL}/studies`);

      if (!response.ok) {
        throw new Error("Could not load uploaded studies.");
      }

      const data: Study[] = await response.json();
      setStudies(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the backend.",
      );
    } finally {
      setLoading(false);
    }
  }, [BackendURL]);

  useEffect(() => {
    void fetchStudies();
  }, [fetchStudies]);

  const normalized = query.trim().toLowerCase();

  const filteredStudies = useMemo(
    () =>
      studies.filter(
        (study) =>
          study.filename.toLowerCase().includes(normalized) ||
          study.id.toLowerCase().includes(normalized) ||
          study.status.toLowerCase().includes(normalized),
      ),
    [studies, normalized],
  );

  const reports = useMemo(
    () =>
      DEMO_REPORTS.filter(
        (report) =>
          !normalized ||
          report.id.toLowerCase().includes(normalized) ||
          report.studyId.toLowerCase().includes(normalized) ||
          report.patientName.toLowerCase().includes(normalized),
      ),
    [normalized],
  );

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_1px_2px_rgba(10,10,10,0.03)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-sm font-medium text-ink">Uploaded studies</h2>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {loading
                ? "Loading studies..."
                : `${filteredStudies.length} studies found`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => void fetchStudies()}
            disabled={loading}
            className="rounded-md border border-hairline bg-card px-3 py-1.5 text-[11px] font-medium text-ink hover:bg-plate disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        {error && <div className="px-5 py-4 text-sm text-red-600">{error}</div>}

        {loading ? (
          <p className="px-5 py-8 text-sm text-muted-foreground">
            Fetching uploaded studies...
          </p>
        ) : !error && filteredStudies.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <FileText className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium text-ink">
              {normalized ? "No matching uploads" : "No uploaded studies yet"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Upload a PNG or JPEG chest X-ray to see it here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-hairline">
            {filteredStudies.map((study) => (
              <article
                key={study.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-hairline bg-plate/60 text-muted-foreground">
                    <FileText className="size-4" aria-hidden />
                  </span>

                  <div className="min-w-0">
                    <p className="break-all text-sm font-medium text-ink">
                      {study.filename}
                    </p>
                    <p className="mt-1 break-all font-mono text-[10px] text-muted-foreground">
                      ID: {study.id}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {(study.size_bytes / (1024 * 1024)).toFixed(2)} MB
                      {" · "}
                      {new Date(study.created_at).toLocaleString()}
                    </p>
                    <span className="mt-2 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      {study.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
