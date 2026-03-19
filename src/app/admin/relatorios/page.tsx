import { BarChart3, TrendingUp, Search, Eye, MessageCircle, Phone } from 'lucide-react'
import { mockBusinesses, mockAdminStats } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

export default function AdminRelatoriosPage() {
  const topViewed = [...mockBusinesses].sort((a, b) => b.total_views - a.total_views).slice(0, 5)
  const topRated = [...mockBusinesses].sort((a, b) => b.average_rating - a.average_rating).slice(0, 5)
  const topWhatsapp = [...mockBusinesses].sort((a, b) => b.total_whatsapp_clicks - a.total_whatsapp_clicks).slice(0, 5)

  const topSearches = [
    { query: 'restaurante', count: 234 },
    { query: 'cabeleireiro', count: 189 },
    { query: 'dentista', count: 156 },
    { query: 'mecânico', count: 134 },
    { query: 'pet shop', count: 98 },
    { query: 'eletricista', count: 87 },
    { query: 'academia', count: 76 },
    { query: 'moda feminina', count: 65 },
  ]

  const categoryDistribution = mockBusinesses.reduce((acc, b) => {
    const cat = b.categories[0]?.name || 'Sem categoria'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Relatórios</h1>
        <p className="text-sm text-slate-500">Análises e métricas da plataforma</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Views', value: mockBusinesses.reduce((a, b) => a + b.total_views, 0).toLocaleString(), icon: Eye },
          { label: 'Cliques WhatsApp', value: mockBusinesses.reduce((a, b) => a + b.total_whatsapp_clicks, 0).toLocaleString(), icon: MessageCircle },
          { label: 'Cliques Telefone', value: mockBusinesses.reduce((a, b) => a + b.total_phone_clicks, 0).toLocaleString(), icon: Phone },
          { label: 'Receita Acumulada', value: formatCurrency(mockAdminStats.monthly_revenue * 6), icon: TrendingUp },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-5">
            <s.icon className="h-6 w-6 text-primary-500 mb-2" />
            <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Viewed */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary-500" />
            Mais Visualizados
          </h3>
          <div className="space-y-3">
            {topViewed.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-slate-300 w-6 text-center">{i + 1}</span>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-slate-900">{b.name}</span>
                  <span className="block text-xs text-slate-400">{b.categories[0]?.name}</span>
                </div>
                <span className="text-sm font-bold text-primary-600">{b.total_views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-warm-500" />
            Melhor Avaliados
          </h3>
          <div className="space-y-3">
            {topRated.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-slate-300 w-6 text-center">{i + 1}</span>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-slate-900">{b.name}</span>
                  <span className="block text-xs text-slate-400">{b.total_reviews} avaliações</span>
                </div>
                <span className="text-sm font-bold text-warm-600">{b.average_rating} ★</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Searches */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-accent-500" />
            Termos Mais Buscados
          </h3>
          <div className="space-y-2">
            {topSearches.map((s, i) => (
              <div key={s.query} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-6 text-center">{i + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">&ldquo;{s.query}&rdquo;</span>
                    <span className="text-xs text-slate-500">{s.count} buscas</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-400 rounded-full" style={{ width: `${(s.count / topSearches[0].count) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            Negócios por Categoria
          </h3>
          <div className="space-y-2">
            {Object.entries(categoryDistribution).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{cat}</span>
                    <span className="text-xs font-bold text-slate-900">{count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(count / mockBusinesses.length) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
