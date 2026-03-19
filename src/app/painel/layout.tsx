'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Store, Package, Star, CreditCard, ArrowLeft, BarChart3, Users, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { href: '/painel', label: 'Visão Geral', icon: LayoutDashboard },
  { href: '/painel/perfil', label: 'Meu Perfil', icon: Store },
  { href: '/painel/produtos', label: 'Produtos/Serviços', icon: Package },
  { href: '/painel/avaliacoes', label: 'Avaliações', icon: Star },
  { href: '/painel/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/painel/leads', label: 'Leads', icon: Users },
  { href: '/painel/promocoes', label: 'Promoções', icon: Tag },
  { href: '/painel/assinatura', label: 'Assinatura', icon: CreditCard },
]

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium mb-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar ao catálogo
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">Painel do Lojista</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <nav className="lg:w-56 shrink-0">
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    )}
                  >
                    <link.icon className="h-4 w-4 shrink-0" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
