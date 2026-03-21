'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Search, Menu, X, MapPin, Plus, LogIn, ChevronDown, Store, Shield, LayoutDashboard, User } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [empresasOpen, setEmpresasOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setEmpresasOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm'
          : 'bg-white/50 backdrop-blur-md border-b border-transparent'
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md shadow-primary-200/50 group-hover:shadow-primary-300/50 transition-shadow">
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
              className="flex w-full items-center gap-2.5 rounded-full bg-slate-50/80 border border-slate-200 px-4 py-2.5 text-sm text-slate-400 hover:border-primary-300 hover:bg-white hover:shadow-sm transition-all group"
            >
              <Search className="h-4 w-4 group-hover:text-primary-500 transition-colors" />
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

            {/* Empresas Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setEmpresasOpen(!empresasOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                Para Empresas
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${empresasOpen ? 'rotate-180' : ''}`} />
              </button>
              {empresasOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-white/95 backdrop-blur-lg border border-slate-200 shadow-xl shadow-slate-200/50 py-2 animate-scale-in z-50">
                  <Link
                    href="/cadastro"
                    onClick={() => setEmpresasOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 text-primary-500" />
                    Cadastrar Negócio
                  </Link>
                  <Link
                    href="/painel"
                    onClick={() => setEmpresasOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-accent-500" />
                    Painel do Lojista
                  </Link>
                  <div className="my-1 border-t border-slate-100" />
                  <Link
                    href="/admin"
                    onClick={() => setEmpresasOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <Shield className="h-4 w-4 text-red-500" />
                    Painel Admin
                  </Link>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link
              href="/login"
              className="ml-2 flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm shadow-primary-200/50 active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              Entrar
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
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl animate-scale-in">
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
            <div className="border-t border-slate-100 my-2" />
            <span className="block px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Para Empresas</span>
            <Link
              href="/painel"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-accent-500" />
              Painel do Lojista
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Shield className="h-4 w-4 text-red-500" />
              Painel Admin
            </Link>
            <div className="pt-2 space-y-2">
              <Link
                href="/cadastro"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                Cadastrar Meu Negócio
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-primary-200 px-4 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors active:scale-[0.98]"
              >
                <LogIn className="h-4 w-4" />
                Entrar / Criar Conta
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
