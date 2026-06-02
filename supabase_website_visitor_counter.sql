-- EaseTalk website public visitor counter
-- Run this once in Supabase SQL Editor before uploading the Hostinger website.
-- It counts website visits without storing IP address, name, phone, or personal data.

create table if not exists public.easetalk_website_stats (
  key text primary key,
  total_visits bigint not null default 0,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.easetalk_website_daily_visits (
  visit_date date primary key default current_date,
  total_visits bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.easetalk_website_stats enable row level security;
alter table public.easetalk_website_daily_visits enable row level security;

create or replace function public.easetalk_record_website_visit(p_page text default '/')
returns jsonb
language plpgsql
security definer
set search_path = public
as $func$
declare
  total_count bigint;
  first_seen timestamptz;
  changed_at timestamptz;
begin
  insert into public.easetalk_website_stats (key, total_visits, started_at, updated_at)
  values ('all', 1, now(), now())
  on conflict (key) do update
  set total_visits = public.easetalk_website_stats.total_visits + 1,
      updated_at = now()
  returning total_visits, started_at, updated_at
  into total_count, first_seen, changed_at;

  insert into public.easetalk_website_daily_visits (visit_date, total_visits, updated_at)
  values (current_date, 1, now())
  on conflict (visit_date) do update
  set total_visits = public.easetalk_website_daily_visits.total_visits + 1,
      updated_at = now();

  return jsonb_build_object(
    'total_visits', total_count,
    'started_at', first_seen,
    'updated_at', changed_at
  );
end;
$func$;

grant execute on function public.easetalk_record_website_visit(text) to anon, authenticated;

-- Admins may inspect these tables from Supabase directly if needed.
drop policy if exists "No direct public website stats read" on public.easetalk_website_stats;
create policy "No direct public website stats read"
on public.easetalk_website_stats
for select
using (false);

drop policy if exists "No direct public daily stats read" on public.easetalk_website_daily_visits;
create policy "No direct public daily stats read"
on public.easetalk_website_daily_visits
for select
using (false);
