"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  Loader2,
  RefreshCw,
  ScanLine,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ApiRequestError,
  createPrediction,
  getPrediction,
  getStudyPredictions,
  type PredictionRecord,
  type PredictionStatus,
} from "@/lib/api";

type PredictionSummary = Pick<PredictionRecord, "id" | "status">;

const statusDetails: Record<
  PredictionStatus,
  { label: string; description: string; className: string; icon: LucideIcon }
> = {
  pending: {
    label: "Pending",
    description: "The backend has recorded this analysis request.",
    className: "border-amber-200 bg-amber-50 text-amber-800",
    icon: Clock3,
  },
  processing: {
    label: "Processing",
    description: "The backend reports that this analysis is in progress.",
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: Loader2,
  },
  completed: {
    label: "Completed",
    description: "The backend reports that this analysis is complete.",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    description: "The backend reports that this analysis failed.",
    className: "border-red-200 bg-red-50 text-red-700",
    icon: XCircle,
  },
};

function getErrorMessage(
  error: unknown,
  action: "load" | "create" | "refresh",
) {
  if (error instanceof ApiRequestError) {
    if (error.status === null) {
      return error.message;
    }
    if (error.status === 404) {
      if (action === "create") {
        return "This study no longer exists. Return to Study History and choose an available study.";
      }
      if (action === "refresh") {
        return "This prediction could not be found. Reload the page to check for a newer request.";
      }
      return "This study could not be found. Return to Study History and choose an available study.";
    }
    return `The analysis service returned an error (${error.status}). Try again.`;
  }

  if (error instanceof Error && error.name === "AbortError") {
    return null;
  }

  return "Could not complete the request. Check the backend connection and try again.";
}

export function PredictionWorkflow({ studyId }: { studyId: string }) {
  const [prediction, setPrediction] = useState<PredictionSummary | null>(null);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestInProgress = useRef(false);
  const isActive =
    prediction?.status === "pending" || prediction?.status === "processing";
  const busy = checking || submitting || refreshing;

  useEffect(() => {
    let cancelled = false;

    async function loadLatestPrediction() {
      setChecking(true);
      setError(null);

      try {
        const predictions = await getStudyPredictions(studyId);
        if (cancelled) return;

        const latest =
          predictions.find(
            (item) =>
              item.status === "pending" || item.status === "processing",
          ) ?? predictions[0];
        if (!latest) {
          setPrediction(null);
          return;
        }

        setPrediction({ id: latest.id, status: latest.status });
        const record = await getPrediction(latest.id);
        if (!cancelled) {
          setPrediction({ id: record.id, status: record.status });
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(getErrorMessage(loadError, "load"));
        }
      } finally {
        if (!cancelled) {
          setChecking(false);
        }
      }
    }

    void loadLatestPrediction();
    return () => {
      cancelled = true;
    };
  }, [studyId]);

  async function runAnalysis() {
    if (requestInProgress.current || isActive) return;

    requestInProgress.current = true;
    setSubmitting(true);
    setError(null);

    try {
      const created = await createPrediction(studyId);
      setPrediction(created);

      try {
        const record = await getPrediction(created.id);
        setPrediction({ id: record.id, status: record.status });
      } catch (fetchError) {
        setError(
          getErrorMessage(fetchError, "refresh") ??
            "The request was accepted, but its current status could not be loaded.",
        );
      }
    } catch (createError) {
      setError(getErrorMessage(createError, "create"));
    } finally {
      requestInProgress.current = false;
      setSubmitting(false);
    }
  }

  async function refreshStatus() {
    if (!prediction || requestInProgress.current) return;

    requestInProgress.current = true;
    setRefreshing(true);
    setError(null);

    try {
      const record = await getPrediction(prediction.id);
      setPrediction({ id: record.id, status: record.status });
    } catch (refreshError) {
      setError(getErrorMessage(refreshError, "refresh"));
    } finally {
      requestInProgress.current = false;
      setRefreshing(false);
    }
  }

  const status = prediction ? statusDetails[prediction.status] : null;
  const StatusIcon = status?.icon;

  return (
    <section
      aria-labelledby="prediction-heading"
      aria-busy={busy}
      className="overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_1px_2px_rgba(10,10,10,0.03)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent-soft text-accent-ink">
            <ScanLine className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              Prediction workflow
            </p>
            <h2
              id="prediction-heading"
              className="mt-1 text-sm font-semibold text-ink"
            >
              AI analysis
            </h2>
          </div>
        </div>

        {status ? (
          <span
            className={`inline-flex h-6 items-center gap-1.5 rounded-full border px-2 text-[10px] font-medium ${status.className}`}
          >
            {StatusIcon && (
              <StatusIcon
                className={`size-3 ${prediction?.status === "processing" ? "animate-spin" : ""}`}
                aria-hidden
              />
            )}
            {status.label}
          </span>
        ) : (
          <span className="rounded-full border border-hairline bg-plate px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
            Not started
          </span>
        )}
      </div>

      <div className="border-t border-hairline bg-plate/35 p-4 sm:p-5">
        {checking ? (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" aria-hidden />
            Checking previous analysis requests...
          </p>
        ) : prediction && status ? (
          <div aria-live="polite">
            <p className="text-xs font-medium text-ink">{status.description}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  Prediction ID
                </p>
                <p className="mt-1 break-all font-mono text-[11px] text-ink">
                  {prediction.id}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => void refreshStatus()}
                className="border-hairline bg-card text-[10px]"
              >
                <RefreshCw
                  className={`size-3 ${refreshing ? "animate-spin" : ""}`}
                  aria-hidden
                />
                Refresh status
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-xs leading-relaxed text-muted-foreground">
            No analysis has been requested for this study.
          </p>
        )}

        {(!prediction || prediction.status === "pending") && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2.5">
            <CircleAlert
              className="mt-0.5 size-3.5 shrink-0 text-amber-800"
              aria-hidden
            />
            <p className="text-[11px] leading-relaxed text-amber-900">
              <span className="font-semibold">
                AI model integration pending.
              </span>{" "}
              Requests are recorded, but the CNN does not yet produce clinical
              results.
            </p>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] leading-relaxed text-red-800"
          >
            {error}
          </p>
        )}

        <div className="mt-4 border-t border-hairline pt-4">
          <Button
            type="button"
            size="lg"
            disabled={busy || isActive}
            onClick={() => void runAnalysis()}
            className="h-10 w-full text-xs font-semibold"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <ScanLine className="size-4" aria-hidden />
            )}
            {submitting ? "Requesting analysis..." : "Run AI Analysis"}
          </Button>
          {isActive && !submitting && (
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              An active request already exists. Refresh its status instead of
              submitting another.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
