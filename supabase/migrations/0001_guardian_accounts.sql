-- Autween guardian-owned participant spaces.
-- Apply in the Supabase SQL editor before enabling account creation.
create table if not exists public.participant_profiles (
  id uuid primary key default gen_random_uuid(),
  guardian_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 32),
  age_band text not null check (age_band in ('6-9', '10-12', '13-15', '16-17')),
  created_at timestamptz not null default now()
);

alter table public.participant_profiles enable row level security;

create policy "Guardians can read their own participant spaces"
  on public.participant_profiles for select
  to authenticated
  using (auth.uid() = guardian_id);

create policy "Guardians can create their own participant spaces"
  on public.participant_profiles for insert
  to authenticated
  with check (auth.uid() = guardian_id);

create policy "Guardians can update their own participant spaces"
  on public.participant_profiles for update
  to authenticated
  using (auth.uid() = guardian_id)
  with check (auth.uid() = guardian_id);

create policy "Guardians can delete their own participant spaces"
  on public.participant_profiles for delete
  to authenticated
  using (auth.uid() = guardian_id);

create index if not exists participant_profiles_guardian_id_idx
  on public.participant_profiles (guardian_id);

grant select, insert, update, delete on public.participant_profiles to authenticated;
