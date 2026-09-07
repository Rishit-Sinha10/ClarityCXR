import { ArrowUp, ShieldCheck, type LucideIcon } from "lucide-react";
import Brand from "./brand";
const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["#product", "Product demo"],
      ["#how", "How it works"],
      ["#features", "Features"],
      ["#top", "Security"],
    ],
  },
  {
    title: "Company",
    links: [
      ["#top", "About"],
      ["#top", "Journal"],
      ["#top", "Contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["#top", "Radiology playbooks"],
      ["#top", "API reference"],
      ["#top", "FHIR & DICOM"],
    ],
  },
];
export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <Brand dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Fusing imaging, reports and patient data into one clear read — for
              clinicians and their AI.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([href, label]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-paper/70 transition-colors hover:text-accent"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-paper/10 py-6 sm:flex-row sm:items-center sm:justify-between"></div>
      </div>
    </footer>
  );
}
