import test from "node:test";
import assert from "node:assert/strict";
import {
  explainActivity,
  isEligible,
  rankActivities,
  scoreActivity,
  type Activity,
  type Preferences,
} from "../src/lib/adaptive-engine.ts";

const preferences: Preferences = {
  interests: ["building"],
  modes: ["visual", "symbols"],
  sensory: "gentle",
  pace: "self",
  personalization: true,
};

const activity = (overrides: Partial<Activity> = {}): Activity => ({
  id: "world",
  title: "Build a world",
  description: "Create a place",
  emoji: "🌊",
  category: "building",
  modes: ["visual", "symbols"],
  sensory: "gentle",
  minutes: "At your pace",
  safety: "approved",
  ...overrides,
});

test("eligible activity is allowed when safety and chosen participation modes match", () => {
  assert.equal(isEligible(activity(), preferences), true);
});

test("blocked activity is never eligible", () => {
  assert.equal(isEligible(activity({ safety: "blocked" }), preferences), false);
});

test("activity with no supported selected participation mode is filtered", () => {
  assert.equal(isEligible(activity({ modes: ["audio"] }), preferences), false);
});

test("ranking never allows a high preference score to override safety", () => {
  const blocked = activity({ id: "blocked", safety: "blocked" });
  const safe = activity({ id: "safe", category: "animals" });
  assert.deepEqual(rankActivities([blocked, safe], preferences).map(item => item.id), ["safe"]);
});

test("pausing personalization preserves catalogue order", () => {
  const paused = { ...preferences, personalization: false };
  const first = activity({ id: "first", category: "animals" });
  const second = activity({ id: "second", category: "building" });
  assert.deepEqual(rankActivities([first, second], paused).map(item => item.id), ["first", "second"]);
});

test("explicit choices affect ordering, not a score about the child", () => {
  const match = activity({ id: "match", category: "building" });
  const other = activity({ id: "other", category: "animals", sensory: "quiet" });
  assert.ok(scoreActivity(match, preferences) > scoreActivity(other, preferences));
  assert.deepEqual(rankActivities([other, match], preferences).map(item => item.id), ["match", "other"]);
});

test("missing feedback does not count as negative feedback", () => {
  const item = activity();
  assert.equal(scoreActivity(item, preferences, {}), scoreActivity(item, preferences, { [item.id]: undefined as never }));
});

test("explanation names explicit choices and pause state", () => {
  assert.match(explainActivity(activity(), preferences), /interest you chose/);
  assert.match(explainActivity(activity(), { ...preferences, personalization: false }), /paused/);
});

test("empty selected modes leave discovery open rather than locking the user out", () => {
  assert.equal(isEligible(activity({ modes: ["visual"] }), { ...preferences, modes: [] }), true);
});
