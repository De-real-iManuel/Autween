import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { configuredSiteOrigin, safeLocalRedirectPath } from "@/lib/auth-helpers";

export async function GET(request: NextRequest) {
  const siteOrigin = configuredSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (!siteOrigin) return new NextResponse("Autween's canonical site origin is not configured.", { status: 503 });

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const safeNext = safeLocalRedirectPath(searchParams.get("next"));
  if (!code) return NextResponse.redirect(new URL("/auth/message?kind=verification-error", siteOrigin));

  const response = NextResponse.redirect(new URL(safeNext, siteOrigin));
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.redirect(new URL("/auth/message?kind=setup", siteOrigin));

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (items) => items.forEach(({ name, value, options }) => response.cookies.set(name, value, options)),
    },
  });
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/auth/message?kind=verification-error", siteOrigin));
  return response;
}
