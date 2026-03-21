'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Store,
  Tag,
  Image,
  Users,
  BarChart3,
  Settings,
  Shield,
  Star,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react'
import { useState } from 'react'

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Negócios', href: '/admin/negocios', icon: Store },
  { name: 'Categorias', href: '/admin/categorias', icon: Tag },
  { name: 'Assinaturas', href: '/admin/assinaturas', icon: Star },
  { name: 'Moderação', href: '/admin/moderacao', icon: Shield },
  { name: 'Banners', href: '/admin/banners', icon: Image },
  { name: 'Usuários', href: '/admin/usuarios', icon: Users },
  { name: 'Relatórios', href: '/admin/relatorios', icon: BarChart3 },
  { name: 'Configurações', href: '/admin/configuracoes', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2.5 px-6 h-16 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900">Admin</span>
              <span className="block text-[10px] text-slate-400 -mt-0.5">Catálogo RB</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <link.icon className={`h-4.5 w-4.5 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-200 h-14">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-bold text-slate-900">Admin</span>
          </div>
          <Link href="/" className="text-xs text-slate-500 font-medium">
            Site
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white animate-scale-in shadow-xl">
            <div className="flex items-center justify-between px-4 h-14 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-600" />
                <span className="font-bold text-slate-900">Admin</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-3 space-y-0.5">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <link.icon className={`h-4.5 w-4.5 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
