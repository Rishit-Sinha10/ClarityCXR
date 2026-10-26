import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Info,
  ScanLine,
  UserRound,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { StudyThumbnail } from "@/components/dashboard/study-thumbnail";
import {
  DEMO_REPORTS,
  formatStudyDate,
  getStudyById,
} from "@/lib/demo-data";

type StudyPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: StudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = getStudyById(id);

  return {
    title: study ? study.id : "Study not found",
    description: study
      ? `Illustrative demo study for ${study.patientName}. Not a real patient record.`
      : "Demo study not found.",
  };
}

export default async function StudyDetailPage({ params }: StudyPageProps) {
  const { id } = await params;
  const study = getStudyById(id);

  if (!study) {
    notFound();
  }

  const report = DEMO_REPORTS.find((item) => item.studyId === study.id);

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
          title={`${study.patientName} · Chest X-ray`}
          description="Illustrative study details for the ClarityCXR demo workspace. All patient information and findings are fictional."
          action={
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/history"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-hairline bg-card px-3 text-[11px] font-medium text-ink transition-colors hover:bg-plate"
              >
                <ScanLine className="size-3.5" aria-hidden />
                All studies
              </Link>
              {report && (
                <Link
                  href="/dashboard/reports"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-[11px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  <FileText className="size-3.5" aria-hidden />
                  Open report
                </Link>
              )}
            </div>
          }
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)]">
          <StudyThumbnail
            variant={study.variant}
            className="aspect-[5/6] w-full"
            label={`Illustrative synthetic chest X-ray for ${study.id}`}
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              Synthetic image
            </p>
            <span className="rounded-full border border-hairline bg-plate px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
              Not clinical
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            This generated graphic stands in for a chest X-ray thumbnail. No real
            patient image is displayed or stored.
          </p>
        </section>

        <div className="min-w-0 space-y-4">
          <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Study ID
                </p>
                <p className="mt-1 font-mono text-sm font-medium text-ink">
                  {study.id}
                </p>
              </div>
              <StatusBadge status={study.status} />
            </div>

            <dl className="mt-5 grid gap-4 border-t border-hairline pt-4 sm:grid-cols-3">
              <div>
                <dt className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  <UserRound className="size-3" aria-hidden />
                  Patient
                </dt>
                <dd className="mt-1.5 text-xs font-medium text-ink">
                  {study.patientName}
                </dd>
                <dd className="mt-0.5 text-[10px] text-muted-foreground">
                  {study.age} yrs · {study.sex}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  <CalendarDays className="size-3" aria-hidden />
                  Acquired
                </dt>
                <dd className="mt-1.5 text-xs font-medium text-ink">
                  {formatStudyDate(study.date)}
                </dd>
                <dd className="mt-0.5 text-[10px] text-muted-foreground">
                  CXR · PA view
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Review
                </dt>
                <dd className="mt-1.5 text-xs font-medium text-ink">
                  {study.reviewedBy}
                </dd>
                <dd className="mt-0.5 text-[10px] text-muted-foreground">
                  Demo assignment
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-medium text-ink">
                Illustrative findings
              </h2>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-amber-800">
                Demo only
              </span>
            </div>
            <p className="mt-3 text-[13px] font-medium text-ink">
              {study.findingSummary}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {study.impression}
            </p>

            <div className="mt-4 flex items-start gap-2 rounded-lg border border-hairline bg-plate/55 px-3 py-2.5">
              <Info
                className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                This text is static interface content. It was not produced by a
                validated AI model, has not been reviewed by a clinician, and
                must not be used for diagnosis or treatment.
              </p>
            </div>
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
                [
                  "Report",
                  report ? "Illustrative report available" : "Not available",
                  report ? "Demo" : "Waiting",
                ],
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
