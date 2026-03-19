import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { BusinessCard } from '@/components/business/business-card'
import { getFeaturedBusinesses } from '@/lib/mock-data'

export function FeaturedSection() {
  const featured = getFeaturedBusinesses()

  return (
    <section className="py-16 sm:py-20 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-warm-500" />
              <span className="text-sm font-bold text-warm-600 uppercase tracking-wider">
                Destaques
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Negócios em Destaque
            </h2>
            <p className="mt-1 text-base text-slate-500">
              Os melhores avaliados e mais procurados
            </p>
          </div>
          <Link
            href="/buscar"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Ver todos
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
          {featured.map((business) => (
            <BusinessCard key={business.id} business={business} featured />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/buscar"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600"
          >
            Ver todos os negócios
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
