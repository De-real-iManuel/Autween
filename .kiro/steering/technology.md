# Autween Engineering Steering

- Build the product as a Next.js App Router application using TypeScript and React.
- Use server components by default; use client components only for interaction and browser APIs.
- Keep components small, typed, accessible, and focused.
- Use semantic HTML, keyboard navigation, visible focus, reduced-motion support, and responsive layouts.
- Never store real child personal data in local storage or test fixtures.
- Authentication must be designed for a parent or legal guardian account with a separate child profile and appropriate consent/assent; do not permit unsupervised public child accounts.
- Never claim that a client-side form creates a secure account. Real authentication requires a reviewed server-side provider, secure session management, validation, rate limiting, and privacy review.
- No paid AI APIs or external model calls in the MVP.
- Do not implement open child-to-child direct messaging, public child search, location sharing, or behavioural scoring.
- All recommendation logic must be explainable, reversible, and subordinate to safety constraints.
- Keep the app usable with keyboard, touch, and assistive technology.
