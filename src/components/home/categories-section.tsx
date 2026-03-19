import Link from 'next/link'
import { CategoryIcon } from '@/components/ui/icon-map'
import { mockCategories } from '@/lib/mock-data'

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

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 stagger-children">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/buscar?categoria=${category.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 hover:border-primary-200 hover:shadow-md hover:shadow-primary-50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 group-hover:bg-primary-100 group-hover:scale-105 transition-all duration-300">
                <CategoryIcon name={category.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 text-center leading-tight group-hover:text-primary-600 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
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
