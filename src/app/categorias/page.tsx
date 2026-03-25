import type { Metadata } from 'next'
import Link from 'next/link'
import { CategoryIcon } from '@/components/ui/icon-map'
import { getCategories } from '@/lib/queries'
import { getCategoryColors } from '@/lib/category-colors'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper'

export const metadata: Metadata = {
  title: 'Categorias',
  description: 'Explore todas as categorias de lojas e serviços em Rio Bonito, RJ',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <MotionWrapper variant="fade-up" delay={0}>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Todas as Categorias
            </h1>
            <p className="mt-2 text-base text-slate-500">
              Encontre lojas e profissionais por área de atuação
            </p>
          </div>
        </MotionWrapper>

        {categories.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const colors = getCategoryColors(category.slug)
              return (
                <StaggerItem key={category.id}>
                  <Link
                    href={`/buscar?categoria=${category.slug}`}
                    className={`group flex items-center gap-4 rounded-2xl bg-white border border-slate-100 p-5 ${colors.border.replace('border-', 'hover:border-')} hover:shadow-xl transition-all duration-300`}
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colors.bg} ${colors.text} group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                      <CategoryIcon name={category.icon} className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base font-bold text-slate-900 ${colors.text.replace('text-', 'group-hover:text-')} transition-colors`}>
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-slate-500 truncate">{category.description}</p>
                      )}
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500">Nenhuma categoria encontrada.</p>
          </div>
        )}
      </div>
    </div>
  )
}
