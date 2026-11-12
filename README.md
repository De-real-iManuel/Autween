# Autween

**A place to play your way.**

Autween is a free, open-source project exploring a more welcoming online world where autistic children can create, explore, communicate, and connect at their own pace.

Our central principle: **the environment should adapt to the child—not the child to the environment.**

## Product principles

- No pressure to speak, respond quickly, make eye contact, or behave in a prescribed way.
- Many ways to express yourself: visual choices, symbols, text, creative work, and optional audio.
- Shared-interest play and collaboration without compulsory conversation.
- Child agency: pause, decline, leave, change preferences, and reset.
- Privacy and safeguarding before social-network features.
- Personalization must be transparent, optional, explainable, and reversible.
- No diagnosis, emotion, intent, or social-competence inference.

## Technology

- Next.js App Router
- React
- TypeScript
- CSS design system
- Lucide icons

## Getting started

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Current status

The repository contains an early Next.js front-end foundation and public landing/account interface. The account form is currently a UI preview; it does **not** create secure accounts or persist credentials. A guardian-controlled authentication system, private child profiles, activity engine, and safety-reviewed social features remain to be implemented.

The current app has not yet been run through a local Next.js build in this development environment. Please run `npm install`, `npm run typecheck`, and `npm run build` before treating it as verified.

## Privacy and safeguarding

Do not submit real children's names, photographs, recordings, messages, diagnoses, school details, or other identifying information in issues, pull requests, or test fixtures. Use synthetic data only.

No public child profiles, stranger discovery, open direct messages, location sharing, or real child-to-child networking are part of the initial prototype.

See:
- [Product thesis](research/product-thesis.md)
- [Evidence review](research/evidence-review.md)
- [Architecture](docs/architecture.md)
- [Privacy and safeguarding](docs/privacy-and-safeguarding.md)
- [Kiro engineering steering](.kiro/steering/technology.md)

## Open source

Autween is intended to remain free and open source, with no advertising or subscription business model. The repository license will be finalized before external contributions are invited.
