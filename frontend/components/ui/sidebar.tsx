"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  History,
  LayoutDashboard,
  ScanLine,
  Settings,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload Scan", href: "/dashboard/upload", icon: Upload },
  { label: "Study History", href: "/dashboard/history", icon: History },
  { label: "Reports", href: "/dashboard/reports", icon: FileText },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    if (href === "/dashboard/history") {
      return (
        pathname.startsWith("/dashboard/history") ||
        pathname.startsWith("/dashboard/studies")
      );
    }

    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col border-r border-navy-border bg-navy px-3 py-4 text-navy-foreground transition-transform duration-200 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
      aria-label="Dashboard navigation"
    >
      <div className="flex items-center justify-between px-2">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="group flex min-w-0 items-center gap-2.5"
          aria-label="ClarityCXR dashboard"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
            <ScanLine className="size-4" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[15px] leading-none font-bold tracking-tight text-white">
              Clarity<span className="text-accent">CXR</span>
            </span>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.18em] text-navy-muted">
              Radiology workspace
            </span>
          </span>
        </Link>

        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="grid size-8 place-items-center rounded-md text-navy-muted transition-colors hover:bg-white/5 hover:text-white lg:hidden"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <div className="mt-7 px-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy-muted/80">
          Workspace
        </p>
        <p className="mt-2 flex items-center gap-2 text-xs font-medium text-navy-foreground">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
          Demo environment
        </p>
      </div>

      <nav className="mt-4 space-y-1" aria-label="Primary navigation">
        {navigation.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[13px] transition-colors",
                active
                  ? "bg-white/[0.08] font-medium text-white"
                  : "text-navy-muted hover:bg-white/[0.04] hover:text-white",
              )}
            >
              {active && (
                <span
                  className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-accent"
                  aria-hidden
                />
              )}
              <Icon
                className={cn(
                  "size-4 shrink-0",
                  active
                    ? "text-accent"
                    : "text-navy-muted group-hover:text-navy-foreground",
                )}
                aria-hidden
              />
              <span className="truncate">{label}</span>
              {active && (
                <span className="ml-auto size-1.5 rounded-full bg-accent" aria-hidden />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-6">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs font-medium text-white">
              <ShieldCheck className="size-3.5 text-accent" aria-hidden />
              ClarityCXR
            </p>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-navy-muted">
              v0.1
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-navy-muted">
            AI-assisted chest X-ray review for imaging teams. This prototype uses
            fictional studies and illustrative output only.
          </p>
          <p className="mt-3 border-t border-white/10 pt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-navy-muted/80">
            Demo data · Not for clinical use
          </p>
        </div>
      </div>
    </aside>
  );
}
