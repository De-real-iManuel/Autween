# Autween — Initial Architecture

**Status:** Proposal for review; not an implementation commitment.

## Architecture goals

- Keep the first release small enough to build and test on modest hardware.
- Avoid collecting or processing real child conversations in the prototype.
- Keep personalization local, transparent, and reversible.
- Make safety rules authoritative and independent of recommendation logic.
- Keep the client usable with keyboard, touch, switch-style navigation, and reduced sensory stimulation.
- Avoid dependence on paid AI APIs or large hosted models.

## Proposed first prototype

A lightweight responsive web application is the preferred first implementation. It reduces setup friction, works on phones and ordinary computers, and avoids requiring a mobile build toolchain. A local-first data model can use browser storage for the synthetic demo. A server and real accounts should be deferred until the threat model and safeguarding model are reviewed.

### Logical components

1. **Experience client**
   - activity discovery and shared-world interface;
   - accessible communication controls;
   - preferences and privacy controls;
   - visible stop, leave, block, and help actions.

2. **Preference model**
   - stores explicit user-selected preferences;
   - records only minimal interaction events needed for adaptation;
   - represents uncertainty rather than treating a guess as fact;
   - supports inspect, edit, pause, and reset.

3. **Activity recommender**
   - filters activities through hard safety and accessibility constraints;
   - ranks only eligible activities using explicit preferences;
   - initially uses deterministic rules;
   - may later evaluate Bayesian preference estimates or a contextual bandit offline.

4. **Shared activity engine**
   - cooperative creative activities such as collaborative drawing, story-building, and world-building;
   - asynchronous contributions first;
   - no open chat or stranger discovery in the prototype.

5. **Safety policy layer**
   - denies unsafe actions regardless of recommendation output;
   - enforces invitation-only participation in any future networked version;
   - keeps block/leave/help actions available;
   - never uses an LLM as the sole moderation or safeguarding decision-maker.

6. **Local data layer**
   - synthetic demo profiles only;
   - no real child data;
   - no voice/video recording;
   - no third-party analytics by default.

## Personalization: safe technical approach

### Phase 1 — explicit preferences

Represent preferences as user-selected values, for example:
- communication modes: symbols, text, optional audio;
- interaction pace: self-paced or live;
- activity type: drawing, stories, puzzles, building;
- group size: solo, one partner, small group;
- sensory settings: animation level, sound off/on, visual density.

The child can change these at any time. Do not infer a diagnosis or emotional state.

### Phase 2 — optional Bayesian preference estimates

If evidence from usability testing supports it, maintain a probability distribution over activity preferences. A simple Beta-Bernoulli model can represent uncertainty for a binary feedback signal such as “liked this activity.” Do not treat non-selection as dislike; absence of feedback is missing data. Explicit user choices should override estimates.

### Phase 3 — contextual recommendations

Only after the data model and safeguards are validated, evaluate a contextual bandit over a small, pre-approved activity set. Reward signals must be user-experience feedback (e.g. “enjoyed,” “not now,” “too much”), never speech frequency, eye contact, compliance, or social performance. Provide a non-personalized mode and an explanation for each recommendation.

## Security and privacy boundaries

- Do not create public child profiles.
- Do not expose location, school, phone number, or contact details.
- Do not enable direct messages from unknown users.
- Do not store real child data in the hackathon demo.
- Do not process voice or video for emotion, identity, or behavioural inference.
- Keep caregiver/admin functions separate from the child's everyday interface.
- Any future backend requires a documented threat model, consent/assent model, retention schedule, access controls, audit logging, and incident response process.

## Deferred decisions

- Authentication and account recovery.
- Real-time multiplayer transport.
- Database and hosting provider.
- Guardian consent and child assent flows.
- Human moderation operations.
- Age assurance and cohort design.
- Encryption and key management for synced data.
- Accessibility testing with relevant assistive technologies.

These decisions should not be rushed merely to make a demo appear production-ready.
