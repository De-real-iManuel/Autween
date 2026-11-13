# Autween backend setup

Autween uses Supabase Auth for guardian accounts and Postgres with row-level security for participant spaces. The browser never receives a service-role key.

## Required setup

1. Create a Supabase project.
2. In Authentication → URL Configuration, set the site URL to the deployed Autween origin and add `<origin>/auth/callback` to redirect URLs.
3. Apply `supabase/migrations/0001_guardian_accounts.sql` in the Supabase SQL editor.
4. Copy `.env.example` to `.env.local` and fill in the project URL and publishable/anon key.
5. Restart the Next.js server and test guardian signup, email verification, login, participant creation, and signout.

Email confirmation should remain enabled. Configure an SMTP provider before relying on signup delivery in production. Use a strong password policy and rate limits in Supabase Auth settings.

## Account model

- An adult parent/legal guardian creates and controls the account.
- A participant space uses a nickname and one of four broad age ranges: 6–9, 10–12, 13–15, 16–17.
- We deliberately do not ask for date of birth, diagnosis, school, location, or contact details for a participant.
- Guardian authentication is real; it does not itself establish legal guardianship or complete child assent.
- A participant profile is not an independent login or public identity.
- Row-level security restricts each guardian to their own participant spaces.

## Important limitations

This is a development backend foundation, not a production safeguarding certification. Before real families use it, Autween still needs a reviewed consent and assent flow, account recovery, data export/deletion workflows, retention policy, abuse reporting and incident response, jurisdiction-specific privacy review, and independent security testing. Do not put service-role keys in `NEXT_PUBLIC_*` variables or commit secrets.
