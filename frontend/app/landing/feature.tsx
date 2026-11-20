import type { ReactNode } from "react";
import Reveal from "@/app/landing/reval";
import { cn } from "@/lib/utils";

/* Every visual below is built from copy that already exists on the site
   (formats, columns, statuses, boundaries). Values are skeleton bars,
   so nothing is invented. */

type Feature = {
  title: string;
  desc: string;
  icon: string; // svg path data, 24x24 stroke icon
  wide?: boolean;
  featured?: boolean;
  visual: ReactNode;
};

const Skel = ({ className = "" }: { className?: string }) => (
  <span className={`block h-2 rounded-full bg-hairline ${className}`} />
);

const Dot = ({ on = false }: { on?: boolean }) => (
  <span
    className={`size-1.5 shrink-0 rounded-full ${on ? "bg-accent" : "bg-hairline"}`}
  />
);

const Pill = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs text-muted">
    {children}
  </span>
);

const features: Feature[] = [
  {
    title: "Image intake",
    desc: "Upload chest X-ray images in PNG, JPG, or WebP format through the connected API.",
    icon: "M12 16V4m0 0L7 9m5-5 5 5M4 20h16",
    wide: true,
    featured: true,
    visual: (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-hairline">
        <p className="text-sm text-muted">Chest X-ray image</p>
        <div className="flex gap-2">
          {["PNG", "JPG", "WebP"].map((f) => (
            <Pill key={f}>{f}</Pill>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Study history",
    desc: "Review uploaded image filenames, file sizes, timestamps, and statuses from your study service.",
    icon: "M4 6h16M4 12h16M4 18h16",
    visual: (
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
              i === 1 ? "border-accent" : "border-hairline"
            }`}
          >
            <Skel className="flex-1" />
            <Skel className="w-8" />
            <Dot on={i === 1} />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Prediction requests",
    desc: "Submit a selected study to your configured prediction service and inspect the response it returns.",
    icon: "M5 12h14m0 0-6-6m6 6-6 6",
    visual: (
      <div className="flex flex-col items-center">
        <Pill>Selected study</Pill>
        <span className="h-3 w-px bg-hairline" />
        <Pill>Prediction service</Pill>
        <span className="h-3 w-px bg-hairline" />
        <Pill>
          <Dot />
          Request status
        </Pill>
      </div>
    ),
  },
  {
    title: "Image and text workspace",
    desc: "Keep a selected study beside a text prompt. Prompts are saved in this browser; conversational replies are not connected.",
    icon: "M3 4h18v16H3zM12 4v16",
    wide: true,
    visual: (
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="rounded-xl border border-hairline bg-hairline/30 p-3">
          <p className="text-xs text-muted">Study</p>
          <div className="mt-3 flex flex-col gap-2">
            <Skel className="w-full" />
            <Skel className="w-4/5" />
            <Skel className="w-2/5" />
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-hairline p-3">
          <p className="text-xs text-muted">Prompt</p>
          <div className="mt-3 flex flex-col gap-2">
            <Skel className="w-full" />
            <Skel className="w-4/5" />
            <Skel className="w-2/5" />
          </div>
          <p className="mt-auto pt-3 text-xs text-muted">
            Saved in this browser
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Service health",
    desc: "Check API and database availability from settings, and update your account name.",
    icon: "M3 12h4l3-8 4 16 3-8h4",
    visual: (
      <div className="flex flex-col gap-2">
        {["API", "Database"].map((s) => (
          <div
            key={s}
            className="flex items-center justify-between rounded-lg border border-hairline px-3 py-2.5 text-xs text-muted"
          >
            {s}
            <span className="inline-flex items-center gap-2">
              <Dot />
              Status
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Clear boundaries",
    desc: "The current app does not independently interpret images, generate diagnoses, or recommend treatment.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM5.6 5.6l12.8 12.8",
    visual: (
      <ul className="flex flex-col gap-2.5 text-sm text-muted">
        {["Interpret images", "Generate diagnoses", "Recommend treatment"].map(
          (t) => (
            <li key={t} className="flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                className="size-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
              <span className="line-through decoration-hairline">{t}</span>
            </li>
          ),
        )}
      </ul>
    ),
  },
];

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <article
    className={cn(
      "flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-hairline bg-surface p-6",
      feature.wide && "sm:col-span-2",
      feature.featured && "border-accent/30 bg-accent-soft/40",
    )}
  >
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 24 24"
        className="size-4 text-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d={feature.icon} />
      </svg>
      <h3 className="text-base font-medium text-foreground">{feature.title}</h3>
    </div>
    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
      {feature.desc}
    </p>
    <div aria-hidden="true" className="mt-6 min-h-0 flex-1">
      {feature.visual}
    </div>
  </article>
);

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32"
    >
      <Reveal delay={80}>
        <h2 className="max-w-2xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
          Image and context.
          <br />
          <span className="italic">One</span> workspace.
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:auto-rows-[320px] lg:grid-cols-4 lg:gap-5">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
