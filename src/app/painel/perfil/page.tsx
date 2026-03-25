import { requireBusinessOwner } from '@/lib/dal'
import { getBusinessesByOwner } from '@/lib/queries'
import { PerfilClient } from './perfil-client'

export default async function PerfilPage() {
  const { user } = await requireBusinessOwner()
  const businesses = await getBusinessesByOwner(user.id)
  const business = businesses[0]

  if (!business) {
    return <div className="text-center py-12 text-slate-500">Nenhum negocio encontrado.</div>
  }

  return <PerfilClient business={business} />
}
