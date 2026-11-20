"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/* npm i motion  →  import from "motion/react" */

const EASE = [0.22, 1, 0.36, 1] as const;

type Timing = (delay: number, duration?: number) => object;

const steps = [
  {
    n: "01",
    title: "Upload an image",
    desc: "Add a chest X-ray in PNG, JPG, or WebP format. The connected API stores the file and returns its study record.",
  },
  {
    n: "02",
    title: "Review the study",
    desc: "Find the uploaded image by its filename, status, and upload time. Keep a text prompt with the selected study in your workspace.",
  },
  {
    n: "03",
    title: "Send a request",
    desc: "Submit the selected study to your configured prediction service. ClarityCXR shows the status and any output that service returns.",
  },
];

/* ---------- Glyphs: one gesture each, drawn once when the section enters view ---------- */

const svgProps = {
  viewBox: "0 0 96 56",
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-14 w-24 text-muted",
  stroke: "currentColor",
};

function UploadGlyph({ on, t }: { on: boolean; t: Timing }) {
  return (
    <svg {...svgProps}>
      {/* tray */}
      <path d="M16 36v12h64V36" />
      {/* arrow rises into the tray's mouth */}
      <g className="text-accent" stroke="currentColor">
        <motion.path
          d="M48 40V12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: on ? 1 : 0 }}
          transition={t(0.1)}
        />
        <motion.path
          d="M38 22l10-10 10 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
          transition={t(0.45, 0.4)}
        />
      </g>
    </svg>
  );
}

function ReviewGlyph({ on, t }: { on: boolean; t: Timing }) {
  return (
    <svg {...svgProps}>
      <rect x="16" y="6" width="64" height="12" rx="3" />
      <rect x="16" y="22" width="64" height="12" rx="3" />
      <rect x="16" y="38" width="64" height="12" rx="3" />
      {/* selection traces around the middle row */}
      <motion.rect
        x="16"
        y="22"
        width="64"
        height="12"
        rx="3"
        className="text-accent"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: on ? 1 : 0 }}
        transition={t(0.1, 0.9)}
      />
      <motion.circle
        cx="24"
        cy="28"
        r="2"
        className="text-accent"
        fill="currentColor"
        stroke="none"
        initial={{ scale: 0 }}
        animate={{ scale: on ? 1 : 0 }}
        style={{ transformOrigin: "24px 28px" }}
        transition={t(0.8, 0.3)}
      />
    </svg>
  );
}

function SendGlyph({ on, t }: { on: boolean; t: Timing }) {
  return (
    <svg {...svgProps}>
      {/* request travels to the service */}
      <motion.path
        d="M12 28h44M48 20l8 8-8 8"
        className="text-accent"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: on ? 1 : 0 }}
        transition={t(0.1, 0.8)}
      />
      {/* status: hollow while pending, filled once returned */}
      <circle cx="78" cy="28" r="7" />
      <motion.circle
        cx="78"
        cy="28"
        r="7"
        className="text-accent"
        fill="currentColor"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={t(1.0, 0.4)}
      />
    </svg>
  );
}

const glyphs = [UploadGlyph, ReviewGlyph, SendGlyph];

/* ---------- Section ---------- */

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const on = inView || !!reduce;

  const t: Timing = (delay, duration = 0.7) =>
    reduce ? { duration: 0 } : { duration, delay, ease: EASE };

  return (
    <section id="how" className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <h2 className="max-w-2xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
          How it works
        </h2>

        <div
          ref={ref}
          className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10 lg:mt-20"
        >
          {steps.map((s, i) => {
            const Glyph = glyphs[i];
            return (
              <div key={s.n} className="relative">
                <Glyph on={on} t={(d, dur) => t(i * 0.55 + d, dur)} />
                <h3 className="mt-6 font-display text-2xl tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
