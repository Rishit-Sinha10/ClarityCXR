"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Database, Loader2, RefreshCw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestJson } from "@/lib/api";
import { createClient } from "@/utils/supabase/client";

type ApiHealth = {
  status: string;
  service: string;
  database: string;
};

export function SettingsForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [savedName, setSavedName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [checkingHealth, setCheckingHealth] = useState(true);

  const checkHealth = useCallback(async () => {
    setCheckingHealth(true);
    setHealthError(null);

    try {
      setHealth(await requestJson<ApiHealth>("/health"));
    } catch (error) {
      setHealthError(
        error instanceof Error ? error.message : "The API health check failed.",
      );
    } finally {
      setCheckingHealth(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    void requestJson<ApiHealth>("/health")
      .then((result) => {
        if (active) setHealth(result);
      })
      .catch((error: unknown) => {
        if (active) {
          setHealthError(
            error instanceof Error
              ? error.message
              : "The API health check failed.",
          );
        }
      })
      .finally(() => {
        if (active) setCheckingHealth(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();

    if (!nextName) {
      setSaveError("Enter a name before saving.");
      setSaveMessage(null);
      return;
    }

    setSaving(true);
    setSaveError(null);
    setSaveMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: { full_name: nextName },
      });

      if (error) throw error;

      setName(nextName);
      setSavedName(nextName);
      setSaveMessage("Profile name saved to your account.");
      router.refresh();
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Could not save your profile. Try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  const apiConnected = health?.status === "ok";
  const databaseConnected = health?.database === "connected";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section
        id="profile"
        className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5"
      >
        <h2 className="text-sm font-medium text-ink">Account profile</h2>
        <form className="mt-4 space-y-4" onSubmit={saveProfile}>
          <div>
            <label
              htmlFor="settings-name"
              className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              Name
            </label>
            <input
              id="settings-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              autoComplete="name"
              className="mt-1.5 h-10 w-full rounded-lg border border-hairline bg-paper px-3 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              Email
            </p>
            <p className="mt-1.5 truncate text-xs text-ink">{email}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Email is managed by your authentication provider.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              disabled={saving || name.trim() === savedName}
              className="h-9 px-3 text-xs"
            >
              {saving ? (
                <Loader2 className="size-3.5 animate-spin" aria-hidden />
              ) : (
                <Save className="size-3.5" aria-hidden />
              )}
              {saving ? "Saving…" : "Save profile"}
            </Button>
            {saveMessage && (
              <p
                role="status"
                className="flex items-center gap-1.5 text-[11px] text-emerald-700"
              >
                <CheckCircle2 className="size-3.5" aria-hidden />
                {saveMessage}
              </p>
            )}
          </div>
          {saveError && (
            <p
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-800"
            >
              {saveError}
            </p>
          )}
        </form>
      </section>

      <section className="rounded-xl border border-hairline bg-card p-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink">
            <Database className="size-4 text-accent" aria-hidden />
            API & database
          </h2>
          <button
            type="button"
            onClick={() => void checkHealth()}
            disabled={checkingHealth}
            aria-label="Refresh API health"
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-plate hover:text-ink disabled:opacity-50"
          >
            <RefreshCw
              className={`size-3.5 ${checkingHealth ? "animate-spin" : ""}`}
              aria-hidden
            />
          </button>
        </div>
        <dl className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs text-muted-foreground">Study API</dt>
            <dd className="text-xs font-medium text-ink">
              {checkingHealth
                ? "Checking…"
                : apiConnected
                  ? "Connected"
                  : "Unavailable"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs text-muted-foreground">Database</dt>
            <dd className="text-xs font-medium text-ink">
              {checkingHealth
                ? "Checking…"
                : databaseConnected
                  ? "Connected"
                  : apiConnected
                    ? "Unavailable"
                    : "Unknown"}
            </dd>
          </div>
        </dl>
        {healthError && (
          <p
            role="alert"
            className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] leading-relaxed text-red-800"
          >
            {healthError}
          </p>
        )}
        {health?.service && (
          <p className="mt-3 border-t border-hairline pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            {health.service}
          </p>
        )}
      </section>

      <section className="rounded-xl border border-hairline bg-card p-4 md:col-span-2 sm:p-5">
        <h2 className="text-sm font-medium text-ink">Workspace behavior</h2>
        <ul className="mt-3 grid gap-2 text-xs leading-relaxed text-muted-foreground sm:grid-cols-2">
          <li>
            Conversation messages are stored only in this browser. No chat
            response service is connected.
          </li>
          <li>
            Study records and prediction requests use the connected API. Do not
            upload identifiable patient information.
          </li>
        </ul>
      </section>
    </div>
  );
}
