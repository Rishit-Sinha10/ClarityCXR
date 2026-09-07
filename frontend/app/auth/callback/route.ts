import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { safeRedirectPath } from "@/utils/supabase/safe-redirect";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = safeRedirectPath(requestUrl.searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=auth_callback", requestUrl),
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/login?error=auth_callback", requestUrl),
    );
  }

  return NextResponse.redirect(new URL(next, requestUrl));
}
