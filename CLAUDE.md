@AGENTS.md

# Catálogo Rio Bonito - Contexto do Projeto

## Visão Geral
Plataforma B2B2C de catálogo comercial para Rio Bonito, RJ. Consumidores descobrem negócios locais, donos de negócios gerenciam seus perfis, e admins moderam tudo.

**Site:** catalogoriobonito.com.br
**Deploy:** Vercel (deploy automático via push no master)
**Banco:** Supabase (PostgreSQL + Auth + RLS)

## Tech Stack
- **Next.js 16.2.0** (App Router, SSR/SSG) — ATENÇÃO: `middleware.ts` foi renomeado para `proxy.ts` nesta versão
- **React 19** + TypeScript 5 (strict)
- **TailwindCSS 4** + Framer Motion 12
- **Zustand 5** (state management, favoritos em localStorage)
- **Supabase Auth SSR** (`@supabase/ssr`) — autenticação via cookies, sem NextAuth
- **Zod** — validação de inputs em server actions
- **Lucide React** (ícones) + **Sonner** (toasts)
- Path alias: `@/*` → `./src/*`

## Estrutura Principal
```
src/
├── app/
│   ├── layout.tsx              # Root layout async (busca user, passa pro Header)
│   ├── page.tsx                # Homepage (server component, dados reais)
│   ├── actions/
│   │   ├── auth.ts             # Server Actions: login, signup, logout, resetPassword, loginWithOAuth
│   │   └── business.ts         # Server Actions: reviews, products, promotions, leads, favorites
│   ├── auth/callback/route.ts  # OAuth/email code exchange
│   ├── admin/                  # Painel admin (protegido por requireAdmin)
│   │   ├── layout.tsx          # Server component com gate de auth
│   │   ├── error.tsx           # Error boundary
│   │   └── [sub-pages]/        # dashboard, negocios, categorias, moderacao, relatorios, banners, assinaturas, usuarios, configuracoes
│   ├── painel/                 # Painel do lojista (protegido por requireBusinessOwner)
│   │   ├── layout.tsx          # Server component com gate de auth
│   │   ├── error.tsx           # Error boundary
│   │   └── [sub-pages]/        # dashboard, produtos, avaliacoes, promocoes, leads, perfil, assinatura, analytics
│   ├── negocio/[slug]/         # Página pública do negócio
│   ├── conta/                  # Conta do consumidor (protegido por requireAuth)
│   ├── buscar/                 # Busca (server wrapper + client component)
│   ├── categorias/             # Navegação por categorias
│   ├── lojas/ | servicos/      # Listagens filtradas por tipo
│   ├── login/                  # Auth page (login/signup/reset com useActionState)
│   ├── cadastro/               # Redirecionado para login
│   ├── favoritos/              # Favoritos (client component com supabase-browser)
│   ├── para-empresas/          # Landing B2B
│   ├── error.tsx               # Error boundary raiz
│   └── sitemap.ts              # Sitemap dinâmico com dados reais do Supabase
├── components/
│   ├── layout/                 # Header (aceita user prop), Footer
│   ├── home/                   # Hero, CategoriesSection, FeaturedSection, PromotionsSection (todos recebem dados como props)
│   ├── business/               # Componentes da página do negócio
│   ├── mobile/                 # BottomNav
│   ├── shared/                 # BusinessListPage, EmptyState, BusinessCard
│   ├── admin/                  # AdminShell (client component com sidebar)
│   ├── painel/                 # PainelShell (client component com sidebar)
│   └── ui/                     # Badge e outros componentes base
├── lib/
│   ├── supabase-server.ts      # Supabase client server-side (cookies)
│   ├── supabase-browser.ts     # Supabase client browser-side
│   ├── supabase-admin.ts       # Supabase client admin (service role key)
│   ├── supabase.ts             # Re-exports dos módulos acima
│   ├── dal.ts                  # Data Access Layer: getUser, getUserProfile, requireAuth, requireAdmin, requireBusinessOwner (React cache)
│   ├── queries.ts              # Todas as queries Supabase com React cache() — públicas, business owner, admin
│   ├── validations.ts          # Schemas Zod: login, signup, reset, business, review, product, promotion, lead
│   ├── utils.ts                # formatCurrency, cn, etc.
│   ├── constants.ts            # SITE_NAME, SITE_DESCRIPTION
│   └── category-colors.ts     # Cores por categoria
├── types/database.ts           # Todas as interfaces TypeScript (UserProfile usa full_name, não name)
├── store/use-favorites.ts      # Zustand store (localStorage)
└── proxy.ts                    # Proteção de rotas (substitui middleware.ts no Next.js 16)
```

## Arquitetura de Autenticação
- **Supabase Auth SSR** com cookies — NÃO usa NextAuth
- `proxy.ts` intercepta requests e redireciona não-autenticados de `/admin/*`, `/painel/*`, `/conta/*` para `/login`
- Redireciona autenticados de `/login`, `/cadastro` para `/painel`
- **DAL pattern** (`src/lib/dal.ts`) com `React.cache()` para deduplicação:
  - `getUser()` — retorna auth user ou null
  - `getUserProfile()` — retorna perfil do user_profiles
  - `requireAuth()` — redireciona para /login se não autenticado
  - `requireAdmin()` — redireciona se não admin
  - `requireBusinessOwner()` — redireciona se não business_owner/admin
- RLS do Supabase ativo — queries respeitam `auth.uid()`

## Padrão Server/Client Components
- **Páginas com dados**: Server component async que busca dados e passa como props
- **Páginas interativas**: Server wrapper (page.tsx) + Client component separado (ex: `produtos-client.tsx`)
- **Server Actions**: Todas as mutações via `'use server'` com Zod validation
- **Forms**: Usam `useActionState` (React 19) para estado do formulário

## Modelo de Dados (principais entidades)
- **UserProfile** — roles: admin, business_owner, consumer (campo `full_name`, NÃO `name`)
- **Business** — type: store | service_provider, planos: basic/premium/pro
- **BusinessHours** — array com `day_of_week`, `open_time`, `close_time`, `is_closed`
- **Category** — 15 categorias com ícones e slugs
- **Product / ServiceItem** — itens do negócio (Product tem `promotional_price`, ServiceItem tem `duration_minutes`)
- **Review** — avaliações com campo `reply` (NÃO `owner_reply`)
- **Promotion** — `discount_type`: percentage | fixed | coupon, `discount_value`: number | null
- **Lead** — contatos com `source`: whatsapp | phone | form | booking
- **Banner** — banners com `total_impressions`, `total_clicks` (NÃO `impressions`/`clicks`)
- **BusinessView** — analytics (views, clicks por tipo)
- **Favorite** — user_id + business_id

## Planos de Assinatura
- **Básico:** R$100 — 10 produtos, 5 fotos
- **Premium:** R$150 — 30 produtos, 15 fotos, destaque
- **Profissional:** R$250 — ilimitado, 50 fotos, agendamento online

## Design
- Paleta primária: laranja/amber (#ea580c)
- Font: Inter (Google Fonts)
- Mobile-first com bottom navigation
- PWA habilitado

## Scripts
```
npm run dev    # Dev server
npm run build  # Build produção (último build: OK, 36 rotas)
npm start      # Servidor produção
npm run lint   # ESLint
```

## Env Vars (.env.local)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (opcional)
- `NEXT_PUBLIC_WHATSAPP_BUSINESS`

## Notas Importantes
- **NÃO usar mock-data.ts** — todo o projeto foi migrado para dados reais do Supabase
- **ZodError** usa `.issues[0].message`, NÃO `.errors[0].message`
- **BusinessHours** é um array (`BusinessHours[]`), acessar com `.find(h => h.day_of_week === key)`
- **themeColor** em metadata exports gera warnings — deveria estar em `viewport` export (pendente)
- Build e TypeScript passando sem erros (25/03/2026)

## Histórico de Refatorações
- **v2.0** — Admin panel, business panel, mobile UX, consumer features
- **v2.1** — Redesign UI/UX completo (paleta laranja, iFood-style mobile)
- **v2.2** — Framer Motion, category colors, header scroll, buscar iFood style
- **v2.3** — SEO headers, sitemap, PWA manifest, Sonner toasts
- **v2.4** — UX Architecture B2C vs B2B split, favoritos, bottom nav
- **v3.0 (atual)** — Migração completa: mock data → Supabase real, auth SSR, DAL, server actions, Zod validation, error boundaries, route protection via proxy.ts
