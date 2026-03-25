import { CreditCard, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/dal'
import { getAllBusinesses, getAllPayments } from '@/lib/queries'
import { formatCurrency } from '@/lib/utils'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'

export default async function AdminAssinaturasPage() {
  await requireAdmin()
  const [businesses, payments] = await Promise.all([
    getAllBusinesses(),
    getAllPayments(),
  ])

  const totalMRR = businesses.reduce((acc, b) => acc + (SUBSCRIPTION_PLANS[b.subscription_plan]?.price || 0), 0)

  const planCounts = {
    basic: businesses.filter((b) => b.subscription_plan === 'basic').length,
    premium: businesses.filter((b) => b.subscription_plan === 'premium').length,
    pro: businesses.filter((b) => b.subscription_plan === 'pro').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Assinaturas</h1>
        <p className="text-sm text-slate-500">Gestao de planos e pagamentos</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
          <div className="text-2xl font-extrabold text-accent-600">{formatCurrency(totalMRR)}</div>
          <div className="text-xs text-slate-500">MRR Total</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
          <div className="text-2xl font-extrabold text-slate-900">{planCounts.basic}</div>
          <div className="text-xs text-slate-500">Basico</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
          <div className="text-2xl font-extrabold text-slate-900">{planCounts.premium}</div>
          <div className="text-xs text-slate-500">Premium</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
          <div className="text-2xl font-extrabold text-slate-900">{planCounts.pro}</div>
          <div className="text-xs text-slate-500">Profissional</div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Negocios por Plano</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 font-semibold text-slate-500 text-xs uppercase">Negocio</th>
                <th className="text-left py-3 font-semibold text-slate-500 text-xs uppercase">Plano</th>
                <th className="text-left py-3 font-semibold text-slate-500 text-xs uppercase">Status</th>
                <th className="text-right py-3 font-semibold text-slate-500 text-xs uppercase">Valor</th>
              </tr>
            </thead>
            <tbody>
              {businesses.slice(0, 20).map((b) => {
                const plan = SUBSCRIPTION_PLANS[b.subscription_plan] || SUBSCRIPTION_PLANS.basic
                return (
                  <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="py-3 font-medium text-slate-900">{b.name}</td>
                    <td className="py-3">
                      <Badge variant={b.subscription_plan === 'pro' ? 'warning' : b.subscription_plan === 'premium' ? 'info' : 'outline'} size="sm">{plan.name}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant={b.subscription_status === 'active' ? 'success' : 'danger'} size="sm">{b.subscription_status === 'active' ? 'Ativo' : 'Inativo'}</Badge>
                    </td>
                    <td className="py-3 text-right font-semibold text-slate-900">{formatCurrency(plan.price)}/mes</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Historico de Pagamentos</h3>
        {payments.length > 0 ? (
          <div className="space-y-3">
            {payments.map((p: Record<string, unknown>) => {
              const business = p.business as Record<string, unknown> | null
              return (
                <div key={p.id as string} className="flex items-center gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className={`h-2 w-2 rounded-full ${p.status === 'paid' ? 'bg-accent-500' : 'bg-red-500'}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-slate-900">{business?.name as string ?? 'N/A'}</span>
                    <span className="block text-xs text-slate-400">{p.description as string}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900">{formatCurrency(p.amount as number)}</span>
                    <span className="block text-xs text-slate-400">{new Date(p.created_at as string).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Nenhum pagamento registrado.</p>
        )}
      </div>
    </div>
  )
}
