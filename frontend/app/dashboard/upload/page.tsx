import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CircleCheck, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { UploadForm } from "./upload-form";

export const metadata: Metadata = {
  title: "Upload Scan",
  description:
    "Upload a non-clinical chest X-ray sample to the connected ClarityCXR API.",
};

export default function UploadScanPage() {
  return (
    <div className="mx-auto w-full max-w-[1050px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <PageHeader
        eyebrow="Workspace / Upload Scan"
        title="Upload a chest X-ray"
        description="Upload a non-clinical sample image to your connected API. The image is stored but not analyzed."
        action={
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Back to dashboard
          </Link>
        }
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-6">
          <UploadForm />
        </section>

        <aside className="space-y-4">
          <section className="rounded-xl border border-hairline bg-card p-4">
            <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
              <ShieldCheck className="size-4 text-accent" aria-hidden />
              Privacy guardrails
            </h2>
            <ul className="mt-3 space-y-2.5">
              {[
                "Use synthetic, non-identifiable sample images only.",
                "Uploaded image files and metadata are stored by the backend.",
                "Uploads are not analyzed and produce no diagnostic output.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground"
                >
                  <CircleCheck
                    className="mt-0.5 size-3.5 shrink-0 text-accent-ink"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-hairline bg-plate/55 p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              Queue status
            </p>
            <p className="mt-2 text-sm font-medium text-ink">
              Analysis is not enabled
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Study uploads are stored as records. No model is connected to
              analyze them or generate reports.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
