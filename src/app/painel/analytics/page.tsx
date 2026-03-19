import { Eye, MessageCircle, Phone, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { mockBusinessDashboard } from '@/lib/mock-data'

export default function PainelAnalyticsPage() {
  const stats = mockBusinessDashboard

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Analytics</h2>
        <p className="text-sm text-slate-500">Acompanhe o desempenho do seu negócio</p>
      </div>

      {/* Main metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Visualizações', value: stats.total_views, change: stats.views_change, icon: Eye, color: 'bg-primary-50 text-primary-600' },
          { label: 'Cliques WhatsApp', value: stats.whatsapp_clicks, change: stats.whatsapp_change, icon: MessageCircle, color: 'bg-accent-50 text-accent-600' },
          { label: 'Cliques Telefone', value: stats.phone_clicks, change: stats.phone_change, icon: Phone, color: 'bg-purple-50 text-purple-600' },
          { label: 'Nota Média', value: stats.average_rating.toFixed(1), change: 0, icon: TrendingUp, color: 'bg-warm-50 text-warm-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color} mb-3`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-slate-500">{s.label}</span>
              {s.change !== 0 && (
                <span className={`flex items-center text-[10px] font-bold ${s.change > 0 ? 'text-accent-600' : 'text-red-500'}`}>
                  {s.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(s.change)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Views chart (simplified bar chart) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Visualizações - Últimos 7 dias</h3>
        <div className="flex items-end gap-2 h-40">
          {stats.daily_views.map((day) => {
            const maxViews = Math.max(...stats.daily_views.map(d => d.views))
            const height = (day.views / maxViews) * 100
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-slate-700">{day.views}</span>
                <div className="w-full rounded-t-lg bg-primary-100 relative" style={{ height: `${height}%` }}>
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
          <span className="text-lg font-extrabold text-primary-600">{stats.profile_completeness}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all"
            style={{ width: `${stats.profile_completeness}%` }}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-600">Para completar seu perfil:</p>
          <ul className="space-y-1.5 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-warm-400" />
              Adicione fotos do seu negócio
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-warm-400" />
              Preencha os atributos (Wi-Fi, estacionamento, etc.)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-warm-400" />
              Adicione o link do seu site
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
