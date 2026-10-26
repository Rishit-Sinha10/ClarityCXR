"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

export default function SignOutButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    const { error } = await createClient().auth.signOut();

    if (error) {
      setBusy(false);
      return;
    }

    router.replace("/");
    router.refresh();
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
