export type BusinessType = 'store' | 'service_provider'

export type SubscriptionPlan = 'basic' | 'premium' | 'pro'

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string | null
  parent_id: string | null
  created_at: string
}

export interface Business {
  id: string
  owner_id: string
  name: string
  slug: string
  type: BusinessType
  description: string
  short_description: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  website: string | null
  instagram: string | null
  facebook: string | null
  address: string
  neighborhood: string | null
  city: string
  state: string
  zip_code: string | null
  latitude: number | null
  longitude: number | null
  logo_url: string | null
  cover_url: string | null
  photos: string[]
  subscription_plan: SubscriptionPlan
  subscription_status: 'active' | 'inactive' | 'trial'
  subscription_expires_at: string | null
  is_featured: boolean
  is_verified: boolean
  is_active: boolean
  average_rating: number
  total_reviews: number
  created_at: string
  updated_at: string
}

export interface BusinessHours {
  id: string
  business_id: string
  day_of_week: DayOfWeek
  open_time: string
  close_time: string
  is_closed: boolean
}

export interface BusinessCategory {
  business_id: string
  category_id: string
}

export interface Product {
  id: string
  business_id: string
  name: string
  description: string | null
  price: number | null
  promotional_price: number | null
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ServiceItem {
  id: string
  business_id: string
  name: string
  description: string | null
  price: number | null
  duration_minutes: number | null
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  business_id: string
  user_id: string
  user_name: string
  user_avatar: string | null
  rating: number
  comment: string | null
  reply: string | null
  replied_at: string | null
  created_at: string
}

export interface Promotion {
  id: string
  business_id: string
  title: string
  description: string
  discount_type: 'percentage' | 'fixed' | 'coupon'
  discount_value: number | null
  coupon_code: string | null
  starts_at: string
  ends_at: string
  is_active: boolean
  created_at: string
}

export interface BusinessWithDetails extends Business {
  categories: Category[]
  hours: BusinessHours[]
  products: Product[]
  services: ServiceItem[]
  reviews: Review[]
  promotions: Promotion[]
}
