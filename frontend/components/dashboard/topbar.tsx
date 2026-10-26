"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronRight,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import SignOutButton from "@/app/dashboard/sign-out-button";
import SmartSearchBar from "@/components/ui/searchbar";
import { cn } from "@/lib/utils";
import { useDashboardSearch } from "./search-context";

export type DashboardUser = {
  email: string;
  name: string;
  avatarUrl: string | null;
};

const routeLabels: Record<string, string> = {
  dashboard: "Overview",
  upload: "Upload Scan",
  history: "Study History",
  reports: "Reports",
  settings: "Settings",
  studies: "Study",
};

function getInitials(name: string, email: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return initials || email[0]?.toUpperCase() || "U";
}

export default function Topbar({
  user,
  onOpenNavigation,
}: {
  user: DashboardUser;
  onOpenNavigation: () => void;
}) {
  const pathname = usePathname();
  const { query, setQuery } = useDashboardSearch();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (!notificationsRef.current?.contains(target)) {
        setNotificationsOpen(false);
      }

      if (!profileRef.current?.contains(target)) {
        setProfileOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (
        (event.key === "/" && !isTyping) ||
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")
      ) {
        event.preventDefault();
        document
          .querySelector<HTMLInputElement>('input[name="study-search"]')
          ?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const segments = pathname.split("/").filter(Boolean);
  const currentSegment = segments[1];
  const studyId =
    segments[0] === "dashboard" && segments[1] === "studies"
      ? segments[2]
      : undefined;
  const currentLabel = currentSegment
    ? routeLabels[currentSegment] ?? currentSegment
    : "Overview";
  const initials = getInitials(user.name, user.email);

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-paper/90 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 md:flex-nowrap md:gap-3 md:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onOpenNavigation}
          className="grid size-9 shrink-0 place-items-center rounded-lg border border-hairline bg-card text-ink transition-colors hover:bg-plate lg:hidden"
        >
          <Menu className="size-4" aria-hidden />
        </button>

        <Link
          href="/dashboard"
          className="font-display text-sm font-bold tracking-tight text-ink md:hidden"
        >
          Clarity<span className="text-accent">CXR</span>
        </Link>

        <nav
          aria-label="Breadcrumb"
          className="hidden min-w-0 items-center gap-1.5 text-xs md:flex"
        >
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-ink"
          >
            Workspace
          </Link>
          <ChevronRight className="size-3 text-muted-foreground/60" aria-hidden />
          {studyId ? (
            <>
              <Link
                href="/dashboard/history"
                className="text-muted-foreground transition-colors hover:text-ink"
              >
                Study History
              </Link>
              <ChevronRight
                className="size-3 text-muted-foreground/60"
                aria-hidden
              />
              <span className="truncate font-medium text-ink">{studyId}</span>
            </>
          ) : (
            <span className="truncate font-medium text-ink">{currentLabel}</span>
          )}
        </nav>

        <div className="order-last w-full min-w-0 md:order-none md:ml-auto md:w-auto md:flex-1 md:max-w-sm lg:max-w-md">
          <SmartSearchBar search={query} onSearchChange={setQuery} />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
          <div ref={notificationsRef} className="relative">
            <button
              type="button"
              aria-label="Open notifications"
              aria-haspopup="menu"
              aria-expanded={notificationsOpen}
              onClick={() => {
                setNotificationsOpen((value) => !value);
                setProfileOpen(false);
              }}
              className={cn(
                "grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-plate hover:text-ink",
                notificationsOpen && "bg-plate text-ink",
              )}
            >
              <Bell className="size-4" aria-hidden />
            </button>

            {notificationsOpen && (
              <div
                role="menu"
                aria-label="Notifications"
                className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_18px_50px_-20px_rgba(10,10,10,0.35)]"
              >
                <div className="border-b border-hairline px-4 py-3">
                  <p className="text-sm font-medium text-ink">Notifications</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Demo workspace
                  </p>
                </div>
                <div className="px-4 py-6 text-center">
                  <span className="mx-auto grid size-9 place-items-center rounded-full bg-plate text-muted-foreground">
                    <Bell className="size-4" aria-hidden />
                  </span>
                  <p className="mt-3 text-xs font-medium text-ink">
                    You&apos;re all caught up
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    No live notifications are connected in this prototype.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              onClick={() => {
                setProfileOpen((value) => !value);
                setNotificationsOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 rounded-full border border-transparent p-0.5 transition-colors hover:border-hairline hover:bg-plate",
                profileOpen && "border-hairline bg-plate",
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-navy font-mono text-[10px] font-medium text-white">
                {user.avatarUrl && !avatarFailed ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="size-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarFailed(true)}
                  />
                ) : (
                  initials
                )}
              </span>
              <span className="hidden max-w-[10rem] truncate text-xs font-medium text-ink lg:block">
                {user.name}
              </span>
            </button>

            {profileOpen && (
              <div
                role="menu"
                aria-label="Profile menu"
                className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_18px_50px_-20px_rgba(10,10,10,0.35)]"
              >
                <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
                  <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-navy font-mono text-[11px] text-white">
                    {user.avatarUrl && !avatarFailed ? (
                      <img
                        src={user.avatarUrl}
                        alt=""
                        className="size-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={() => setAvatarFailed(true)}
                      />
                    ) : (
                      initials
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {user.name}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="p-1.5">
                  <div className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[11px] text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-accent" aria-hidden />
                    Demo workspace · fictional data
                  </div>
                  <Link
                    href="/dashboard/settings"
                    role="menuitem"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-ink transition-colors hover:bg-plate"
                  >
                    <Settings className="size-3.5 text-muted-foreground" aria-hidden />
                    Settings
                  </Link>
                  <Link
                    href="/dashboard/settings#profile"
                    role="menuitem"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-ink transition-colors hover:bg-plate"
                  >
                    <UserRound className="size-3.5 text-muted-foreground" aria-hidden />
                    Account profile
                  </Link>
                  <SignOutButton
                    role="menuitem"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs text-ink transition-colors hover:bg-plate"
                  >
                    <LogOut className="size-3.5 text-muted-foreground" aria-hidden />
                    Sign out
                  </SignOutButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
