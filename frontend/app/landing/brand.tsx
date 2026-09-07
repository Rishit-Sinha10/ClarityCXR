import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Brand({
  dark = false,
  href = "#top",
}: {
  dark?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5"
      aria-label="ClarityCXR — home"
    >
      <span
        className={cn(
          "font-display text-base font-bold tracking-tight",
          dark ? "text-paper" : "text-ink",
        )}
      >
        ClarityCXR
      </span>
    </Link>
  );
}
