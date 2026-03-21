import Link from 'next/link'
import { Plus, Eye, Users, TrendingUp, Star, ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-warm-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Tem um negócio em Rio Bonito?
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Cadastre-se no Catálogo e aumente sua presença digital.
            Milhares de pessoas já pesquisam aqui!
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-4xl mx-auto mb-12">
          {[
            { icon: Eye, label: 'Visibilidade local', desc: 'Apareça para quem procura' },
            { icon: Users, label: 'Novos clientes', desc: 'Aumente seu público' },
            { icon: Star, label: 'Avaliações', desc: 'Construa reputação' },
            { icon: TrendingUp, label: 'Crescimento', desc: 'Acompanhe métricas' },
          ].map((benefit) => (
            <div
              key={benefit.label}
              className="flex flex-col items-center text-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 sm:p-6 hover:bg-white/15 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 mb-3">
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{benefit.label}</h3>
              <p className="text-xs text-primary-200">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-primary-700 hover:bg-primary-50 transition-colors shadow-xl shadow-primary-900/30"
          >
            <Plus className="h-5 w-5" />
            Cadastrar Meu Negócio
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-primary-200">
            A partir de R$100/mês • Sem fidelidade
          </p>
        </div>
      </div>
    </section>
  )
}
