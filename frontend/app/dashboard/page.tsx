import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ProductInfoCard,
  QuickActions,
  SystemStatus,
} from "@/components/dashboard/side-panels";
import { StudyTable } from "@/components/dashboard/study-table";
import { SummaryCards } from "@/components/dashboard/summary-cards";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of the ClarityCXR demonstration workspace for AI-assisted chest X-ray review.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <section className="rounded-xl border border-hairline bg-card p-5 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Workspace / Overview
              </p>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-amber-800">
                Demo
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Welcome back!
            </h1>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
              Here&apos;s an overview of your chest X-ray analysis workspace.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button asChild className="h-10 px-4 text-xs">
              <Link href="/dashboard/upload">
                <Upload className="size-4" aria-hidden />
                Upload New Scan
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-10 border-hairline bg-card px-3 text-xs"
            >
              <Link href="/dashboard/history">
                View study history
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-lg border border-hairline bg-plate/55 px-3 py-2">
          <Info
            className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            This is an interactive prototype populated with fictional patients
            and illustrative findings. No live clinical systems are connected.
          </p>
        </div>
      </section>

      <div className="mt-5">
        <SummaryCards />
      </div>

      <div className="mt-5 grid gap-5 min-[1400px]:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <StudyTable />
        </div>
        <SystemStatus />
      </div>

      <p className="mt-5 flex items-start gap-2 pb-2 text-[10px] leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-3 shrink-0" aria-hidden />
        ClarityCXR is a front-end prototype. Summary metrics, service
        indicators, studies, and reports are static demo content and must not be
        used for clinical decision-making.
      </p>
    </div>
  );
}
