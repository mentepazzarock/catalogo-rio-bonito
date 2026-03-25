import { requireBusinessOwner } from '@/lib/dal'
import { getBusinessesByOwner } from '@/lib/queries'
import { AvaliacoesClient } from './avaliacoes-client'

export default async function AvaliacoesPage() {
  const { user } = await requireBusinessOwner()
  const businesses = await getBusinessesByOwner(user.id)
  const business = businesses[0]

  if (!business) {
    return <div className="text-center py-12 text-slate-500">Nenhum negocio encontrado.</div>
  }

  return (
    <AvaliacoesClient
      reviews={business.reviews}
      averageRating={business.average_rating}
      totalReviews={business.total_reviews}
    />
  )
}
