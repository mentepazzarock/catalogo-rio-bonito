'use client'

import { useState } from 'react'
import { Star, MessageSquare, Send } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'

import type { Review } from '@/types/database'

interface AvaliacoesClientProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export function AvaliacoesClient({ reviews, averageRating, totalReviews }: AvaliacoesClientProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Avaliacoes</h2>
        <p className="text-sm text-slate-500 mt-0.5">Gerencie as avaliacoes dos seus clientes</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-slate-900">{averageRating.toFixed(1)}</div>
            <StarRating rating={averageRating} size={18} />
            <div className="text-xs text-slate-500 mt-1">{totalReviews} avaliacoes</div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
              return (
                <div key={stars} className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500 w-3">{stars}</span>
                  <Star className="h-3 w-3 text-warm-400 fill-warm-400" />
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-warm-400 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-xs text-slate-400 w-8 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => {
          const userName = review.user_name || 'Usuario'
          const reply = review.reply
          return (
            <div key={review.id} className="rounded-2xl bg-white border border-slate-200 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                  {userName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-slate-900">{userName}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={review.rating} size={14} />
                        <span className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  {review.comment && <p className="text-sm text-slate-600 mt-2">{review.comment}</p>}

                  {reply ? (
                    <div className="mt-3 rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <MessageSquare className="h-3 w-3 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-500">Sua resposta</span>
                      </div>
                      <p className="text-sm text-slate-600">{reply}</p>
                    </div>
                  ) : (
                    <>
                      {replyingTo === review.id ? (
                        <div className="mt-3 flex gap-2">
                          <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Escreva sua resposta..." className="flex-1 rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                          <button className="flex items-center gap-1 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors">
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setReplyingTo(review.id)} className="mt-2 text-xs font-semibold text-primary-600 hover:text-primary-700">Responder</button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white border border-slate-200">
          <Star className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">Nenhuma avaliacao ainda</h3>
          <p className="text-sm text-slate-500">Quando seus clientes avaliarem, aparecera aqui</p>
        </div>
      )}
    </div>
  )
}
