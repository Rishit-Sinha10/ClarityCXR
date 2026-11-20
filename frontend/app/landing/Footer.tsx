import Brand from "./brand";
import styles from "./Footer.module.css";

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
    <footer className="bg-paper/70 text-ink">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <Brand />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              Chest X-ray uploads, study tracking, and connected prediction
              requests in one workspace.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([href, label]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-ink/70 transition-colors hover:text-accent"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.signature}>
          <div className={styles.wordmark} aria-hidden="true">
            {Array.from("CLARITYCXR").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={styles.letter}
                data-letter={letter}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
