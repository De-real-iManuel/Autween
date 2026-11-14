import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { configuredSiteOrigin } from "@/lib/auth-helpers";

export async function POST(request: NextRequest) {
  const siteOrigin = configuredSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  const destination = siteOrigin ? new URL("/", siteOrigin) : new URL("/", request.url);
  const response = NextResponse.redirect(destination, { status: 303 });
  if (!siteOrigin || request.headers.get("origin") !== siteOrigin) {
    return new NextResponse("Invalid sign-out request origin.", { status: 403 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (items) => items.forEach(({ name, value, options }) => response.cookies.set(name, value, options)),
    },
  });
  await supabase.auth.signOut();
  return response;
}
