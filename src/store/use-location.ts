import { create } from 'zustand'

interface LocationState {
  latitude: number | null
  longitude: number | null
  status: 'idle' | 'loading' | 'granted' | 'denied' | 'unavailable'
  error: string | null
  requestLocation: () => void
}

export const useLocation = create<LocationState>((set, get) => ({
  latitude: null,
  longitude: null,
  status: 'idle',
  error: null,

  requestLocation: () => {
    if (get().status === 'loading') return

    if (!navigator.geolocation) {
      set({ status: 'unavailable', error: 'Geolocalização não suportada neste dispositivo' })
      return
    }

    set({ status: 'loading', error: null })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          status: 'granted',
          error: null,
        })
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          set({ status: 'denied', error: 'Permissão de localização negada' })
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          set({ status: 'unavailable', error: 'Localização indisponível' })
        } else {
          set({ status: 'unavailable', error: 'Não foi possível obter sua localização' })
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache por 5 minutos
      }
    )
  },
}))
