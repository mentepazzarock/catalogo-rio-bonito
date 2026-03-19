import Link from 'next/link'
import { MapPin, Heart } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              O maior guia de lojas e profissionais de Rio Bonito, RJ. Conectando o comércio local
              aos consumidores da cidade. Valorize quem é daqui!
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/buscar" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Explorar
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/cadastro" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Cadastrar Negócio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Para Empresas
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/cadastro" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Planos e Preços
                </Link>
              </li>
              <li>
                <Link href="/painel" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Painel do Lojista
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              Feito com <Heart className="h-3 w-3 text-red-400 fill-red-400" /> em Rio Bonito, RJ
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
