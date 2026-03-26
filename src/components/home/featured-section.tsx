import Link from 'next/link'
import { Sparkles, MapPin, Star, Clock, ChevronRight, BadgeCheck } from 'lucide-react'
import { BusinessCard } from '@/components/business/business-card'
import { CategoryIcon } from '@/components/ui/icon-map'
import { DistanceBadge } from '@/components/ui/distance-badge'
import { isOpenNow, getInitials } from '@/lib/utils'
import type { BusinessWithDetails } from '@/types/database'

interface FeaturedSectionProps {
  businesses: BusinessWithDetails[]
}

export function FeaturedSection({ businesses }: FeaturedSectionProps) {
  if (businesses.length === 0) return null

  return (
    <>
      {/* ═══ MOBILE: Compact list ═══ */}
      <section className="sm:hidden py-1">
        <div className="px-4 flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-warm-500" />
            <h2 className="text-sm font-bold text-slate-900">Destaques</h2>
          </div>
          <Link href="/buscar" className="text-[10px] font-semibold text-primary-600">
            Ver todos
          </Link>
        </div>

        <div className="px-4 space-y-1.5">
          {businesses.slice(0, 4).map((business) => (
            <MobileBusinessRow key={business.id} business={business} />
          ))}
        </div>
      </section>

      {/* ═══ DESKTOP: Grid ═══ */}
      <section className="hidden sm:block py-16 sm:py-20 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-warm-500" />
                <span className="text-sm font-bold text-warm-600 uppercase tracking-wider">Destaques</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Negócios em Destaque</h2>
              <p className="mt-1 text-base text-slate-500">Os melhores avaliados e mais procurados</p>
            </div>
            <Link href="/buscar" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} featured />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/** Compact row card for mobile */
function MobileBusinessRow({ business }: { business: BusinessWithDetails }) {
  const hours = Array.isArray(business.hours) ? business.hours : []
  const open = isOpenNow(hours)
  const category = business.categories[0]

  return (
    <Link
      href={`/negocio/${business.slug}`}
      className="flex items-center gap-3 rounded-lg bg-white border border-slate-100 p-2.5 active:bg-slate-50 transition-colors"
    >
      {/* Small avatar */}
      <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${
        category?.slug === 'alimentacao' ? 'from-orange-400 to-red-500' :
        category?.slug === 'beleza-estetica' ? 'from-pink-400 to-purple-500' :
        category?.slug === 'saude' ? 'from-teal-400 to-emerald-500' :
        'from-primary-400 to-primary-600'
      }`}>
        <span className="text-xs font-bold text-white/80">{getInitials(business.name)}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <h3 className="text-xs font-bold text-slate-900 truncate">{business.name}</h3>
          {business.is_verified && <BadgeCheck className="h-3 w-3 text-primary-500 shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {category && <span className="text-[9px] text-slate-400">{category.name}</span>}
          <DistanceBadge latitude={business.latitude} longitude={business.longitude} />
        </div>
      </div>

      {/* Right side */}
      <div className="shrink-0 flex items-center gap-2">
        {business.average_rating > 0 && (
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-warm-400 text-warm-400" />
            <span className="text-[10px] font-bold text-slate-700">{business.average_rating.toFixed(1)}</span>
          </div>
        )}
        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${open ? 'bg-accent-50 text-accent-600' : 'bg-red-50 text-red-400'}`}>
          {open ? 'Aberto' : 'Fechado'}
        </span>
      </div>
    </Link>
  )
}
