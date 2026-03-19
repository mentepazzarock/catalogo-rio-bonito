'use client'

import { Flag, Check, Trash2, Eye, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { mockBusinesses } from '@/lib/mock-data'
import { EmptyState } from '@/components/shared/empty-state'

export default function AdminModeracaoPage() {
  const allReviews = mockBusinesses.flatMap((b) =>
    b.reviews.map((r) => ({ ...r, businessName: b.name, businessSlug: b.slug }))
  )

  const reported = allReviews.filter((r) => r.is_reported)
  const recent = allReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Moderação</h1>
        <p className="text-sm text-slate-500">Gerencie avaliações e conteúdo reportado</p>
      </div>

      {/* Reported Reviews */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flag className="h-5 w-5 text-red-500" />
          <h3 className="text-base font-bold text-slate-900">Avaliações Denunciadas ({reported.length})</h3>
        </div>
        {reported.length > 0 ? (
          <div className="space-y-4">
            {reported.map((review) => (
              <div key={review.id} className="p-4 rounded-xl border border-red-200 bg-red-50/50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{review.user_name}</span>
                      <StarRating rating={review.rating} size={12} />
                    </div>
                    <span className="text-xs text-slate-500">em {review.businessName}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent-100 text-accent-600" title="Aprovar">
                      <Check className="h-4 w-4" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-100 text-red-600" title="Remover">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Flag}
            title="Nenhuma denúncia"
            description="Não há avaliações denunciadas no momento"
          />
        )}
      </div>

      {/* All Reviews */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-primary-500" />
          <h3 className="text-base font-bold text-slate-900">Todas as Avaliações ({recent.length})</h3>
        </div>
        <div className="space-y-3">
          {recent.map((review) => (
            <div key={review.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold">
                {review.user_name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{review.user_name}</span>
                  <StarRating rating={review.rating} size={12} />
                  <span className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
                <span className="text-xs text-primary-600 font-medium">{review.businessName}</span>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{review.comment}</p>
                {review.reply && (
                  <div className="mt-1 text-xs text-slate-500 bg-slate-50 rounded-lg p-2">
                    <strong>Resposta:</strong> {review.reply}
                  </div>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
