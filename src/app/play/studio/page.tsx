import { StudioClient } from "./studio-client";
import type { AgeBand } from "@/lib/age-experience";

export default async function CreativeStudioPage({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  const { age } = await searchParams;
  const initialAgeBand: AgeBand = age === "6-9" || age === "10-12" || age === "13-15" || age === "16-17" ? age : "13-15";
  return <StudioClient initialAgeBand={initialAgeBand} />;
}
