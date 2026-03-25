import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://catalogoriobonito.com.br'

  const supabase = await createClient()

  const [{ data: businesses }, { data: categories }] = await Promise.all([
    supabase.from('businesses').select('slug, updated_at').eq('is_active', true),
    supabase.from('categories').select('slug').eq('is_active', true),
  ])

  const staticRoutes = [
    '',
    '/buscar',
    '/categorias',
    '/login',
    '/lojas',
    '/servicos',
    '/para-empresas',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const categoryRoutes = (categories ?? []).map((cat) => ({
    url: `${baseUrl}/buscar?categoria=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const businessRoutes = (businesses ?? []).map((business) => ({
    url: `${baseUrl}/negocio/${business.slug}`,
    lastModified: new Date(business.updated_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...businessRoutes]
}
