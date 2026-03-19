import Link from 'next/link'
import {
  Heart, Star, Bell, Settings, Store, Shield, LogIn, ChevronRight,
  HelpCircle, MessageCircle, FileText
} from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export default function ContaPage() {
  const isLoggedIn = false // Mock state

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 md:pb-0">
      <div className="mx-auto max-w-lg px-4 py-6">
        {/* Profile header */}
        {isLoggedIn ? (
          <div className="rounded-2xl bg-white border border-slate-200 p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xl font-bold">
                U
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Usuário</h2>
                <p className="text-sm text-slate-500">usuario@email.com</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 mb-6 text-white">
            <h2 className="text-xl font-bold mb-2">Entre no {SITE_NAME}</h2>
            <p className="text-sm text-primary-100 mb-4">
              Salve seus favoritos, avalie negócios e acompanhe promoções.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary-700 hover:bg-primary-50 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Entrar ou Cadastrar
            </Link>
          </div>
        )}

        {/* Menu sections */}
        <div className="space-y-3">
          {/* Consumer Actions */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Minha Conta</span>
            </div>
            {[
              { href: '/conta/favoritos', icon: Heart, label: 'Meus Favoritos', color: 'text-red-500' },
              { href: '/conta/avaliacoes', icon: Star, label: 'Minhas Avaliações', color: 'text-warm-500' },
              { href: '#', icon: Bell, label: 'Notificações', color: 'text-primary-500', badge: '3' },
              { href: '#', icon: Settings, label: 'Configurações', color: 'text-slate-500' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span>
                {item.badge && (
                  <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-500 px-1.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </Link>
            ))}
          </div>

          {/* Business Owner */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Para Empresas</span>
            </div>
            {[
              { href: '/painel', icon: Store, label: 'Painel do Lojista', color: 'text-primary-600' },
              { href: '/cadastro', icon: FileText, label: 'Cadastrar Meu Negócio', color: 'text-accent-600' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </Link>
            ))}
          </div>

          {/* Admin (only if admin) */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Administração</span>
            </div>
            <Link href="/admin" className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <Shield className="h-5 w-5 text-red-500" />
              <span className="flex-1 text-sm font-medium text-slate-700">Painel Admin</span>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </Link>
          </div>

          {/* Help */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ajuda</span>
            </div>
            {[
              { href: '#', icon: HelpCircle, label: 'Perguntas Frequentes', color: 'text-slate-500' },
              { href: '#', icon: MessageCircle, label: 'Fale Conosco', color: 'text-accent-500' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
