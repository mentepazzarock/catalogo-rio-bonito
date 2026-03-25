import { Flag, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { EmptyState } from '@/components/shared/empty-state'
import { requireAdmin } from '@/lib/dal'
import { getAllReviews } from '@/lib/queries'

export default async function AdminModeracaoPage() {
  await requireAdmin()
  const allReviews = await getAllReviews()
  const reportedReviews = allReviews.filter((r: Record<string, unknown>) => r.is_reported)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Moderacao</h1>
        <p className="text-sm text-slate-500">{reportedReviews.length} avaliacoes denunciadas</p>
      </div>

      {reportedReviews.length > 0 ? (
        <div className="space-y-4">
          {reportedReviews.map((review: Record<string, unknown>) => {
            const business = review.business as Record<string, unknown> | null
            return (
              <div key={review.id as string} className="rounded-2xl bg-white border border-red-200 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Flag className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-bold text-slate-900">Avaliacao denunciada</span>
                      <Badge variant="danger" size="sm">Pendente</Badge>
                    </div>
                    {business && <p className="text-xs text-slate-500">Negocio: {business.name as string}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-accent-50 px-3 py-1.5 text-xs font-semibold text-accent-700 hover:bg-accent-100">Aprovar</button>
                    <button className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">Remover</button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={review.rating as number} size={14} />
                  <span className="text-xs text-slate-400">{new Date(review.created_at as string).toLocaleDateString('pt-BR')}</span>
                </div>
                {review.comment ? <p className="text-sm text-slate-600">{review.comment as string}</p> : null}
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState icon={Star} title="Nenhuma denuncia" description="Nao ha avaliacoes denunciadas para moderar" />
      )}

      {/* All recent reviews */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Avaliacoes Recentes ({allReviews.length})</h3>
        <div className="space-y-3">
          {allReviews.slice(0, 10).map((review: Record<string, unknown>) => {
            const business = review.business as Record<string, unknown> | null
            return (
              <div key={review.id as string} className="flex items-center gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating as number} size={12} />
                    {business && <span className="text-xs text-slate-500 truncate">{business.name as string}</span>}
                  </div>
                  {review.comment ? <p className="text-xs text-slate-600 truncate mt-0.5">{review.comment as string}</p> : null}
                </div>
                <span className="text-xs text-slate-400 shrink-0">{new Date(review.created_at as string).toLocaleDateString('pt-BR')}</span>
              </div>
            )
          })}
          {allReviews.length === 0 && <p className="text-sm text-slate-500">Nenhuma avaliacao.</p>}
        </div>
      </div>
    </div>
  )
}
