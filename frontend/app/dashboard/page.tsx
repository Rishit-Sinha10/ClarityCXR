import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-background p-8 shadow-sm">
        <p className="text-sm text-muted">Signed in as</p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight">
          {user.email ?? "Authenticated user"}
        </h1>
        <p className="mt-3 text-sm text-muted">
          Your ClarityCXR workspace is ready.
        </p>
        <SignOutButton />
      </div>
    </main>
  );
}
