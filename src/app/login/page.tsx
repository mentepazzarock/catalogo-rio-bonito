'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-200">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {isRegister ? 'Criar Conta' : 'Entrar'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isRegister ? `Junte-se ao ${SITE_NAME}` : `Bem-vindo de volta ao ${SITE_NAME}`}
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <form className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nome completo</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors shadow-sm"
            >
              {isRegister ? 'Criar Conta' : 'Entrar'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-primary-600 font-medium hover:text-primary-700"
            >
              {isRegister ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
