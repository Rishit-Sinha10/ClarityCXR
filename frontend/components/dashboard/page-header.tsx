import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink sm:text-[28px]">
          {title}
        </h1>
        <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
