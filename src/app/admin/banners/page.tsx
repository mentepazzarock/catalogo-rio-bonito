import { Image, Eye, EyeOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/empty-state'
import { requireAdmin } from '@/lib/dal'
import { getAllBanners } from '@/lib/queries'

export default async function AdminBannersPage() {
  await requireAdmin()
  const banners = await getAllBanners()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Banners</h1>
          <p className="text-sm text-slate-500">{banners.length} banners cadastrados</p>
        </div>
      </div>

      {banners.length > 0 ? (
        <div className="space-y-4">
          {banners.map((banner) => (
            <div key={banner.id} className="rounded-2xl bg-white border border-slate-200 p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900">{banner.title}</h3>
                    <Badge variant={banner.is_active ? 'success' : 'default'} size="sm">{banner.is_active ? 'Ativo' : 'Inativo'}</Badge>
                  </div>
                  {banner.link && <p className="text-sm text-slate-600 truncate">{banner.link}</p>}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    {banner.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Posicao: <strong>{banner.position}</strong></span>
                <span>{banner.total_impressions} impressoes</span>
                <span>{banner.total_clicks} cliques</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={Image} title="Nenhum banner" description="Crie banners para promover negocios e ofertas na plataforma" />
      )}
    </div>
  )
}
