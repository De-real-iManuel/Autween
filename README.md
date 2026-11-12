# Autween

**An adaptive social play and expression platform that learns how each child prefers to connect.**

Autween is an open-source project exploring safer, more accessible ways for autistic children to play, create, communicate, and build friendships online—without requiring them to imitate a single “normal” way of interacting.

## The problem we are exploring

Online spaces can offer autistic young people greater control over communication and opportunities to connect around shared interests. They can also expose them to misunderstanding, exclusion, bullying, unwanted contact, and privacy risks. Existing digital experiences often expect children to adapt to the product rather than allowing the product to adapt to their preferences.

Autween's working hypothesis is that a small, closed, interest-led social environment—combined with user-controlled personalization and strong safeguarding—can make online participation more comfortable and more self-directed.

This is a research and prototyping project, not a clinically validated intervention. We will not claim therapeutic or developmental outcomes without appropriate evidence.

## Product principles

- **Adapt the environment, not the child.** Never optimize for eye contact, masking, suppression of harmless stimming, or imitation of neurotypical behaviour.
- **Agency before automation.** Children can choose how to participate, decline, pause, leave, block, and reset personalization.
- **Many ways to communicate.** Text, symbols, visual choices, optional speech, and asynchronous participation should be first-class.
- **Connection through shared interests.** Cooperative creation and play should not require forced conversation or public performance.
- **Safety is foundational.** Small approved circles, privacy by default, clear boundaries, and human safeguarding processes.
- **Minimal data.** No diagnosis inference, emotion inference, behavioural scoring, or collection of real child data in the prototype.
- **Co-design is required.** Autistic children and adults must shape the product before claims are made about their needs or its effectiveness.

## Initial prototype direction

1. A private, local-first preference profile controlled by the child with appropriate adult support.
2. A choice-based adaptive activity recommender that learns explicit preferences with uncertainty.
3. A shared creative world with asynchronous and cooperative activities.
4. A closed-circle invitation model and simple safety controls.
5. A synthetic-data demo that demonstrates the experience without collecting real children's data.

## Repository map

- `research/` — evidence review, assumptions, and validation plan.
- `docs/` — product, architecture, privacy, and safeguarding decisions.
- `.kiro/steering/` — project-wide constraints and engineering guidance.
- `.kiro/specs/` — requirements and design specifications intended for Kiro spec-driven development.

## Current status

Early research and product definition. The evidence review is a desk review, not primary research or clinical validation. The implementation scope will be narrowed after feasibility and safeguarding review.

## Open source

This project is intended to be public and open source. A license will be selected and added before accepting external contributions. Until then, do not assume that public visibility grants permission to reuse the code.

## Contributing and safeguarding

Do not submit real children's personal information, private messages, recordings, photographs, or identifiable case histories in issues, pull requests, or test fixtures. Use synthetic data only. See [Privacy and Safeguarding](docs/privacy-and-safeguarding.md).

## Research starting points

See [the initial evidence review](research/evidence-review.md) and [the product thesis](research/product-thesis.md).
