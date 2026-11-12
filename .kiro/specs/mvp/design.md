# Autween MVP Design

## Stack
- Next.js App Router
- React
- TypeScript
- CSS design system
- Lucide icons
- No external backend in the first local prototype

## Routes
- `/`: public introduction and product principles
- `/signup`: parent/guardian account creation (to be wired to a secure auth provider)
- `/login`: parent/guardian login
- `/home`: child-facing experience, accessible only after guardian-controlled account setup in a production release

## Experience
The public home page explains Autween in plain, warm language. It should not describe children as broken or in need of fixing. Avoid medicalized illustrations and infantilizing copy.

The first signed-in experience should let the child:
- choose interests and communication preferences;
- choose solo, alongside, or collaborative activity;
- adjust sensory presentation and pace;
- pause personalization and reset preferences;
- start creative activities without speech or audio.

## Authentication safety
The UI may be prototyped, but it must not pretend that a client-only form is real authentication. Before production:
- select and configure a secure auth provider;
- guardian owns account registration and recovery;
- child profiles are private subprofiles, not public identities;
- implement age-appropriate consent/assent and privacy notices;
- rate-limit and protect account endpoints;
- review data retention and deletion;
- do not collect unnecessary child details.

## Acceptance
- Next.js build and TypeScript check pass.
- Public landing page responsive at mobile and desktop widths.
- Keyboard users can navigate all controls.
- Reduced motion is respected.
- Account UI clearly communicates its status until real auth is implemented.
