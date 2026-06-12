-- 在 Supabase Dashboard → SQL Editor 中执行此脚本

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  phone text not null check (phone ~ '^1\d{10}$'),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

create policy "anon can insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
