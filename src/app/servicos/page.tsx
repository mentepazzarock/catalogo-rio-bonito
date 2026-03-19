import type { Metadata } from 'next'
import { Briefcase } from 'lucide-react'
import { BusinessListPage } from '@/components/shared/business-list-page'
import { getServiceProviders } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Prestadores de Serviço',
  description: 'Encontre os melhores profissionais e prestadores de serviço de Rio Bonito, RJ.',
}

export default function ServicosPage() {
  const providers = getServiceProviders()

  return (
    <BusinessListPage
      businesses={providers}
      title="Prestadores de Serviço"
      subtitle="Profissionais e especialistas da cidade"
      icon={<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-100"><Briefcase className="h-6 w-6 text-accent-600" /></div>}
      emptyMessage="Tente buscar com termos diferentes ou remova os filtros"
    />
  )
}
