import Link from 'next/link'
import { MapPin, Star, Clock, ChevronRight, BadgeCheck, Tag } from 'lucide-react'
import { CategoryIcon } from '@/components/ui/icon-map'
import { DistanceBadge } from '@/components/ui/distance-badge'
import { isOpenNow, getInitials } from '@/lib/utils'
import type { BusinessWithDetails } from '@/types/database'

interface AllBusinessesSectionProps {
  businesses: BusinessWithDetails[]
}

export function AllBusinessesSection({ businesses }: AllBusinessesSectionProps) {
  if (businesses.length === 0) return null

  return (
    <section className="sm:hidden py-2 pb-4">
      <div className="px-4 flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-slate-900">Todos os negócios</h2>
        <Link href="/buscar" className="text-[10px] font-semibold text-primary-600">
          Ver todos
        </Link>
      </div>

      <div className="px-4 space-y-1.5">
        {businesses.slice(0, 10).map((business) => (
          <MobileListRow key={business.id} business={business} />
        ))}
      </div>

      {businesses.length > 10 && (
        <div className="px-4 mt-3">
          <Link
            href="/buscar"
            className="flex items-center justify-center gap-1 w-full rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-500 active:bg-slate-50 transition-colors"
          >
            Ver mais <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </section>
  )
}

function MobileListRow({ business }: { business: BusinessWithDetails }) {
  const hours = Array.isArray(business.hours) ? business.hours : []
  const open = isOpenNow(hours)
  const category = business.categories[0]

  return (
    <Link
      href={`/negocio/${business.slug}`}
      className="flex items-center gap-3 rounded-lg bg-white border border-slate-100 p-2.5 active:bg-slate-50 transition-colors"
    >
      <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${
        category?.slug === 'alimentacao' ? 'from-orange-400 to-red-500' :
        category?.slug === 'beleza-estetica' ? 'from-pink-400 to-purple-500' :
        category?.slug === 'saude' ? 'from-teal-400 to-emerald-500' :
        category?.slug === 'tecnologia' ? 'from-cyan-400 to-blue-500' :
        category?.slug === 'moda-vestuario' ? 'from-violet-400 to-indigo-500' :
        'from-primary-400 to-primary-600'
      }`}>
        <span className="text-xs font-bold text-white/80">{getInitials(business.name)}</span>
      </div>

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
