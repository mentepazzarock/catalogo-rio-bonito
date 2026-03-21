import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/painel/', '/admin/'],
        },
        sitemap: 'https://catalogo-rio-bonito.vercel.app/sitemap.xml',
    }
}
