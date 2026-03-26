import Link from 'next/link'
import { Tag, ArrowRight, ChevronRight } from 'lucide-react'

interface Promotion {
  id: string
  title: string
  description?: string
  discount_type: string
  discount_value: number
  coupon_code?: string
  business: { name: string; slug: string; type: string } | null
}

interface PromotionsSectionProps {
  promotions: Promotion[]
}

export function PromotionsSection({ promotions }: PromotionsSectionProps) {
  if (promotions.length === 0) return null

  return (
    <>
      {/* ═══ MOBILE: Compact horizontal scroll ═══ */}
      <section className="sm:hidden py-2">
        <div className="px-4 flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-accent-500" />
            <h2 className="text-sm font-bold text-slate-900">Promoções</h2>
          </div>
        </div>

        <div className="-mx-0 px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {promotions.map((promo) => (
              <Link
                key={promo.id}
                href={promo.business ? `/negocio/${promo.business.slug}` : '#'}
                className="snap-start shrink-0 flex items-center gap-2 rounded-lg bg-accent-50 border border-accent-200 px-3 py-2 active:bg-accent-100 transition-colors max-w-[220px]"
              >
                <span className="shrink-0 rounded bg-accent-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {promo.discount_type === 'percentage' && `${promo.discount_value}%`}
                  {promo.discount_type === 'fixed' && `R$${promo.discount_value}`}
                  {promo.discount_type === 'coupon' && 'Cupom'}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-900 truncate">{promo.title}</p>
                  {promo.business && <p className="text-[9px] text-slate-500 truncate">{promo.business.name}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DESKTOP: Full grid ═══ */}
      <section className="hidden sm:block py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Tag className="h-5 w-5 text-accent-500" />
              <span className="text-sm font-bold text-accent-600 uppercase tracking-wider">Ofertas Exclusivas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Promoções do Catálogo</h2>
            <p className="mt-1 text-base text-slate-500">
              Descontos especiais para quem usa o{' '}
              <span className="font-semibold text-primary-600">Catálogo Rio Bonito</span>
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {promotions.map((promo) => (
              <Link
                key={promo.id}
                href={promo.business ? `/negocio/${promo.business.slug}` : '#'}
                className="group block rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100/50 border border-accent-200 p-6 hover:shadow-lg hover:shadow-accent-100 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">
                    {promo.discount_type === 'percentage' && `${promo.discount_value}% OFF`}
                    {promo.discount_type === 'fixed' && `R$${promo.discount_value} OFF`}
                    {promo.discount_type === 'coupon' && 'Cupom'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-accent-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-accent-700 transition-colors">{promo.title}</h3>
                {promo.description && <p className="text-sm text-slate-600 mb-3 leading-relaxed line-clamp-2">{promo.description}</p>}
                <div className="flex items-center justify-between">
                  {promo.business && <span className="text-xs font-semibold text-slate-500">{promo.business.name}</span>}
                  {promo.coupon_code && (
                    <code className="rounded-md bg-white px-2 py-1 text-xs font-bold text-accent-700 border border-accent-200">{promo.coupon_code}</code>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
