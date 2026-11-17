"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const roles = [
  "Radiologist",
  "Department head / clinical lead",
  "Hospital IT / imaging informatics",
  "Procurement / operations",
  "Clinical informatics",
  "Other",
];

const volumes = [
  "Under 1,000 chest studies / month",
  "1,000 – 5,000 / month",
  "5,000 – 20,000 / month",
  "20,000+ / month",
  "Not sure yet",
];

const fieldClass =
  "mt-2 h-11 w-full rounded-lg border border-hairline bg-card px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/25";

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";

type Status = "idle" | "submitting" | "success" | "error";

export default function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "success") return;
    const frame = requestAnimationFrame(() => successRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "We could not send your request.");
      }

      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We could not send your request. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-2xl border border-hairline bg-card p-8 shadow-sm focus:outline-none lg:mt-2"
        role="status"
      >
        <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent-ink">
          <Check className="size-5" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-2xl tracking-tight text-ink">
          Request received.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We will reply within one business day to schedule your walkthrough.
          If you have a de-identified study you would like to use, you can send
          it after we confirm a time.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink underline-offset-4 hover:underline"
        >
          Back to ClarityCXR
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={status === "submitting"}
      className="rounded-2xl border border-hairline bg-card p-6 shadow-sm sm:p-8 lg:mt-2"
    >
      <h2 className="font-display text-xl tracking-tight text-ink">
        Request a walkthrough
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Five details, then we will find a time.
      </p>

      {status === "error" && error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Roland Okafor"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@hospital.org"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="institution" className={labelClass}>
          Hospital or institution
        </label>
        <input
          id="institution"
          name="institution"
          type="text"
          required
          autoComplete="organization"
          className={fieldClass}
          placeholder="Department, hospital, or imaging group"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="role" className={labelClass}>
            Your role
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Select a role
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="volume" className={labelClass}>
            Chest volume
          </label>
          <select
            id="volume"
            name="volume"
            defaultValue=""
            className={fieldClass}
          >
            <option value="">Optional</option>
            {volumes.map((volume) => (
              <option key={volume} value={volume}>
                {volume}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          What would you like to see?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-2 w-full resize-y rounded-lg border border-hairline bg-card px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/25"
          placeholder="CT reads, prior comparison, PACS integration, reporting…"
        />
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending request…
          </>
        ) : (
          <>
            Request a walkthrough
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </button>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        We use these details only to arrange your walkthrough. Read our{" "}
        <Link
          href="/privacy"
          className="font-medium text-ink underline decoration-hairline underline-offset-2 hover:decoration-accent"
        >
          privacy policy
        </Link>
        . Please do not include patient data.
      </p>
    </form>
  );
}
