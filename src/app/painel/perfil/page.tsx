'use client'

import { useState } from 'react'
import { Save, ImagePlus } from 'lucide-react'
import { mockBusinesses } from '@/lib/mock-data'
import { DAYS_OF_WEEK } from '@/lib/constants'

export default function PerfilPage() {
  const business = mockBusinesses[0]

  const [formData, setFormData] = useState({
    name: business.name,
    description: business.description,
    short_description: business.short_description || '',
    phone: business.phone || '',
    whatsapp: business.whatsapp || '',
    email: business.email || '',
    instagram: business.instagram || '',
    facebook: business.facebook || '',
    website: business.website || '',
    address: business.address,
    neighborhood: business.neighborhood || '',
    zip_code: business.zip_code || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputClass = 'w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all'
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">Meu Perfil</h2>
        <button className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors shadow-sm">
          <Save className="h-4 w-4" />
          Salvar
        </button>
      </div>

      {/* Photos */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Fotos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors">
            <ImagePlus className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Adicionar</span>
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-3">Adicione fotos da fachada, ambiente, produtos e serviços. Até 10 fotos.</p>
      </div>

      {/* Basic Info */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Informações Básicas</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Nome do Negócio</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Descrição Curta</label>
            <input type="text" name="short_description" value={formData.short_description} onChange={handleChange} placeholder="Ex: Culinária caseira com buffet variado" className={inputClass} maxLength={120} />
            <p className="text-xs text-slate-400 mt-1">{formData.short_description.length}/120 caracteres</p>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Descrição Completa</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Contato e Redes Sociais</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Telefone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(21) 2623-0000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="(21) 99999-0000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Website</label>
            <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Instagram</label>
            <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@seunegocio" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Facebook</label>
            <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="seunegocio" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Endereço</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Endereço Completo</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Bairro</label>
            <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>CEP</label>
            <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Horário de Funcionamento</h3>
        <div className="space-y-3">
          {DAYS_OF_WEEK.map(({ key, label }) => {
            const dayHours = business.hours.find((h) => h.day_of_week === key)
            return (
              <div key={key} className="flex items-center gap-4">
                <span className="w-28 text-sm font-medium text-slate-700">{label}</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={!dayHours?.is_closed}
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-xs text-slate-500">Aberto</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    defaultValue={dayHours?.is_closed ? '' : dayHours?.open_time}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700"
                  />
                  <span className="text-xs text-slate-400">até</span>
                  <input
                    type="time"
                    defaultValue={dayHours?.is_closed ? '' : dayHours?.close_time}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
