import Link from 'next/link'
import { MapPin, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
          <MapPin className="h-10 w-10 text-primary-400" />
        </div>
        <h1 className="text-6xl font-extrabold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-700 mb-3">Página não encontrada</h2>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          A página que você procura não existe ou foi removida.
          Que tal explorar os negócios de Rio Bonito?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-bold text-white hover:bg-primary-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            Página Inicial
          </Link>
          <Link
            href="/buscar"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Search className="h-4 w-4" />
            Buscar
          </Link>
        </div>
      </div>
    </div>
  )
}
