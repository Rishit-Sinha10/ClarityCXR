"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  FileText,
  Images,
  LayoutDashboard,
  Menu,
  ScanLine,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Studies",
    href: "/dashboard#studies",
    icon: ScanLine,
    active: true,
  },
  { label: "Patients", href: "/dashboard#patients", icon: Images },
  { label: "Documents", href: "/dashboard#documents", icon: FileText },
  { label: "Insights", href: "/dashboard#insights", icon: Sparkles },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-30 grid size-9 place-items-center rounded-md border border-hairline bg-paper text-ink shadow-sm lg:hidden"
      >
        <Menu className="size-4" aria-hidden />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-ink/20 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-hairline bg-sidebar px-4 py-5 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-2">
          <Link
            href="/dashboard"
            className="font-display text-base font-bold tracking-tight text-ink"
          >
            clarity<span className="text-accent">cxr</span>
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-plate hover:text-ink lg:hidden"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="mt-8 px-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            Workspace
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs font-medium text-ink">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            Radiology · Live
          </p>
        </div>

        <nav className="mt-6 space-y-1" aria-label="Primary navigation">
          {navigation.map(({ label, href, icon: Icon, active }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] transition-colors",
                active
                  ? "bg-accent-soft font-medium text-accent-ink"
                  : "text-muted-foreground hover:bg-plate hover:text-ink",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "size-4",
                  active
                    ? "text-accent-ink"
                    : "text-muted-foreground group-hover:text-ink",
                )}
                aria-hidden
              />
              {label}
              {label === "Studies" && (
                <span className="ml-auto font-mono text-[9px] text-accent-ink">
                  12
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="rounded-md border border-hairline bg-card px-3 py-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                Reading queue
              </p>
              <Activity className="size-3.5 text-accent" aria-hidden />
            </div>
            <p className="mt-2 text-xl font-medium tracking-tight text-ink">
              04
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              awaiting review
            </p>
          </div>
          <Link
            href="/dashboard#settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:text-ink"
          >
            <Settings className="size-4" aria-hidden />
            Settings
          </Link>
          <div className="flex items-center gap-2 border-t border-hairline px-2.5 pt-4">
            <span className="grid size-7 place-items-center rounded-full bg-ink font-mono text-[10px] text-paper">
              JD
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-ink">
                Dr. Ibekwe
              </p>
              <p className="truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Radiologist
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
