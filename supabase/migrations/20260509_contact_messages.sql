-- Contact Messages Table
-- Run this in your Supabase SQL Editor to enable the contact form

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'new',
  created_at timestamp with time zone default now()
);

alter table public.contact_messages enable row level security;

create policy "Allow public insert into contact_messages"
  on public.contact_messages
  for insert
  to anon
  with check (true);

create policy "Allow admins to read contact_messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);
