'use server'

import { createClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
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
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return { error: 'E-mail ou senha incorretos.' }
  }

  // Garantir que user_profile existe
  if (data.user) {
    const admin = createAdminClient()
    const { data: existingProfile } = await admin
      .from('user_profiles')
      .select('id')
      .eq('id', data.user.id)
      .single()

    if (!existingProfile) {
      await admin.from('user_profiles').insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: data.user.user_metadata?.full_name || 'Usuário',
        role: 'consumer',
        is_active: true,
      })
    }
  }

  // Redirecionar baseado no contexto
  const redirectTo = formData.get('redirect') as string
  if (redirectTo) {
    redirect(redirectTo)
  }

  // Verificar role para redirecionar corretamente
  if (data.user) {
    const admin = createAdminClient()
    const { data: profile } = await admin
      .from('user_profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role === 'admin') {
      redirect('/admin')
    } else if (profile?.role === 'business_owner') {
      redirect('/painel')
    }
  }

  redirect('/')
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
  const { data: signUpData, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.name },
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    console.error('[signup] Supabase auth error:', error.message, error.status)
    if (error.message.includes('already registered') || error.message.includes('already been registered')) {
      return { error: 'Este e-mail já está cadastrado. Tente fazer login.' }
    }
    if (error.message.includes('rate limit') || error.status === 429) {
      return { error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }
    }
    if (error.message.includes('not authorized') || error.message.includes('not allowed')) {
      return { error: 'Cadastro temporariamente indisponível. Tente novamente mais tarde.' }
    }
    return { error: `Erro ao criar conta: ${error.message}` }
  }

  // Supabase pode retornar user sem erro mas com identities vazio = email já existe
  if (signUpData.user && signUpData.user.identities?.length === 0) {
    return { error: 'Este e-mail já está cadastrado. Tente fazer login.' }
  }

  // Criar user_profile imediatamente com service role (bypassa RLS)
  if (signUpData.user) {
    try {
      const admin = createAdminClient()
      await admin.from('user_profiles').upsert({
        id: signUpData.user.id,
        email: parsed.data.email,
        full_name: parsed.data.name,
        role: 'consumer',
        is_active: true,
      })
    } catch (profileError) {
      console.error('[signup] Profile creation error:', profileError)
      // Não falhar o signup se o profile não for criado - será criado no login
    }
  }

  return { success: 'Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.' }
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
