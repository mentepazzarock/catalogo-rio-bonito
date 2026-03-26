import Link from 'next/link'
import { MapPin, Clock, BadgeCheck, Star, Tag } from 'lucide-react'
import { CategoryIcon } from '@/components/ui/icon-map'
import { FavoriteButton } from '@/components/ui/favorite-button'
import { DistanceBadge } from '@/components/ui/distance-badge'
import { isOpenNow, getInitials } from '@/lib/utils'
import type { BusinessWithDetails } from '@/types/database'

interface BusinessCardCompactProps {
    business: BusinessWithDetails
}

export function BusinessCardCompact({ business }: BusinessCardCompactProps) {
    const hours = Array.isArray(business.hours) ? business.hours : []
    const open = isOpenNow(hours)
    const category = business.categories[0]
    const hasPromotion = business.promotions.some((p) => p.is_active)

    return (
        <Link
            href={`/negocio/${business.slug}`}
            className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-100 p-3 sm:p-4 hover:border-primary-200 hover:shadow-md hover:shadow-primary-50/50 transition-all duration-300 active:scale-[0.98]"
        >
            {/* Avatar / Logo */}
            <div className={`relative flex h-16 w-16 sm:h-18 sm:w-18 shrink-0 items-center justify-center rounded-xl ${business.is_featured ? 'bg-gradient-to-br from-primary-500 to-primary-700' : 'bg-gradient-to-br from-slate-600 to-slate-800'
                }`}>
                <span className="text-lg sm:text-xl font-bold text-white">{getInitials(business.name)}</span>
                {business.is_verified && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
                        <BadgeCheck className="h-3.5 w-3.5 text-primary-500" />
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
                        {business.name}
                    </h3>
                    {business.is_featured && (
                        <span className="shrink-0 flex items-center gap-0.5 rounded-full bg-warm-100 px-1.5 py-0.5 text-[10px] font-bold text-warm-700">
                            <Star className="h-2.5 w-2.5 fill-warm-500 text-warm-500" />
                        </span>
                    )}
                </div>

                {/* Category */}
                {category && (
                    <div className="flex items-center gap-1 mb-1">
                        <CategoryIcon name={category.icon} className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{category.name}</span>
                    </div>
                )}

                {/* Rating + Location */}
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    {business.average_rating > 0 && (
                        <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-warm-400 text-warm-400" />
                            <span className="font-semibold text-slate-700">{business.average_rating}</span>
                            <span className="text-slate-400">({business.total_reviews})</span>
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span className="truncate">{business.neighborhood || 'Centro'}</span>
                    </span>
                    <DistanceBadge latitude={business.latitude} longitude={business.longitude} />
                </div>
            </div>

            {/* Right side: Status + Promo */}
            <div className="shrink-0 flex flex-col items-end justify-between self-stretch py-1 gap-2">
                <FavoriteButton businessId={business.id} />
                <div className="flex flex-col items-end gap-1.5 mt-auto">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${open ? 'bg-accent-100 text-accent-700' : 'bg-red-50 text-red-600'
                        }`}>
                        <Clock className="h-2.5 w-2.5" />
                        {open ? 'Aberto' : 'Fechado'}
                    </span>
                    {hasPromotion && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-bold text-accent-700">
                            <Tag className="h-2.5 w-2.5" />
                            Oferta
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}
