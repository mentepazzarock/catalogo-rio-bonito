import { MetadataRoute } from 'next'
import { mockBusinesses, mockCategories } from '@/lib/mock-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://catalogo-rio-bonito.vercel.app'

    // Static routes
    const staticRoutes = [
        '',
        '/buscar',
        '/categorias',
        '/login',
        '/cadastro',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Categories routes
    const categoryRoutes = mockCategories.map((cat) => ({
        url: `${baseUrl}/buscar?categoria=${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // Business detail routes
    const businessRoutes = mockBusinesses.map((business) => ({
        url: `${baseUrl}/negocio/${business.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...categoryRoutes, ...businessRoutes]
}
