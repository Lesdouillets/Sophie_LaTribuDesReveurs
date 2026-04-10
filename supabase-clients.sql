-- ══════════════════════════════════════════
-- Table des clients (synchronisation multi-appareils)
-- Copiez-collez dans SQL Editor → Run
-- ══════════════════════════════════════════

create table if not exists public.clients (
  id text primary key,  -- prenomEnfant + nomFamille + prenomParent1 (slug unique)
  user_id uuid references auth.users(id) on delete cascade not null,
  client_data jsonb default '{}',
  updated_at timestamptz default now()
);

alter table public.clients enable row level security;

create policy "Voir ses propres clients" on public.clients
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
