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
  HelpCircle,
  FileText,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { getUser, getUserProfile } from '@/lib/dal'
import { logout } from '@/app/actions/auth'

export default async function ContaPage() {
  const user = await getUser()
  const profile = user ? await getUserProfile() : null

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 md:pb-0">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Profile header */}
        {user && profile ? (
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-2xl font-bold text-white shadow-lg shadow-primary-200/40">
              {(profile.full_name || profile.email || 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-900">{profile.full_name || 'Usuário'}</h1>
              <p className="text-sm text-slate-500">{profile.email || user.email}</p>
            </div>
            <form action={logout}>
              <button type="submit" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </form>
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
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-primary-700 hover:bg-primary-50 transition-colors shadow-sm">
                <LogIn className="h-4 w-4" />Entrar ou Criar conta
              </Link>
            </div>
          </div>
        )}

        {/* Menu sections */}
        <div className="space-y-4">
          <section className="animate-fade-in">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Ações rápidas</h3>
            <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden divide-y divide-slate-100">
              <MenuItem icon={Heart} label="Favoritos" href="/favoritos" color="text-red-500" bgColor="bg-red-50" />
              <MenuItem icon={Star} label="Minhas avaliações" href="/conta/avaliacoes" color="text-warm-500" bgColor="bg-warm-50" />
            </div>
          </section>

          {profile && (profile.role === 'business_owner' || profile.role === 'admin') && (
            <section className="animate-fade-in">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Para Empresas</h3>
              <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden divide-y divide-slate-100">
                <MenuItem icon={Plus} label="Cadastrar Meu Negócio" href="/para-empresas" color="text-primary-500" bgColor="bg-primary-50" />
                <MenuItem icon={LayoutDashboard} label="Painel do Lojista" href="/painel" color="text-accent-500" bgColor="bg-accent-50" />
                {profile.role === 'admin' && (
                  <MenuItem icon={Shield} label="Painel Admin" href="/admin" color="text-red-500" bgColor="bg-red-50" />
                )}
              </div>
            </section>
          )}

          <section className="animate-fade-in">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Configurações</h3>
            <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden divide-y divide-slate-100">
              <MenuItem icon={Settings} label="Configurações" href="/conta" color="text-slate-500" bgColor="bg-slate-100" />
              <MenuItem icon={HelpCircle} label="Ajuda & Suporte" href="/conta" color="text-blue-500" bgColor="bg-blue-50" />
              <MenuItem icon={FileText} label="Termos & Privacidade" href="/conta" color="text-slate-500" bgColor="bg-slate-100" />
            </div>
          </section>

          <div className="text-center pt-4 pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary-500" />
              <span className="text-sm font-bold text-slate-700">Catálogo Rio Bonito</span>
            </div>
            <p className="text-xs text-slate-400">Versão 2.0.0 • Rio Bonito, RJ</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuItem({ icon: Icon, label, href, color, bgColor }: {
  icon: React.ElementType; label: string; href: string; color: string; bgColor: string
}) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors active:bg-slate-100">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${bgColor}`}>
        <Icon className={`h-4.5 w-4.5 ${color}`} />
      </div>
      <span className="flex-1 text-sm font-medium text-slate-700">{label}</span>
      <ChevronRight className="h-4 w-4 text-slate-300" />
    </Link>
  )
}
