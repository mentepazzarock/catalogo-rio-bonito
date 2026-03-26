'use client'

import { MapPin, Loader2, X } from 'lucide-react'
import { useLocation } from '@/store/use-location'

interface LocationButtonProps {
  onLocationGranted?: () => void
  compact?: boolean
}

export function LocationButton({ onLocationGranted, compact = false }: LocationButtonProps) {
  const { status, requestLocation } = useLocation()

  const handleClick = () => {
    requestLocation()
    if (onLocationGranted) {
      // Check after a delay to give time for geolocation
      setTimeout(() => {
        const state = useLocation.getState()
        if (state.status === 'granted') {
          onLocationGranted()
        }
      }, 1500)
    }
  }

  if (status === 'granted') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 ${compact ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'} font-semibold`}>
        <MapPin className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
        Localização ativa
      </span>
    )
  }

  if (status === 'loading') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 ${compact ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'} font-medium`}>
        <Loader2 className={`animate-spin ${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
        Localizando...
      </span>
    )
  }

  if (status === 'denied') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200 text-red-500 ${compact ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'} font-medium`}>
        <X className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
        Bloqueada
      </span>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 hover:bg-primary-100 active:scale-95 transition-all ${compact ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'} font-semibold`}
    >
      <MapPin className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      Perto de mim
    </button>
  )
}
