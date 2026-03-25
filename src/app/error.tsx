'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 mb-6">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Algo deu errado</h2>
        <p className="text-sm text-slate-500 mb-6">
          Ocorreu um erro inesperado. Tente recarregar a pagina ou voltar ao inicio.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-bold text-white hover:bg-primary-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Home className="h-4 w-4" />
            Inicio
          </Link>
        </div>
        {error.digest && (
          <p className="mt-4 text-xs text-slate-400">Codigo: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
