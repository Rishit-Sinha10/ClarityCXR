"use client";

import { useState } from "react";
import {
  Activity,
  Bell,
  Check,
  CircleCheck,
  Copy,
  FileText,
  Images,
  LayoutDashboard,
  Scan,
  Search,
  Settings,
  Sparkles,
  Stethoscope,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Reveal from "./reval";

type Preset = "lungs" | "ribs" | "medi";

const findings = [
  {
    id: 0,
    icon: Scan,
    tone: "text-[color:var(--signal)]",
    title: "Right midzone opacity",
    note: "New since 08/12 · 31 × 24 mm",
    chip: "R MZ",
  },
  {
    id: 1,
    icon: TriangleAlert,
    tone: "text-[color:var(--vital)]",
    title: "R hilum enlarged",
    note: "Correlate with hilar mass history",
    chip: "HILUM",
  },
  {
    id: 2,
    icon: CircleCheck,
    tone: "text-[color:var(--signal)]",
    title: "No pleural effusion",
    note: "Costophrenic angles clear",
    chip: "OK",
  },
] as const;

const insights = [
  {
    icon: TriangleAlert,
    tone: "text-[color:var(--vital)]",
    rule: "bg-[color:var(--vital)]",
    tag: "REVIEW",
    text: "Consolidation sits over the old right hilar prominence — correlate clinically.",
  },
  {
    icon: Sparkles,
    tone: "text-[color:var(--signal)]",
    rule: "bg-[color:var(--signal)]",
    tag: "ACTION",
    text: "Begin empiric coverage; re-check CRP in 48 hours.",
  },
  {
    icon: Activity,
    tone: "text-destructive",
    rule: "bg-destructive",
    tag: "WATCH",
    text: "Metformin continues while glucose 11.4 and eGFR 68.",
  },
  {
    icon: CircleCheck,
    tone: "text-muted-foreground",
    rule: "bg-hairline",
    tag: "OK",
    text: "Cardiomediastinal contours stable vs 08/12.",
  },
] as const;

const vitals = [
  { k: "SpO2", v: "88 %", d: "▼ 2", warn: true },
  { k: "HR", v: "108", d: "", warn: false },
  { k: "RR", v: "26", d: "▲", warn: true },
  { k: "Temp", v: "38.7 °C", d: "▲", warn: true },
  { k: "BP", v: "128 / 74", d: "", warn: false },
] as const;

const docs = [
  { k: "Provisional dx", v: "Pneumonia, unspecified (J18.9)", src: "ED NOTE" },
  { k: "Meds", v: "Metformin · Atorvastatin · Lisinopril", src: "RX 09/04" },
  { k: "Allergies", v: "None known (NKA)", src: "INTAKE" },
  { k: "Follow-up", v: "CRP in 48 h + repeat film", src: "PLAN" },
] as const;

const nav: { icon: LucideIcon; label: string; active?: boolean }[] = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Scan, label: "Studies", active: true },
  { icon: Images, label: "Patients" },
  { icon: FileText, label: "Documents" },
  { icon: Sparkles, label: "Insights" },
  { icon: Settings, label: "Settings" },
];

const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, monospace";

function ChestFilm({
  active,
  preset,
}: {
  active: number;
  preset: Preset;
}) {
  const show = (i: number) => (active === -1 ? 0.9 : active === i ? 1 : 0.12);
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-md bg-[#05080C] ring-1 ring-black/40",
        preset === "ribs" && "win-ribs",
        preset === "medi" && "win-medi",
        preset === "lungs" && "win-lungs",
      )}
    >
      <svg
        viewBox="0 0 200 240"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-label="Chest X-ray, right midzone opacity"
        role="img"
      >
        <defs>
          <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="soft2" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <rect width="200" height="240" fill="#05080C" />
        <ellipse cx="100" cy="122" rx="60" ry="94" fill="#8A99A6" opacity=".42" filter="url(#soft2)" />
        <path
          d="M78,36 C58,42 52,72 56,108 C58,134 64,168 76,182 C86,194 97,186 99,166 C102,132 101,92 96,58 C94,44 88,36 78,36 Z"
          fill="#0B1420" opacity=".96" filter="url(#soft)"
        />
        <path
          d="M122,36 C142,42 148,72 144,108 C142,134 136,168 124,182 C114,194 103,186 101,166 C98,132 99,92 104,58 C106,44 112,36 122,36 Z"
          fill="#0B1420" opacity=".96" filter="url(#soft)"
        />
        <ellipse cx="127" cy="115" rx="15" ry="13" fill="#CFD9E0" opacity=".5" filter="url(#soft2)" />
        <path
          d="M96,58 C92,52 86,50 82,54 C78,58 78,66 82,72 C86,79 94,84 101,82 C105,80 107,72 96,58 Z"
          fill="#9FB0BC" opacity=".85" filter="url(#soft)"
        />
        <path
          d="M101,40 C113,40 119,48 115,54 C111,60 100,58 98,48 Z"
          fill="#9FB0BC" opacity=".62" filter="url(#soft)"
        />
        <rect x="96" y="34" width="8" height="180" fill="#BCC9D3" opacity=".75" filter="url(#soft)" />
        <rect x="97" y="62" width="6" height="3" fill="#0B1420" />
        <rect x="97" y="86" width="6" height="3" fill="#0B1420" />
        <rect x="97" y="110" width="6" height="3" fill="#0B1420" />
        <rect x="97" y="134" width="6" height="3" fill="#0B1420" />
        <path d="M80,30 L54,44" stroke="#C2CDD6" strokeWidth="3" strokeLinecap="round" opacity=".85" filter="url(#soft)" fill="none" />
        <path d="M120,30 L146,44" stroke="#C2CDD6" strokeWidth="3" strokeLinecap="round" opacity=".85" filter="url(#soft)" fill="none" />
        <g stroke="#93A3B0" strokeWidth="1.4" opacity=".4" filter="url(#soft)" fill="none">
          <path d="M96,40 C82,44 70,48 60,54" />
          <path d="M96,54 C82,60 68,64 56,70" />
          <path d="M96,70 C82,78 66,84 54,92" />
          <path d="M96,88 C84,98 68,108 56,118" />
          <path d="M96,108 C86,120 72,132 62,144" />
          <path d="M104,40 C118,44 130,48 140,54" />
          <path d="M104,54 C118,60 132,64 144,70" />
          <path d="M104,70 C118,78 134,84 146,92" />
          <path d="M104,88 C116,98 132,108 144,118" />
          <path d="M104,108 C114,120 128,132 138,144" />
        </g>

        <g opacity={show(0)} style={{ transition: "opacity .2s" }}>
          <rect x="114" y="100" width="26" height="21" fill="none" stroke="#55E6CF" strokeWidth="1.4" />
          {[
            [114, 100, 114, 106],
            [114, 121, 114, 115],
            [140, 100, 140, 106],
            [140, 121, 140, 115],
            [114, 100, 120, 100],
            [140, 100, 134, 100],
            [114, 121, 120, 121],
            [140, 121, 134, 121],
          ].map(([x1, y1, x2, y2]) => (
            <line
              key={`b0-${x1}-${y1}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#55E6CF"
              strokeWidth="1.6"
            />
          ))}
          <circle cx="127" cy="110" r="1.8" fill="#55E6CF" />
          <line x1="140" y1="100" x2="128" y2="88" stroke="#55E6CF" strokeWidth="0.7" opacity="0.75" />
          <text
            x="136"
            y="87"
            textAnchor="end"
            fill="#55E6CF"
            fontSize="6.8"
            letterSpacing="0.8"
            fontFamily={MONO_STACK}
          >
            31 x 24 mm
          </text>
        </g>

        <g opacity={show(1)} style={{ transition: "opacity .2s" }}>
          <rect x="107" y="76" width="18" height="16" fill="none" stroke="#F5B25E" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="116" cy="84" r="1.6" fill="#F5B25E" />
          <line x1="125" y1="80" x2="146" y2="74" stroke="#F5B25E" strokeWidth="0.7" opacity="0.75" />
          <text
            x="146"
            y="73"
            textAnchor="end"
            fill="#F5B25E"
            fontSize="6.8"
            letterSpacing="0.8"
            fontFamily={MONO_STACK}
          >
            HILUM
          </text>
        </g>

        <g opacity={show(2)} style={{ transition: "opacity .2s" }}>
          <ellipse cx="100" cy="150" rx="40" ry="19" fill="none" stroke="#55E6CF" strokeWidth="1" strokeDasharray="2 3" opacity=".85" />
        </g>
      </svg>

      <span className="film-scan-shape" aria-hidden />
      <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1.5 rounded bg-[#0C1119]/80 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.18em] text-emerald-300">
        <span className="h-1 w-1 rounded-full bg-[color:var(--signal)]" />
        READ 04:24
      </div>
    </div>
  );
}

export default function Showcase() {
  const [preset, setPreset] = useState<Preset>("lungs");
  const [active, setActive] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [queued, setQueued] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        "New right midzone opacity since 08/12; no effusion; cardiomediastinal contours stable. Most consistent with community-acquired pneumonia.",
      );
    } catch {
      /* clipboard unavailable in preview */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="product" className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            02 / Product
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-display text-3xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-4xl">
              Watch the
              <span className="italic"> read </span>
              take shape.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              One screen, every signal: the film, the chart, the prior note and
              the draft report. The AI proposes — the radiologist disposes.
            </p>
          </div>
        </Reveal>

        {/* ---- the product, in a frame ---- */}
        <Reveal delay={200} variant="left">
          <div
            id="demo"
            className="mt-6 overflow-hidden rounded-2xl border border-hairline bg-card shadow-[0_40px_90px_-48px_rgba(10,10,10,0.4)]"
          >
            {/* app topbar */}
            <div className="flex items-center justify-between gap-4 border-b border-hairline bg-sidebar px-4 py-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-display text-sm font-bold tracking-tight text-ink">
                  claritycxr
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground xl:inline">
                  St. Cyprian Clinic &middot; Radiology
                </span>
              </div>
              <label className="hidden h-8 w-52 items-center gap-2 rounded-lg border border-hairline bg-card px-2.5 text-xs text-muted-foreground shadow-sm md:flex xl:w-64">
                <Search className="size-3.5" aria-hidden />
                <span className="flex-1 truncate">Search patients, studies, orders…</span>
                <kbd className="rounded border border-hairline px-1 font-mono text-[9px] text-muted-foreground">
                  ⌘K
                </kbd>
              </label>
              <div className="flex items-center gap-2.5">
                <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:flex">
                  <span className="h-1 w-1 rounded-full bg-accent" /> EHR synced
                </span>
                <button
                  type="button"
                  className="grid size-8 place-items-center rounded-lg border border-hairline bg-card text-muted-foreground transition-colors hover:border-accent hover:text-ink"
                  aria-label="Notifications"
                >
                  <Bell className="size-4" aria-hidden />
                </button>
                <span className="grid size-8 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">
                  RO
                </span>
              </div>
            </div>

            {/* app body */}
            <div className="flex">
              {/* sidebar */}
              <aside className="hidden w-44 shrink-0 flex-col border-r border-hairline bg-sidebar lg:flex">
                <nav
                  className="flex flex-1 flex-col gap-0.5 p-2.5"
                  aria-label="ClarityCXR navigation"
                >
                  {nav.map((item) => (
                    <span
                      key={item.label}
                      className={cn(
                        "flex cursor-default items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px]",
                        item.active
                          ? "bg-accent-soft font-medium text-accent-ink"
                          : "text-muted-foreground",
                      )}
                    >
                      <item.icon className="size-4" aria-hidden />
                      {item.label}
                    </span>
                  ))}
                </nav>
                <div className="border-t border-hairline p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                    DICOM 4.2 · TLS 1.3
                  </p>
                </div>
              </aside>

              {/* main grid: patient arm / study arm / AI arm — one screen tall */}
              <div className="grid flex-1 grid-cols-1 gap-px bg-hairline lg:h-[560px] lg:grid-cols-[220px_minmax(0,1fr)_300px] xl:h-[620px] xl:grid-cols-[248px_minmax(0,1fr)_336px]">
                {/* ---- PATIENT OVERVIEW ---- */}
                <section
                  id="overview"
                  className="pane-scroll scroll-mt-4 bg-card p-4 transition-colors ease-out xl:border-r xl:border-hairline"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">Okafor, Roland</CardTitle>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        M · 70 · MRN 88-19344
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="font-mono text-[9px] uppercase tracking-widest"
                    >
                      Admitting
                    </Badge>
                  </div>
                  <p className="mt-3 rounded-md bg-amber-soft/70 px-3 py-1.5 text-xs text-ink/80">
                    Dyspnea 3 days · fevers since this AM
                  </p>

                  <Separator className="my-4" />

                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Vitals · 04:22
                  </p>
                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 xl:grid-cols-1">
                    {vitals.map((v) => (
                      <div key={v.k} className="flex items-baseline justify-between gap-2">
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {v.k}
                        </dt>
                        <dd
                          className={cn(
                            "font-mono text-xs",
                            v.warn ? "font-medium text-[color:var(--vital)]" : "text-ink",
                          )}
                        >
                          {v.v}
                          {v.d && <span className="ml-0.5 text-[9px] opacity-70">{v.d}</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Separator className="my-4" />

                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Labs · 04:20
                  </p>
                  <p className="mt-2 font-mono text-xs text-ink">
                    WBC <span className="text-[color:var(--vital)]">14.2 ▲</span> · CRP{" "}
                    <span className="text-[color:var(--vital)]">96 ▲</span>
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    GLUC <span className="text-[color:var(--vital)]">11.4 ▲</span> · eGFR{" "}
                    <span className="text-ink">68</span> · LACT 1.2
                  </p>

                  <Separator className="my-4" />

                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Prior study
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/75">
                    08/12 chest — clear lung fields, no hilar prominence.{" "}
                    <span className="font-medium text-[color:var(--signal)]">
                      No change to follow.
                    </span>
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Allergies · NKA
                  </p>
                </section>

                {/* ---- IMAGE ANALYSIS ---- */}
                <section
                  id="analysis"
                  className="flex min-h-0 flex-col overflow-hidden bg-card p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      Chest PA · AP · 125 kVp / 3.2 mAs · 8824
                    </p>
                    <Tabs
                      defaultValue="lungs"
                      onValueChange={(v) => setPreset(v as Preset)}
                    >
                      <TabsList variant="line" className="h-7">
                        <TabsTrigger value="lungs" className="text-[11px]">
                          Lungs
                        </TabsTrigger>
                        <TabsTrigger value="ribs" className="text-[11px]">
                          Ribs
                        </TabsTrigger>
                        <TabsTrigger value="medi" className="text-[11px]">
                          Medi
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="mt-2 aspect-[5/6] w-full min-h-0 flex-1 lg:aspect-auto">
                    <ChestFilm active={active} preset={preset} />
                  </div>

                  <div className="mt-3 space-y-1.5" role="list" aria-label="AI findings">
                    {findings.map((f) => (
                      <div
                        key={f.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={active === f.id}
                        onMouseEnter={() => setActive(f.id)}
                        onMouseLeave={() => setActive(-1)}
                        onFocus={() => setActive(f.id)}
                        onBlur={() => setActive(-1)}
                        className={cn(
                          "flex cursor-pointer items-start gap-2.5 rounded-md border border-hairline px-3 py-1.5 transition-colors",
                          active === f.id
                            ? "border-accent bg-accent-soft"
                            : "bg-plate/50 hover:bg-plate",
                        )}
                      >
                        <f.icon className={cn("mt-0.5 size-4 shrink-0", f.tone)} aria-hidden />
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium leading-snug text-ink">
                            {f.title}
                          </p>
                          <p className="font-mono text-[10px] tracking-wide text-muted-foreground">
                            {f.note}
                          </p>
                        </div>
                        <span className="ml-auto self-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                          {f.chip}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ---- AI OUTPUT RAIL ---- */}
                <section
                  id="ai-rail"
                  className="pane-scroll flex min-h-0 flex-col gap-px bg-hairline xl:border-l xl:border-hairline"
                >
                  {/* AI summary */}
                  <Card id="summary" className="rounded-none xl:rounded-none">
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="flex items-center gap-1.5 text-sm">
                        <Sparkles className="size-3.5 text-[color:var(--signal)]" aria-hidden />
                        AI summary
                      </CardTitle>
                      <CardDescription className="text-[11px]">
                        Fused from film · chart · labs · note
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <p className="text-xs leading-relaxed text-ink/85">
                        New right midzone opacity since 08/12. WBC 14.2 and CRP
                        96, glucose 11.4. No effusion; cardiomediastinal
                        contours stable. Most consistent with{" "}
                        <span className="font-medium text-accent-ink">
                          community-acquired pneumonia
                        </span>{" "}
                        — empiric coverage started.
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-plate">
                          <div
                            className="h-full rounded-full bg-[color:var(--signal)]"
                            style={{ width: "94%" }}
                          />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                          conf 0.94
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {["FILM", "CHART", "LABS", "NOTE"].map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="font-mono text-[8px] uppercase tracking-widest"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={copy}
                        >
                          {copied ? (
                            <Check className="size-3.5 text-[color:var(--signal)]" aria-hidden />
                          ) : (
                            <Copy className="size-3.5" aria-hidden />
                          )}
                          {copied ? "Copied" : "Copy"}
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => setQueued(true)}
                        >
                          <Stethoscope className="size-3.5" aria-hidden />
                          Draft with my sign-off
                        </Button>
                      </div>
                      {queued && (
                        <p className="mt-2 font-mono text-[10px] tracking-wide text-accent-ink">
                          Draft queued to Dr. Ibekwe — not signed.
                        </p>
                      )}
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        Read 04:24 · review by Dr. Ibekwe
                      </p>
                    </CardContent>
                  </Card>

                  {/* Document extraction */}
                  <Card id="extraction" className="rounded-none xl:rounded-none">
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="flex items-center gap-1.5 text-sm">
                        <FileText className="size-3.5 text-[color:var(--signal)]" aria-hidden />
                        From the documents
                      </CardTitle>
                      <CardDescription className="text-[11px]">
                        Source fields, not guesswork
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 px-4 pb-4">
                      {docs.map((d) => (
                        <div key={d.k} className="flex items-baseline justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                              {d.k}
                            </p>
                            <p className="mt-0.5 text-xs leading-snug text-ink/85">
                              {d.v}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="shrink-0 font-mono text-[8px] uppercase tracking-widest"
                          >
                            {d.src}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Contextual insights */}
                  <Card id="insights" className="rounded-none xl:rounded-none">
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="flex items-center gap-1.5 text-sm">
                        <Activity className="size-3.5 text-[color:var(--signal)]" aria-hidden />
                        Contextual insights
                      </CardTitle>
                      <CardDescription className="text-[11px]">
                        Rendered against the patient record
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 px-4 pb-4">
                      {insights.map((ins) => (
                        <div
                          key={ins.text}
                          className="relative rounded-md border border-hairline bg-plate/40 px-3 py-2 pl-4"
                        >
                          <span
                            className={cn(
                              "absolute inset-y-2 left-0 w-0.5 rounded-full",
                              ins.rule,
                            )}
                          />
                          <div className="flex items-center gap-1.5">
                            <ins.icon className={cn("size-3.5", ins.tone)} aria-hidden />
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                              {ins.tag}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-ink/80">
                            {ins.text}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </section>
              </div>
            </div>

            {/* app status bar */}
            <div className="flex items-center justify-between gap-4 border-t border-hairline bg-sidebar px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>STUDY 88-19344 · AUTH 04:24 · RENDER 180 ms</span>
              <span className="hidden sm:inline">ISO 27001 · TLS 1.3</span>
            </div>
          </div>
        </Reveal>

        {/* ---- the five panels, named ---- */}
        <Reveal delay={280}>
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {(
              [
                ["overview", "01", "Patient overview"],
                ["analysis", "02", "Image analysis"],
                ["extraction", "03", "Document extraction"],
                ["summary", "04", "AI summary"],
                ["insights", "05", "Contextual insights"],
              ] as const
            ).map(([id, n, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="group flex items-center gap-2.5 rounded-md border border-hairline bg-card px-3 py-2 transition-colors hover:border-accent hover:bg-accent-soft"
                >
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground group-hover:text-accent-ink">
                    {n}
                  </span>
                  <span className="text-[13px] font-medium text-ink/85 group-hover:text-accent-ink">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}