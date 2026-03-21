import Link from 'next/link'
import { CategoryIcon } from '@/components/ui/icon-map'
import { mockCategories } from '@/lib/mock-data'

// Each category gets a unique color scheme
const categoryColors: Record<string, { bg: string; iconBg: string; iconColor: string; hoverBorder: string }> = {
  'alimentacao': { bg: 'hover:bg-orange-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', hoverBorder: 'hover:border-orange-200' },
  'beleza-estetica': { bg: 'hover:bg-pink-50', iconBg: 'bg-pink-100', iconColor: 'text-pink-600', hoverBorder: 'hover:border-pink-200' },
  'saude': { bg: 'hover:bg-teal-50', iconBg: 'bg-teal-100', iconColor: 'text-teal-600', hoverBorder: 'hover:border-teal-200' },
  'moda-vestuario': { bg: 'hover:bg-violet-50', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', hoverBorder: 'hover:border-violet-200' },
  'reparos-manutencao': { bg: 'hover:bg-amber-50', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', hoverBorder: 'hover:border-amber-200' },
  'educacao': { bg: 'hover:bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', hoverBorder: 'hover:border-blue-200' },
  'tecnologia': { bg: 'hover:bg-cyan-50', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600', hoverBorder: 'hover:border-cyan-200' },
  'automotivo': { bg: 'hover:bg-slate-50', iconBg: 'bg-slate-200', iconColor: 'text-slate-700', hoverBorder: 'hover:border-slate-300' },
  'casa-decoracao': { bg: 'hover:bg-emerald-50', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', hoverBorder: 'hover:border-emerald-200' },
  'esporte-lazer': { bg: 'hover:bg-lime-50', iconBg: 'bg-lime-100', iconColor: 'text-lime-600', hoverBorder: 'hover:border-lime-200' },
  'pet-shop-veterinario': { bg: 'hover:bg-yellow-50', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-700', hoverBorder: 'hover:border-yellow-200' },
  'advocacia-contabilidade': { bg: 'hover:bg-indigo-50', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', hoverBorder: 'hover:border-indigo-200' },
  'construcao-civil': { bg: 'hover:bg-stone-50', iconBg: 'bg-stone-200', iconColor: 'text-stone-700', hoverBorder: 'hover:border-stone-300' },
  'fotografia-eventos': { bg: 'hover:bg-rose-50', iconBg: 'bg-rose-100', iconColor: 'text-rose-600', hoverBorder: 'hover:border-rose-200' },
  'supermercados-conveniencia': { bg: 'hover:bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600', hoverBorder: 'hover:border-green-200' },
}

const defaultColors = { bg: 'hover:bg-primary-50', iconBg: 'bg-primary-100', iconColor: 'text-primary-600', hoverBorder: 'hover:border-primary-200' }

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Explore por Categoria
          </h2>
          <p className="mt-2 text-base text-slate-500">
            Encontre exatamente o que você precisa
          </p>
        </div>

        {/* Mobile: Horizontal scroll / Desktop: Grid */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x-mandatory">
            {mockCategories.map((category) => {
              const colors = categoryColors[category.slug] || defaultColors
              return (
                <Link
                  key={category.id}
                  href={`/buscar?categoria=${category.slug}`}
                  className={`snap-start shrink-0 flex flex-col items-center gap-2.5 rounded-2xl bg-white border border-slate-100 p-4 w-24 ${colors.hoverBorder} ${colors.bg} transition-all duration-300 active:scale-95`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.iconBg}`}>
                    <CategoryIcon name={category.icon} className={`h-6 w-6 ${colors.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">
                    {category.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 stagger-children">
          {mockCategories.map((category) => {
            const colors = categoryColors[category.slug] || defaultColors
            return (
              <Link
                key={category.id}
                href={`/buscar?categoria=${category.slug}`}
                className={`group flex flex-col items-center gap-3 rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 ${colors.hoverBorder} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${colors.bg}`}
              >
                <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl ${colors.iconBg} group-hover:scale-105 transition-all duration-300`}>
                  <CategoryIcon name={category.icon} className={`h-6 w-6 sm:h-7 sm:w-7 ${colors.iconColor}`} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 text-center leading-tight group-hover:text-slate-900 transition-colors">
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/categorias"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Ver todas as categorias
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
