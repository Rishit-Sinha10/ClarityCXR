import { cn } from "@/lib/utils";

export function GithubSignInButton({
  redirectTo,
  className,
}: {
  redirectTo?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-redirect={redirectTo ?? ""}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-hairline bg-card text-sm font-medium text-ink shadow-sm transition-colors hover:border-foreground",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2.2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1 .8 2v2.9c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
      </svg>
      Continue with GitHub
    </button>
  );
}