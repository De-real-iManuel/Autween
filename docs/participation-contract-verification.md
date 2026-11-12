# Participation Contract Verification (PCV)

## Why this exists

Autween makes a product promise: the environment adapts to the participant, and participation does not require a particular communication style.

A promise this important cannot live only in copy or design files. It must become a set of executable invariants.

This is an internal engineering verification approach. It is **not** a score, certificate, diagnosis, assessment or proof about a child. It verifies properties of Autween's own software.

## Verification layers

### 1. Eligibility invariants

- A blocked activity is never returned by the recommendation engine.
- An activity with no supported participation path is not recommended when the user has selected specific modes.
- Empty mode selection does not lock the user out of discovery.
- A preference score can never override eligibility.

### 2. Agency invariants

- Turning personalization off preserves access to activities.
- Turning personalization off restores catalogue order.
- Preference changes are explicit and reversible.
- Feedback is optional.
- Missing feedback is neutral, not negative.

### 3. Explanation invariants

- A personalized recommendation can identify the explicit choices that influenced it.
- A paused recommender says personalization is paused.
- No explanation claims that the system detected an emotion, diagnosis, intention or social ability.

### 4. Participation invariants

- Every activity declares supported participation modes.
- The interface provides a non-audio route for core actions.
- The interface does not require a timer or immediate response.
- Keyboard and assistive-technology paths are release requirements, not future polish.

### 5. Privacy invariants

- Automated fixtures use fictional data only.
- No child personal information is required for the demo.
- The prototype does not silently upload or persist preference data.

## Current implementation

The deterministic engine has unit tests for:
- safe eligibility;
- blocked activity exclusion;
- compatibility with selected participation modes;
- safety taking precedence over relevance;
- unranked access when personalization is paused;
- preference-driven ordering;
- neutral missing feedback;
- plain-language explanations;
- open discovery when no mode is selected.

The CI pipeline runs the unit tests, TypeScript typecheck, ESLint and a production build.

## What is not yet verified

- Full keyboard-only usability across every screen.
- Screen-reader behaviour on supported devices.
- Switch control and alternative input compatibility.
- Reduced-motion and high-contrast behaviour across the full experience.
- Real-world usability with a diverse group of autistic participants.
- Production identity, consent, safeguarding, moderation or network access controls.

These are explicit release gates. Passing unit tests does not establish clinical efficacy, child safety in operation or real-world accessibility.

## Future direction

As the system grows, convert each principle into:
1. a documented invariant;
2. a test or auditable control;
3. a named owner;
4. a release gate;
5. evidence from appropriate participants and reviewers.

The goal is not to prove that a child participated correctly. The goal is to verify that the software did not make participation unnecessarily conditional.
