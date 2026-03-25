import type { Metadata } from 'next'
import { Store } from 'lucide-react'
import { BusinessListPage } from '@/components/shared/business-list-page'
import { getBusinesses, getCategories } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Lojas Físicas',
  description: 'Encontre as melhores lojas físicas de Rio Bonito, RJ.',
}

export default async function LojasPage() {
  const [stores, categories] = await Promise.all([
    getBusinesses({ type: 'store' }),
    getCategories(),
  ])

  return (
    <BusinessListPage
      businesses={stores}
      categories={categories}
      title="Lojas Físicas"
      subtitle="Restaurantes, boutiques, mercados e muito mais"
      icon={<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100"><Store className="h-6 w-6 text-primary-600" /></div>}
      emptyMessage="Tente buscar com termos diferentes ou remova os filtros"
    />
  )
}
