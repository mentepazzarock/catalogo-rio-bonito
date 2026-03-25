'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { loginSchema, signupSchema, resetPasswordSchema } from '@/lib/validations'
import { SITE_URL } from '@/lib/constants'

export type AuthResult = {
  error?: string
  success?: string
}

export async function login(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return { error: 'E-mail ou senha incorretos.' }
  }

  const redirectTo = formData.get('redirect') as string
  redirect(redirectTo || '/painel')
}

export async function signup(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = signupSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.name },
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Este e-mail já está cadastrado.' }
    }
    return { error: 'Erro ao criar conta. Tente novamente.' }
  }

  return { success: 'Conta criada! Verifique seu e-mail para confirmar.' }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function resetPassword(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const raw = { email: formData.get('email') as string }

  const parsed = resetPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${SITE_URL}/auth/callback?redirect=/conta`,
  })

  if (error) {
    return { error: 'Erro ao enviar e-mail. Tente novamente.' }
  }

  return { success: 'E-mail de recuperação enviado! Verifique sua caixa de entrada.' }
}

export async function loginWithOAuth(provider: 'google' | 'facebook') {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${SITE_URL}/auth/callback`,
    },
  })

  if (error || !data.url) {
    return { error: 'Erro ao conectar com provedor. Tente novamente.' }
  }

  redirect(data.url)
}
