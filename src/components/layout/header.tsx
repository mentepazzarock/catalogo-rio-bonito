'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X, MapPin, Plus } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md shadow-primary-200">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 leading-tight">{SITE_NAME}</h1>
              <p className="text-[10px] text-slate-500 -mt-0.5 font-medium tracking-wide uppercase">Guia Comercial</p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg">
            <Link
              href="/buscar"
              className="flex w-full items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-500 hover:border-primary-300 hover:bg-white transition-all"
            >
              <Search className="h-4 w-4" />
              <span>Buscar lojas, serviços, produtos...</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/categorias"
              className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Categorias
            </Link>
            <Link
              href="/buscar"
              className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Explorar
            </Link>
            <Link
              href="/cadastro"
              className="ml-2 flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm shadow-primary-200"
            >
              <Plus className="h-4 w-4" />
              Cadastrar Negócio
            </Link>
          </nav>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/buscar"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-scale-in">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            <Link
              href="/categorias"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Categorias
            </Link>
            <Link
              href="/buscar"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Explorar
            </Link>
            <div className="pt-2">
              <Link
                href="/cadastro"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Cadastrar Meu Negócio
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
