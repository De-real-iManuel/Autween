# ADR 0001: Participation-first, safety-gated adaptation

- **Status:** Accepted
- **Date:** 2026-11-12
- **Decision owners:** Autween project maintainers

## Context

Digital social products commonly assume that participation means reading and writing quickly, speaking, responding in real time, and navigating a fixed interaction pattern. That assumption can exclude people whose preferred communication or sensory needs differ.

A conversational AI layer would not resolve this structural problem by itself. It could add another interface that expects the child to adapt to the system.

Autween instead needs to adapt the environment to explicit preferences while preserving agency and enforcing safety independently.

## Decision

The system uses four distinct layers:

1. **Policy and eligibility:** decides whether an activity or action is allowed. This layer is authoritative and cannot be overridden by personalization.
2. **Preference state:** contains only explicit, editable, revocable choices. No inferred emotional or diagnostic state.
3. **Recommendation:** orders eligible activities using deterministic, explainable rules. It cannot grant permissions or expand access.
4. **Experience adapters:** present the same meaningful activity through visual, symbolic, text and optional audio modalities.

For social collaboration, shared creative state is the core interaction. Conversation is optional. Contributions are asynchronous by default and attributed to their author. Real networking is deferred until identity, consent, authorization, moderation and safeguarding are designed and reviewed.

## Invariants

- Blocked activities are never recommendable, regardless of score.
- A preference score is never a user score.
- No interaction is required to be spoken or time-critical if an equivalent supported modality exists.
- No activity is removed merely because the child did not select or complete it.
- Personalization can be paused without losing access to the product.
- Every adaptation has a human-readable reason and a reversal path.
- No real child data is used in prototype fixtures.

## Consequences

**Positive**
- The product thesis is visible in architecture rather than marketing alone.
- The recommendation engine is testable without a hosted model.
- The system is easier to audit and explain.
- Participation modalities can evolve independently from activity logic.

**Trade-offs**
- The first version is less magical than opaque AI personalization.
- Explicit choices require thoughtful, accessible controls.
- Safety and safeguarding work is substantial before real social networking can launch.
- Real-world co-design and evaluation are required before making impact claims.

## Rejected alternatives

- **Child-facing chatbot as the primary experience:** rejected because it retains a conversation-first interaction model and does not fix the environment's participation assumptions.
- **Black-box engagement recommender:** rejected because engagement is not the product's success metric and opaque inference reduces agency.
- **Open social network at launch:** rejected because public discovery and unmoderated contact create unacceptable safeguarding risks for the current project stage.
