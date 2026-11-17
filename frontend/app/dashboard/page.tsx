import type { Metadata } from "next";
import Link from "next/link";
import { Info, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveStudies } from "@/components/dashboard/live-studies";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of uploaded study metadata from the connected ClarityCXR API.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            Study overview
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Uploaded studies from your connected workspace.
          </p>
        </div>
        <Button asChild className="h-10 shrink-0 px-4 text-xs">
          <Link href="/dashboard/upload">
            <Upload className="size-4" aria-hidden />
            Upload study
          </Link>
        </Button>
      </section>

      <div className="mt-6">
        <LiveStudies limit={6} />
      </div>

      <p className="mt-5 flex items-start gap-2 pb-2 text-[11px] leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        This dashboard displays uploaded study metadata only. It does not
        provide diagnostic output and must not be used for clinical decisions.
      </p>
    </div>
  );
}
