import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your ClarityCXR account profile and connected API status.",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const fullName =
    typeof metadata.full_name === "string"
      ? metadata.full_name
      : typeof metadata.name === "string"
        ? metadata.name
        : "ClarityCXR user";
  const email = user?.email ?? "Authenticated user";

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <PageHeader
        eyebrow="Workspace / Settings"
        title="Settings"
        description="Update your account name and check the connection to your study API."
      />

      <div className="mt-5">
        <SettingsForm initialName={fullName} email={email} />
      </div>
    </div>
  );
}
