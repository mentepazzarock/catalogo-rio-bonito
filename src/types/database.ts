export type BusinessType = 'store' | 'service_provider'
export type SubscriptionPlan = 'basic' | 'premium' | 'pro'
export type SubscriptionStatus = 'active' | 'inactive' | 'trial'
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
export type UserRole = 'admin' | 'business_owner' | 'consumer'
export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost'
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type BannerPosition = 'home_hero' | 'home_middle' | 'search_top' | 'category_top'
export type EventType = 'view' | 'phone_click' | 'whatsapp_click' | 'website_click' | 'direction_click' | 'share' | 'favorite'

export interface UserProfile {
  id: string
  email: string
  name: string
  avatar_url: string | null
  phone: string | null
  role: UserRole
  is_active: boolean
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string | null
  parent_id: string | null
  sort_order: number
  is_active: boolean
  seo_title: string | null
  seo_description: string | null
  created_at: string
}

export interface BusinessAttribute {
  wifi: boolean
  parking: boolean
  delivery: boolean
  accepts_pix: boolean
  accepts_card: boolean
  accepts_cash: boolean
  accepts_vr: boolean
  pet_friendly: boolean
  accessibility: boolean
  air_conditioning: boolean
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
  tiktok: string | null
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
  attributes: BusinessAttribute
  subscription_plan: SubscriptionPlan
  subscription_status: SubscriptionStatus
  subscription_expires_at: string | null
  is_featured: boolean
  is_verified: boolean
  is_active: boolean
  is_approved: boolean
  average_rating: number
  total_reviews: number
  total_views: number
  total_whatsapp_clicks: number
  total_phone_clicks: number
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

export interface ProductCategory {
  id: string
  business_id: string
  name: string
  sort_order: number
}

export interface Product {
  id: string
  business_id: string
  category_id: string | null
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
  is_reported: boolean
  helpful_count: number
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
  total_views: number
  total_redemptions: number
  created_at: string
}

export interface Favorite {
  id: string
  user_id: string
  business_id: string
  created_at: string
}

export interface BusinessView {
  id: string
  business_id: string
  event_type: EventType
  user_agent: string | null
  created_at: string
}

export interface Lead {
  id: string
  business_id: string
  name: string
  phone: string | null
  email: string | null
  message: string | null
  source: 'whatsapp' | 'phone' | 'form' | 'booking'
  status: LeadStatus
  created_at: string
}

export interface Appointment {
  id: string
  business_id: string
  service_id: string
  client_name: string
  client_phone: string
  client_email: string | null
  date: string
  start_time: string
  end_time: string
  status: AppointmentStatus
  notes: string | null
  created_at: string
}

export interface Banner {
  id: string
  title: string
  image_url: string
  link: string | null
  position: BannerPosition
  business_id: string | null
  starts_at: string
  ends_at: string
  is_active: boolean
  total_impressions: number
  total_clicks: number
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'review' | 'reply' | 'promotion' | 'subscription' | 'approval' | 'system' | 'lead'
  title: string
  body: string
  data: Record<string, string> | null
  is_read: boolean
  created_at: string
}

export interface PaymentTransaction {
  id: string
  business_id: string
  amount: number
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: string | null
  gateway_ref: string | null
  description: string
  created_at: string
}

export interface AdminAuditLog {
  id: string
  admin_id: string
  action: string
  entity_type: string
  entity_id: string
  details: Record<string, unknown> | null
  created_at: string
}

export interface SearchAnalytics {
  id: string
  query: string
  results_count: number
  category_filter: string | null
  created_at: string
}

export interface SiteSettings {
  id: string
  site_name: string
  site_description: string
  whatsapp_business: string
  email_contact: string
  city: string
  state: string
  logo_url: string | null
  primary_color: string
  accent_color: string
  maintenance_mode: boolean
}

// Composite types
export interface BusinessWithDetails extends Business {
  categories: Category[]
  hours: BusinessHours[]
  products: Product[]
  services: ServiceItem[]
  reviews: Review[]
  promotions: Promotion[]
  owner?: UserProfile
}

export interface AdminDashboardStats {
  total_businesses: number
  active_businesses: number
  pending_approval: number
  total_users: number
  total_reviews: number
  monthly_revenue: number
  active_subscriptions: number
  plan_distribution: { basic: number; premium: number; pro: number }
  new_businesses_this_month: number
  churn_rate: number
}

export interface BusinessDashboardStats {
  total_views: number
  views_change: number
  whatsapp_clicks: number
  whatsapp_change: number
  phone_clicks: number
  phone_change: number
  total_reviews: number
  average_rating: number
  profile_completeness: number
  daily_views: { date: string; views: number }[]
}
