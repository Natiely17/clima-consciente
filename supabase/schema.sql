create table if not exists public.opinioes (
  id bigint generated always as identity primary key,
  tema text not null,
  resposta_1 text not null,
  resposta_2 int not null check (resposta_2 between 1 and 5),
  resposta_3 text,
  criado_em timestamptz not null default now()
);

alter table public.opinioes enable row level security;

drop policy if exists "qualquer um pode responder" on public.opinioes;
create policy "qualquer um pode responder"
on public.opinioes for insert
with check (true);

drop policy if exists "qualquer um pode ver os resultados" on public.opinioes;
create policy "qualquer um pode ver os resultados"
on public.opinioes for select
using (true);

-- Não crie políticas de UPDATE ou DELETE para este projeto.
