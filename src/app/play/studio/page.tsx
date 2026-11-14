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
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  let storageScope: string | null = hasSupabaseConfig ? null : "demo";

  if (hasSupabaseConfig) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (!authError && !user) {
        storageScope = "demo";
      } else if (!authError && user && participant && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(participant)) {
        const { data, error } = await supabase
          .from("participant_profiles")
          .select("id")
          .eq("id", participant)
          .maybeSingle();
        storageScope = error ? null : data?.id ?? null;
      }
    } catch {
      // Fail closed: export remains available, but local profile storage is disabled.
      storageScope = null;
    }
  }

  return <StudioClient initialAgeBand={initialAgeBand} storageScope={storageScope} />;
}
