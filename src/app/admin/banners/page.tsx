'use client'

import { useState } from 'react'
import { Plus, Image, BarChart3, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { mockBanners } from '@/lib/mock-data'

export default function AdminBannersPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Banners & Anúncios</h1>
          <p className="text-sm text-slate-500">Gerencie banners rotativos e anúncios patrocinados</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Novo Banner
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl bg-white border border-primary-200 p-6 animate-scale-in">
          <h3 className="text-base font-bold text-slate-900 mb-4">Novo Banner</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Título</label>
              <input type="text" placeholder="Nome do banner" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" /></div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Posição</label>
              <select className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none">
                <option value="home_hero">Home - Hero</option>
                <option value="home_middle">Home - Meio</option>
                <option value="search_top">Busca - Topo</option>
                <option value="category_top">Categorias - Topo</option>
              </select></div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Link (URL)</label>
              <input type="url" placeholder="https://..." className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" /></div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Imagem</label>
              <div className="flex h-12 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-sm text-slate-400 cursor-pointer hover:border-primary-400">
                <Image className="h-4 w-4 mr-2" /> Upload imagem
              </div></div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Data Início</label>
              <input type="date" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none" /></div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Data Fim</label>
              <input type="date" className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none" /></div>
            <div className="sm:col-span-2 flex gap-3">
              <button className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white hover:bg-primary-700">Salvar</button>
              <button onClick={() => setShowForm(false)} className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Banners list */}
      <div className="grid gap-4">
        {mockBanners.map((banner) => (
          <div key={banner.id} className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-32 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 shrink-0">
                <Image className="h-8 w-8 text-primary-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900">{banner.title}</h3>
                  <Badge variant={banner.is_active ? 'success' : 'default'}>{banner.is_active ? 'Ativo' : 'Inativo'}</Badge>
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  Posição: <strong>{banner.position.replace('_', ' ').toUpperCase()}</strong> |
                  {' '}{new Date(banner.starts_at).toLocaleDateString('pt-BR')} - {new Date(banner.ends_at).toLocaleDateString('pt-BR')}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" /> {banner.total_impressions} impressões</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {banner.total_clicks} cliques</span>
                  <span className="font-semibold text-primary-600">CTR: {((banner.total_clicks / banner.total_impressions) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><Pencil className="h-4 w-4" /></button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  {banner.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
