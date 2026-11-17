import Brand from "./brand";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["/#product", "Product demo"],
      ["/#how", "How it works"],
      ["/#features", "Features"],
      ["/#intended-use", "Intended use"],
      ["/#trust", "Trust & evaluation"],
    ],
  },
  {
    title: "Company",
    links: [["/demo", "Contact"]],
  },
  {
    title: "Legal",
    links: [
      ["/privacy", "Privacy"],
      ["/terms", "Terms"],
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
              Fusing imaging, reports, and clinical notes into one source-linked
              read.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
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
        <div className="border-t border-paper/10 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-paper/50">
              © {new Date().getFullYear()} ClarityCXR. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-paper/50">
              <a
                href="/privacy"
                className="transition-colors hover:text-accent"
              >
                Privacy
              </a>
              <a href="/terms" className="transition-colors hover:text-accent">
                Terms
              </a>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-paper/50">
            ClarityCXR is decision-support software. Outputs are not a diagnosis
            and require review by a qualified radiologist. Do not submit patient
            information through this site.
          </p>
        </div>
      </div>
    </footer>
  );
}
