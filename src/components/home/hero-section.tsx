'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/buscar')
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-warm-400/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-300/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 mb-6 animate-fade-in">
            <MapPin className="h-4 w-4 text-accent-300" />
            <span className="text-sm font-medium text-white/90">Rio Bonito, RJ</span>
            <Sparkles className="h-3.5 w-3.5 text-warm-300" />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 animate-slide-up">
            Tudo de Rio Bonito
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-warm-300 to-accent-300">em um só lugar</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-100 max-w-xl mx-auto mb-8 animate-slide-up leading-relaxed">
            Encontre as melhores lojas, restaurantes e profissionais da cidade.
            Apoie o comércio local!
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="O que você procura? Ex: pizzaria, cabeleireiro..."
                className="w-full rounded-2xl bg-white pl-12 pr-32 py-4 text-base text-slate-900 placeholder:text-slate-400 shadow-2xl shadow-primary-900/30 focus:outline-none focus:ring-2 focus:ring-accent-400/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm"
              >
                Buscar
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">50+</div>
              <div className="text-xs sm:text-sm text-primary-200">Negócios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">15</div>
              <div className="text-xs sm:text-sm text-primary-200">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">1000+</div>
              <div className="text-xs sm:text-sm text-primary-200">Avaliações</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path d="M0 60V20C240 0 480 40 720 30C960 20 1200 0 1440 20V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
