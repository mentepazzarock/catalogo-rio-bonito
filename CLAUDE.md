@AGENTS.md

# Catálogo Rio Bonito - Contexto do Projeto

## Visão Geral
Plataforma B2B2C de catálogo comercial para Rio Bonito, RJ. Consumidores descobrem negócios locais, donos de negócios gerenciam seus perfis, e admins moderam tudo.

**Site:** catalogoriobonito.com.br
**Deploy:** Vercel (deploy automático via push no master)
**Banco:** Supabase (PostgreSQL + Auth + RLS) — projeto **Lucia** (`bakovffrlysnxcrqnbaf`), compartilhado com outro app
**Repo:** https://github.com/mentepazzarock/catalogo-rio-bonito.git

## Supabase - Projeto Lucia
- **Ref:** `bakovffrlysnxcrqnbaf`
- **URL:** `https://bakovffrlysnxcrqnbaf.supabase.co`
- **Region:** sa-east-1
- **Compartilhado** com app "Lucia" (tabelas `ai_memorias`, `estatisticas_sistema`, `produtos` são do outro app)
- **Free tier:** 2 projetos max na conta (Lucia + valentina-moda-feminina), ambos slots ocupados
- **Auth config:** signups habilitados, autoconfirm ON, sem SMTP configurado
- **Trigger `on_auth_user_created`** cria `user_profiles` automaticamente no signup
- **Tabelas do Catálogo RB:** user_profiles, categories, businesses, business_categories, business_hours, products, service_items, reviews, promotions, favorites, business_views, leads, banners, payment_transactions, notifications

## Tech Stack
- **Next.js 16.2.0** (App Router, SSR/SSG) — ATENÇÃO: `middleware.ts` foi renomeado para `proxy.ts` nesta versão
- **React 19** + TypeScript 5 (strict)
- **TailwindCSS 4** + Framer Motion 12
- **Zustand 5** (state management, favoritos em localStorage, geolocalização)
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
│   │   └── business.ts         # Server Actions: reviews, products, promotions, leads, favorites, registerBusiness
│   ├── auth/callback/route.ts  # OAuth/email code exchange → redireciona para /
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
│   ├── cadastro-empresa/       # Formulário self-service para donos de negócio (protegido por requireAuth via proxy)
│   ├── favoritos/              # Favoritos (client component com supabase-browser)
│   ├── para-empresas/          # Landing B2B (planos + WhatsApp CTA)
│   ├── error.tsx               # Error boundary raiz
│   └── sitemap.ts              # Sitemap dinâmico com dados reais do Supabase
├── components/
│   ├── layout/                 # Header (aceita user prop), Footer
│   ├── home/                   # Hero, CategoriesSection, FeaturedSection, PromotionsSection, AllBusinessesSection, CTASection
│   ├── business/               # BusinessCard, BusinessCardCompact
│   ├── mobile/                 # BottomNav
│   ├── shared/                 # BusinessListPage, EmptyState
│   ├── admin/                  # AdminShell (client component com sidebar)
│   ├── painel/                 # PainelShell (client component com sidebar)
│   └── ui/                     # Badge, StarRating, MotionWrapper, FavoriteButton, IconMap, EmptyState, Skeleton, DistanceBadge, LocationButton
├── lib/
│   ├── supabase-server.ts      # Supabase client server-side (cookies)
│   ├── supabase-browser.ts     # Supabase client browser-side (export: createClient)
│   ├── supabase-admin.ts       # Supabase client admin (service role key, bypassa RLS)
│   ├── supabase.ts             # Re-exports dos módulos acima
│   ├── dal.ts                  # Data Access Layer: getUser, getUserProfile, requireAuth, requireAdmin, requireBusinessOwner (React cache)
│   ├── queries.ts              # Todas as queries Supabase com React cache() — públicas, business owner, admin
│   ├── validations.ts          # Schemas Zod: login, signup, reset, businessRegistration, business, review, product, promotion, lead
│   ├── utils.ts                # formatCurrency, cn, formatPhone, formatWhatsAppUrl, slugify, getInitials, isOpenNow, calculateDistance
│   ├── constants.ts            # SITE_NAME, SITE_DESCRIPTION, SITE_URL, CATEGORIES_DATA, SUBSCRIPTION_PLANS, DAYS_OF_WEEK
│   └── category-colors.ts     # Cores por categoria (gradientes, backgrounds, textos)
├── types/database.ts           # Todas as interfaces TypeScript (UserProfile usa full_name, não name)
├── store/use-favorites.ts      # Zustand store (localStorage)
├── store/use-location.ts       # Zustand store geolocalização (browser Geolocation API)
└── proxy.ts                    # Proteção de rotas (substitui middleware.ts no Next.js 16)
```

## Arquitetura de Autenticação
- **Supabase Auth SSR** com cookies — NÃO usa NextAuth
- `proxy.ts` intercepta requests e redireciona não-autenticados de `/admin/*`, `/painel/*`, `/conta/*`, `/cadastro-empresa` para `/login`
- Redireciona autenticados de `/login`, `/cadastro` para `/` (NÃO /painel — consumers não têm acesso ao painel)
- **Login redirect inteligente por role:** admin → `/admin`, business_owner → `/painel`, consumer → `/`
- **Signup** cria user no Supabase Auth + trigger auto-cria `user_profiles` com role `consumer`
- **Signup action** também faz upsert no user_profiles como fallback (via service role)
- **Login action** verifica se user_profile existe e cria se necessário (safety net)
- **DAL pattern** (`src/lib/dal.ts`) com `React.cache()` para deduplicação:
  - `getUser()` — retorna auth user ou null
  - `getUserProfile()` — retorna perfil do user_profiles
  - `requireAuth()` — redireciona para /login se não autenticado
  - `requireAdmin()` — redireciona se não admin
  - `requireBusinessOwner()` — redireciona se não business_owner/admin
- RLS do Supabase ativo — queries respeitam `auth.uid()`
- **Logout** usa server action `logout()` de `auth.ts` (NÃO window.location)

## Fluxo de Cadastro de Empresa
1. Usuário cria conta em `/login` (tab "Criar conta") → consumer
2. Vai em `/cadastro-empresa` (protegido, precisa de login)
3. Preenche formulário: tipo, nome, categoria, descrição, contato, endereço
4. Server action `registerBusiness` cria negócio com `is_active: false`, `is_approved: false`, coordenadas padrão Rio Bonito
5. Usuário é promovido a `business_owner` (SOMENTE se role atual = consumer, nunca rebaixa admin)
6. Admin aprova o negócio no painel admin

## Padrão Server/Client Components
- **Páginas com dados**: Server component async que busca dados e passa como props
- **Páginas interativas**: Server wrapper (page.tsx) + Client component separado (ex: `produtos-client.tsx`)
- **Server Actions**: Todas as mutações via `'use server'` com Zod validation
- **Forms**: Usam `useActionState` (React 19) para estado do formulário

## Modelo de Dados (principais entidades)
- **UserProfile** — roles: admin, business_owner, consumer (campo `full_name`, NÃO `name`)
- **Business** — type: store | service_provider, planos: basic/premium/pro, tem `category_id` direto + junction `business_categories`
- **BusinessHours** — array com `day_of_week`, `open_time`, `close_time`, `is_closed` (usar `Array.isArray()` guard antes de `isOpenNow()`)
- **Category** — 15 categorias com ícones Lucide e slugs (ver lista abaixo)
- **Product / ServiceItem** — DB usa `service_items` (NÃO `services`). Product tem `promotional_price`, ServiceItem tem `duration_minutes`
- **Review** — avaliações com campo `reply` (NÃO `owner_reply`)
- **Promotion** — campos de data: `starts_at` / `ends_at` (NÃO `start_date`/`end_date`). `discount_type`: percentage | fixed | coupon
- **Lead** — contatos com `source`: whatsapp | phone | form | booking
- **Banner** — banners com `total_impressions`, `total_clicks` (NÃO `impressions`/`clicks`)
- **BusinessView** — analytics (views, clicks por tipo)
- **Favorite** — user_id + business_id (unique constraint)

## Categorias (15) — slugs e ícones Lucide
| # | Nome | Slug | Ícone |
|---|------|------|-------|
| 1 | Alimentação | alimentacao | UtensilsCrossed |
| 2 | Beleza & Estética | beleza-estetica | Sparkles |
| 3 | Saúde | saude | Heart |
| 4 | Moda & Vestuário | moda-vestuario | Shirt |
| 5 | Reparos & Manutenção | reparos-manutencao | Wrench |
| 6 | Educação | educacao | GraduationCap |
| 7 | Tecnologia | tecnologia | Laptop |
| 8 | Automotivo | automotivo | Car |
| 9 | Casa & Decoração | casa-decoracao | Home |
| 10 | Esporte & Lazer | esporte-lazer | Dumbbell |
| 11 | Pet Shop & Veterinário | pet-shop-veterinario | PawPrint |
| 12 | Advocacia & Contabilidade | advocacia-contabilidade | Scale |
| 13 | Construção Civil | construcao-civil | HardHat |
| 14 | Fotografia & Eventos | fotografia-eventos | Camera |
| 15 | Supermercados & Conveniência | supermercados-conveniencia | ShoppingCart |

## Planos de Assinatura
- **Básico:** R$100 — 10 produtos, 5 fotos
- **Premium:** R$150 — 30 produtos, 15 fotos, destaque
- **Profissional:** R$250 — ilimitado, 50 fotos, agendamento online

## Design
- Paleta primária: azul profissional (#2563eb / blue-600)
- Accent: emerald/green (confiança)
- Warm: amber/gold (destaque premium)
- Font: Inter (Google Fonts)
- **Mobile-first** com bottom navigation (h-14, 4 tabs: Início, Buscar, Favoritos, Conta)
- PWA habilitado
- Framer Motion para animações

## Mobile UX (v3.2)
- **Hero mobile:** compacto — saudação + busca + quick filters (Perto de mim, Aberto agora, Promoções, Lojas, Serviços)
- **Categorias mobile:** grid 4x2 com ícones compactos + pills scrolláveis para restantes
- **Destaques mobile:** cards horizontais de 200px com scroll
- **"Perto de você":** lista vertical de todos os negócios (card horizontal compacto)
- **CTA mobile:** dois banners inline (criar conta + cadastrar negócio)
- **Header mobile:** h-14, nome curto "Catálogo RB", avatar como botão de menu
- **Desktop mantém** layout anterior com hero grande e grid de cards

## Scripts
```
npm run dev    # Dev server
npm run build  # Build produção (último build: OK, 37 rotas — 25/03/2026)
npm start      # Servidor produção
npm run lint   # ESLint
```

## Env Vars (.env.local)
- `NEXT_PUBLIC_SUPABASE_URL` — URL do projeto Supabase (`https://bakovffrlysnxcrqnbaf.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Chave pública (anon)
- `SUPABASE_SERVICE_ROLE_KEY` — Chave admin (bypassa RLS, NUNCA expor no client)
- `NEXT_PUBLIC_SITE_URL` — URL do site (localhost em dev, domínio em prod)
- `AUTH_SECRET` — Secret para auth
- `NEXT_PUBLIC_WHATSAPP_BUSINESS` — Número WhatsApp business
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (opcional)

**IMPORTANTE:** Em produção (Vercel), configurar todas as env vars no painel Settings > Environment Variables.

## Notas Importantes
- **NÃO usar mock-data.ts** — todo o projeto foi migrado para dados reais do Supabase
- **ZodError** usa `.issues[0].message`, NÃO `.errors[0].message`
- **BusinessHours** é um array (`BusinessHours[]`) — sempre usar `Array.isArray()` guard antes de `isOpenNow()`
- **isOpenNow()** espera array `{ day_of_week, open_time, close_time, is_closed }[]`
- **Promotions** no DB usam `starts_at`/`ends_at` (NÃO `start_date`/`end_date`)
- **Service items** no DB é tabela `service_items` (NÃO `services`)
- **supabase-browser.ts** exporta `createClient` (NÃO `createBrowserClient`)
- **themeColor** em metadata exports gera warnings — deveria estar em `viewport` export (pendente)
- **Logout** no header usa `import('@/app/actions/auth').then(m => m.logout())` (dynamic import)
- Build e TypeScript passando sem erros (25/03/2026)
- **Admin único:** jothabmachado@gmail.com (id: d20334f7-4423-478d-8ac2-611763ba2891) — role definida direto no banco, nenhuma rota permite auto-promoção a admin
- **registerBusiness** verifica role antes de promover — nunca rebaixa admin para business_owner
- **Footer** não expõe links de admin/painel (removido por segurança)
- **Geolocalização** usa browser Geolocation API (grátis, sem Google Maps API). Distância calculada via Haversine. Cache 5min.

## Banco de Dados — Diferenças DB vs Código
O schema real no Supabase tem algumas diferenças em relação aos types TypeScript:
- **businesses** tem colunas individuais `wifi`, `parking`, `delivery`, `pet_friendly`, `accessibility`, `payment_methods` ao invés de JSONB `attributes`
- **businesses** tem `category_id` direto (legado) + junction table `business_categories` (usado pelo app)
- **categories** não tem `parent_id`, `seo_title`, `seo_description` (existem no type mas não no DB atual)

## Histórico de Refatorações
- **v2.0** — Admin panel, business panel, mobile UX, consumer features
- **v2.1** — Redesign UI/UX completo (paleta laranja, iFood-style mobile)
- **v2.2** — Framer Motion, category colors, header scroll, buscar iFood style
- **v2.3** — SEO headers, sitemap, PWA manifest, Sonner toasts
- **v2.4** — UX Architecture B2C vs B2B split, favoritos, bottom nav
- **v3.0** — Migração completa: mock data → Supabase real, auth SSR, DAL, server actions, Zod validation, error boundaries, route protection via proxy.ts
- **v3.1** — Redesign azul (#2563eb), fix signup (habilitado no Supabase + autoconfirm + user_profile), cadastro empresa self-service (/cadastro-empresa), fix isOpenNow (hours como array), fix logout (server action), fix redirect inteligente por role, categorias corrigidas no DB (15 com slugs/ícones corretos), business_categories junction table, schema SQL completo
- **v3.2 (atual)** — Redesign mobile completo (hero compacto, categorias grid 4x2, cards horizontais, seção "Perto de você"), geolocalização (store Zustand, DistanceBadge, LocationButton, ordenação por distância na busca), proteção admin role (registerBusiness não rebaixa admin), fix bottom nav (/perfil→/conta), footer sem links admin, IDEIAS_FUTURAS.txt com roadmap, user admin promovido no DB
