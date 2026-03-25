'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Search, Menu, X, MapPin, Plus, LogIn, ChevronDown, Store, Shield, LayoutDashboard, User, LogOut } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

interface HeaderUser {
  name: string | null
  email: string | null
  role: string | null
}

interface HeaderProps {
  user?: HeaderUser | null
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [empresasOpen, setEmpresasOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setEmpresasOpen(false)
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isAdmin = user?.role === 'admin'
  const isOwner = user?.role === 'business_owner' || isAdmin

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm' : 'bg-white/50 backdrop-blur-md border-b border-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md shadow-primary-200/50 group-hover:shadow-primary-300/50 transition-shadow">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 leading-tight">{SITE_NAME}</h1>
              <p className="text-[10px] text-slate-500 -mt-0.5 font-medium tracking-wide uppercase">Guia Comercial</p>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-lg">
            <Link href="/buscar" className="flex w-full items-center gap-2.5 rounded-full bg-slate-50/80 border border-slate-200 px-4 py-2.5 text-sm text-slate-400 hover:border-primary-300 hover:bg-white hover:shadow-sm transition-all group">
              <Search className="h-4 w-4 group-hover:text-primary-500 transition-colors" />
              <span>Buscar lojas, servicos, produtos...</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/categorias" className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors">Categorias</Link>
            <Link href="/buscar" className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors">Explorar</Link>
            <Link href="/favoritos" className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors">Favoritos</Link>

            {/* Para Empresas dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setEmpresasOpen(!empresasOpen)} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors">
                Para Empresas
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${empresasOpen ? 'rotate-180' : ''}`} />
              </button>
              {empresasOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-white/95 backdrop-blur-lg border border-slate-200 shadow-xl shadow-slate-200/50 py-2 animate-scale-in z-50">
                  <Link href="/para-empresas" onClick={() => setEmpresasOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                    <Plus className="h-4 w-4 text-primary-500" />Cadastrar Negocio
                  </Link>
                  {isOwner && (
                    <Link href="/painel" onClick={() => setEmpresasOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                      <LayoutDashboard className="h-4 w-4 text-accent-500" />Painel do Lojista
                    </Link>
                  )}
                  {isAdmin && (
                    <>
                      <div className="my-1 border-t border-slate-100" />
                      <Link href="/admin" onClick={() => setEmpresasOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                        <Shield className="h-4 w-4 text-red-500" />Painel Admin
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Auth buttons */}
            {user ? (
              <div className="relative ml-2" ref={userDropdownRef}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-100 transition-colors">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                    {(user.name || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="hidden lg:inline max-w-[100px] truncate">{user.name || user.email}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 rounded-xl bg-white/95 backdrop-blur-lg border border-slate-200 shadow-xl py-2 animate-scale-in z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.name || 'Usuario'}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/conta" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <User className="h-4 w-4 text-slate-400" />Minha Conta
                    </Link>
                    <form action="/api/auth/signout" method="POST">
                      <button type="button" onClick={() => { setUserMenuOpen(false); window.location.href = '/login' }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="h-4 w-4" />Sair
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="ml-2 flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm shadow-primary-200/50 active:scale-95">
                <LogIn className="h-4 w-4" />Entrar
              </Link>
            )}
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/buscar" className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl animate-scale-in">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-primary-50 border border-primary-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-bold">
                  {(user.name || user.email || 'U')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{user.name || 'Usuario'}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
            )}
            <Link href="/categorias" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">Categorias</Link>
            <Link href="/buscar" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">Explorar</Link>
            <div className="border-t border-slate-100 my-2" />
            <span className="block px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Para Empresas</span>
            {isOwner && (
              <Link href="/painel" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
                <LayoutDashboard className="h-4 w-4 text-accent-500" />Painel do Lojista
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
                <Shield className="h-4 w-4 text-red-500" />Painel Admin
              </Link>
            )}
            <div className="pt-2 space-y-2">
              <Link href="/para-empresas" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors active:scale-[0.98]">
                <Plus className="h-4 w-4" />Cadastrar Meu Negocio
              </Link>
              {!user && (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-primary-200 px-4 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors active:scale-[0.98]">
                  <LogIn className="h-4 w-4" />Entrar / Criar Conta
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
