import { requireAdmin } from '@/lib/dal'
import { getAllCategories, getAllBusinesses } from '@/lib/queries'
import { CategoryIcon } from '@/components/ui/icon-map'
import { Badge } from '@/components/ui/badge'

export default async function AdminCategoriasPage() {
  await requireAdmin()
  const [categories, businesses] = await Promise.all([
    getAllCategories(),
    getAllBusinesses(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Categorias</h1>
          <p className="text-sm text-slate-500">{categories.length} categorias cadastradas</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Categoria</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Slug</th>
                <th className="text-center px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Negocios</th>
                <th className="text-center px-5 py-3 font-semibold text-slate-500 text-xs uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => {
                const count = businesses.filter((b) => b.categories.some((c) => c.id === cat.id)).length
                return (
                  <tr key={cat.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                          <CategoryIcon name={cat.icon} className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">{cat.name}</span>
                          {cat.description && <p className="text-xs text-slate-400 truncate max-w-xs">{cat.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><code className="text-xs bg-slate-100 px-2 py-1 rounded">{cat.slug}</code></td>
                    <td className="px-5 py-4 text-center"><span className="font-semibold text-slate-900">{count}</span></td>
                    <td className="px-5 py-4 text-center">
                      <Badge variant={cat.is_active ? 'success' : 'danger'} size="sm">{cat.is_active ? 'Ativa' : 'Inativa'}</Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {categories.length === 0 && <div className="text-center py-8 text-slate-500 text-sm">Nenhuma categoria.</div>}
      </div>
    </div>
  )
}
