import Link from 'next/link'
import { Store, TrendingUp, Users, Shield } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Benefits for businesses */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Decorations */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 px-3 py-1 text-xs font-semibold text-accent-400 mb-4">
                <Store className="h-3.5 w-3.5" />
                Para Lojistas e Profissionais
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Coloque seu negócio no mapa digital de Rio Bonito
              </h2>
              <p className="text-base text-slate-300 leading-relaxed mb-8">
                Milhares de pessoas buscam serviços e produtos em Rio Bonito todos os dias.
                Esteja presente quando eles procurarem pelo que você oferece.
              </p>
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-bold text-white hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/25"
              >
                Começar agora - a partir de R$100/mês
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: TrendingUp,
                  title: 'Mais Visibilidade',
                  desc: 'Apareça para todos que buscam seu tipo de negócio na cidade',
                },
                {
                  icon: Users,
                  title: 'Novos Clientes',
                  desc: 'Atraia clientes que ainda não conhecem seu negócio',
                },
                {
                  icon: Store,
                  title: 'Perfil Completo',
                  desc: 'Fotos, produtos, serviços, promoções e avaliações',
                },
                {
                  icon: Shield,
                  title: 'Selo Verificado',
                  desc: 'Transmita confiança com o selo de negócio verificado',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm"
                >
                  <item.icon className="h-8 w-8 text-primary-400 mb-3" />
                  <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
