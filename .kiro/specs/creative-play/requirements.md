# Creative Play and Explainable Adaptation

**Status:** Prototype implementation in progress. Synthetic data only.

## Product outcome

A child can choose how to participate, explore creative activities, and make a shared creation without being required to speak or respond on a timer.

## User stories

- As a child, I can select interests and participation modes so suggestions reflect choices I made.
- As a child, I can understand why an activity was suggested.
- As a child, I can pause personalization and still use the product.
- As a child, I can change or reset preferences at any time.
- As a child, I can add creative objects to a world at my own pace.
- As a child, I can see a demonstration of turn-taking without being exposed to strangers.

## Requirements

1. The prototype must use fictional demo data and must not request a child's real name, contact details, school, diagnosis, image, voice or location.
2. Activities must pass an explicit eligibility filter before ranking.
3. The recommender may use only preferences explicitly selected in the interface and optional explicit activity feedback.
4. Every personalized suggestion must provide a plain-language explanation.
5. Disabling personalization must return an unranked, usable activity list.
6. The user must be able to change and reset all preferences.
7. The experience must offer visual and symbol-based participation without requiring audio or text.
8. The creative world must support adding, removing or resetting objects.
9. Any simulated collaboration must be clearly labelled as same-device demonstration, not real multiplayer.
10. The prototype must not implement stranger discovery, open messaging, public child profiles, location sharing, or recording of voice/video.
11. Reduced-motion preferences must be respected and a low-stimulation presentation option must be available.
12. No recommendation or score may measure a child's social performance, compliance, speech frequency, eye contact or masking.

## Acceptance criteria

- A user can enter /play directly without registration.
- Changing an interest can change recommendation order when personalization is enabled.
- The explanation identifies the selected preference(s) used.
- Turning personalization off removes preference-based ranking and changes the explanation.
- Ineligible activities are filtered before ranking.
- Reset restores the demo defaults.
- A user can add objects to the world and switch between two fictional contributors.
- The interface clearly states that the shared-world board is local to this device.
- Keyboard focus is visible and controls have accessible names.
