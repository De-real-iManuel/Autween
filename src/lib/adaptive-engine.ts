export type Interest = "stories" | "art" | "building" | "puzzles" | "nature" | "animals";
export type ParticipationMode = "visual" | "symbols" | "text" | "audio";
export type Preferences = {
  interests: Interest[];
  modes: ParticipationMode[];
  sensory: "gentle" | "quiet";
  pace: "self" | "flexible";
  personalization: boolean;
};
export type Activity = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: Interest;
  modes: ParticipationMode[];
  sensory: "gentle" | "quiet";
  minutes: string;
  safety: "approved" | "blocked";
};
export type Feedback = Record<string, "again" | "later">;

/**
 * Deterministic, inspectable ranking. Explicit preferences are the only
 * personalization inputs. No behavioural, emotional, diagnostic or speech
 * inference is performed. Safety eligibility is checked before ranking.
 */
export function isEligible(activity: Activity, preferences: Preferences): boolean {
  const hasSupportedMode =
    preferences.modes.length === 0 ||
    preferences.modes.some(mode => activity.modes.includes(mode));

  return Boolean(activity.id) &&
    activity.modes.length > 0 &&
    activity.safety === "approved" &&
    hasSupportedMode;
}

export function scoreActivity(activity: Activity, preferences: Preferences, feedback: Feedback = {}): number {
  if (!preferences.personalization) return 0;
  let score = 0;
  if (preferences.interests.includes(activity.category)) score += 4;
  if (preferences.modes.some(mode => activity.modes.includes(mode))) score += 2;
  if (activity.sensory === preferences.sensory) score += 1;
  if (feedback[activity.id] === "again") score += 1;
  if (feedback[activity.id] === "later") score -= 2;
  return score;
}

export function rankActivities<T extends Activity>(activities: T[], preferences: Preferences, feedback: Feedback = {}): T[] {
  const eligible = activities.filter(activity => isEligible(activity, preferences));
  if (!preferences.personalization) return [...eligible];
  return [...eligible].sort((a, b) => scoreActivity(b, preferences, feedback) - scoreActivity(a, preferences, feedback));
}

export function explainActivity(activity: Activity, preferences: Preferences): string {
  if (!preferences.personalization) return "Personalisation is paused — explore in any order.";
  const reasons: string[] = [];
  if (preferences.interests.includes(activity.category)) reasons.push("matches an interest you chose");
  if (preferences.modes.some(mode => activity.modes.includes(mode))) reasons.push("works with a way you like to join in");
  if (activity.sensory === preferences.sensory) reasons.push("fits the visual style you selected");
  if (!reasons.length) return "A different idea to explore — only if you feel like it.";
  return "Suggested because it " + reasons.join(" and ") + ".";
}
