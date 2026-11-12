# The Autween Participation Contract

**A digital environment must adapt to the person participating; the person must not have to translate themselves to satisfy the environment.**

This is the product's governing principle. It constrains product decisions, interaction design, data collection, algorithms, safety architecture and evaluation.

## 1. Participation without a translation tax

A person should not have to convert their communication into the format a product happens to prefer before they can take part.

- A task must not require speech when visual, symbolic, text or non-verbal participation can achieve the same purpose.
- A task must not require a fast response when asynchronous participation can work.
- Voice is an option, never the default proof that someone is present or engaged.
- A person can contribute without being asked to explain, justify or perform their contribution.
- Multiple modalities are first-class interaction paths, not accessibility add-ons.

**Engineering test:** Can a user complete the meaningful action using at least one non-speech path, without losing the core experience?

## 2. Agency-preserving adaptation

Adaptation must increase a person's control, not quietly take it away.

- Explicit choices outrank inferred preferences.
- Every adaptation must have an understandable reason.
- Preferences can be edited, paused and reset.
- A user can always choose something outside the recommendation.
- Silence, delay, skipping and leaving are not interpreted as failure.
- No opaque profile should become a permanent description of a child.

**Engineering test:** Can the user see what changed, why it changed, and how to undo it?

## 3. Safety before relevance

A recommendation system must never decide whether an unsafe activity becomes safe.

- Safety eligibility is evaluated before relevance ranking.
- Recommendation scores cannot override blocked status, age rules, consent, access controls or moderation decisions.
- The ranking engine cannot grant identity, permissions or access.
- Any future social connection must be invitation-based, scoped and revocable.
- Serious safeguarding decisions require accountable human processes; an LLM is never the sole authority.

**Engineering test:** Can any score, prompt or client-side state cause a blocked activity or unauthorized participant to be exposed? If yes, the design fails.

## 4. Missing data is not rejection

Not participating is not a negative preference signal.

- No click is not a dislike.
- A skipped activity is not evidence of inability.
- A delayed response is not disengagement.
- A child is never scored for social performance, compliance, speech frequency, eye contact or masking.
- Feedback is explicit, optional and limited to the experience: for example, “more like this” or “not now.”

**Engineering test:** Does the system update a preference only when it receives an explicit, meaningful signal? If not, it fails.

## 5. Connection through shared creation

Social participation should not be synonymous with compulsory conversation.

- Shared projects provide a reason to participate together.
- Contributions can be asynchronous.
- Each person can contribute in a different modality.
- No one is required to respond immediately.
- The product must make leaving, pausing and declining visible and safe.
- The initial social model is a closed, trusted circle, not public discovery or open direct messages.

**Engineering test:** Can two people meaningfully contribute to something together without a live conversation?

## 6. Privacy by construction

The system should not collect information merely because it might become useful later.

- Prototype data is fictional.
- No voice/video recording by default.
- No emotion recognition, diagnosis inference or analysis of raw child conversations.
- No public child profiles, location sharing or stranger discovery in the initial product.
- Data retention and deletion must be designed before real child accounts exist.
- Guardian consent and child assent are separate requirements; neither substitutes for the other's agency.

**Engineering test:** Can the product deliver its core value while collecting less data? Choose the lower-data design.

## 7. Evidence before claims

- Autistic children and adults must influence product decisions, not only validate finished designs.
- Accessibility is tested with real assistive technology and diverse participation preferences.
- A prototype is not proof of therapeutic or developmental efficacy.
- Safety claims require documented threat modelling, operational ownership and evidence.
- The team publishes limitations and unresolved risks honestly.

**Engineering test:** Is this claim supported by observed evidence, or is it only an intention?

## The decision rule

When a feature conflicts with this contract, the feature changes. The person does not have to.
