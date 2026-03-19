'use client'

import { MessageCircle, Phone, FileText, Calendar, User, Check, X, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/empty-state'
import { mockLeads } from '@/lib/mock-data'

const statusConfig = {
  new: { label: 'Novo', variant: 'info' as const, icon: Clock },
  contacted: { label: 'Contatado', variant: 'warning' as const, icon: Phone },
  converted: { label: 'Convertido', variant: 'success' as const, icon: Check },
  lost: { label: 'Perdido', variant: 'danger' as const, icon: X },
}

const sourceConfig = {
  whatsapp: { label: 'WhatsApp', icon: MessageCircle, color: 'text-accent-600' },
  phone: { label: 'Telefone', icon: Phone, color: 'text-primary-600' },
  form: { label: 'Formulário', icon: FileText, color: 'text-purple-600' },
  booking: { label: 'Agendamento', icon: Calendar, color: 'text-warm-600' },
}

export default function PainelLeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Leads & Contatos</h2>
        <p className="text-sm text-slate-500">Gerencie os contatos recebidos pelo catálogo</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Novos', count: mockLeads.filter(l => l.status === 'new').length, color: 'bg-primary-50 text-primary-600' },
          { label: 'Contatados', count: mockLeads.filter(l => l.status === 'contacted').length, color: 'bg-warm-50 text-warm-600' },
          { label: 'Convertidos', count: mockLeads.filter(l => l.status === 'converted').length, color: 'bg-accent-50 text-accent-600' },
          { label: 'Total', count: mockLeads.length, color: 'bg-slate-100 text-slate-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-2xl font-extrabold text-slate-900">{s.count}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Leads list */}
      {mockLeads.length > 0 ? (
        <div className="space-y-3">
          {mockLeads.map((lead) => {
            const status = statusConfig[lead.status]
            const source = sourceConfig[lead.source]
            return (
              <div key={lead.id} className="rounded-2xl bg-white border border-slate-200 p-5 hover:border-slate-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold shrink-0">
                    {lead.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{lead.name}</span>
                      <Badge variant={status.variant} size="sm">{status.label}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      {lead.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{lead.phone}</span>}
                      {lead.email && <span>{lead.email}</span>}
                    </div>
                    {lead.message && (
                      <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">{lead.message}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`flex items-center gap-1 text-xs font-medium ${source.color}`}>
                        <source.icon className="h-3 w-3" />
                        via {source.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs focus:outline-none">
                      <option value="new">Novo</option>
                      <option value="contacted">Contatado</option>
                      <option value="converted">Convertido</option>
                      <option value="lost">Perdido</option>
                    </select>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={User}
          title="Nenhum lead ainda"
          description="Quando clientes entrarem em contato pelo catálogo, aparecerá aqui"
        />
      )}
    </div>
  )
}
