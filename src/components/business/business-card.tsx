import Link from 'next/link'
import { MapPin, Phone, Clock, BadgeCheck, Tag, Star } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'
import { Badge } from '@/components/ui/badge'
import { CategoryIcon } from '@/components/ui/icon-map'
import { formatPhone, isOpenNow, getInitials } from '@/lib/utils'
import type { BusinessWithDetails } from '@/types/database'

interface BusinessCardProps {
  business: BusinessWithDetails
  featured?: boolean
}

// Category-based gradient colors for card covers
const categoryGradients: Record<string, string> = {
  'alimentacao': 'from-orange-500 to-red-600',
  'beleza-estetica': 'from-pink-400 to-purple-600',
  'saude': 'from-teal-400 to-emerald-600',
  'moda-vestuario': 'from-violet-400 to-indigo-600',
  'reparos-manutencao': 'from-amber-500 to-orange-600',
  'educacao': 'from-blue-400 to-indigo-600',
  'tecnologia': 'from-cyan-400 to-blue-600',
  'automotivo': 'from-slate-500 to-slate-700',
  'casa-decoracao': 'from-emerald-400 to-teal-600',
  'esporte-lazer': 'from-lime-400 to-green-600',
  'pet-shop-veterinario': 'from-yellow-400 to-amber-600',
  'advocacia-contabilidade': 'from-slate-600 to-slate-800',
}

export function BusinessCard({ business, featured = false }: BusinessCardProps) {
  const open = isOpenNow(business.hours)
  const category = business.categories[0]
  const hasPromotion = business.promotions.some((p) => p.is_active)
  const gradient = category ? (categoryGradients[category.slug] || 'from-primary-500 to-primary-700') : 'from-slate-400 to-slate-600'

  return (
    <Link
      href={`/negocio/${business.slug}`}
      className={`group block rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 ${featured ? 'border-primary-200 ring-1 ring-primary-100' : 'border-slate-200 hover:border-slate-300'
        }`}
    >
      {/* Cover / Header */}
      <div className={`relative h-36 rounded-t-2xl overflow-hidden bg-gradient-to-br ${featured ? 'from-primary-500 via-primary-600 to-primary-800' : gradient
        }`}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 w-24 h-24 border-2 border-white rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-white rounded-full" />
        </div>

        {/* Logo / Initials */}
        <div className="absolute bottom-0 left-4 translate-y-1/2">
          <div className={`flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white shadow-lg ${featured ? 'bg-gradient-to-br from-primary-600 to-primary-800' : 'bg-white'
            }`}>
            <span className={`text-xl font-bold ${featured ? 'text-white' : 'text-slate-700'}`}>
              {getInitials(business.name)}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {featured && (
            <Badge variant="warning" size="sm">
              <Star className="h-3 w-3 mr-0.5 fill-warm-600" />
              Destaque
            </Badge>
          )}
          {business.is_verified && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-sm">
              <BadgeCheck className="h-4 w-4 text-primary-500" />
            </span>
          )}
        </div>

        {/* Promotion indicator */}
        {hasPromotion && (
          <div className="absolute top-3 left-3">
            <Badge variant="success" size="sm">
              <Tag className="h-3 w-3 mr-1" />
              Promoção
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pt-10 pb-4">
        {/* Name & Category */}
        <div className="mb-2">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {business.name}
          </h3>
          {category && (
            <div className="flex items-center gap-1.5 mt-1">
              <CategoryIcon name={category.icon} className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">{category.name}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {business.short_description || business.description}
        </p>

        {/* Rating */}
        <div className="mb-3">
          <StarRating
            rating={business.average_rating}
            showValue
            totalReviews={business.total_reviews}
          />
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{business.neighborhood || business.address}</span>
          </div>
          {business.phone && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{formatPhone(business.phone)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className={`font-medium ${open ? 'text-accent-600' : 'text-red-500'}`}>
              {open ? 'Aberto agora' : 'Fechado'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
