'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CategoryIcon } from '@/components/ui/icon-map'
import { mockCategories, mockBusinesses } from '@/lib/mock-data'

export default function AdminCategoriasPage() {
  const [showForm, setShowForm] = useState(false)

  const categoriesWithCount = mockCategories.map((cat) => ({
    ...cat,
    count: mockBusinesses.filter((b) => b.categories.some((c) => c.id === cat.id)).length,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Categorias</h1>
          <p className="text-sm text-slate-500">{mockCategories.length} categorias cadastradas</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nova Categoria
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl bg-white border border-primary-200 p-6 animate-scale-in">
          <h3 className="text-base font-bold text-slate-900 mb-4">Nova Categoria</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nome</label>
              <input type="text" placeholder="Ex: Alimentação" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Slug</label>
              <input type="text" placeholder="alimentacao" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ícone (Lucide)</label>
              <input type="text" placeholder="UtensilsCrossed" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Descrição</label>
              <input type="text" placeholder="Descrição breve..." className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white hover:bg-primary-700">Salvar</button>
              <button onClick={() => setShowForm(false)} className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {categoriesWithCount.map((cat) => (
            <div key={cat.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <GripVertical className="h-5 w-5 text-slate-300 cursor-grab shrink-0" />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shrink-0">
                <CategoryIcon name={cat.icon} className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{cat.name}</span>
                  <Badge variant={cat.is_active ? 'success' : 'default'} size="sm">
                    {cat.is_active ? 'Ativa' : 'Inativa'}
                  </Badge>
                </div>
                <span className="text-xs text-slate-400">{cat.slug} - {cat.description}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-slate-700">{cat.count}</span>
                <span className="text-xs text-slate-400 block">negócios</span>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><Pencil className="h-4 w-4" /></button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  {cat.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
