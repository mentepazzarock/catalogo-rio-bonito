'use client'

import { useState, useActionState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff, MapPin, ArrowRight, Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { login, signup, resetPassword, loginWithOAuth, type AuthResult } from '@/app/actions/auth'

const initialState: AuthResult = {}

export default function LoginPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || ''
  const authError = searchParams.get('error')

  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login')
  const [showPassword, setShowPassword] = useState(false)

  const [loginState, loginAction, loginPending] = useActionState(login, initialState)
  const [signupState, signupAction, signupPending] = useActionState(signup, initialState)
  const [resetState, resetAction, resetPending] = useActionState(resetPassword, initialState)

  const isPending = loginPending || signupPending || resetPending
  const currentState = mode === 'login' ? loginState : mode === 'signup' ? signupState : resetState
  const currentAction = mode === 'login' ? loginAction : mode === 'signup' ? signupAction : resetAction

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md shadow-primary-200/50">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Catálogo RB</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            {mode === 'login' && 'Bem-vindo de volta!'}
            {mode === 'signup' && 'Criar nova conta'}
            {mode === 'reset' && 'Recuperar senha'}
          </h1>
          <p className="text-base text-slate-500 mb-8">
            {mode === 'login' && 'Acesse sua conta para gerenciar seu negócio'}
            {mode === 'signup' && 'Cadastre-se para começar a usar o Catálogo'}
            {mode === 'reset' && 'Enviaremos um link para redefinir sua senha'}
          </p>

          {/* Feedback messages */}
          {(currentState.error || authError) && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {currentState.error || 'Falha na autenticação. Tente novamente.'}
            </div>
          )}
          {currentState.success && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {currentState.success}
            </div>
          )}

          {/* Tabs (login/signup only) */}
          {mode !== 'reset' && (
            <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => setMode('login')}
                disabled={isPending}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'} ${isPending && 'opacity-50 cursor-not-allowed'}`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                disabled={isPending}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${mode === 'signup' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'} ${isPending && 'opacity-50 cursor-not-allowed'}`}
              >
                Criar conta
              </button>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" action={currentAction}>
            <input type="hidden" name="redirect" value={redirectTo} />

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome completo</label>
                <input
                  name="name"
                  type="text"
                  required
                  disabled={isPending}
                  placeholder="Seu nome"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50 disabled:bg-slate-100"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail</label>
              <input
                name="email"
                type="email"
                required
                disabled={isPending}
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50 disabled:bg-slate-100"
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">Senha</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('reset')}
                      className="text-xs text-primary-600 font-medium hover:text-primary-700"
                    >
                      Esqueceu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    disabled={isPending}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50 disabled:bg-slate-100"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    disabled={isPending}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3 text-sm font-bold text-white hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm shadow-primary-200/50 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Aguarde...
                </>
              ) : (
                <>
                  {mode === 'login' && 'Entrar no painel'}
                  {mode === 'signup' && 'Criar minha conta'}
                  {mode === 'reset' && 'Enviar link de recuperação'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {mode === 'reset' && (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="mt-4 w-full text-center text-sm text-primary-600 font-medium hover:text-primary-700"
            >
              Voltar ao login
            </button>
          )}

          {/* OAuth */}
          {mode !== 'reset' && (
            <>
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">ou continue com</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="flex gap-3">
                <form action={async () => { await loginWithOAuth('google') }} className="flex-1">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                    Google
                  </button>
                </form>
                <form action={async () => { await loginWithOAuth('facebook') }} className="flex-1">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    Facebook
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-warm-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12 max-w-md">
          <Sparkles className="h-12 w-12 text-warm-300 mx-auto mb-6 animate-float" />
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Seu negócio no mapa digital
          </h2>
          <p className="text-primary-100 leading-relaxed">
            Mais de 50 negócios já usam o Catálogo RB para serem encontrados.
            Cadastre-se e alcance novos clientes todos os dias.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-accent-300" />
            Rio Bonito, RJ
          </div>
        </div>
      </div>
    </div>
  )
}
