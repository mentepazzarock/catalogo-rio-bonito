import { Users, Shield, Store, User, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const mockUsers = [
  { id: '1', name: 'Admin Principal', email: 'admin@catalogoriobonito.com', role: 'admin', is_active: true, businesses: 0, reviews: 0, created_at: '2024-01-01' },
  { id: '2', name: 'Maria Silva', email: 'maria@email.com', role: 'consumer', is_active: true, businesses: 0, reviews: 3, created_at: '2024-01-15' },
  { id: '3', name: 'Restaurante Sabor da Terra', email: 'contato@sabordaterra.com', role: 'business_owner', is_active: true, businesses: 1, reviews: 0, created_at: '2024-01-15' },
  { id: '4', name: 'Studio Beleza Pura', email: 'studio@belezapura.com', role: 'business_owner', is_active: true, businesses: 1, reviews: 0, created_at: '2024-01-10' },
  { id: '5', name: 'João Santos', email: 'joao@email.com', role: 'consumer', is_active: true, businesses: 0, reviews: 2, created_at: '2024-02-01' },
  { id: '6', name: 'Ana Oliveira', email: 'ana@email.com', role: 'consumer', is_active: true, businesses: 0, reviews: 5, created_at: '2024-02-05' },
  { id: '7', name: 'TechFix', email: 'techfix@email.com', role: 'business_owner', is_active: true, businesses: 1, reviews: 0, created_at: '2024-02-01' },
  { id: '8', name: 'Carlos Mendes', email: 'carlos@email.com', role: 'consumer', is_active: false, businesses: 0, reviews: 1, created_at: '2024-02-10' },
]

const roleLabels = { admin: 'Admin', business_owner: 'Lojista', consumer: 'Consumidor' }
const roleColors = { admin: 'danger' as const, business_owner: 'info' as const, consumer: 'default' as const }
const roleIcons = { admin: Shield, business_owner: Store, consumer: User }

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Usuários</h1>
        <p className="text-sm text-slate-500">{mockUsers.length} usuários cadastrados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Admins', count: mockUsers.filter(u => u.role === 'admin').length, icon: Shield, color: 'text-red-600 bg-red-50' },
          { label: 'Lojistas', count: mockUsers.filter(u => u.role === 'business_owner').length, icon: Store, color: 'text-primary-600 bg-primary-50' },
          { label: 'Consumidores', count: mockUsers.filter(u => u.role === 'consumer').length, icon: User, color: 'text-slate-600 bg-slate-100' },
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
                <th className="text-center px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Negócios</th>
                <th className="text-center px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Avaliações</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => {
                const RoleIcon = roleIcons[user.role as keyof typeof roleIcons]
                return (
                  <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold shrink-0">
                          {user.name[0]}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">{user.name}</span>
                          <span className="block text-xs text-slate-400">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={roleColors[user.role as keyof typeof roleColors]} size="sm">
                        {roleLabels[user.role as keyof typeof roleLabels]}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-center font-medium text-slate-700">{user.businesses}</td>
                    <td className="px-5 py-3 text-center font-medium text-slate-700">{user.reviews}</td>
                    <td className="px-5 py-3">
                      <Badge variant={user.is_active ? 'success' : 'danger'} size="sm">
                        {user.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
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
