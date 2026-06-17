create table if not exists public.application_responses (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  linkedin text not null,
  job_title text not null,
  company text not null,
  experience text not null,
  idea_description text not null,
  idea_age text not null,
  unfair_advantage text not null,
  blocker text not null,
  outcome text not null,
  hours_per_week text not null,
  tier text not null,
  prior_experience text not null,
  anything_else text,
  referral_source text not null,
  commitment_confirmed boolean not null default false,
  review_status text not null default 'pending_review',
  created_at timestamp without time zone default now()
);

alter table public.application_responses enable row level security;

drop policy if exists "Allow public to insert application responses" on public.application_responses;
create policy "Allow public to insert application responses"
  on public.application_responses
  for insert
  with check (true);

create table if not exists public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text,
  answers jsonb not null default '{}'::jsonb,
  score integer not null,
  readiness_label text not null,
  review_status text not null default 'pending_review',
  created_at timestamp without time zone default now()
);

alter table public.quiz_responses enable row level security;

drop policy if exists "Allow public to insert quiz responses" on public.quiz_responses;
create policy "Allow public to insert quiz responses"
  on public.quiz_responses
  for insert
  with check (true);
