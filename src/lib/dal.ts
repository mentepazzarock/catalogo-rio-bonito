import { cache } from 'react'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import type { UserProfile } from '@/types/database'

// ── Cached user fetchers (deduplicated per request) ──

export const getUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

export const getUserProfile = cache(async (): Promise<UserProfile | null> => {
  const user = await getUser()
  if (!user) return null

  const supabase = await createClient()
  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
})

// ── Authorization gates ──

export const requireAuth = cache(async () => {
  const user = await getUser()
  if (!user) redirect('/login')
  return user
})

export const requireAdmin = cache(async () => {
  const user = await requireAuth()
  const profile = await getUserProfile()
  if (!profile || profile.role !== 'admin') redirect('/')
  return { user, profile }
})

export const requireBusinessOwner = cache(async () => {
  const user = await requireAuth()
  const profile = await getUserProfile()
  if (!profile || (profile.role !== 'business_owner' && profile.role !== 'admin')) {
    redirect('/')
  }
  return { user, profile }
})
