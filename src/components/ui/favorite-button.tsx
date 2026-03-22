'use client'

import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavorites } from '@/store/use-favorites'
import { useEffect, useState } from 'react'

export function FavoriteButton({ businessId }: { businessId: string }) {
    const { toggleFavorite, isFavorite } = useFavorites()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch since it reads from localStorage
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-slate-300">
                <Heart className="h-4 w-4" />
            </div>
        )
    }

    const active = isFavorite(businessId)

    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleFavorite(businessId)
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-colors ${active ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'
                }`}
            aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
            <Heart className={`h-4 w-4 transition-all duration-300 ${active ? 'fill-current scale-110' : 'scale-100'}`} />
        </motion.button>
    )
}
