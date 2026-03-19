'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Star, GripVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { mockBusinesses } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

export default function ProdutosPage() {
  const business = mockBusinesses[0]
  const isStore = business.type === 'store'
  const items = isStore ? business.products : business.services

  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {isStore ? 'Produtos' : 'Serviços'}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Gerencie os {isStore ? 'produtos da sua vitrine' : 'serviços que você oferece'}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="rounded-2xl bg-white border border-primary-200 p-6 animate-scale-in">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Novo {isStore ? 'Produto' : 'Serviço'}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nome</label>
              <input
                type="text"
                placeholder={isStore ? 'Ex: Cesta Orgânica' : 'Ex: Corte Feminino'}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Descrição</label>
              <textarea
                rows={2}
                placeholder="Descrição breve..."
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300"
              />
            </div>
            {isStore ? (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preço Promocional (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Duração (minutos)</label>
                <input
                  type="number"
                  placeholder="60"
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300"
                />
              </div>
            )}
            <div className="sm:col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-primary-600" />
                <span className="text-sm text-slate-600">Marcar como destaque</span>
              </label>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button className="flex-1 rounded-xl bg-primary-600 px-4 py-3 text-sm font-bold text-white hover:bg-primary-700 transition-colors">
                Salvar
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl bg-white border border-slate-200 p-4 hover:border-slate-300 transition-colors"
          >
            <GripVertical className="h-5 w-5 text-slate-300 cursor-grab shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                {item.is_featured && (
                  <Badge variant="warning" size="sm">
                    <Star className="h-3 w-3 mr-0.5 fill-current" />
                    Destaque
                  </Badge>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-slate-500 mt-0.5 truncate">{item.description}</p>
              )}
            </div>

            <div className="text-right shrink-0">
              {item.price && (
                <span className="text-sm font-bold text-slate-900">{formatCurrency(item.price)}</span>
              )}
              {'promotional_price' in item && item.promotional_price && (
                <span className="block text-xs text-accent-600 font-semibold">
                  Promo: {formatCurrency(item.promotional_price as number)}
                </span>
              )}
            </div>

            <div className="flex gap-1 shrink-0">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white border border-slate-200">
          <Package className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Nenhum {isStore ? 'produto' : 'serviço'} cadastrado
          </h3>
          <p className="text-sm text-slate-500">
            Adicione seus {isStore ? 'produtos' : 'serviços'} para que os clientes vejam sua oferta
          </p>
        </div>
      )}
    </div>
  )
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  )
}
