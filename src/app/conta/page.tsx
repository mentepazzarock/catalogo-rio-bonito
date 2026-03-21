'use client'

import Link from 'next/link'
import {
  User,
  Settings,
  Heart,
  MapPin,
  LogIn,
  LayoutDashboard,
  Shield,
  Plus,
  Star,
  Bell,
  HelpCircle,
  FileText,
  ChevronRight,
} from 'lucide-react'

export default function ContaPage() {
  const isLoggedIn = false

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 md:pb-0">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Profile header */}
        {isLoggedIn ? (
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-2xl font-bold text-white shadow-lg shadow-primary-200/40">
              J
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">João Silva</h1>
              <p className="text-sm text-slate-500">joao@email.com</p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-6 mb-8 text-center animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-warm-400/20 rounded-full blur-2xl" />
            </div>
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 mx-auto mb-3">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Faça login para continuar</h2>
              <p className="text-sm text-primary-100 mb-4">Acesse seu perfil e gerencie seus favoritos</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-primary-700 hover:bg-primary-50 transition-colors shadow-sm"
              >
                <LogIn className="h-4 w-4" />
                Entrar ou Criar conta
              </Link>
            </div>
          </div>
        )}

        {/* Menu sections */}
        <div className="space-y-4">
          {/* Quick actions */}
          <section className="animate-fade-in">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Ações rápidas</h3>
            <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden divide-y divide-slate-100">
              <MenuItem icon={Heart} label="Favoritos" href="#" color="text-red-500" bgColor="bg-red-50" />
              <MenuItem icon={Star} label="Minhas avaliações" href="#" color="text-warm-500" bgColor="bg-warm-50" />
              <MenuItem icon={Bell} label="Notificações" href="#" color="text-blue-500" bgColor="bg-blue-50" badge="3" />
            </div>
          </section>

          {/* Para empresas */}
          <section className="animate-fade-in">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Para Empresas</h3>
            <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden divide-y divide-slate-100">
              <MenuItem icon={Plus} label="Cadastrar Meu Negócio" href="/cadastro" color="text-primary-500" bgColor="bg-primary-50" />
              <MenuItem icon={LayoutDashboard} label="Painel do Lojista" href="/painel" color="text-accent-500" bgColor="bg-accent-50" />
              <MenuItem icon={Shield} label="Painel Admin" href="/admin" color="text-red-500" bgColor="bg-red-50" />
            </div>
          </section>

          {/* Configurações */}
          <section className="animate-fade-in">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Configurações</h3>
            <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden divide-y divide-slate-100">
              <MenuItem icon={Settings} label="Configurações" href="#" color="text-slate-500" bgColor="bg-slate-100" />
              <MenuItem icon={HelpCircle} label="Ajuda & Suporte" href="#" color="text-blue-500" bgColor="bg-blue-50" />
              <MenuItem icon={FileText} label="Termos & Privacidade" href="#" color="text-slate-500" bgColor="bg-slate-100" />
            </div>
          </section>

          {/* App info */}
          <div className="text-center pt-4 pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary-500" />
              <span className="text-sm font-bold text-slate-700">Catálogo Rio Bonito</span>
            </div>
            <p className="text-xs text-slate-400">Versão 1.0.0 • Rio Bonito, RJ</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuItem({
  icon: Icon,
  label,
  href,
  color,
  bgColor,
  badge,
}: {
  icon: React.ElementType
  label: string
  href: string
  color: string
  bgColor: string
  badge?: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors active:bg-slate-100"
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${bgColor}`}>
        <Icon className={`h-4.5 w-4.5 ${color}`} />
      </div>
      <span className="flex-1 text-sm font-medium text-slate-700">{label}</span>
      {badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1.5 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
      <ChevronRight className="h-4 w-4 text-slate-300" />
    </Link>
  )
}
