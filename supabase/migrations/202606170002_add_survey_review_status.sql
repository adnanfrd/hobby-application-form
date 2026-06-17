alter table public.survey_responses
add column if not exists review_status text not null default 'pending_review';
