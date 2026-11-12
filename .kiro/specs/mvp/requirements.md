# Autween MVP — Requirements

**Status:** Draft for Kiro spec-driven development  
**Scope:** Synthetic-data prototype only.

## Goal

Demonstrate how a child-controlled, adaptive creative-play environment can support different ways of participating without requiring speech or public social exposure.

## User stories

### Preferences
- As a child, I want to choose how I communicate so I can participate in a way that feels comfortable.
- As a child, I want to change my preferences whenever I want.
- As a child, I want to pause or disable personalization.

### Activities
- As a child, I want to choose from creative activities based on my interests.
- As a child, I want to contribute to a shared creation without needing to respond immediately.
- As a child, I want to participate alone, alongside another person, or in a small group.

### Safety
- As a child, I want a clear way to leave an activity.
- As a child, I want a clear way to block or request help in any future connected experience.
- As a caregiver, I want the prototype to avoid collecting real child data.

## Functional requirements

1. The app must run with fictional demo profiles and must not require real personal information.
2. The user must be able to select at least two communication modes.
3. The user must be able to select activity interests and sensory presentation preferences.
4. The app must provide at least three activity types (e.g. collaborative story, drawing canvas, shared world-building).
5. The user must be able to use activities without speech or audio.
6. The user must be able to pause, reset, or disable preference-based recommendations.
7. Recommendations must be explainable using selected preferences.
8. Safety constraints must be applied before recommendation ranking.
9. The app must not implement public profiles, stranger discovery, open direct messages, or real child accounts in the MVP.
10. The app must not record voice/video or infer emotion, diagnosis, or social competence.

## Non-functional requirements

- Responsive on mobile and desktop.
- Keyboard navigable with visible focus.
- Respect reduced-motion settings.
- Provide a low-stimulation presentation option.
- Use clear, literal labels and predictable navigation.
- No paid API dependency.
- Automated tests for preference updates, recommendation explanations, and safety filtering.

## Acceptance criteria

- A new user can enter the demo without registering.
- A user can select and later change communication preferences.
- A user can start an activity using only keyboard or touch.
- At least one activity supports asynchronous turn-taking.
- Every recommendation can explain which explicit preferences it matches.
- Disabling personalization produces a usable non-personalized activity list.
- Unsafe or unsupported activity types cannot be surfaced by the recommender.
- Automated tests use synthetic fixtures only.
