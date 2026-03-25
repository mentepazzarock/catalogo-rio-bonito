import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BottomNav } from '@/components/mobile/bottom-nav'
import { getUser, getUserProfile } from '@/lib/dal'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Guia Comercial de Rio Bonito, RJ`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Rio Bonito',
    'guia local',
    'guia comercial',
    'lojas Rio Bonito',
    'serviços Rio Bonito',
    'comércio local',
    'catálogo',
    'RJ',
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Descubra o melhor de Rio Bonito`,
    description: SITE_DESCRIPTION,
    // url: 'https://catalogo-rio-bonito.vercel.app',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Guia Comercial`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - O guia da cidade`,
    description: SITE_DESCRIPTION,
  },
  themeColor: '#ea580c', // primary-600
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [user, profile] = await Promise.all([getUser(), getUserProfile()])

  const headerUser = user
    ? {
        name: profile?.full_name ?? user.user_metadata?.full_name ?? null,
        email: user.email ?? null,
        role: profile?.role ?? null,
      }
    : null

  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.ts" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header user={headerUser} />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <Toaster position="top-center" richColors theme="light" />
      </body>
    </html>
  )
}
