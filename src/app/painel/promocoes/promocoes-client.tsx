'use client'

import { useState } from 'react'
import { Plus, Tag, Eye, BarChart3, Pencil, Trash2, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/empty-state'
import { formatCurrency } from '@/lib/utils'

import type { Promotion } from '@/types/database'

interface PromocoesClientProps {
  promotions: Promotion[]
  businessId: string
}

export function PromocoesClient({ promotions, businessId }: PromocoesClientProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Promocoes</h2>
          <p className="text-sm text-slate-500">Crie cupons e ofertas exclusivas</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-accent-600 transition-colors">
          <Plus className="h-4 w-4" />Nova Promocao
        </button>
      </div>

      {showForm && (
        <form className="rounded-2xl bg-white border border-accent-200 p-6 animate-scale-in">
          <h3 className="text-base font-bold text-slate-900 mb-4">Nova Promocao</h3>
          <input type="hidden" name="business_id" value={businessId} />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Titulo</label>
              <input name="title" type="text" required placeholder="Ex: 10% OFF no Buffet" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Descricao</label>
              <textarea name="description" rows={2} placeholder="Descreva a promocao..." className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipo de Desconto</label>
              <select name="discount_type" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none">
                <option value="percentage">Porcentagem (%)</option>
                <option value="fixed">Valor Fixo (R$)</option>
                <option value="coupon">Cupom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Valor do Desconto</label>
              <input name="discount_value" type="number" required placeholder="10" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Codigo do Cupom (opcional)</label>
              <input name="coupon_code" type="text" placeholder="PROMO10" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 uppercase" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Data Inicio</label>
              <input name="start_date" type="date" required className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Data Fim</label>
              <input name="end_date" type="date" required className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="rounded-xl bg-accent-500 px-6 py-3 text-sm font-bold text-white hover:bg-accent-600">Criar Promocao</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200">Cancelar</button>
            </div>
          </div>
        </form>
      )}

      {promotions.length > 0 ? (
        <div className="space-y-4">
          {promotions.map((promo) => (
            <div key={promo.id} className="rounded-2xl bg-white border border-slate-200 p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Tag className="h-4 w-4 text-accent-500" />
                    <h3 className="text-base font-bold text-slate-900">{promo.title}</h3>
                    <Badge variant={promo.is_active ? 'success' : 'default'}>{promo.is_active ? 'Ativa' : 'Inativa'}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">{promo.description}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><Pencil className="h-4 w-4" /></button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <Badge variant="success" size="sm">
                  {promo.discount_type === 'percentage' ? `${promo.discount_value ?? 0}% OFF` : promo.discount_type === 'fixed' ? `${formatCurrency(promo.discount_value ?? 0)} OFF` : 'Cupom'}
                </Badge>
                {promo.coupon_code ? <code className="rounded-md bg-accent-100 px-2 py-0.5 text-xs font-bold text-accent-700">{promo.coupon_code}</code> : null}
                {promo.starts_at && (
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(promo.starts_at).toLocaleDateString('pt-BR')} - {new Date(promo.ends_at).toLocaleDateString('pt-BR')}</span>
                )}
                {promo.total_views != null && <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{promo.total_views} views</span>}
                {promo.total_redemptions != null && <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" />{promo.total_redemptions} resgates</span>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={Tag} title="Nenhuma promocao" description="Crie promocoes e cupons para atrair mais clientes" />
      )}
    </div>
  )
}
