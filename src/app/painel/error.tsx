'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function PainelError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Painel error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Erro no painel</h2>
        <p className="text-sm text-slate-500 mb-4">Ocorreu um erro ao carregar esta pagina.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-700">
            <RefreshCw className="h-4 w-4" />Recarregar
          </button>
          <Link href="/painel" className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200">Visao Geral</Link>
        </div>
      </div>
    </div>
  )
}
