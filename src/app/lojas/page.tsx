import type { Metadata } from 'next'
import { Store } from 'lucide-react'
import { BusinessListPage } from '@/components/shared/business-list-page'
import { getStores } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Lojas Físicas',
  description: 'Encontre as melhores lojas físicas de Rio Bonito, RJ. Restaurantes, boutiques, pet shops e mais.',
}

export default function LojasPage() {
  const stores = getStores()

  return (
    <BusinessListPage
      businesses={stores}
      title="Lojas Físicas"
      subtitle="Restaurantes, boutiques, mercados e muito mais"
      icon={<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100"><Store className="h-6 w-6 text-primary-600" /></div>}
      emptyMessage="Tente buscar com termos diferentes ou remova os filtros"
    />
  )
}
