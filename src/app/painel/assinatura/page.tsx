import { Check, CreditCard, Calendar, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { mockBusinesses } from '@/lib/mock-data'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export default function AssinaturaPage() {
  const business = mockBusinesses[0]
  const currentPlan = SUBSCRIPTION_PLANS[business.subscription_plan]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Assinatura</h2>
        <p className="text-sm text-slate-500 mt-0.5">Gerencie seu plano e pagamento</p>
      </div>

      {/* Current Plan */}
      <div className="rounded-2xl bg-white border border-primary-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">Plano {currentPlan.name}</h3>
              <Badge variant="success">Ativo</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              {formatCurrency(currentPlan.price)}/mês
            </p>
          </div>
          <CreditCard className="h-8 w-8 text-primary-400" />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>Próximo vencimento: {business.subscription_expires_at ? new Date(business.subscription_expires_at).toLocaleDateString('pt-BR') : 'N/A'}</span>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Recursos incluídos:</h4>
          <ul className="space-y-1.5">
            {currentPlan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                <Check className="h-4 w-4 text-accent-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upgrade Options */}
      {business.subscription_plan !== 'pro' && (
        <div className="rounded-2xl bg-gradient-to-br from-warm-50 to-warm-100/50 border border-warm-200 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-warm-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Turbine seu negócio!</h3>
              <p className="text-sm text-slate-600 mb-3">
                Faça upgrade do seu plano e tenha acesso a mais recursos para atrair clientes.
              </p>
              <div className="flex flex-wrap gap-3">
                {(Object.entries(SUBSCRIPTION_PLANS) as [string, typeof currentPlan][])
                  .filter(([key]) => {
                    const planOrder = { basic: 0, premium: 1, pro: 2 }
                    return planOrder[key as keyof typeof planOrder] > planOrder[business.subscription_plan]
                  })
                  .map(([key, plan]) => (
                    <button
                      key={key}
                      className="rounded-xl bg-warm-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-warm-600 transition-colors shadow-sm"
                    >
                      Upgrade para {plan.name} - {formatCurrency(plan.price)}/mês
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Plans Comparison */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Comparativo de Planos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 pr-4 font-semibold text-slate-700">Recurso</th>
                {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
                  <th key={key} className={`text-center py-3 px-3 font-semibold ${
                    key === business.subscription_plan ? 'text-primary-700' : 'text-slate-700'
                  }`}>
                    {plan.name}
                    <br />
                    <span className="text-xs font-normal text-slate-500">{formatCurrency(plan.price)}/mês</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Perfil completo', true, true, true],
                ['Fotos', '5', '15', 'Ilimitado'],
                ['Produtos/Serviços', '10', '30', 'Ilimitado'],
                ['Destaque nas buscas', false, true, true],
                ['Promoções e cupons', false, true, true],
                ['Selo verificado', false, true, true],
                ['Destaque na home', false, false, true],
                ['Agendamento online', false, false, true],
                ['Estatísticas', false, true, true],
                ['Suporte prioritário', false, false, true],
              ].map(([feature, ...values], i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 pr-4 text-slate-600">{feature as string}</td>
                  {values.map((val, j) => (
                    <td key={j} className="text-center py-2.5 px-3">
                      {val === true ? (
                        <Check className="h-4 w-4 text-accent-500 mx-auto" />
                      ) : val === false ? (
                        <span className="text-slate-300">-</span>
                      ) : (
                        <span className="text-slate-700 font-medium">{val as string}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
