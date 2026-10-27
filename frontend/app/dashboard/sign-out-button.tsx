"use client";

import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/utils/auth";
import { cn } from "@/lib/utils";

export default function SignOutButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { logout } = useAuth();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    try {
      await logout();
    } catch (error) {
      console.error("Sign-out failed:", error);
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={busy}
      className={cn(
        "flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    >
      {busy ? (
        <Loader2 className="size-3.5 animate-spin" aria-hidden />
      ) : (
        (children ?? (
          <>
            <LogOut className="size-3.5" aria-hidden />
            Sign out
          </>
        ))
      )}
    </button>
  );
}
