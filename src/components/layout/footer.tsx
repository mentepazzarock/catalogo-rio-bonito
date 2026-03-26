import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="hidden md:block bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-4">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
              ].map(({ icon: Icon, href }) => (
                <a key={Icon.displayName} href={href} className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-primary-600 hover:text-white transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navegação</h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Início', href: '/' },
                { name: 'Lojas', href: '/lojas' },
                { name: 'Serviços', href: '/servicos' },
                { name: 'Categorias', href: '/categorias' },
                { name: 'Buscar', href: '/buscar' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Para Empresas */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Para Empresas</h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Cadastrar Negócio', href: '/cadastro-empresa' },
                { name: 'Ver Planos', href: '/para-empresas' },
                { name: 'Login', href: '/login' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 shrink-0 text-primary-400" />
                Rio Bonito, RJ
              </li>
              <li>
                <a href="mailto:contato@catalogorb.com.br" className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary-400 transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                  contato@catalogorb.com.br
                </a>
              </li>
              <li>
                <a href="tel:+5521999999999" className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary-400 transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                  (21) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.</p>
            <p>Feito com ❤️ em Rio Bonito, RJ</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
