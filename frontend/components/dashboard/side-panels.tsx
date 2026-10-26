import Link from "next/link";
import {
  ChevronRight,
  FileText,
  History,
  Info,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { DEMO_SYSTEM_STATUS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { StudyThumbnail } from "./study-thumbnail";

const quickActions = [
  {
    label: "Upload New Scan",
    description: "Add a fictional study to the demo queue",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    label: "View Study History",
    description: "Browse all illustrative studies",
    href: "/dashboard/history",
    icon: History,
  },
  {
    label: "View Reports",
    description: "Review demo report drafts",
    href: "/dashboard/reports",
    icon: FileText,
  },
];

export function SystemStatus() {
  return (
    <section
      aria-labelledby="system-status-heading"
      className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)]"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="system-status-heading" className="text-sm font-medium text-ink">
          System status
        </h2>
        <span className="rounded-full border border-hairline bg-plate px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
          Illustrative
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {DEMO_SYSTEM_STATUS.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2 text-xs text-ink">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  item.state === "prototype" ? "bg-amber-500" : "bg-slate-300",
                )}
                aria-hidden
              />
              {item.label}
            </span>
            <span
              className={cn(
                "text-[11px]",
                item.state === "prototype"
                  ? "font-medium text-amber-700"
                  : "text-muted-foreground",
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 flex gap-2 border-t border-hairline pt-3 text-[11px] leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        Static prototype indicators. No production AI, database, or storage
        services are connected.
      </p>
    </section>
  );
}

export function QuickActions() {
  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)]"
    >
      <h2 id="quick-actions-heading" className="text-sm font-medium text-ink">
        Quick actions
      </h2>
      <div className="mt-3 space-y-1">
        {quickActions.map(({ label, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-plate focus-visible:bg-plate"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-hairline bg-paper text-muted-foreground transition-colors group-hover:text-accent-ink">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-ink">{label}</span>
              <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                {description}
              </span>
            </span>
            <ChevronRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProductInfoCard() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-navy p-5 text-navy-foreground ring-1 ring-navy-border">
      <div className="absolute -right-10 -top-6 h-44 w-32 rotate-6 opacity-25" aria-hidden>
        <StudyThumbnail variant={3} className="h-full w-full ring-0" />
      </div>
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-navy-muted">
          <ShieldCheck className="size-3 text-accent" aria-hidden />
          Built for review
        </span>
        <h2 className="mt-4 max-w-[13rem] font-display text-xl leading-tight font-medium tracking-tight text-white">
          Smarter Analysis. Better Decisions.
        </h2>
        <p className="mt-2 max-w-[15rem] text-[11px] leading-relaxed text-navy-muted">
          ClarityCXR brings imaging, study context, and draft findings into one
          calm workspace. AI proposes; the clinician decides.
        </p>
        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-navy-muted/80">
          Illustrative interface · Demo data only
        </p>
      </div>
    </section>
  );
}
