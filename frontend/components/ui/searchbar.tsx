"use client";

import { useId, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SmartSearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SmartSearchBar({
  search,
  onSearchChange,
  placeholder = "Search by Study ID, Patient Name...",
  className,
}: SmartSearchBarProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor={inputId} className="sr-only">
        Search studies
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        ref={inputRef}
        id={inputId}
        name="study-search"
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onSearchChange("");
            inputRef.current?.blur();
          }
        }}
        placeholder={placeholder}
        autoComplete="off"
        className="h-9 w-full rounded-lg border border-hairline bg-card pl-9 pr-8 text-xs text-ink shadow-[0_1px_2px_rgba(10,10,10,0.03)] transition-colors placeholder:text-muted-foreground/80 hover:border-ink/20 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {search ? (
        <button
          type="button"
          onClick={() => {
            onSearchChange("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-1.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-plate hover:text-ink"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-hairline bg-plate px-1.5 font-mono text-[9px] text-muted-foreground sm:block">
          /
        </kbd>
      )}
    </div>
  );
}
