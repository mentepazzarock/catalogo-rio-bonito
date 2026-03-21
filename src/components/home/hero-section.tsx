'use client'

import Link from 'next/link'
import { Search, Sparkles, ArrowRight } from 'lucide-react'
import { mockBusinesses } from '@/lib/mock-data'
import { AnimatedCounter, MotionWrapper } from '@/components/ui/motion-wrapper'

export function HeroSection() {
  const totalBusinesses = mockBusinesses.length
  const totalReviews = mockBusinesses.reduce((acc, b) => acc + b.total_reviews, 0)

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-400/10 rounded-full blur-2xl" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="text-center">
          <MotionWrapper variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 mb-6">
              <Sparkles className="h-4 w-4 text-warm-300" />
              <span className="text-sm font-medium text-white/90">O guia comercial de Rio Bonito</span>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4">
              Descubra o melhor de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-warm-300 via-warm-200 to-accent-300">
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

          {/* Search CTA */}
          <MotionWrapper variant="fade-up" delay={0.3}>
            <Link
              href="/buscar"
              className="group mx-auto flex max-w-xl items-center gap-3 rounded-2xl bg-white shadow-xl shadow-black/10 px-5 py-4 hover:shadow-2xl hover:shadow-black/15 transition-all duration-300"
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

          {/* Stats */}
          <MotionWrapper variant="fade-up" delay={0.5}>
            <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  <AnimatedCounter value={totalBusinesses} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm text-primary-200 mt-0.5">Negócios</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  <AnimatedCounter value={totalReviews} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm text-primary-200 mt-0.5">Avaliações</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  <AnimatedCounter value={15} />
                </div>
                <p className="text-xs sm:text-sm text-primary-200 mt-0.5">Categorias</p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
          <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="var(--color-background)" />
        </svg>
      </div>
    </section>
  )
}
