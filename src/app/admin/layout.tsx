'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Store, FolderTree, CreditCard, Shield,
  Image, Users, BarChart3, Settings, ArrowLeft, MapPin
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/lib/constants'

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/negocios', label: 'Negócios', icon: Store },
  { href: '/admin/categorias', label: 'Categorias', icon: FolderTree },
  { href: '/admin/assinaturas', label: 'Assinaturas', icon: CreditCard },
  { href: '/admin/moderacao', label: 'Moderação', icon: Shield },
  { href: '/admin/banners', label: 'Banners', icon: Image },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
  { href: '/admin/relatorios', label: 'Relatórios', icon: BarChart3 },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-slate-900 text-white">
        <div className="p-5 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold">Admin</div>
              <div className="text-[10px] text-slate-400">{SITE_NAME}</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {sidebarLinks.map((link) => {
            const isActive = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
        </div>
      </aside>

      {/* Mobile header for admin */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary-400" />
            <span className="text-sm font-bold">Admin</span>
          </Link>
          <Link href="/" className="text-xs text-slate-400">Voltar ao site</Link>
        </div>
        <div className="flex overflow-x-auto gap-1 px-3 pb-2 scrollbar-hide">
          {sidebarLinks.map((link) => {
            const isActive = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors shrink-0',
                  isActive ? 'bg-primary-600 text-white' : 'bg-slate-800 text-slate-400'
                )}
              >
                <link.icon className="h-3 w-3" />
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 lg:p-8 p-4 pt-24 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
