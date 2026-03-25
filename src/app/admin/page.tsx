import { Store, Users, Star, DollarSign, TrendingUp, AlertCircle, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/dal'
import { getAdminStats, getAllBusinesses, getAllPayments } from '@/lib/queries'
import { formatCurrency } from '@/lib/utils'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'

export default async function AdminDashboard() {
  const { user, profile } = await requireAdmin()
  const [stats, businesses, payments] = await Promise.all([
    getAdminStats(),
    getAllBusinesses(),
    getAllPayments(),
  ])

  const pendingReviews = businesses.flatMap(b => b.reviews).filter(r => r.is_reported).length
  const recentBusinesses = businesses.slice(0, 8)

  const planDistribution = {
    basic: businesses.filter(b => b.subscription_plan === 'basic').length,
    premium: businesses.filter(b => b.subscription_plan === 'premium').length,
    pro: businesses.filter(b => b.subscription_plan === 'pro').length,
  }

  const activeBusinesses = businesses.filter(b => b.is_active).length
  const pendingApproval = businesses.filter(b => !b.is_approved).length
  const activeSubscriptions = businesses.filter(b => b.subscription_status === 'active').length
  const monthlyRevenue = businesses.reduce((acc, b) => acc + SUBSCRIPTION_PLANS[b.subscription_plan].price, 0)
  const newThisMonth = businesses.filter(b => {
    const d = new Date(b.created_at)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Visao geral da plataforma</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Negocios Ativos', value: activeBusinesses, icon: Store, color: 'bg-primary-50 text-primary-600', change: `+${newThisMonth} este mes` },
          { label: 'Receita Mensal (MRR)', value: formatCurrency(monthlyRevenue), icon: DollarSign, color: 'bg-accent-50 text-accent-600', change: '+15% vs mes anterior' },
          { label: 'Assinaturas Ativas', value: activeSubscriptions, icon: TrendingUp, color: 'bg-purple-50 text-purple-600', change: `Total: ${stats.totalBusinesses}` },
          { label: 'Total de Avaliacoes', value: stats.totalReviews, icon: Star, color: 'bg-warm-50 text-warm-600', change: `${stats.totalUsers} usuarios` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            <div className="text-[10px] text-slate-400 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Distribution + Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Plan Distribution */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">Distribuicao de Planos</h3>
          <div className="space-y-3">
            {[
              { name: 'Basico', count: planDistribution.basic, color: 'bg-slate-400', price: SUBSCRIPTION_PLANS.basic.price },
              { name: 'Premium', count: planDistribution.premium, color: 'bg-primary-500', price: SUBSCRIPTION_PLANS.premium.price },
              { name: 'Profissional', count: planDistribution.pro, color: 'bg-warm-500', price: SUBSCRIPTION_PLANS.pro.price },
            ].map((plan) => (
              <div key={plan.name} className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${plan.color}`} />
                <span className="text-sm text-slate-700 flex-1">{plan.name}</span>
                <span className="text-sm font-bold text-slate-900">{plan.count}</span>
                <span className="text-xs text-slate-400">{formatCurrency(plan.count * plan.price)}/mes</span>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-700">Total MRR</span>
              <span className="text-lg font-extrabold text-accent-600">{formatCurrency(monthlyRevenue)}</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">Atencao Necessaria</h3>
          <div className="space-y-3">
            {pendingApproval > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-warm-50 border border-warm-200">
                <Clock className="h-5 w-5 text-warm-600 shrink-0" />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-slate-900">{pendingApproval} negocios pendentes</span>
                  <p className="text-xs text-slate-500">Aguardando aprovacao</p>
                </div>
                <Badge variant="warning">Pendente</Badge>
              </div>
            )}
            {pendingReviews > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-slate-900">{pendingReviews} avaliacoes denunciadas</span>
                  <p className="text-xs text-slate-500">Necessitam moderacao</p>
                </div>
                <Badge variant="danger">Urgente</Badge>
              </div>
            )}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-accent-50 border border-accent-200">
              <TrendingUp className="h-5 w-5 text-accent-600 shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-900">Plataforma saudavel</span>
                <p className="text-xs text-slate-500">Todos os sistemas operacionais</p>
              </div>
              <Badge variant="success">OK</Badge>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">Ultimos Pagamentos</h3>
          <div className="space-y-3">
            {payments.slice(0, 5).map((payment: Record<string, unknown>) => (
              <div key={payment.id as string} className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${payment.status === 'paid' ? 'bg-accent-500' : 'bg-red-500'}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-slate-900 truncate block">
                    {(payment.business as Record<string, unknown>)?.name as string ?? 'N/A'}
                  </span>
                  <span className="text-xs text-slate-400">{payment.description as string}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-slate-900">{formatCurrency(payment.amount as number)}</span>
                  <span className="block text-[10px] text-accent-600">{(payment.payment_method as string)?.toUpperCase()}</span>
                </div>
              </div>
            ))}
            {payments.length === 0 && (
              <p className="text-sm text-slate-500">Nenhum pagamento registrado.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Businesses */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Negocios Recentes</h3>
          <a href="/admin/negocios" className="text-xs font-semibold text-primary-600 hover:text-primary-700">Ver todos</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">Negocio</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">Tipo</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">Plano</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">Status</th>
                <th className="text-right py-2 font-semibold text-slate-500 text-xs uppercase">Avaliacao</th>
              </tr>
            </thead>
            <tbody>
              {recentBusinesses.map((business) => (
                <tr key={business.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-700 text-xs font-bold shrink-0">
                        {business.name[0]}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">{business.name}</span>
                        <span className="block text-xs text-slate-400">{business.neighborhood}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant={business.type === 'store' ? 'info' : 'default'} size="sm">
                      {business.type === 'store' ? 'Loja' : 'Servico'}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={business.subscription_plan === 'pro' ? 'warning' : business.subscription_plan === 'premium' ? 'info' : 'outline'}
                      size="sm"
                    >
                      {business.subscription_plan === 'pro' ? 'Pro' : business.subscription_plan === 'premium' ? 'Premium' : 'Basico'}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant={business.is_active ? 'success' : 'danger'} size="sm">
                      {business.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <span className="font-semibold text-slate-900">{business.average_rating}</span>
                    <span className="text-slate-400"> ({business.total_reviews})</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
