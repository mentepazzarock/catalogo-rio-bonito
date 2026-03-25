import { requireBusinessOwner } from '@/lib/dal'
import { getBusinessesByOwner } from '@/lib/queries'
import { ProdutosClient } from './produtos-client'

export default async function ProdutosPage() {
  const { user } = await requireBusinessOwner()
  const businesses = await getBusinessesByOwner(user.id)
  const business = businesses[0]

  if (!business) {
    return <div className="text-center py-12 text-slate-500">Nenhum negocio encontrado.</div>
  }

  const isStore = business.type === 'store'
  const items = isStore ? business.products : business.services

  return <ProdutosClient items={items} isStore={isStore} businessId={business.id} />
}
