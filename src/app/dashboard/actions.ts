"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedAgeBands = ["6-9", "10-12", "13-15", "16-17"] as const;

export async function createParticipantProfile(formData: FormData) {
  const nickname = String(formData.get("nickname") ?? "").trim();
  const ageBand = String(formData.get("ageBand") ?? "");
  if (!nickname || nickname.length > 32 || !allowedAgeBands.includes(ageBand as typeof allowedAgeBands[number])) {
    redirect("/dashboard?error=profile");
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/?screen=signin");

  const { data: guardianProfile, error: guardianError } = await supabase
    .from("guardian_profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (guardianError || !guardianProfile) redirect("/auth/message?kind=guardian-setup");

  const { error } = await supabase.from("participant_profiles").insert({
    guardian_id: user.id,
    display_name: nickname,
    age_band: ageBand,
  });
  if (error) redirect("/dashboard?error=save");
  redirect("/dashboard?created=1");
}
