'use server'

import { createClient } from '@/lib/supabase-server'
import { requireAuth, requireBusinessOwner } from '@/lib/dal'
import { revalidatePath } from 'next/cache'
import { reviewSchema, reviewReplySchema, leadSchema, productSchema, promotionSchema } from '@/lib/validations'

export type ActionResult = {
  error?: string
  success?: string
}

// ── Reviews ──

export async function createReview(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await requireAuth()

  const raw = {
    business_id: formData.get('business_id') as string,
    rating: Number(formData.get('rating')),
    comment: formData.get('comment') as string,
  }

  const parsed = reviewSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('reviews').insert({
    ...parsed.data,
    user_id: user.id,
  })

  if (error) {
    return { error: 'Erro ao enviar avaliação. Tente novamente.' }
  }

  revalidatePath(`/negocio/[slug]`, 'page')
  return { success: 'Avaliação enviada com sucesso!' }
}

export async function replyToReview(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireBusinessOwner()

  const raw = {
    review_id: formData.get('review_id') as string,
    reply: formData.get('reply') as string,
  }

  const parsed = reviewReplySchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('reviews')
    .update({
      owner_reply: parsed.data.reply,
      owner_reply_at: new Date().toISOString(),
    })
    .eq('id', parsed.data.review_id)

  if (error) {
    return { error: 'Erro ao responder avaliação.' }
  }

  revalidatePath('/painel/avaliacoes')
  return { success: 'Resposta enviada!' }
}

// ── Products ──

export async function createProduct(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireBusinessOwner()

  const raw = {
    business_id: formData.get('business_id') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string || undefined,
    price: formData.get('price') ? Number(formData.get('price')) : undefined,
    promotional_price: formData.get('promotional_price') ? Number(formData.get('promotional_price')) : undefined,
    category: formData.get('category') as string || undefined,
    is_active: true,
  }

  const parsed = productSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('products').insert(parsed.data)

  if (error) {
    return { error: 'Erro ao criar produto.' }
  }

  revalidatePath('/painel/produtos')
  return { success: 'Produto criado com sucesso!' }
}

export async function deleteProduct(productId: string): Promise<ActionResult> {
  await requireBusinessOwner()

  const supabase = await createClient()
  const { error } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('id', productId)

  if (error) {
    return { error: 'Erro ao remover produto.' }
  }

  revalidatePath('/painel/produtos')
  return { success: 'Produto removido!' }
}

// ── Promotions ──

export async function createPromotion(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireBusinessOwner()

  const raw = {
    business_id: formData.get('business_id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string || undefined,
    discount_type: formData.get('discount_type') as 'percentage' | 'fixed' | 'coupon',
    discount_value: Number(formData.get('discount_value')),
    coupon_code: formData.get('coupon_code') as string || undefined,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string,
  }

  const parsed = promotionSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('promotions').insert({
    ...parsed.data,
    is_active: true,
  })

  if (error) {
    return { error: 'Erro ao criar promoção.' }
  }

  revalidatePath('/painel/promocoes')
  return { success: 'Promoção criada com sucesso!' }
}

// ── Leads ──

export async function createLead(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const raw = {
    business_id: formData.get('business_id') as string,
    name: formData.get('name') as string,
    phone: formData.get('phone') as string || undefined,
    email: formData.get('email') as string || undefined,
    message: formData.get('message') as string || undefined,
  }

  const parsed = leadSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('leads').insert(parsed.data)

  if (error) {
    return { error: 'Erro ao enviar mensagem.' }
  }

  return { success: 'Mensagem enviada! O negócio entrará em contato.' }
}

// ── Business Views / Analytics ──

export async function trackBusinessView(businessId: string, eventType: string) {
  const supabase = await createClient()
  await supabase.from('business_views').insert({
    business_id: businessId,
    event_type: eventType,
  })
}

// ── Favorites (server-side sync) ──

export async function toggleFavorite(businessId: string): Promise<ActionResult> {
  const user = await requireAuth()

  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('business_id', businessId)
    .single()

  if (existing) {
    await supabase.from('favorites').delete().eq('id', existing.id)
    return { success: 'Removido dos favoritos.' }
  } else {
    await supabase.from('favorites').insert({
      user_id: user.id,
      business_id: businessId,
    })
    return { success: 'Adicionado aos favoritos!' }
  }
}

// ── Update Business Profile ──

export async function updateBusinessProfile(
  businessId: string,
  data: Record<string, unknown>
): Promise<ActionResult> {
  await requireBusinessOwner()

  const supabase = await createClient()
  const { error } = await supabase
    .from('businesses')
    .update(data)
    .eq('id', businessId)

  if (error) {
    return { error: 'Erro ao atualizar perfil.' }
  }

  revalidatePath('/painel/perfil')
  revalidatePath(`/negocio/[slug]`, 'page')
  return { success: 'Perfil atualizado com sucesso!' }
}
