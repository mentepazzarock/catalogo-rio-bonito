import { z } from 'zod'

// ── Auth ──

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const signupSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const resetPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

// ── Business ──

export const businessSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug inválido'),
  type: z.enum(['store', 'service_provider']),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres').max(2000),
  short_description: z.string().max(200).optional(),
  phone: z.string().min(10, 'Telefone inválido').max(20).optional(),
  whatsapp: z.string().max(20).optional(),
  email: z.string().email('E-mail inválido').optional(),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  address: z.string().max(200).optional(),
  neighborhood: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(2).optional(),
  zip_code: z.string().max(10).optional(),
})

// ── Business Registration (self-service) ──

export const businessRegistrationSchema = z.object({
  name: z.string().min(2, 'Nome do negócio deve ter pelo menos 2 caracteres').max(100),
  type: z.enum(['store', 'service_provider'], { message: 'Selecione o tipo do negócio' }),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres').max(2000),
  phone: z.string().min(10, 'Telefone inválido').max(20).optional().or(z.literal('')),
  whatsapp: z.string().max(20).optional().or(z.literal('')),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  address: z.string().max(200).optional().or(z.literal('')),
  neighborhood: z.string().max(100).optional().or(z.literal('')),
  category_id: z.string().uuid('Selecione uma categoria'),
})

export type BusinessRegistrationInput = z.infer<typeof businessRegistrationSchema>

// ── Review ──

export const reviewSchema = z.object({
  business_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, 'Comentário deve ter pelo menos 5 caracteres').max(1000),
})

export const reviewReplySchema = z.object({
  review_id: z.string().uuid(),
  reply: z.string().min(2, 'Resposta deve ter pelo menos 2 caracteres').max(1000),
})

// ── Product ──

export const productSchema = z.object({
  business_id: z.string().uuid(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0).optional(),
  promotional_price: z.number().min(0).optional(),
  category: z.string().max(50).optional(),
  is_active: z.boolean().default(true),
})

// ── Promotion ──

export const promotionSchema = z.object({
  business_id: z.string().uuid(),
  title: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  discount_type: z.enum(['percentage', 'fixed', 'coupon']),
  discount_value: z.number().min(0),
  coupon_code: z.string().max(30).optional(),
  start_date: z.string(),
  end_date: z.string(),
})

// ── Lead ──

export const leadSchema = z.object({
  business_id: z.string().uuid(),
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20).optional(),
  email: z.string().email().optional(),
  message: z.string().max(1000).optional(),
})

// ── Types ──

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type BusinessInput = z.infer<typeof businessSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type ProductInput = z.infer<typeof productSchema>
export type PromotionInput = z.infer<typeof promotionSchema>
export type LeadInput = z.infer<typeof leadSchema>
