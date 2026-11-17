"use client";

import Link from "next/link";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ArrowRight, RefreshCw, SearchX } from "lucide-react";
import { useDashboardSearch } from "@/components/dashboard/search-context";
import {
  formatFileSize,
  formatStudyDate,
  listStudies,
  type Study,
} from "@/lib/studies-api";

type LiveStudiesProps = {
  limit?: number;
  title?: string;
  showViewAll?: boolean;
};

function isToday(value: string) {
  const date = new Date(value);
  const today = new Date();

  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function readableDate(value: string) {
  return Number.isNaN(new Date(value).getTime())
    ? "Date unavailable"
    : formatStudyDate(value);
}

function statusLabel(status: string) {
  const label = status
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  return label || "Unknown";
}

function statusStyle(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-emerald-50 text-emerald-700";
    case "uploaded":
      return "bg-slate-50 text-slate-700";
    case "processing":
      return "bg-blue-50 text-blue-700";
    case "pending":
      return "bg-amber-50 text-amber-800";
    case "failed":
      return "bg-rose-50 text-rose-700";
    default:
      return "bg-plate text-muted-foreground";
  }
}

export function LiveStudies({
  limit,
  title = "Recent studies",
  showViewAll = true,
}: LiveStudiesProps) {
  const { query } = useDashboardSearch();
  const deferredQuery = useDeferredValue(query).trim().toLowerCase();
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStudies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setStudies(await listStudies());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load studies from the API.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    void listStudies()
      .then((data) => {
        if (active) setStudies(data);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load studies from the API.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredStudies = useMemo(() => {
    if (!deferredQuery) return studies;

    return studies.filter(
      (study) =>
        study.filename.toLowerCase().includes(deferredQuery) ||
        study.id.toLowerCase().includes(deferredQuery),
    );
  }, [deferredQuery, studies]);
  const visibleStudies =
    typeof limit === "number"
      ? filteredStudies.slice(0, limit)
      : filteredStudies;
  const uploadedToday = studies.filter((study) =>
    isToday(study.created_at),
  ).length;
  const totalBytes = studies.reduce(
    (total, study) => total + study.size_bytes,
    0,
  );

  return (
    <section
      aria-labelledby="live-studies-heading"
      className="overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_1px_2px_rgba(10,10,10,0.03)]"
    >
      <div className="flex flex-col gap-3 border-b border-hairline px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="live-studies-heading"
              className="text-sm font-medium text-ink"
            >
              {title}
            </h2>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
              API data
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {error
              ? "API unavailable"
              : loading
                ? "Connecting to your study workspace…"
                : `${studies.length} ${studies.length === 1 ? "study" : "studies"} · ${uploadedToday} added today · ${formatFileSize(totalBytes)} stored`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {showViewAll && (
            <Link
              href="/dashboard/history"
              className="text-[11px] font-medium text-accent-ink hover:text-accent"
            >
              View all
            </Link>
          )}
          <button
            type="button"
            onClick={() => void loadStudies()}
            disabled={loading}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-hairline bg-card px-2.5 text-[11px] font-medium text-ink transition-colors hover:bg-plate disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`size-3.5 ${loading ? "animate-spin" : ""}`}
              aria-hidden
            />
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <div className="px-5 py-10 text-center" role="alert">
          <p className="text-sm font-medium text-ink">
            Studies could not be loaded
          </p>
          <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
            {error}
          </p>
          <button
            type="button"
            onClick={() => void loadStudies()}
            className="mt-4 rounded-md border border-hairline bg-card px-3 py-1.5 text-xs font-medium text-ink hover:bg-plate"
          >
            Try again
          </button>
        </div>
      ) : loading ? (
        <div className="space-y-4 px-5 py-5" aria-label="Loading studies">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="h-3 w-40 max-w-full animate-pulse rounded bg-plate" />
                <div className="mt-2 h-2.5 w-28 animate-pulse rounded bg-plate" />
              </div>
              <div className="h-3 w-20 animate-pulse rounded bg-plate" />
            </div>
          ))}
        </div>
      ) : visibleStudies.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-12 text-center">
          <SearchX className="size-5 text-muted-foreground" aria-hidden />
          <p className="mt-3 text-sm font-medium text-ink">
            {deferredQuery ? "No matching studies" : "No studies yet"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {deferredQuery
              ? "Try searching by filename or study ID."
              : "Uploaded studies will appear here."}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-hairline">
          {visibleStudies.map((study) => (
            <Link
              key={study.id}
              href={`/dashboard/studies/${encodeURIComponent(study.id)}`}
              className="group flex min-w-0 items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-plate/45 sm:px-5"
            >
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium text-ink group-hover:text-accent-ink">
                  {study.filename}
                </span>
                <span className="mt-1 block truncate font-mono text-[10px] text-muted-foreground">
                  {study.id}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3 sm:gap-5">
                <span className="hidden text-right sm:block">
                  <span className="block text-[11px] text-ink">
                    {readableDate(study.created_at)}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-muted-foreground">
                    {formatFileSize(study.size_bytes)}
                  </span>
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-medium ${statusStyle(study.status)}`}
                >
                  {statusLabel(study.status)}
                </span>
                <ArrowRight
                  className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && filteredStudies.length > visibleStudies.length && (
        <div className="border-t border-hairline px-5 py-3 text-center">
          <Link
            href="/dashboard/history"
            className="text-[11px] font-medium text-accent-ink hover:text-accent"
          >
            View {filteredStudies.length - visibleStudies.length} more studies
          </Link>
        </div>
      )}
    </section>
  );
}
