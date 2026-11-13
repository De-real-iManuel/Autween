# Autween roadmap

This roadmap is organized around evidence and release gates, not a list of features to ship as quickly as possible. A milestone is complete only when its acceptance criteria are met.

## North star

**Meaningful participation without a translation tax.**

We are not optimizing for time spent in the app, number of messages, speech, eye contact, social compliance or frequency of engagement. We are trying to make it easier for a child to choose, create, communicate and collaborate on their own terms.

## Milestone 0 — trustworthy foundation

**Status: in progress**

- [x] Next.js App Router + TypeScript foundation.
- [x] Child-facing synthetic-data demo.
- [x] Explicit preference controls and reversible personalization.
- [x] Deterministic, explainable ranking.
- [x] Activity safety eligibility checked before ranking.
- [x] Local interactive world, garden, story and pattern activities.
- [x] Honest same-device collaboration label.
- [x] CI for typecheck, lint and production build.
- [x] Unit tests for ranking, eligibility, explanations and preference boundaries.
- [x] Participation Contract Verification documented as executable software invariants.
- [ ] Keyboard-only and screen-reader walkthrough.
- [ ] Reduced-motion and high-contrast audit.
- [ ] Mobile layout review at narrow viewport sizes.

**Exit gate:** CI passes; all engine tests pass; no known blocker in keyboard navigation; prototype never requests real child data; product claims match implementation.

## Milestone 1 — a real participation studio

**Status: in progress**

- [x] Age-aware creative formats and prompts for four broad age bands.
- [x] Distinct teen-oriented narrative, editorial, research-journal and concept-design entry points.
- [x] Explicit local draft save, load, clear and Markdown export controls.
- [ ] Freehand drawing canvas with touch/stylus and keyboard alternatives.
- [ ] Multi-project library and cross-session project management.
- [ ] Accessibility review with autistic participants and assistive-technology users.

- Freehand drawing with mouse, touch and stylus.
- Eraser, undo/redo, clear, and a small accessible tool palette.
- Optional symbol/sticker contribution alongside drawing.
- Save/export only as a deliberate user action; no background upload.
- Story studio supports reordering and revising scenes.
- Every studio supports a no-audio, no-timer path.
- Sensory controls include motion, sound, contrast and visual density, not only a global calm toggle.

**Exit gate:** each activity has at least two meaningful participation modalities; keyboard and touch interaction are tested; reduced-motion preference is respected; no data is uploaded.

## Milestone 2 — preference engine v1.1

- Separate hard eligibility from soft ranking in distinct modules.
- Version the activity catalogue and preference schema.
- Add reason codes to recommendations so UI explanations derive from structured decisions rather than duplicated strings.
- Add deterministic test fixtures and property-based invariants if the test burden justifies a dependency.
- Make preference reset and personalization pause discoverable from every relevant screen.
- Add an explanation inspector: “What choices influenced this?” and “What did not influence this?”
- Never treat absence of feedback as a negative signal.

**Exit gate:** every ranking decision is reproducible; every recommendation has a reason or a clear explore explanation; blocked activities never surface; preference changes are reversible.

## Milestone 3 — co-designed social prototype

No real child-to-child networking before this milestone's design and safety review.

- Conduct participatory design with autistic adults and appropriate disability advocates first.
- Co-design with children only through a properly approved process with guardian consent, child assent, trained facilitators and safeguarding oversight.
- Prototype a closed-circle invitation model using synthetic identities.
- Shared projects use append-only contribution events and explicit author attribution.
- Contributions can be asynchronous and multimodal.
- Provide pause, leave, revoke invitation, block and report flows before enabling any external participant.
- Design moderation operations, escalation paths, abuse reporting and retention rules before release.

**Exit gate:** documented threat model; reviewed consent/assent flows; tested access-control model; named human safeguarding owner; abuse cases rehearsed; independent accessibility review.

## Milestone 4 — secure guardian-controlled accounts

- Guardian account and authentication through a reviewed provider.
- Separate child profile with data minimization.
- Guardian consent and child assent recorded as distinct, revocable states.
- Server-side authorization on every child-related resource.
- Encryption in transit and at rest; secret management; rate limits; audit events.
- Data export, deletion and retention controls.
- No public child search, open DMs or location sharing.

**Exit gate:** security review, privacy review, safeguarding review and operational incident plan. Do not use real child data before all gates pass.

## Milestone 5 — limited, supervised pilot

- Recruit through trusted organizations and qualified partners.
- Use a small, opt-in cohort and clearly defined facilitator responsibilities.
- Evaluate task completion, agency, comfort, accessibility barriers and unwanted experiences.
- Include autistic participants in interpreting results.
- Publish limitations and negative findings as well as positive results.
- Do not make clinical or therapeutic efficacy claims.

**Exit gate:** evidence supports the next iteration; safety incidents and accessibility issues have documented responses; participants can withdraw without penalty.

## Explicit non-goals

- A chatbot that talks to children as the main experience.
- Training children to behave neurotypically.
- Engagement-maximizing feeds, streaks or reward loops.
- Emotion recognition or diagnosis inference.
- Open stranger matching, public profiles or unrestricted messaging.
- Advertising, subscriptions or monetization.
- AI features added only to make a hackathon submission look more technical.

## Operating cadence

For each change:
1. State the user problem.
2. Map it to the Participation Contract.
3. Write acceptance criteria and abuse cases.
4. Implement the smallest useful vertical slice.
5. Add tests for the invariants.
6. Run CI and inspect the actual result.
7. Update docs and limitations.
8. Only then mark the work complete.

A roadmap item is not complete because code exists. It is complete when the behaviour is tested and the release gate is satisfied.
