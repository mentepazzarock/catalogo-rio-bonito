import { cache } from 'react'
import { createClient } from '@/lib/supabase-server'
import type { BusinessWithDetails, Category, Review, Banner, Lead, UserProfile } from '@/types/database'

// ── Categories ──

export const getCategories = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name')
  return (data ?? []) as Category[]
})

export const getCategoryBySlug = cache(async (slug: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  return data as Category | null
})

// ── Businesses ──

const BUSINESS_SELECT = `
  *,
  business_categories(
    category:categories(*)
  ),
  products(*),
  service_items(*),
  reviews(*),
  promotions(*),
  business_hours(*)
`

function mapBusiness(raw: Record<string, unknown>): BusinessWithDetails {
  const categories = (raw.business_categories as Array<{ category: Category }>)
    ?.map((bc) => bc.category)
    .filter(Boolean) ?? []
  const hours = (raw.business_hours as Record<string, unknown>[]) ?? []

  const hoursMap: Record<string, { open: string; close: string }> = {}
  for (const h of hours) {
    hoursMap[h.day_of_week as string] = {
      open: h.open_time as string,
      close: h.close_time as string,
    }
  }

  return {
    ...raw,
    categories,
    products: (raw.products as unknown[]) ?? [],
    services: (raw.service_items as unknown[]) ?? [],
    reviews: (raw.reviews as unknown[]) ?? [],
    promotions: (raw.promotions as unknown[]) ?? [],
    hours: hoursMap,
  } as unknown as BusinessWithDetails
}

export const getBusinesses = cache(async (options?: {
  category?: string
  type?: 'store' | 'service_provider'
  featured?: boolean
  search?: string
  limit?: number
  offset?: number
}) => {
  const supabase = await createClient()
  let query = supabase
    .from('businesses')
    .select(BUSINESS_SELECT)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('average_rating', { ascending: false })

  if (options?.type) {
    query = query.eq('type', options.type)
  }
  if (options?.featured) {
    query = query.eq('is_featured', true)
  }
  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit ?? 20) - 1)
  }

  const { data } = await query

  let results = (data ?? []).map(mapBusiness)

  // Filter by category slug (post-query since it's a join)
  if (options?.category) {
    results = results.filter((b) =>
      b.categories.some((c) => c.slug === options.category)
    )
  }

  return results
})

export const getBusinessBySlug = cache(async (slug: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('businesses')
    .select(BUSINESS_SELECT)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!data) return null
  return mapBusiness(data as Record<string, unknown>)
})

export const getBusinessById = cache(async (id: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('businesses')
    .select(BUSINESS_SELECT)
    .eq('id', id)
    .single()

  if (!data) return null
  return mapBusiness(data as Record<string, unknown>)
})

export const getBusinessesByOwner = cache(async (ownerId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('businesses')
    .select(BUSINESS_SELECT)
    .eq('owner_id', ownerId)

  return (data ?? []).map(mapBusiness)
})

export const getFeaturedBusinesses = cache(async (limit = 6) => {
  return getBusinesses({ featured: true, limit })
})

// ── Reviews ──

export const getReviewsByBusiness = cache(async (businessId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reviews')
    .select('*, user:user_profiles(full_name, avatar_url)')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
  return (data ?? []) as (Review & { user: { full_name: string; avatar_url: string | null } })[]
})

export const getReviewsByUser = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reviews')
    .select('*, business:businesses(name, slug)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return data ?? []
})

// ── Promotions ──

export const getActivePromotions = cache(async (limit = 6) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('promotions')
    .select('*, business:businesses(name, slug, type)')
    .eq('is_active', true)
    .gte('end_date', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(limit)
  return data ?? []
})

// ── Stats ──

export const getPublicStats = cache(async () => {
  const supabase = await createClient()

  const [businesses, categories, reviews] = await Promise.all([
    supabase.from('businesses').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('categories').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('reviews').select('id', { count: 'exact', head: true }),
  ])

  return {
    totalBusinesses: businesses.count ?? 0,
    totalCategories: categories.count ?? 0,
    totalReviews: reviews.count ?? 0,
  }
})

// ── Admin Stats ──

export const getAdminStats = cache(async () => {
  const supabase = await createClient()

  const [businesses, users, reviews, pendingBusinesses] = await Promise.all([
    supabase.from('businesses').select('id', { count: 'exact', head: true }),
    supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
    supabase.from('reviews').select('id', { count: 'exact', head: true }),
    supabase.from('businesses').select('id', { count: 'exact', head: true }).eq('is_active', false),
  ])

  return {
    totalBusinesses: businesses.count ?? 0,
    totalUsers: users.count ?? 0,
    totalReviews: reviews.count ?? 0,
    pendingBusinesses: pendingBusinesses.count ?? 0,
  }
})

// ── Business Views / Analytics ──

export const getBusinessViews = cache(async (businessId: string, days = 30) => {
  const supabase = await createClient()
  const since = new Date()
  since.setDate(since.getDate() - days)

  const { data } = await supabase
    .from('business_views')
    .select('event_type, created_at')
    .eq('business_id', businessId)
    .gte('created_at', since.toISOString())

  return data ?? []
})

// ── Leads ──

export const getLeadsByBusiness = cache(async (businessId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('leads')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
  return data ?? []
})

// ── Banners ──

export const getActiveBanners = cache(async (position?: string) => {
  const supabase = await createClient()
  let query = supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (position) {
    query = query.eq('position', position)
  }

  const { data } = await query
  return data ?? []
})

// ── Admin: All Businesses (including inactive) ──

export const getAllBusinesses = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('businesses')
    .select(BUSINESS_SELECT)
    .order('created_at', { ascending: false })

  return (data ?? []).map(mapBusiness)
})

// ── Admin: All Categories (including inactive) ──

export const getAllCategories = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')
  return (data ?? []) as Category[]
})

// ── Admin: All Users ──

export const getAllUsers = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false })
  return (data ?? []) as UserProfile[]
})

// ── Admin: All Reviews ──

export const getAllReviews = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reviews')
    .select('*, business:businesses(name, slug)')
    .order('created_at', { ascending: false })
  return data ?? []
})

// ── Admin: All Banners (including inactive) ──

export const getAllBanners = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false })
  return (data ?? []) as Banner[]
})

// ── Admin: All Payments ──

export const getAllPayments = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('payment_transactions')
    .select('*, business:businesses(name, slug)')
    .order('created_at', { ascending: false })
    .limit(50)
  return data ?? []
})

// ── Favorites (server-side for logged-in users) ──

export const getUserFavorites = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('favorites')
    .select('business_id')
    .eq('user_id', userId)

  return (data ?? []).map((f) => f.business_id)
})
