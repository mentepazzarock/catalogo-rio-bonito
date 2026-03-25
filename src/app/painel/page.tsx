import { Eye, MessageCircle, Star, TrendingUp } from 'lucide-react'
import { requireBusinessOwner } from '@/lib/dal'
import { getBusinessesByOwner } from '@/lib/queries'
import { redirect } from 'next/navigation'

export default async function PainelPage() {
  const { user } = await requireBusinessOwner()
  const businesses = await getBusinessesByOwner(user.id)

  if (businesses.length === 0) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
          <h2 className="text-xl font-bold mb-1">Bem-vindo!</h2>
          <p className="text-primary-100 text-sm">
            Voce ainda nao possui um negocio cadastrado. Entre em contato com o administrador para registrar seu negocio.
          </p>
        </div>
      </div>
    )
  }

  const business = businesses[0]

  const stats = [
    { label: 'Visualizacoes', value: business.total_views.toLocaleString(), change: '', icon: Eye, color: 'bg-primary-50 text-primary-600' },
    { label: 'Cliques WhatsApp', value: business.total_whatsapp_clicks.toLocaleString(), change: '', icon: MessageCircle, color: 'bg-accent-50 text-accent-600' },
    { label: 'Avaliacoes', value: String(business.total_reviews), change: '', icon: Star, color: 'bg-warm-50 text-warm-600' },
    { label: 'Nota Media', value: business.average_rating.toFixed(1), change: '', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
        <h2 className="text-xl font-bold mb-1">Bem-vindo de volta!</h2>
        <p className="text-primary-100 text-sm">
          Aqui esta um resumo do seu negocio <strong>{business.name}</strong> este mes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Reviews */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Ultimas Avaliacoes</h3>
        {business.reviews.length > 0 ? (
          <div className="space-y-4">
            {business.reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold">
                  {review.user_name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{review.user_name}</span>
                    <span className="text-xs text-slate-400">
                      {'★'.repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{review.comment}</p>
                  {review.reply && (
                    <div className="mt-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-2">
                      <strong>Sua resposta:</strong> {review.reply}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Nenhuma avaliacao ainda.</p>
        )}
      </div>

      {/* Quick Tips */}
      <div className="rounded-2xl bg-warm-50 border border-warm-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-2">Dicas para seu perfil</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-warm-500">1.</span>
            Adicione fotos profissionais do seu negocio para atrair mais clientes
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warm-500">2.</span>
            Mantenha seus horarios e precos sempre atualizados
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warm-500">3.</span>
            Responda as avaliacoes dos clientes para mostrar atencao e cuidado
          </li>
        </ul>
      </div>
    </div>
  )
}
