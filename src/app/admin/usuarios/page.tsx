import { Shield, Store, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getAllUsers } from '@/lib/queries'

const roleLabels = { admin: 'Admin', business_owner: 'Lojista', consumer: 'Consumidor' }
const roleColors = { admin: 'danger' as const, business_owner: 'info' as const, consumer: 'default' as const }
const roleIcons = { admin: Shield, business_owner: Store, consumer: User }

export default async function AdminUsuariosPage() {
  const users = await getAllUsers()

  const admins = users.filter(u => u.role === 'admin').length
  const owners = users.filter(u => u.role === 'business_owner').length
  const consumers = users.filter(u => u.role === 'consumer').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Usuários</h1>
        <p className="text-sm text-slate-500">{users.length} usuários cadastrados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Admins', count: admins, icon: Shield, color: 'text-red-600 bg-red-50' },
          { label: 'Lojistas', count: owners, icon: Store, color: 'text-primary-600 bg-primary-50' },
          { label: 'Consumidores', count: consumers, icon: User, color: 'text-slate-600 bg-slate-100' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-5 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{s.count}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Usuário</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Tipo</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const role = (u.role || 'consumer') as keyof typeof roleLabels
                return (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold shrink-0">
                          {(u.full_name || u.email || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">{u.full_name || 'Sem nome'}</span>
                          <span className="block text-xs text-slate-400">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={roleColors[role] || 'default'} size="sm">
                        {roleLabels[role] || 'Consumidor'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={u.is_active !== false ? 'success' : 'danger'} size="sm">
                        {u.is_active !== false ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      {new Date(u.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
