'use client'

import { useState, useEffect } from 'react'
import { Heart, Search } from 'lucide-react'
import Link from 'next/link'
import { useFavorites } from '@/store/use-favorites'
import { BusinessCardCompact } from '@/components/business/business-card-compact'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper'
import { createClient } from '@/lib/supabase-browser'
import type { BusinessWithDetails } from '@/types/database'

export default function FavoritosPage() {
  const { favorites } = useFavorites()
  const [mounted, setMounted] = useState(false)
  const [businesses, setBusinesses] = useState<BusinessWithDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || favorites.length === 0) {
      setLoading(false)
      return
    }

    async function loadFavorites() {
      const supabase = createClient()
      const { data } = await supabase
        .from('businesses')
        .select(`
          *,
          business_categories(category:categories(*)),
          products(*),
          service_items(*),
          reviews(*),
          promotions(*),
          business_hours(*)
        `)
        .in('id', favorites)
        .eq('is_active', true)

      if (data) {
        const mapped = data.map((raw) => {
          const categories = raw.business_categories
            ?.map((bc: { category: unknown }) => bc.category)
            .filter(Boolean) ?? []
          return {
            ...raw,
            categories,
            products: raw.products ?? [],
            services: raw.service_items ?? [],
            reviews: raw.reviews ?? [],
            promotions: raw.promotions ?? [],
            hours: raw.business_hours ?? [],
          } as unknown as BusinessWithDetails
        })
        setBusinesses(mapped)
      }
      setLoading(false)
    }

    loadFavorites()
  }, [mounted, favorites])

  if (!mounted || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-slate-200 mb-4" />
          <div className="h-4 w-32 bg-slate-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20 md:pb-0">
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <MotionWrapper variant="fade-up">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-6 shadow-inner">
              <Heart className="h-8 w-8 text-white fill-white/20" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Meus Favoritos</h1>
            <p className="text-primary-100 max-w-lg mx-auto">
              Sua lista VIP de lugares em Rio Bonito.
            </p>
          </MotionWrapper>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {businesses.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businesses.map((business) => (
              <StaggerItem key={business.id}>
                <BusinessCardCompact business={business} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <MotionWrapper variant="scale">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 mb-6">
                <Heart className="h-10 w-10 text-slate-300" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Nenhum favorito ainda</h2>
              <p className="text-slate-500 mb-8">
                Explore os negócios de Rio Bonito e clique no coração para salvar seus locais preferidos.
              </p>
              <Link href="/buscar" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors shadow-sm active:scale-95">
                <Search className="h-4 w-4" />Explorar Rio Bonito
              </Link>
            </div>
          </MotionWrapper>
        )}
      </div>
    </div>
  )
}
