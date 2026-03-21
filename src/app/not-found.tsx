import Link from 'next/link'
import { MapPin, Search, ChevronRight } from 'lucide-react'
import { MotionWrapper } from '@/components/ui/motion-wrapper'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 bg-slate-50/50">
      <div className="text-center max-w-md w-full relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl -z-10" />

        <MotionWrapper variant="fade-up" delay={0}>
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-primary-500/10 border border-slate-100 rotate-3 hover:rotate-6 transition-transform">
            <MapPin className="h-10 w-10 text-primary-500" />
          </div>
        </MotionWrapper>

        <MotionWrapper variant="fade-up" delay={0.1}>
          <h1 className="text-7xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-warm-500">
            404
          </h1>
        </MotionWrapper>

        <MotionWrapper variant="fade-up" delay={0.2}>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Página não encontrada</h2>
          <p className="text-base text-slate-500 mb-10 leading-relaxed max-w-sm mx-auto">
            A página que você procura tomou um caminho diferente. Vamos voltar a explorar Rio Bonito?
          </p>
        </MotionWrapper>

        <MotionWrapper variant="fade-up" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25 active:scale-95"
            >
              Página Inicial
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/buscar"
              className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm active:scale-95"
            >
              <Search className="h-4 w-4 text-slate-400" />
              Buscar no catálogo
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </div>
  )
}
