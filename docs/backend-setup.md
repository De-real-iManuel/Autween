# Autween backend setup

Autween uses Supabase Auth for guardian accounts and Postgres with row-level security for participant spaces. The browser never receives a service-role key.

## Required setup

1. Create a Supabase project.
2. In Authentication → URL Configuration, set the site URL to the deployed Autween origin and add `<origin>/auth/callback` to redirect URLs.
3. Apply `supabase/migrations/0001_guardian_accounts.sql` in the Supabase SQL editor.
4. Copy `.env.example` to `.env.local` and fill in the Supabase project URL, publishable/anon key, and canonical `NEXT_PUBLIC_SITE_URL` (HTTPS in deployed environments; localhost is allowed for development). The app uses this configured origin—not an incoming request header—for email verification redirects.
5. Restart the Next.js server and test guardian signup, email verification, login, participant creation, and signout.

Email confirmation should remain enabled. Configure an SMTP provider before relying on signup delivery in production. Use a strong password policy and rate limits in Supabase Auth settings.

## Account model

- An adult parent/legal guardian self-declares during account creation and controls the account. This is an unverified declaration, not age or legal-guardianship assurance.
- A participant space uses a nickname and one of four broad age ranges: 6–9, 10–12, 13–15, 16–17.
- We deliberately do not ask for date of birth, diagnosis, school, location, or contact details for a participant.
- Guardian authentication is real. The database records the guardian's self-declaration and version, but this does not verify age or legal guardianship and does not complete the participant's own assent.
- A participant profile is not an independent login or public identity.
- Row-level security restricts each guardian to their own participant spaces.

## Database verification after migration

Use two separate test guardian accounts in a non-production Supabase project. Confirm each account can read only its own guardian row and participant spaces; an anonymous request cannot read or write either table; a participant insert with another account's UUID is rejected; and a signup without the required declaration metadata is rejected by the auth trigger. The repository's unit tests do not execute Postgres RLS or Supabase Auth triggers.

## Important limitations

This is a development backend foundation, not a production safeguarding certification. Existing accounts are backfilled only when their metadata already contains the exact declaration version; older accounts without it must not create participant spaces until a reviewed re-declaration flow is added. Before real families use it, Autween still needs a reviewed consent and assent flow, account recovery, data export/deletion workflows, retention policy, abuse reporting and incident response, jurisdiction-specific privacy review, and independent security testing. Do not put service-role keys in `NEXT_PUBLIC_*` variables or commit secrets.
