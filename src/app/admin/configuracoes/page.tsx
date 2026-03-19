'use client'

import { Save, Globe, Palette, Bell, CreditCard, Shield } from 'lucide-react'
import { SITE_NAME, SUBSCRIPTION_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export default function AdminConfiguracoesPage() {
  const inputClass = 'w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300'
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Configurações</h1>
          <p className="text-sm text-slate-500">Configurações gerais da plataforma</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors">
          <Save className="h-4 w-4" />
          Salvar Tudo
        </button>
      </div>

      {/* General */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-primary-500" />
          <h3 className="text-base font-bold text-slate-900">Geral</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={labelClass}>Nome do Site</label><input type="text" defaultValue={SITE_NAME} className={inputClass} /></div>
          <div><label className={labelClass}>Cidade</label><input type="text" defaultValue="Rio Bonito" className={inputClass} /></div>
          <div><label className={labelClass}>WhatsApp de Contato</label><input type="text" defaultValue="(21) 99999-9999" className={inputClass} /></div>
          <div><label className={labelClass}>E-mail de Contato</label><input type="email" defaultValue="contato@catalogoriobonito.com" className={inputClass} /></div>
          <div className="sm:col-span-2"><label className={labelClass}>Descrição do Site (SEO)</label>
            <textarea rows={2} defaultValue="O maior guia de lojas e profissionais de Rio Bonito, RJ." className={inputClass} /></div>
        </div>
      </div>

      {/* Plans */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5 text-accent-500" />
          <h3 className="text-base font-bold text-slate-900">Planos de Assinatura</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {(Object.entries(SUBSCRIPTION_PLANS) as [string, typeof SUBSCRIPTION_PLANS[keyof typeof SUBSCRIPTION_PLANS]][]).map(([key, plan]) => (
            <div key={key} className="rounded-xl border border-slate-200 p-4">
              <h4 className="text-sm font-bold text-slate-900 mb-3">{plan.name}</h4>
              <div>
                <label className={labelClass}>Preço (R$/mês)</label>
                <input type="number" defaultValue={plan.price} className={inputClass} />
              </div>
              <div className="mt-3">
                <label className={labelClass}>Máx. Produtos</label>
                <input type="number" defaultValue={plan.maxProducts} className={inputClass} />
              </div>
              <div className="mt-3">
                <label className={labelClass}>Máx. Fotos</label>
                <input type="number" defaultValue={plan.maxPhotos} className={inputClass} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-warm-500" />
          <h3 className="text-base font-bold text-slate-900">Notificações</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: 'E-mail de boas-vindas para novos lojistas', checked: true },
            { label: 'Notificação de nova avaliação para lojistas', checked: true },
            { label: 'Lembrete de vencimento de assinatura (7 dias)', checked: true },
            { label: 'Relatório semanal por e-mail (admin)', checked: false },
            { label: 'Alerta de nova denúncia de avaliação', checked: true },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked={item.checked} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 h-4 w-4" />
              <span className="text-sm text-slate-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Maintenance */}
      <div className="rounded-2xl bg-white border border-red-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-red-500" />
          <h3 className="text-base font-bold text-slate-900">Manutenção</h3>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="rounded border-slate-300 text-red-600 focus:ring-red-500 h-4 w-4" />
          <div>
            <span className="text-sm font-semibold text-slate-700">Modo Manutenção</span>
            <p className="text-xs text-slate-500">Quando ativado, apenas administradores podem acessar o site</p>
          </div>
        </label>
      </div>
    </div>
  )
}
