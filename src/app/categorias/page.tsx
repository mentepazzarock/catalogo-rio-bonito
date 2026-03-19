import type { Metadata } from 'next'
import Link from 'next/link'
import { CategoryIcon } from '@/components/ui/icon-map'
import { mockCategories, mockBusinesses } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Categorias',
  description: 'Explore todas as categorias de lojas e serviços em Rio Bonito, RJ',
}

export default function CategoriesPage() {
  const categoriesWithCount = mockCategories.map((cat) => ({
    ...cat,
    count: mockBusinesses.filter((b) => b.categories.some((c) => c.id === cat.id)).length,
  }))

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Todas as Categorias
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Encontre lojas e profissionais por área de atuação
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {categoriesWithCount.map((category) => (
            <Link
              key={category.id}
              href={`/buscar?categoria=${category.slug}`}
              className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-100 p-5 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-50/50 transition-all duration-300"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 group-hover:bg-primary-100 group-hover:scale-105 transition-all duration-300">
                <CategoryIcon name={category.icon} className="h-7 w-7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-500 truncate">{category.description}</p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center justify-center h-8 min-w-[2rem] rounded-full bg-slate-100 px-2.5 text-sm font-bold text-slate-600 group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
                  {category.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
