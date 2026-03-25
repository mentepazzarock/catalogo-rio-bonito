'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Star, GripVertical, Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

import type { Product, ServiceItem } from '@/types/database'

type Item = Product | ServiceItem

interface ProdutosClientProps {
  items: Item[]
  isStore: boolean
  businessId: string
}

export function ProdutosClient({ items, isStore, businessId }: ProdutosClientProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">{isStore ? 'Produtos' : 'Servicos'}</h2>
          <p className="text-sm text-slate-500 mt-0.5">Gerencie os {isStore ? 'produtos da sua vitrine' : 'servicos que voce oferece'}</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors shadow-sm">
          <Plus className="h-4 w-4" />Adicionar
        </button>
      </div>

      {showAddForm && (
        <form className="rounded-2xl bg-white border border-primary-200 p-6 animate-scale-in">
          <h3 className="text-base font-bold text-slate-900 mb-4">Novo {isStore ? 'Produto' : 'Servico'}</h3>
          <input type="hidden" name="business_id" value={businessId} />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nome</label>
              <input name="name" type="text" required placeholder={isStore ? 'Ex: Cesta Organica' : 'Ex: Corte Feminino'} className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Descricao</label>
              <textarea name="description" rows={2} placeholder="Descricao breve..." className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preco (R$)</label>
              <input name="price" type="number" step="0.01" placeholder="0,00" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{isStore ? 'Preco Promocional (R$)' : 'Duracao (minutos)'}</label>
              <input name={isStore ? 'promotional_price' : 'duration_minutes'} type="number" step={isStore ? '0.01' : '1'} placeholder={isStore ? '0,00' : '60'} className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="flex-1 rounded-xl bg-primary-600 px-4 py-3 text-sm font-bold text-white hover:bg-primary-700 transition-colors">Salvar</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cancelar</button>
            </div>
          </div>
        </form>
      )}

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white border border-slate-200 p-4 hover:border-slate-300 transition-colors">
              <GripVertical className="h-5 w-5 text-slate-300 cursor-grab shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                  {item.is_featured && <Badge variant="warning" size="sm"><Star className="h-3 w-3 mr-0.5 fill-current" />Destaque</Badge>}
                </div>
                {item.description && <p className="text-xs text-slate-500 mt-0.5 truncate">{item.description}</p>}
              </div>
              <div className="text-right shrink-0">
                {item.price != null && <span className="text-sm font-bold text-slate-900">{formatCurrency(item.price)}</span>}
                {'promotional_price' in item && item.promotional_price != null && <span className="block text-xs text-accent-600 font-semibold">Promo: {formatCurrency(item.promotional_price)}</span>}
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"><Pencil className="h-4 w-4" /></button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl bg-white border border-slate-200">
          <Package className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">Nenhum {isStore ? 'produto' : 'servico'} cadastrado</h3>
          <p className="text-sm text-slate-500">Adicione seus {isStore ? 'produtos' : 'servicos'} para que os clientes vejam sua oferta</p>
        </div>
      )}
    </div>
  )
}
