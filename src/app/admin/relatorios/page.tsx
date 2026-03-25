import { BarChart3, TrendingUp, Eye, MessageCircle, Phone } from 'lucide-react'
import { requireAdmin } from '@/lib/dal'
import { getAllBusinesses, getAdminStats } from '@/lib/queries'

export default async function AdminRelatoriosPage() {
  await requireAdmin()
  const [businesses, stats] = await Promise.all([
    getAllBusinesses(),
    getAdminStats(),
  ])

  const topViewed = [...businesses].sort((a, b) => b.total_views - a.total_views).slice(0, 5)
  const topRated = [...businesses].sort((a, b) => b.average_rating - a.average_rating).slice(0, 5)
  const topWhatsapp = [...businesses].sort((a, b) => b.total_whatsapp_clicks - a.total_whatsapp_clicks).slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Relatorios</h1>
        <p className="text-sm text-slate-500">Analise de desempenho da plataforma</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Negocios', value: stats.totalBusinesses },
          { label: 'Total Usuarios', value: stats.totalUsers },
          { label: 'Total Avaliacoes', value: stats.totalReviews },
          { label: 'Pendentes', value: stats.pendingBusinesses },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Viewed */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-5 w-5 text-primary-500" />
            <h3 className="text-base font-bold text-slate-900">Mais Visualizados</h3>
          </div>
          <div className="space-y-3">
            {topViewed.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 w-5">{i + 1}</span>
                <span className="flex-1 text-sm font-medium text-slate-900 truncate">{b.name}</span>
                <span className="text-sm font-bold text-primary-600">{b.total_views}</span>
              </div>
            ))}
            {topViewed.length === 0 && <p className="text-sm text-slate-500">Sem dados.</p>}
          </div>
        </div>

        {/* Top Rated */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-warm-500" />
            <h3 className="text-base font-bold text-slate-900">Melhor Avaliados</h3>
          </div>
          <div className="space-y-3">
            {topRated.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 w-5">{i + 1}</span>
                <span className="flex-1 text-sm font-medium text-slate-900 truncate">{b.name}</span>
                <span className="text-sm font-bold text-warm-600">{b.average_rating.toFixed(1)} ({b.total_reviews})</span>
              </div>
            ))}
            {topRated.length === 0 && <p className="text-sm text-slate-500">Sem dados.</p>}
          </div>
        </div>

        {/* Top WhatsApp */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="h-5 w-5 text-accent-500" />
            <h3 className="text-base font-bold text-slate-900">Mais WhatsApp Clicks</h3>
          </div>
          <div className="space-y-3">
            {topWhatsapp.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 w-5">{i + 1}</span>
                <span className="flex-1 text-sm font-medium text-slate-900 truncate">{b.name}</span>
                <span className="text-sm font-bold text-accent-600">{b.total_whatsapp_clicks}</span>
              </div>
            ))}
            {topWhatsapp.length === 0 && <p className="text-sm text-slate-500">Sem dados.</p>}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Distribuicao por Categoria</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(() => {
            const catMap = new Map<string, number>()
            businesses.forEach((b) => b.categories.forEach((c) => catMap.set(c.name, (catMap.get(c.name) || 0) + 1)))
            return Array.from(catMap.entries()).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
              <div key={name} className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="text-lg font-extrabold text-slate-900">{count}</div>
                <div className="text-xs text-slate-500">{name}</div>
              </div>
            ))
          })()}
        </div>
      </div>
    </div>
  )
}
