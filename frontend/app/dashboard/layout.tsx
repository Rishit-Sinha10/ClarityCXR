import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: {
    default: "Dashboard — ClarityCXR",
    template: "%s — ClarityCXR",
  },
  description:
    "ClarityCXR chest X-ray analysis workspace. Demonstration interface with fictional data.",
};

function readMetadataString(
  metadata: Record<string, unknown>,
  key: string,
) {
  const value = metadata[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  const fullName =
    readMetadataString(metadata, "full_name") ??
    readMetadataString(metadata, "name");
  const avatarUrl =
    readMetadataString(metadata, "avatar_url") ??
    readMetadataString(metadata, "picture");
  const email = user.email ?? "Authenticated user";
  const name =
    fullName ??
    (user.email?.split("@")[0]?.replace(/[._-]+/g, " ") || "ClarityCXR user");

  return (
    <DashboardShell
      user={{
        email,
        name,
        avatarUrl,
      }}
    >
      {children}
    </DashboardShell>
  );
}
