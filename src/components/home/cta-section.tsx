import Link from 'next/link'
import { Heart, Star, Sparkles, MapPin, ArrowRight, Building2 } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Aproveite o melhor de Rio Bonito
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Crie sua conta gratuita para salvar seus locais favoritos, deixar avaliacoes e receber ofertas exclusivas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto mb-10">
          {[
            { icon: Heart, label: 'Salve Favoritos', desc: 'Monte sua lista VIP de lugares' },
            { icon: Star, label: 'Avalie e Comente', desc: 'Ajude a comunidade local' },
            { icon: Sparkles, label: 'Ofertas Exclusivas', desc: 'Cupons direto no seu celular' },
          ].map((benefit) => (
            <div
              key={benefit.label}
              className="flex flex-col items-center text-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 sm:p-6 hover:bg-white/15 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 mb-3 shadow-inner">
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{benefit.label}</h3>
              <p className="text-sm text-primary-200">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center flex flex-col items-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-primary-700 hover:bg-primary-50 transition-colors shadow-xl shadow-primary-900/30 active:scale-[0.98]"
          >
            <MapPin className="h-5 w-5" />
            Criar Minha Conta Gratis
            <ArrowRight className="h-5 w-5" />
          </Link>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="text-sm text-primary-200">
              Voce e dono(a) de um negocio?
            </span>
            <Link
              href="/cadastro-empresa"
              className="text-sm font-bold text-white hover:text-accent-300 transition-colors flex items-center gap-1 group"
            >
              <Building2 className="h-4 w-4" />
              Cadastre seu negocio aqui
              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
