"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  FileText,
  History,
  LayoutDashboard,
  MessageSquareText,
  ScanLine,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarConversation = {
  id: string;
  title: string;
  updatedAt: string;
};

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  chatHistory?: {
    conversations: SidebarConversation[];
    activeId: string | null;
    onNew: () => void;
    onSelect: (id: string) => void;
  };
};

const STORAGE_KEY = "claritycxr:sidebar-collapsed";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Reports", href: "/dashboard/reports", icon: FileText },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ open, onClose, chatHistory }: SidebarProps) {
  const pathname = usePathname();
  // Collapsing only applies on desktop (lg+). The mobile drawer is always full width.
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    if (href === "/dashboard/studies") {
      return pathname.startsWith("/dashboard/studies");
    }

    return pathname.startsWith(href);
  };

  // Hides an element only when the desktop sidebar is collapsed.
  const hideWhenCollapsed = collapsed && "lg:hidden";

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col overflow-hidden border-r border-white/15 bg-black px-3 py-4 text-white transition-[transform,width] duration-200 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0",
        collapsed && "lg:w-[72px]",
        open ? "translate-x-0" : "-translate-x-full",
      )}
      aria-label="Workspace navigation"
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between px-2",
          collapsed && "lg:flex-col lg:justify-center lg:gap-3 lg:px-0",
        )}
      >
        {/* Desktop collapse button */}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex min-w-0 flex-1 items-center rounded-lg text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            collapsed &&
              "lg:size-8 lg:flex-none lg:justify-center lg:border lg:border-white/40 lg:text-white lg:hover:bg-white lg:hover:text-black",
          )}
        >
          {collapsed && (
            <ScanLine className="hidden size-4 lg:block" aria-hidden />
          )}
          <span className={cn("min-w-0 whitespace-nowrap", hideWhenCollapsed)}>
            <span className="font-display block text-[15px] leading-none font-bold tracking-tight text-white">
              ClarityCXR
            </span>
            <span className="mt-1 block text-[10px] tracking-wide text-white/50">
              Radiology workspace
            </span>
          </span>
        </button>

        {/* Mobile close button */}
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="grid size-8 shrink-0 place-items-center rounded-md text-white/60 transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white lg:hidden"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={cn("mt-4 space-y-1", collapsed && "lg:mt-8")}
        aria-label="Primary navigation"
      >
        {navigation.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              aria-label={label}
              title={collapsed ? label : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                collapsed && "lg:justify-center lg:px-0",
                active
                  ? "bg-white font-medium text-black"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className={cn("truncate", hideWhenCollapsed)}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {chatHistory && (
        <section
          aria-label="Chat history"
          className={cn(
            "mt-4 flex min-h-0 flex-1 flex-col border-t border-white/15 px-3 pt-4",
            collapsed && "lg:hidden",
          )}
        >
          <h2 className="px-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
            Chat history
          </h2>
          <button
            type="button"
            onClick={() => {
              chatHistory.onNew();
              onClose();
            }}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageSquareText className="size-3.5 shrink-0" aria-hidden />
            New chat
          </button>
          <div className="mt-2 min-h-0 flex-1 space-y-0.5 overflow-y-auto">
            {chatHistory.conversations.length === 0 ? (
              <p className="px-2.5 py-2 text-[11px] leading-relaxed text-white/45">
                Conversations you start will appear here.
              </p>
            ) : (
              chatHistory.conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => {
                    chatHistory.onSelect(conversation.id);
                    onClose();
                  }}
                  aria-current={
                    conversation.id === chatHistory.activeId
                      ? "true"
                      : undefined
                  }
                  className={cn(
                    "block w-full truncate rounded-lg px-2.5 py-2 text-left text-[12px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                    conversation.id === chatHistory.activeId
                      ? "bg-white/15 text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white",
                  )}
                  title={conversation.title}
                >
                  {conversation.title}
                </button>
              ))
            )}
          </div>
        </section>
      )}
    </aside>
  );
}
