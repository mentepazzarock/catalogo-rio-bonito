'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Store, Briefcase, Search, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/lojas', icon: Store, label: 'Lojas' },
  { href: '/servicos', icon: Briefcase, label: 'Serviços' },
  { href: '/buscar', icon: Search, label: 'Buscar' },
  { href: '/conta', icon: Menu, label: 'Menu' },
]

export function BottomNav() {
  const pathname = usePathname()

  // Hide on admin and painel routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/painel')) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 w-full h-full rounded-xl transition-all duration-200',
                isActive
                  ? 'text-primary-600'
                  : 'text-slate-400 active:scale-95'
              )}
            >
              <div className={cn(
                'flex items-center justify-center w-10 h-7 rounded-full transition-all duration-200',
                isActive && 'bg-primary-100'
              )}>
                <tab.icon className={cn('h-5 w-5', isActive && 'scale-105')} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                'text-[10px] font-medium leading-tight',
                isActive && 'font-bold'
              )}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
