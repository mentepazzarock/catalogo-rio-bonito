'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useFavorites } from '@/store/use-favorites'
import { useEffect, useState } from 'react'

export function BottomNav() {
  const pathname = usePathname()
  const { favorites } = useFavorites()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/buscar', label: 'Buscar', icon: Search },
    {
      href: '/favoritos',
      label: 'Favoritos',
      icon: Heart,
      badge: mounted && favorites.length > 0 ? favorites.length : 0
    },
    { href: '/perfil', label: 'Perfil', icon: User },
  ]

  // Hide on admin routes, painel routes, and login
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/painel') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/cadastro') ||
    pathname.startsWith('/para-empresas')
  ) {
    return null
  }

  return (
    <>
      <div className="h-[calc(4rem+env(safe-area-inset-bottom))] md:hidden" />
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/85 backdrop-blur-xl border-t border-slate-200/60 pb-safe">
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex h-full w-full flex-col items-center justify-center gap-1 tap-highlight-transparent"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors relative',
                    isActive ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'
                  )}
                >
                  <div className="relative">
                    <item.icon
                      className={cn(
                        'h-5 w-5 transition-all duration-300',
                        isActive && 'scale-110 mb-0.5',
                        isActive && item.href === '/favoritos' && 'fill-rose-500 text-rose-500' // Make heart robust if active
                      )}
                    />
                    {item.badge ? (
                      <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>

                  <span
                    className={cn(
                      'text-[10px] font-medium transition-all duration-300',
                      isActive ? 'opacity-100 mt-0.5' : 'opacity-80'
                    )}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-indicator"
                      className="absolute -top-[1px] left-1/2 h-[3px] w-12 -translate-x-1/2 rounded-b-full bg-primary-600 shadow-[0_2px_8px_rgba(234,88,12,0.4)]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
