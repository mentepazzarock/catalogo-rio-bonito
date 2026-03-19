import { CreditCard, TrendingUp, AlertTriangle, Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { mockBusinesses, mockPayments } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'

export default function AdminAssinaturasPage() {
  const totalMRR = mockBusinesses.reduce((acc, b) => acc + SUBSCRIPTION_PLANS[b.subscription_plan].price, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Assinaturas & Pagamentos</h1>
        <p className="text-sm text-slate-500">Controle financeiro da plataforma</p>
      </div>

      {/* Revenue cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 p-5 text-white">
          <CreditCard className="h-8 w-8 mb-2 opacity-80" />
          <div className="text-3xl font-extrabold">{formatCurrency(totalMRR)}</div>
          <div className="text-sm opacity-80">MRR Total</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <TrendingUp className="h-8 w-8 text-primary-500 mb-2" />
          <div className="text-3xl font-extrabold text-slate-900">{mockBusinesses.length}</div>
          <div className="text-sm text-slate-500">Assinaturas ativas</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <AlertTriangle className="h-8 w-8 text-warm-500 mb-2" />
          <div className="text-3xl font-extrabold text-slate-900">0</div>
          <div className="text-sm text-slate-500">Pagamentos pendentes</div>
        </div>
      </div>

      {/* Subscribers table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Todas as Assinaturas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Negócio</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Plano</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Valor</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Vencimento</th>
              </tr>
            </thead>
            <tbody>
              {mockBusinesses.map((b) => (
                <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-medium text-slate-900">{b.name}</td>
                  <td className="px-5 py-3">
                    <Badge variant={b.subscription_plan === 'pro' ? 'warning' : b.subscription_plan === 'premium' ? 'info' : 'outline'}>
                      {SUBSCRIPTION_PLANS[b.subscription_plan].name}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 font-semibold text-slate-900">
                    {formatCurrency(SUBSCRIPTION_PLANS[b.subscription_plan].price)}/mês
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={b.subscription_status === 'active' ? 'success' : b.subscription_status === 'trial' ? 'warning' : 'danger'}>
                      {b.subscription_status === 'active' ? 'Ativo' : b.subscription_status === 'trial' ? 'Trial' : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {b.subscription_expires_at ? new Date(b.subscription_expires_at).toLocaleDateString('pt-BR') : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Histórico de Pagamentos</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {mockPayments.map((p) => {
            const business = mockBusinesses.find(b => b.id === p.business_id)
            return (
              <div key={p.id} className="flex items-center gap-4 px-5 py-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${p.status === 'paid' ? 'bg-accent-100' : 'bg-red-100'}`}>
                  {p.status === 'paid' ? <Check className="h-4 w-4 text-accent-600" /> : <X className="h-4 w-4 text-red-600" />}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-slate-900">{business?.name}</span>
                  <span className="block text-xs text-slate-400">{p.description} - {p.payment_method?.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900">{formatCurrency(p.amount)}</span>
                  <span className="block text-xs text-slate-400">{new Date(p.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
