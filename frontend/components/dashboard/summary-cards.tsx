import {
  ArrowUpRight,
  Clock3,
  FileText,
  Minus,
  ScanLine,
  Users,
  type LucideIcon,
} from "lucide-react";
import { DEMO_SUMMARY, type SummaryMetric } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const metricIcons: Record<SummaryMetric["key"], LucideIcon> = {
  totalScans: ScanLine,
  reportsGenerated: FileText,
  pendingScans: Clock3,
  activePatients: Users,
};

const metricTone: Record<SummaryMetric["key"], string> = {
  totalScans: "bg-blue-50 text-blue-600",
  reportsGenerated: "bg-emerald-50 text-emerald-600",
  pendingScans: "bg-amber-50 text-amber-600",
  activePatients: "bg-teal-50 text-teal-700",
};

function SummaryCard({ metric }: { metric: SummaryMetric }) {
  const Icon = metricIcons[metric.key];
  const TrendIcon = metric.trend.direction === "up" ? ArrowUpRight : Minus;

  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-medium text-muted-foreground">
          {metric.label}
        </p>
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-lg",
            metricTone[metric.key],
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-3 font-display text-[28px] leading-none font-semibold tracking-tight text-ink">
        {metric.value.toLocaleString("en-US")}
      </p>
      <div className="mt-3 flex min-w-0 items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
            metric.trend.direction === "up"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700",
          )}
        >
          <TrendIcon className="size-3" aria-hidden />
          {metric.trend.label}
        </span>
        <span className="truncate text-[11px] text-muted-foreground">
          {metric.hint}
        </span>
      </div>
    </div>
  );
}

export function SummaryCards() {
  return (
    <section aria-label="Workspace summary">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-ink">Workspace overview</h2>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          Demo metrics
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {DEMO_SUMMARY.map((metric) => (
          <SummaryCard key={metric.key} metric={metric} />
        ))}
      </div>
    </section>
  );
}
