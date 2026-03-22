import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
    favorites: string[] // Array of business IDs
    toggleFavorite: (id: string) => void
    isFavorite: (id: string) => boolean
}

export const useFavorites = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (id) => set((state) => ({
                favorites: state.favorites.includes(id)
                    ? state.favorites.filter((favId) => favId !== id)
                    : [...state.favorites, id]
            })),
            isFavorite: (id) => get().favorites.includes(id)
        }),
        {
            name: 'catalogo-rb-favorites',
        }
    )
)
