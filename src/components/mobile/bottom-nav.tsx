'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Store, Wrench, Search, User } from 'lucide-react'

const navItems = [
  { label: 'Início', href: '/', icon: Home },
  { label: 'Lojas', href: '/lojas', icon: Store },
  { label: 'Serviços', href: '/servicos', icon: Wrench },
  { label: 'Buscar', href: '/buscar', icon: Search },
  { label: 'Menu', href: '/conta', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  // Hide on admin and painel routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/painel')) return null

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-100 safe-area-bottom shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${isActive
                  ? 'text-primary-600'
                  : 'text-slate-400 hover:text-slate-600 active:scale-95'
                }`}
            >
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-500" />
              )}
              <item.icon
                className={`h-5 w-5 transition-all ${isActive ? 'text-primary-600 scale-110' : ''}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold text-primary-600' : ''}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
