"use client";

import { useEffect, useState, type ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";
import { DashboardSearchProvider } from "./search-context";
import Topbar, { type DashboardUser } from "./topbar";

export default function DashboardShell({
  user,
  children,
}: {
  user: DashboardUser;
  children: ReactNode;
}) {
  const [navigationOpen, setNavigationOpen] = useState(false);

  useEffect(() => {
    if (!navigationOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [navigationOpen]);

  return (
    <DashboardSearchProvider>
      <div className="flex min-h-screen bg-workspace">
        <a
          href="#dashboard-content"
          className="sr-only z-[60] rounded-md bg-ink px-3 py-2 text-xs text-paper focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>

        {navigationOpen && (
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setNavigationOpen(false)}
            className="fixed inset-0 z-40 bg-navy/50 backdrop-blur-[1px] lg:hidden"
          />
        )}

        <Sidebar
          open={navigationOpen}
          onClose={() => setNavigationOpen(false)}
        />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Topbar
            user={user}
            onOpenNavigation={() => setNavigationOpen(true)}
          />
          <main id="dashboard-content" className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>
    </DashboardSearchProvider>
  );
}
