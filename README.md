# Autween

**A child should not have to learn how to fit into a digital world. The digital world should make room for how they participate.**

Autween is a free, open-source project exploring a more welcoming digital space where autistic children can create, explore and participate in ways that work for them.

The central product idea is not another chatbot. It is an environment that responds to a child's own stated choices: preferred activities, communication modes and sensory presentation. Those choices remain visible, editable and reversible.

## Try the prototype

Run locally with Node.js 20.9 or newer:

```bash
npm install
npm run dev
```

Open http://localhost:3000 and select **Try Autween** to enter `/play`.

The current child-facing prototype includes:
- Choice-based setup for interests and participation modes (pictures, symbols, words and optional audio).
- A deterministic, explainable activity-ranking engine.
- A visible explanation for each suggestion.
- A personalization switch, quiet presentation option and reset controls.
- An interactive underwater world builder with two same-device demo contributors to illustrate asynchronous turn-taking.

## What the prototype does not claim

- It does not create accounts or collect real child profiles.
- It does not connect children to each other or synchronize across devices.
- It does not provide live multiplayer, chat, voice/video recording or public discovery.
- It does not infer emotion, diagnosis, intent, intelligence, social competence or communication ability.
- It is not a clinical or therapeutic product and makes no efficacy claims.

The shared-world experience is a local interaction prototype. The contributor switch demonstrates a possible turn-taking model; it is **not** a real network collaboration system. Do not enter real children's personal information.

## Technical approach

The first preference engine is deterministic by design. It filters for activities explicitly marked as eligible, then ranks eligible activities using only preferences the user selected. It can explain why an activity was suggested. When personalization is paused, the activities are shown without preference-based ranking.

No paid AI API or hosted model is required. Read [the adaptive engine design](docs/adaptive-engine.md) and [the architecture](docs/architecture.md).

## Development checks

```bash
npm run typecheck
npm run lint
npm run build
```

These checks must pass in CI before the project is considered verified. The implementation has not been locally executed in this development session.

## Kiro development

See `.kiro/steering/` and `.kiro/specs/` for product and engineering constraints. Kiro usage must be real and accurately documented during the hackathon; repository configuration alone is not evidence of Kiro use.

## Open source

Autween is intended to remain free, open source, without advertising or subscriptions. The SPDX licence has not yet been selected; do not assume a licence until the project adds its corresponding approved licence file.
