import { CircleCheck, Clock3, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  STUDY_STATUS_LABEL,
  type StudyStatus,
} from "@/lib/demo-data";

const statusStyles: Record<
  StudyStatus,
  { className: string; icon: typeof CircleCheck }
> = {
  completed: {
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CircleCheck,
  },
  processing: {
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: Loader2,
  },
  pending: {
    className: "border-amber-200 bg-amber-50 text-amber-800",
    icon: Clock3,
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: StudyStatus;
  className?: string;
}) {
  const style = statusStyles[status];
  const Icon = style.icon;

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
      {STUDY_STATUS_LABEL[status]}
    </span>
  );
}
