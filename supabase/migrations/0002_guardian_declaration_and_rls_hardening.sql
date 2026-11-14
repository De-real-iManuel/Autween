-- Persist the guardian's self-declaration separately from editable auth metadata.
-- This is an auditable in-app declaration, not proof of age or legal guardianship.
create table if not exists public.guardian_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 1 and 80),
  declaration_version text not null,
  declaration_accepted_at timestamptz not null
);

alter table public.guardian_profiles enable row level security;
revoke all on table public.guardian_profiles from anon, authenticated;
grant select on table public.guardian_profiles to authenticated;

drop policy if exists "Guardians can read their own guardian profile" on public.guardian_profiles;
create policy "Guardians can read their own guardian profile"
  on public.guardian_profiles for select
  to authenticated
  using (auth.uid() = id);

create or replace function public.create_guardian_profile_from_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  guardian_name text;
  declaration_version text;
begin
  guardian_name := nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'guardian_name'), '');
  declaration_version := new.raw_user_meta_data ->> 'guardian_declaration_version';

  if guardian_name is null
    or pg_catalog.char_length(guardian_name) > 80
    or declaration_version is distinct from 'v1-2026-11-14' then
    raise exception 'A guardian declaration is required to create an Autween family account';
  end if;

  insert into public.guardian_profiles (id, display_name, declaration_version, declaration_accepted_at)
  values (new.id, guardian_name, declaration_version, pg_catalog.now());

  return new;
end;
$$;

revoke all on function public.create_guardian_profile_from_auth_user() from public;
drop trigger if exists on_auth_user_created_guardian on auth.users;
create trigger on_auth_user_created_guardian
  after insert on auth.users
  for each row execute function public.create_guardian_profile_from_auth_user();

-- Backfill only accounts that already carry the exact declaration version.
insert into public.guardian_profiles (id, display_name, declaration_version, declaration_accepted_at)
select
  id,
  pg_catalog.btrim(raw_user_meta_data ->> 'guardian_name'),
  raw_user_meta_data ->> 'guardian_declaration_version',
  created_at
from auth.users
where nullif(pg_catalog.btrim(raw_user_meta_data ->> 'guardian_name'), '') is not null
  and pg_catalog.char_length(pg_catalog.btrim(raw_user_meta_data ->> 'guardian_name')) <= 80
  and raw_user_meta_data ->> 'guardian_declaration_version' = 'v1-2026-11-14'
on conflict (id) do nothing;

-- Require the guardian declaration row for every participant-profile operation.
do $$
begin
  if not exists (
    select 1 from pg_catalog.pg_constraint
    where conname = 'participant_profiles_display_name_nonblank'
      and conrelid = 'public.participant_profiles'::regclass
  ) then
    alter table public.participant_profiles
      add constraint participant_profiles_display_name_nonblank
      check (char_length(btrim(display_name)) between 1 and 32);
  end if;
end
$$;

alter table public.participant_profiles enable row level security;
revoke all on table public.participant_profiles from anon, authenticated;
grant select, insert, update, delete on table public.participant_profiles to authenticated;

drop policy if exists "Guardians can read their own participant spaces" on public.participant_profiles;
create policy "Guardians can read their own participant spaces"
  on public.participant_profiles for select
  to authenticated
  using (
    auth.uid() = guardian_id
    and exists (select 1 from public.guardian_profiles where id = auth.uid())
  );

drop policy if exists "Guardians can create their own participant spaces" on public.participant_profiles;
create policy "Guardians can create their own participant spaces"
  on public.participant_profiles for insert
  to authenticated
  with check (
    auth.uid() = guardian_id
    and exists (select 1 from public.guardian_profiles where id = auth.uid())
  );

drop policy if exists "Guardians can update their own participant spaces" on public.participant_profiles;
create policy "Guardians can update their own participant spaces"
  on public.participant_profiles for update
  to authenticated
  using (
    auth.uid() = guardian_id
    and exists (select 1 from public.guardian_profiles where id = auth.uid())
  )
  with check (
    auth.uid() = guardian_id
    and exists (select 1 from public.guardian_profiles where id = auth.uid())
  );

drop policy if exists "Guardians can delete their own participant spaces" on public.participant_profiles;
create policy "Guardians can delete their own participant spaces"
  on public.participant_profiles for delete
  to authenticated
  using (
    auth.uid() = guardian_id
    and exists (select 1 from public.guardian_profiles where id = auth.uid())
  );
