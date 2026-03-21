'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, Clock, LayoutGrid, List } from 'lucide-react'
import { BusinessCard } from '@/components/business/business-card'
import { BusinessCardCompact } from '@/components/business/business-card-compact'
import { CategoryIcon } from '@/components/ui/icon-map'
import { EmptyState } from '@/components/shared/empty-state'
import { mockCategories } from '@/lib/mock-data'
import { isOpenNow } from '@/lib/utils'
import type { BusinessWithDetails } from '@/types/database'

type SortOption = 'relevance' | 'rating' | 'reviews' | 'name'

interface BusinessListPageProps {
  businesses: BusinessWithDetails[]
  title: string
  subtitle: string
  icon: React.ReactNode
  emptyMessage: string
}

export function BusinessListPage({ businesses, title, subtitle, icon, emptyMessage }: BusinessListPageProps) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const availableCategories = useMemo(() => {
    const catIds = new Set(businesses.flatMap((b) => b.categories.map((c) => c.id)))
    return mockCategories.filter((c) => catIds.has(c.id))
  }, [businesses])

  const filteredBusinesses = useMemo(() => {
    let results = [...businesses]
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
    if (selectedCategory) {
      results = results.filter((b) => b.categories.some((c) => c.slug === selectedCategory))
    }
    if (showOpenOnly) {
      results = results.filter((b) => isOpenNow(b.hours))
    }
    switch (sortBy) {
      case 'rating': results.sort((a, b) => b.average_rating - a.average_rating); break
      case 'reviews': results.sort((a, b) => b.total_reviews - a.total_reviews); break
      case 'name': results.sort((a, b) => a.name.localeCompare(b.name)); break
      default: results.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
    }
    return results
  }, [businesses, query, selectedCategory, sortBy, showOpenOnly])

  const clearFilters = () => {
    setQuery('')
    setSelectedCategory('')
    setSortBy('relevance')
    setShowOpenOnly(false)
  }

  const hasActiveFilters = query || selectedCategory || showOpenOnly || sortBy !== 'relevance'

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            {icon}
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Buscar em ${title.toLowerCase()}...`}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${showFilters || hasActiveFilters
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
          </div>

          {/* Category pills - always visible on mobile for iFood style */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            <button
              onClick={() => setSelectedCategory('')}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${!selectedCategory ? 'bg-primary-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              Todas
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${selectedCategory === cat.slug ? 'bg-primary-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                <CategoryIcon name={cat.icon} className="h-3.5 w-3.5" />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-3 animate-scale-in">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowOpenOnly(!showOpenOnly)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${showOpenOnly ? 'bg-accent-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
                  >
                    <option value="relevance">Relevância</option>
                    <option value="rating">Melhor avaliados</option>
                    <option value="reviews">Mais avaliados</option>
                    <option value="name">A-Z</option>
                  </select>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-primary-600 font-medium hover:text-primary-700">
                    Limpar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{filteredBusinesses.length}</span>{' '}
            {filteredBusinesses.length === 1 ? 'resultado' : 'resultados'}
            {query && <> para <span className="font-semibold text-slate-700">&ldquo;{query}&rdquo;</span></>}
          </p>
          {/* View toggle */}
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500'
                }`}
            >
              <List className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Lista</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500'
                }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {filteredBusinesses.length > 0 ? (
          viewMode === 'list' ? (
            <div className="space-y-3 stagger-children">
              {filteredBusinesses.map((business) => (
                <BusinessCardCompact key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} featured={business.is_featured} />
              ))}
            </div>
          )
        ) : (
          <EmptyState
            icon={Search}
            title="Nenhum resultado"
            description={emptyMessage}
            action={
              <button onClick={clearFilters} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                Limpar filtros e ver todos
              </button>
            }
          />
        )}
      </div>
    </div>
  )
}
