import { MetadataRoute } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${SITE_NAME} - Guia Comercial`,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ea580c', // Primary-600 (Orange)
        icons: [
            {
                src: '/favicon.ico',
                sizes: '192x192 512x512',
                type: 'image/x-icon',
            },
            // Note: In a real production app we would add actual 192x192 and 512x512 PWA icons to the public folder
        ],
    }
}
