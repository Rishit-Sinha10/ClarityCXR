import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  HardDrive,
  Info,
  ScanLine,
} from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  getStudyById,
  formatStudyDate,
  formatFileSize,
} from "@/lib/studies-api";
type StudyPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: StudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = await getStudyById(id);

  return {
    title: study ? study.original_filename : "Study not found",
    description: study ? `Uploaded study ${study.id}` : "Study not found.",
  };
}

export default async function StudyDetailPage({ params }: StudyPageProps) {
  const { id } = await params;
  const study = await getStudyById(id);

  if (!study) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <Link
        href="/dashboard/history"
        className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        Back to Study History
      </Link>

      <div className="mt-4">
        <PageHeader
          eyebrow={`Workspace / Study / ${study.id}`}
          title={`${study.original_filename} · Chest X-ray`}
          description="Study metadata retrieved from your ClarityCXR database."
          action={
            <Link
              href="/dashboard/history"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-hairline bg-card px-3 text-[11px] font-medium text-ink transition-colors hover:bg-plate"
            >
              <ScanLine className="size-3.5" aria-hidden />
              All studies
            </Link>
          }
        />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Left column: file information */}
        <div className="space-y-4">
          <section className="rounded-xl border border-hairline bg-card p-5">
            <div className="flex size-12 items-center justify-center rounded-xl bg-plate">
              <FileText className="size-6 text-muted-foreground" aria-hidden />
            </div>

            <p className="mt-4 break-words text-sm font-medium text-ink">
              {study.original_filename}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Original uploaded file
            </p>

            <div className="mt-5 flex items-center gap-2 border-t border-hairline pt-4">
              <HardDrive className="size-4 text-muted-foreground" aria-hidden />
              <span className="text-xs text-muted-foreground">File size</span>
              <span className="ml-auto text-xs font-medium text-ink">
                {formatFileSize(study.size_bytes)}
              </span>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
              This record confirms uploaded file metadata. Image preview and AI
              analysis are not available through the current endpoint.
            </p>
          </section>

          {/* Clearly labeled synthetic image placeholder */}
          <section className="rounded-xl border border-hairline bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Synthetic image
              </p>
              <span className="rounded-full border border-hairline bg-plate px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                Not clinical
              </span>
            </div>

            <div
              className="mt-3 flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-hairline bg-plate"
              role="img"
              aria-label="No real chest X-ray image available"
            >
              <div className="text-center">
                <ScanLine
                  className="mx-auto size-8 text-muted-foreground"
                  aria-hidden
                />
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  Image preview unavailable
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  No patient image displayed
                </p>
              </div>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              This placeholder does not represent an actual chest X-ray. No
              clinical image is displayed here.
            </p>
          </section>
        </div>

        {/* Right column: metadata and timeline */}
        <div className="min-w-0 space-y-4">
          <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Study ID
                </p>
                <p className="mt-1 break-all font-mono text-sm font-medium text-ink">
                  {study.id}
                </p>
              </div>

              <StatusBadge
                status={
                  study.status as Parameters<typeof StatusBadge>[0]["status"]
                }
              />
            </div>

            <dl className="mt-5 grid gap-4 border-t border-hairline pt-4 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Study ID
                </dt>
                <dd className="mt-1.5 break-all font-mono text-xs text-ink">
                  {study.id}
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  <CalendarDays className="size-3" aria-hidden />
                  Uploaded
                </dt>
                <dd className="mt-1.5 text-xs font-medium text-ink">
                  {formatStudyDate(study.created_at)}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  File size
                </dt>
                <dd className="mt-1.5 text-xs font-medium text-ink">
                  {formatFileSize(study.size_bytes)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5">
            <h2 className="text-sm font-medium text-ink">Study timeline</h2>

            <ol className="mt-4 space-y-3">
              {[
                ["Image added", "Demo workspace", "Complete"],
                [
                  "Analysis",
                  study.status === "pending"
                    ? "Waiting in demo queue"
                    : study.status === "processing"
                      ? "Illustrative processing state"
                      : "Demo analysis complete",
                  study.status === "pending"
                    ? "Pending"
                    : study.status === "processing"
                      ? "In progress"
                      : "Complete",
                ],
                ["Report", "Not available", "Waiting"],
              ].map(([label, detail, state]) => (
                <li key={label} className="flex items-start gap-3">
                  <span
                    className="mt-1 size-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-medium text-ink">{label}</p>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                        {state}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
