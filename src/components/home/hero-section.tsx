'use client'

import Link from 'next/link'
import { Search, ArrowRight, MapPin, Clock, Tag } from 'lucide-react'
import { AnimatedCounter, MotionWrapper } from '@/components/ui/motion-wrapper'
import { LocationButton } from '@/components/ui/location-button'

interface HeroSectionProps {
  stats: {
    totalBusinesses: number
    totalCategories: number
    totalReviews: number
  }
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <>
      {/* ═══ MOBILE: Compact, content-first ═══ */}
      <section className="sm:hidden bg-white px-4 pt-3 pb-1 space-y-2">
        {/* Search bar */}
        <Link
          href="/buscar"
          className="flex items-center gap-3 rounded-xl bg-slate-100 border border-slate-200 px-4 py-2.5 active:bg-slate-200 transition-colors"
        >
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-400 flex-1">Buscar lojas, serviços, produtos...</span>
        </Link>

        {/* Quick filters — single row */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          <LocationButton compact />
          <Link href="/buscar?aberto=true" className="shrink-0 flex items-center gap-1 rounded-full bg-accent-50 border border-accent-200 px-2.5 py-1 text-[10px] font-semibold text-accent-700 active:bg-accent-100">
            <Clock className="h-2.5 w-2.5" />
            Aberto agora
          </Link>
          <Link href="/buscar?destaque=true" className="shrink-0 flex items-center gap-1 rounded-full bg-warm-50 border border-warm-200 px-2.5 py-1 text-[10px] font-semibold text-warm-700 active:bg-warm-100">
            <Tag className="h-2.5 w-2.5" />
            Promoções
          </Link>
          <Link href="/lojas" className="shrink-0 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-600 active:bg-slate-100">
            Lojas
          </Link>
          <Link href="/servicos" className="shrink-0 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-600 active:bg-slate-100">
            Serviços
          </Link>
        </div>
      </section>

      {/* ═══ DESKTOP: Full hero with gradient ═══ */}
      <section className="hidden sm:block relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-400/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <MotionWrapper variant="fade-up" delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 mb-6">
                <MapPin className="h-4 w-4 text-accent-300" />
                <span className="text-sm font-medium text-white/90">O guia comercial de Rio Bonito, RJ</span>
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4">
                Descubra o melhor de
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-200 to-primary-200">
                  Rio Bonito
                </span>
              </h1>
            </MotionWrapper>

            <MotionWrapper variant="fade-up" delay={0.2}>
              <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8 leading-relaxed">
                Encontre lojas, serviços e profissionais perto de você.
                Tudo em um só lugar, fácil e rápido.
              </p>
            </MotionWrapper>

            <MotionWrapper variant="fade-up" delay={0.3}>
              <Link
                href="/buscar"
                className="group mx-auto flex max-w-xl items-center gap-3 rounded-2xl bg-white shadow-xl shadow-primary-900/20 px-5 py-4 hover:shadow-2xl transition-all duration-300"
              >
                <Search className="h-5 w-5 text-slate-400 group-hover:text-primary-500 transition-colors shrink-0" />
                <span className="text-sm sm:text-base text-slate-400 flex-1 text-left">
                  Buscar lojas, serviços, produtos...
                </span>
                <span className="flex items-center gap-1 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white group-hover:bg-primary-700 transition-colors shrink-0">
                  Buscar
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </MotionWrapper>

            <MotionWrapper variant="fade-up" delay={0.5}>
              <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    <AnimatedCounter value={stats.totalBusinesses} suffix="+" />
                  </div>
                  <p className="text-xs sm:text-sm text-primary-200 mt-0.5">Negócios</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    <AnimatedCounter value={stats.totalReviews} suffix="+" />
                  </div>
                  <p className="text-xs sm:text-sm text-primary-200 mt-0.5">Avaliações</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    <AnimatedCounter value={stats.totalCategories} />
                  </div>
                  <p className="text-xs sm:text-sm text-primary-200 mt-0.5">Categorias</p>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="var(--color-background)" />
          </svg>
        </div>
      </section>
    </>
  )
}
