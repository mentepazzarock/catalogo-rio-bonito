import { Eye, MessageCircle, Phone, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { requireBusinessOwner } from '@/lib/dal'
import { getBusinessesByOwner, getBusinessViews } from '@/lib/queries'

export default async function PainelAnalyticsPage() {
  const { user } = await requireBusinessOwner()
  const businesses = await getBusinessesByOwner(user.id)

  if (businesses.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl bg-white border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-1">Nenhum negocio cadastrado</h3>
        <p className="text-sm text-slate-500">Cadastre um negocio para ver as analytics.</p>
      </div>
    )
  }

  const business = businesses[0]
  const views = await getBusinessViews(business.id, 30)

  // Compute stats from real views
  const totalViews = views.filter(v => v.event_type === 'view').length
  const whatsappClicks = views.filter(v => v.event_type === 'whatsapp_click').length
  const phoneClicks = views.filter(v => v.event_type === 'phone_click').length

  // Group views by day for the last 7 days
  const last7Days: { date: string; views: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const dayViews = views.filter(v => v.event_type === 'view' && v.created_at.startsWith(dateStr)).length
    last7Days.push({ date: dateStr, views: dayViews })
  }

  // Profile completeness estimate
  let completeness = 40
  if (business.phone) completeness += 10
  if (business.whatsapp) completeness += 10
  if (business.description && business.description.length > 50) completeness += 10
  if (business.photos && business.photos.length > 0) completeness += 15
  if (business.website) completeness += 5
  if (business.instagram) completeness += 5
  if (business.products.length > 0 || business.services.length > 0) completeness += 5
  if (completeness > 100) completeness = 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Analytics</h2>
        <p className="text-sm text-slate-500">Acompanhe o desempenho do seu negocio</p>
      </div>

      {/* Main metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Visualizacoes', value: totalViews || business.total_views, icon: Eye, color: 'bg-primary-50 text-primary-600' },
          { label: 'Cliques WhatsApp', value: whatsappClicks || business.total_whatsapp_clicks, icon: MessageCircle, color: 'bg-accent-50 text-accent-600' },
          { label: 'Cliques Telefone', value: phoneClicks || business.total_phone_clicks, icon: Phone, color: 'bg-purple-50 text-purple-600' },
          { label: 'Nota Media', value: business.average_rating.toFixed(1), icon: TrendingUp, color: 'bg-warm-50 text-warm-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color} mb-3`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Views chart (simplified bar chart) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Visualizacoes - Ultimos 7 dias</h3>
        <div className="flex items-end gap-2 h-40">
          {last7Days.map((day) => {
            const maxViews = Math.max(...last7Days.map(d => d.views), 1)
            const height = (day.views / maxViews) * 100
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-slate-700">{day.views}</span>
                <div className="w-full rounded-t-lg bg-primary-100 relative" style={{ height: `${Math.max(height, 4)}%` }}>
                  <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-400" />
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Profile completeness */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900">Completude do Perfil</h3>
          <span className="text-lg font-extrabold text-primary-600">{completeness}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all"
            style={{ width: `${completeness}%` }}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-600">Para completar seu perfil:</p>
          <ul className="space-y-1.5 text-sm text-slate-500">
            {!business.photos?.length && (
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-warm-400" />
                Adicione fotos do seu negocio
              </li>
            )}
            {!business.website && (
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-warm-400" />
                Adicione o link do seu site
              </li>
            )}
            {!business.instagram && (
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-warm-400" />
                Adicione seu Instagram
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
