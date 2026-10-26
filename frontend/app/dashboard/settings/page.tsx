import type { Metadata } from "next";
import Link from "next/link";
import {
  Bell,
  Database,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Account and workspace settings for the ClarityCXR demonstration dashboard.",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const fullName =
    typeof metadata.full_name === "string"
      ? metadata.full_name
      : typeof metadata.name === "string"
        ? metadata.name
        : "ClarityCXR user";
  const email = user?.email ?? "Authenticated user";

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <PageHeader
        eyebrow="Workspace / Settings"
        title="Settings"
        description="Account and workspace details for this demo. Security, billing, and service integrations are not connected in this prototype."
      />

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <section
          id="profile"
          className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5"
        >
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
            <UserRound className="size-4 text-accent" aria-hidden />
            Account profile
          </h2>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Name
              </dt>
              <dd className="mt-1 text-xs text-ink">{fullName}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Email
              </dt>
              <dd className="mt-1 truncate text-xs text-ink">{email}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Authentication
              </dt>
              <dd className="mt-1 text-xs text-ink">Supabase session</dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-hairline pt-3 text-[10px] leading-relaxed text-muted-foreground">
            Profile details come from your authentication session. Editing is
            not available in this prototype.
          </p>
        </section>

        <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5">
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
            <Bell className="size-4 text-accent" aria-hidden />
            Notifications
          </h2>
          <div className="mt-4 space-y-2">
            {[
              ["Study ready", "When a demo study completes analysis"],
              ["Report drafts", "When an illustrative report is available"],
              ["Weekly summary", "A fictional workspace digest"],
            ].map(([label, description]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-lg border border-hairline bg-plate/35 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-ink">{label}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-hairline bg-card px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                  Demo
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5 md:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
            <Database className="size-4 text-accent" aria-hidden />
            Workspace & data
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline bg-plate/35 px-3 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Environment
              </p>
              <p className="mt-1 text-xs font-medium text-ink">
                Front-end prototype
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                Static demo content. No database or storage service is connected.
              </p>
            </div>
            <div className="rounded-lg border border-hairline bg-plate/35 px-3 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Patient data
              </p>
              <p className="mt-1 text-xs font-medium text-ink">
                Fictional records only
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                Do not enter real patient images or identifiers.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/history"
              className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-card px-2.5 py-1.5 text-[11px] font-medium text-ink transition-colors hover:bg-plate"
            >
              <ShieldCheck className="size-3.5 text-accent-ink" aria-hidden />
              Review demo studies
            </Link>
            <p className="text-[10px] text-muted-foreground">
              Privacy notice: this workspace contains no real patient information.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
