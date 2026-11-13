import LanternClient from "./lantern-client";
import type { AgeBand } from "@/lib/age-experience";

export default async function LanternActivity({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  const { age } = await searchParams;
  const initialAgeBand: AgeBand = age === "6-9" || age === "10-12" || age === "13-15" || age === "16-17" ? age : "13-15";
  return <LanternClient initialAgeBand={initialAgeBand} />;
}
