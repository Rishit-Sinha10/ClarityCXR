import {
  CircleCheck,
  CircleX,
  Clock3,
  FileUp,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, { className: string; icon: LucideIcon }> = {
  completed: {
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CircleCheck,
  },
  uploaded: {
    className: "border-slate-200 bg-slate-50 text-slate-700",
    icon: FileUp,
  },
  processing: {
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: Loader2,
  },
  pending: {
    className: "border-amber-200 bg-amber-50 text-amber-800",
    icon: Clock3,
  },
  failed: {
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: CircleX,
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const style = statusStyles[status.toLowerCase()] ?? {
    className: "border-hairline bg-plate text-muted-foreground",
    icon: Clock3,
  };
  const Icon = style.icon;
  const label = status
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <span
      className={cn(
        "inline-flex h-6 w-fit items-center gap-1.5 rounded-full border px-2 text-[11px] font-medium whitespace-nowrap",
        style.className,
        className,
      )}
    >
      {status === "processing" ? (
        <Loader2 className="size-3 animate-spin" aria-hidden />
      ) : (
        <Icon className="size-3" aria-hidden />
      )}
      {label || "Unknown"}
    </span>
  );
}
