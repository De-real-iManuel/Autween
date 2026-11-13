"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(formData: FormData) {
  const intent = String(formData.get("intent") ?? "");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) redirect("/auth/message?kind=setup");
  if (!email || password.length < (intent === "signup" ? 8 : 1)) {
    redirect("/auth/message?kind=invalid");
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (items) => items.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
    },
  });

  if (intent === "signup") {
    const guardianName = String(formData.get("guardianName") ?? "").trim();
    if (!guardianName || formData.get("guardianConsent") !== "on") {
      redirect("/auth/message?kind=consent");
    }
    const requestHeaders = await headers();
    const originHeader = requestHeaders.get("origin") ?? requestHeaders.get("referer") ?? "http://localhost:3000";
    const origin = new URL(originHeader).origin;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
        data: { guardian_name: guardianName, account_role: "guardian" },
      },
    });
    if (error) redirect("/auth/message?kind=signup-error");
    if (data.session) redirect("/dashboard");
    redirect("/auth/message?kind=check-email");
  }

  if (intent === "signin") {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) redirect("/auth/message?kind=login-error");
    redirect("/dashboard");
  }

  redirect("/auth/message?kind=invalid");
}
