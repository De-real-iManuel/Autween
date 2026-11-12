# Autween's explainable preference engine

## Purpose

The first version adapts activity suggestions to preferences the child explicitly selects. It is a deterministic recommendation function, not a chatbot and not a machine-learning model.

## Inputs

- Selected interests (e.g. building, stories, patterns, nature).
- Selected participation modes (pictures, symbols, words, optional audio).
- Selected presentation preference (gentle or quiet).
- Optional, explicit feedback on a suggestion (again / later).
- Personalization enabled or paused.

No raw conversation, voice, video, inferred emotion, diagnosis, eye contact, speech frequency, compliance, or social-performance data is an input.

## Eligibility before ranking

Every activity has an explicit safety status. The recommender first filters out activities that are not approved or have no supported participation mode. Ranking cannot make an ineligible activity visible.

This is a prototype-level allowlist, not a production safeguarding system. A real product will require a separate reviewed policy layer, abuse-case analysis, and human safeguarding operations before any child-to-child connection is enabled.

## Ranking

For eligible activities, the current transparent score is:

- +4 if the activity category matches an interest the child selected.
- +2 if at least one selected participation mode is supported.
- +1 if the activity presentation matches the selected sensory style.
- +1 for explicit “show me more like this” feedback.
- -2 for explicit “not now” feedback.

The score is used only to order the pre-approved activities. It is not a score for the child. It is never shown as a rating of the child's behaviour.

## Explanations

Each card names the selected preferences that explain its suggestion. If no selected preference matches, the interface says it is simply another idea to explore. When personalization is paused, the original activity order is shown and the explanation says personalization is paused.

## Agency and limits

- Preferences can be changed or reset.
- Personalization can be switched off.
- Not choosing an activity is not interpreted as dislike.
- Feedback is optional and reversible.
- The current demo keeps preference choices in memory for the current visit only; refreshing the page resets them.
- The demo uses a fictional profile and must not be used with real child information.

## Future evaluation

Before considering probabilistic estimates or contextual bandits, co-design and usability work must establish whether the signals are understandable, desired, and safe. Any future model must be explainable, inspectable, disableable, and evaluated for disparate effects. Do not optimize for neurotypical presentation or compliance.
