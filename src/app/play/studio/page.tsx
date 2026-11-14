import StudioClient from "./studio-client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAgeBand, type AgeBand } from "@/lib/age-experience";

export default async function CreativeStudioPage({
  searchParams,
}: {
  searchParams: Promise<{ age?: string; participant?: string }>;
}) {
  const { age, participant } = await searchParams;
  const initialAgeBand: AgeBand = isAgeBand(age) ? age : "13-15";
  let storageScope: string | null = null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      storageScope = "demo";
    } else if (participant && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(participant)) {
      const { data } = await supabase
        .from("participant_profiles")
        .select("id")
        .eq("id", participant)
        .maybeSingle();
      storageScope = data?.id ?? null;
    }
  } catch {
    // The public prototype remains usable without Supabase configuration.
    storageScope = "demo";
  }

  return <StudioClient initialAgeBand={initialAgeBand} storageScope={storageScope} />;
}
