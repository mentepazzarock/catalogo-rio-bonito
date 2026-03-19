import { Heart } from 'lucide-react'
import { EmptyState } from '@/components/shared/empty-state'
import Link from 'next/link'

export default function FavoritosPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Meus Favoritos</h1>
        <EmptyState
          icon={Heart}
          title="Nenhum favorito ainda"
          description="Salve seus negócios favoritos tocando no coração para encontrá-los facilmente depois."
          action={
            <Link href="/buscar" className="inline-flex items-center rounded-xl bg-primary-600 px-5 py-3 text-sm font-bold text-white hover:bg-primary-700">
              Explorar negócios
            </Link>
          }
        />
      </div>
    </div>
  )
}
