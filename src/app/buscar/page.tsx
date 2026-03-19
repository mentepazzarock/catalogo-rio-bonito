'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X, MapPin, Star, Clock } from 'lucide-react'
import { BusinessCard } from '@/components/business/business-card'
import { CategoryIcon } from '@/components/ui/icon-map'
import { mockBusinesses, mockCategories } from '@/lib/mock-data'
import { isOpenNow } from '@/lib/utils'

type SortOption = 'relevance' | 'rating' | 'reviews' | 'name'

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Carregando...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('categoria') || ''

  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [filterOpen, setFilterOpen] = useState(false)
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredBusinesses = useMemo(() => {
    let results = [...mockBusinesses]

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase()
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.categories.some((c) => c.name.toLowerCase().includes(q)) ||
          b.products.some((p) => p.name.toLowerCase().includes(q)) ||
          b.services.some((s) => s.name.toLowerCase().includes(q))
      )
    }

    // Category filter
    if (selectedCategory) {
      results = results.filter((b) => b.categories.some((c) => c.slug === selectedCategory))
    }

    // Open now filter
    if (showOpenOnly) {
      results = results.filter((b) => isOpenNow(b.hours))
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.average_rating - a.average_rating)
        break
      case 'reviews':
        results.sort((a, b) => b.total_reviews - a.total_reviews)
        break
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        results.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
    }

    return results
  }, [query, selectedCategory, sortBy, showOpenOnly])

  const clearFilters = () => {
    setQuery('')
    setSelectedCategory('')
    setSortBy('relevance')
    setShowOpenOnly(false)
  }

  const hasActiveFilters = query || selectedCategory || showOpenOnly || sortBy !== 'relevance'

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Search Header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar lojas, serviços, produtos..."
                className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pb-2 animate-scale-in">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    !selectedCategory
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todas
                </button>
                {mockCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <CategoryIcon name={cat.icon} className="h-3 w-3" />
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Sort & Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowOpenOnly(!showOpenOnly)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    showOpenOnly
                      ? 'bg-accent-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="h-3 w-3" />
                  Aberto agora
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-slate-500">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    <option value="relevance">Relevância</option>
                    <option value="rating">Melhor avaliados</option>
                    <option value="reviews">Mais avaliados</option>
                    <option value="name">A-Z</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary-600 font-medium hover:text-primary-700"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-slate-500">
            {filteredBusinesses.length === 0 ? (
              'Nenhum resultado encontrado'
            ) : (
              <>
                <span className="font-semibold text-slate-700">{filteredBusinesses.length}</span>{' '}
                {filteredBusinesses.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                {query && (
                  <>
                    {' '}para <span className="font-semibold text-slate-700">&ldquo;{query}&rdquo;</span>
                  </>
                )}
              </>
            )}
          </p>
        </div>

        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
            {filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                featured={business.is_featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Search className="h-7 w-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhum resultado</h3>
            <p className="text-sm text-slate-500 mb-4">
              Tente buscar com termos diferentes ou remova os filtros
            </p>
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Limpar filtros e ver todos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
