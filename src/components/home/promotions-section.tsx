import Link from 'next/link'
import { Tag, ArrowRight } from 'lucide-react'
import { mockBusinesses } from '@/lib/mock-data'

export function PromotionsSection() {
  const businessesWithPromotions = mockBusinesses.filter(
    (b) => b.promotions.some((p) => p.is_active)
  )

  if (businessesWithPromotions.length === 0) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Tag className="h-5 w-5 text-accent-500" />
            <span className="text-sm font-bold text-accent-600 uppercase tracking-wider">
              Ofertas Exclusivas
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Promoções do Catálogo
          </h2>
          <p className="mt-1 text-base text-slate-500">
            Descontos especiais para quem usa o{' '}
            <span className="font-semibold text-primary-600">Catálogo Rio Bonito</span>
          </p>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x-mandatory">
            {businessesWithPromotions.map((business) =>
              business.promotions
                .filter((p) => p.is_active)
                .map((promo) => (
                  <Link
                    key={promo.id}
                    href={`/negocio/${business.slug}`}
                    className="snap-start shrink-0 w-[280px] group block rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100/50 border border-accent-200 p-5 hover:shadow-lg hover:shadow-accent-100 transition-all duration-300 active:scale-[0.98]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">
                        {promo.discount_type === 'percentage' && `${promo.discount_value}% OFF`}
                        {promo.discount_type === 'fixed' && `R$${promo.discount_value} OFF`}
                        {promo.discount_type === 'coupon' && 'Cupom'}
                      </span>
                      <ArrowRight className="h-4 w-4 text-accent-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-accent-700 transition-colors">
                      {promo.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 leading-relaxed line-clamp-2">
                      {promo.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {business.name}
                      </span>
                      {promo.coupon_code && (
                        <code className="rounded-md bg-white px-2 py-1 text-xs font-bold text-accent-700 border border-accent-200">
                          {promo.coupon_code}
                        </code>
                      )}
                    </div>
                  </Link>
                ))
            )}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5">
          {businessesWithPromotions.map((business) =>
            business.promotions
              .filter((p) => p.is_active)
              .map((promo) => (
                <Link
                  key={promo.id}
                  href={`/negocio/${business.slug}`}
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
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-accent-700 transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                    {promo.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      {business.name}
                    </span>
                    {promo.coupon_code && (
                      <code className="rounded-md bg-white px-2 py-1 text-xs font-bold text-accent-700 border border-accent-200">
                        {promo.coupon_code}
                      </code>
                    )}
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </section>
  )
}
