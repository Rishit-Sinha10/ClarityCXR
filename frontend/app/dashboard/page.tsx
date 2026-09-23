import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "./sign-out-button";
import Sidebar from "@/components/ui/sidebar";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return (
    <main className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col px-6 py-16 lg:px-12">
        <div className="mx-auto w-full max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Workspace / Overview
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
            Good morning, Dr. Ibekwe.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            Your ClarityCXR workspace is ready. Select a study from the queue to
            begin your next read.
          </p>
          <div className="mt-10 border-t border-hairline pt-6">
            <p className="text-sm text-muted">
              Signed in as {user.email ?? "authenticated user"}
            </p>
            <SignOutButton />
          </div>
        </div>
      </div>
    </main>
  );
}
