'use client'

import { useState, useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Store, Briefcase, MapPin, Phone, Mail, FileText, ArrowRight, Loader2, AlertCircle, CheckCircle2, ChevronLeft, Building2 } from 'lucide-react'
import { registerBusiness, type ActionResult } from '@/app/actions/business'
import { createClient as createBrowserClient } from '@/lib/supabase-browser'
import type { Category } from '@/types/database'
import { MotionWrapper } from '@/components/ui/motion-wrapper'

const initialState: ActionResult = {}

export default function CadastroEmpresaPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(registerBusiness, initialState)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedType, setSelectedType] = useState<'store' | 'service_provider' | ''>('')

  useEffect(() => {
    async function loadCategories() {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name')
      setCategories(data ?? [])
    }
    loadCategories()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero compacto */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-400/10 rounded-full blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <MotionWrapper variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 mb-4">
              <Building2 className="h-4 w-4 text-primary-200" />
              <span className="text-sm font-medium text-white/90">Cadastro de Empresa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Cadastre seu negocio gratuitamente
            </h1>
            <p className="text-base text-primary-100 max-w-xl mx-auto">
              Preencha o formulario abaixo e seu negocio estara visivel para todos os moradores de Rio Bonito
            </p>
          </MotionWrapper>
        </div>
      </div>

      {/* Formulario */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        <MotionWrapper variant="fade-up" delay={0.1}>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 mb-6 transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Voltar ao inicio
            </Link>

            {/* Feedback */}
            {state.error && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {state.error}
              </div>
            )}
            {state.success && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {state.success}
              </div>
            )}

            <form className="space-y-6" action={formAction}>
              {/* Tipo do negocio */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Tipo do negocio *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedType('store')}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${selectedType === 'store'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Store className="h-6 w-6" />
                    <span className="text-sm font-semibold">Loja</span>
                    <span className="text-[11px] text-slate-500">Comercio, restaurante, etc.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('service_provider')}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${selectedType === 'service_provider'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Briefcase className="h-6 w-6" />
                    <span className="text-sm font-semibold">Servico</span>
                    <span className="text-[11px] text-slate-500">Profissional, freelancer, etc.</span>
                  </button>
                </div>
                <input type="hidden" name="type" value={selectedType} />
              </div>

              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nome do negocio *</label>
                <input
                  name="name"
                  type="text"
                  required
                  disabled={isPending}
                  placeholder="Ex: Padaria do Joao"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50"
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Categoria *</label>
                <select
                  name="category_id"
                  required
                  disabled={isPending}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Descricao */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Descricao *
                </label>
                <textarea
                  name="description"
                  required
                  disabled={isPending}
                  rows={4}
                  placeholder="Descreva seu negocio, o que voce oferece, diferenciais..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50 resize-none"
                />
              </div>

              {/* Contato */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Telefone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    disabled={isPending}
                    placeholder="(21) 99999-9999"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    <Phone className="h-4 w-4 inline mr-1" />
                    WhatsApp
                  </label>
                  <input
                    name="whatsapp"
                    type="tel"
                    disabled={isPending}
                    placeholder="(21) 99999-9999"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  <Mail className="h-4 w-4 inline mr-1" />
                  E-mail do negocio
                </label>
                <input
                  name="email"
                  type="email"
                  disabled={isPending}
                  placeholder="contato@seunegocio.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50"
                />
              </div>

              {/* Endereco */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Endereco
                  </label>
                  <input
                    name="address"
                    type="text"
                    disabled={isPending}
                    placeholder="Rua, numero"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bairro</label>
                  <input
                    name="neighborhood"
                    type="text"
                    disabled={isPending}
                    placeholder="Centro"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="rounded-xl bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary-700">
                <strong>Como funciona:</strong> Apos o cadastro, seu negocio sera analisado pela nossa equipe e aprovado em ate 24 horas. Voce podera gerenciar tudo pelo Painel do Lojista.
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending || !selectedType}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3.5 text-sm font-bold text-white hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/25 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    Cadastrar Meu Negocio
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                Ao cadastrar, voce concorda com nossos termos de uso. Ainda nao tem conta?{' '}
                <Link href="/login" className="text-primary-600 font-medium hover:underline">
                  Crie uma aqui
                </Link>
              </p>
            </form>
          </div>
        </MotionWrapper>
      </div>
    </div>
  )
}
