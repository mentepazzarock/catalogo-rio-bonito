'use client'

import { useState } from 'react'
import { Search, BadgeCheck, Eye, Ban, Star, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'
import type { BusinessWithDetails } from '@/types/database'

interface NegociosClientProps {
  businesses: BusinessWithDetails[]
}

export function NegociosClient({ businesses }: NegociosClientProps) {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'store' | 'service_provider'>('all')
  const [filterPlan, setFilterPlan] = useState<string>('all')

  const filtered = businesses.filter((b) => {
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterType !== 'all' && b.type !== filterType) return false
    if (filterPlan !== 'all' && b.subscription_plan !== filterPlan) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Gerenciar Negocios</h1>
          <p className="text-sm text-slate-500">{businesses.length} negocios cadastrados</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar negocio..." className="w-full rounded-xl bg-white border border-slate-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value as typeof filterType)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:outline-none">
          <option value="all">Todos os tipos</option>
          <option value="store">Lojas</option>
          <option value="service_provider">Servicos</option>
        </select>
        <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:outline-none">
          <option value="all">Todos os planos</option>
          <option value="basic">Basico</option>
          <option value="premium">Premium</option>
          <option value="pro">Profissional</option>
        </select>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Negocio</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Categoria</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Plano</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Status</th>
                <th className="text-center px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Views</th>
                <th className="text-center px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Avaliacao</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((business) => (
                <tr key={business.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-bold shrink-0 ${business.is_featured ? 'bg-primary-600' : 'bg-slate-600'}`}>{business.name[0]}</div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-900">{business.name}</span>
                          {business.is_verified && <BadgeCheck className="h-4 w-4 text-primary-500" />}
                          {business.is_featured && <Star className="h-3.5 w-3.5 text-warm-500 fill-warm-500" />}
                        </div>
                        <span className="text-xs text-slate-400">{business.neighborhood} - {business.type === 'store' ? 'Loja' : 'Servico'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-sm text-slate-600">{business.categories[0]?.name}</span></td>
                  <td className="px-5 py-4">
                    <Badge variant={business.subscription_plan === 'pro' ? 'warning' : business.subscription_plan === 'premium' ? 'info' : 'outline'} size="md">
                      {(SUBSCRIPTION_PLANS[business.subscription_plan] || SUBSCRIPTION_PLANS.basic).name}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <Badge variant={business.is_active ? 'success' : 'danger'} size="sm">{business.is_active ? 'Ativo' : 'Inativo'}</Badge>
                      <Badge variant={business.is_approved ? 'success' : 'warning'} size="sm">{business.is_approved ? 'Aprovado' : 'Pendente'}</Badge>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center"><span className="font-semibold text-slate-700">{business.total_views}</span></td>
                  <td className="px-5 py-4 text-center"><span className="font-semibold text-slate-900">{business.average_rating}</span><span className="text-xs text-slate-400"> ({business.total_reviews})</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-colors" title="Ver"><Eye className="h-4 w-4" /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-accent-50 hover:text-accent-600 transition-colors" title="Verificar"><BadgeCheck className="h-4 w-4" /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-warm-50 hover:text-warm-600 transition-colors" title="Destacar"><Zap className="h-4 w-4" /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Suspender"><Ban className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-8 text-slate-500 text-sm">Nenhum negocio encontrado.</div>}
      </div>
    </div>
  )
}
