'use client'

import { useState } from 'react'
import { Check, Star, Zap, Crown, MessageCircle, ArrowRight, Loader2 } from 'lucide-react'
import { SUBSCRIPTION_PLANS, SITE_NAME } from '@/lib/constants'
import { formatCurrency, formatWhatsAppUrl } from '@/lib/utils'
import { toast } from 'sonner'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper'

export default function CadastroPage() {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'pro'>('premium')
  const [isLoading, setIsLoading] = useState(false)

  const planIcons = { basic: Star, premium: Zap, pro: Crown }
  const planColors = {
    basic: { bg: 'bg-slate-50', border: 'border-slate-200', accent: 'text-slate-700', btn: 'bg-slate-700 hover:bg-slate-800' },
    premium: { bg: 'bg-primary-50', border: 'border-primary-300 ring-2 ring-primary-100', accent: 'text-primary-700', btn: 'bg-primary-600 hover:bg-primary-700' },
    pro: { bg: 'bg-warm-50', border: 'border-warm-300', accent: 'text-warm-700', btn: 'bg-warm-600 hover:bg-warm-700' },
  }

  const handlePlanSelect = (key: 'basic' | 'premium' | 'pro') => {
    setSelectedPlan(key)
    toast.info(`O plano ${SUBSCRIPTION_PLANS[key].name} foi selecionado!`, {
      description: 'Role para baixo e toque em "Falar no WhatsApp" para prosseguir.',
    })
  }

  const handleWhatsAppClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)

    // Simulate preparing redirect
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)

    toast.success('Tudo pronto! Redirecionando...', {
      description: 'Nossa equipe de especialistas já vai falar com você no WhatsApp.',
    })

    const href = e.currentTarget.href
    setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-warm-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-400/10 rounded-full blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <MotionWrapper variant="fade-up" delay={0}>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Coloque seu negócio em
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-warm-300 to-accent-300">destaque digital</span>
            </h1>
          </MotionWrapper>
          <MotionWrapper variant="fade-up" delay={0.1}>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Cadastre sua loja ou serviço no {SITE_NAME} e seja encontrado por milhares de consumidores em Rio Bonito
            </p>
          </MotionWrapper>
        </div>
      </div>

      {/* Plans */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(Object.entries(SUBSCRIPTION_PLANS) as [keyof typeof SUBSCRIPTION_PLANS, typeof SUBSCRIPTION_PLANS[keyof typeof SUBSCRIPTION_PLANS]][]).map(
            ([key, plan]) => {
              const Icon = planIcons[key]
              const colors = planColors[key]
              const isSelected = selectedPlan === key
              const isPopular = key === 'premium'

              return (
                <StaggerItem key={key}>
                  <div
                    onClick={() => handlePlanSelect(key)}
                    className={`relative h-full rounded-2xl border-2 ${colors.border} ${colors.bg} p-6 cursor-pointer transition-all duration-300 ${isSelected ? 'shadow-xl -translate-y-1' : 'shadow-sm hover:shadow-md'
                      }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-primary-600 px-4 py-1 text-xs font-bold text-white shadow-md">
                          Mais Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <Icon className={`h-10 w-10 mx-auto mb-3 ${colors.accent}`} />
                      <h3 className="text-xl font-extrabold text-slate-900">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                          {formatCurrency(plan.price)}
                        </span>
                        <span className="text-sm text-slate-500">/mês</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className={`h-4 w-4 shrink-0 mt-0.5 ${colors.accent}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full absolute bottom-6 left-6 right-6 inline-flex justify-center rounded-xl md:w-[calc(100%-3rem)] ${colors.btn} px-4 py-3 text-sm font-bold text-white transition-colors shadow-sm active:scale-[0.98]`}
                    >
                      {isSelected ? 'Plano Selecionado' : 'Selecionar ' + plan.name}
                    </button>
                    {/* Spacer for absolute button */}
                    <div className="h-14" />
                  </div>
                </StaggerItem>
              )
            }
          )}
        </StaggerContainer>

        {/* CTA */}
        <MotionWrapper variant="fade-up" delay={0.2}>
          <div className="mt-12 rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 text-center shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              Pronto para começar?
            </h2>
            <p className="text-base text-slate-500 mb-6 max-w-lg mx-auto">
              Entre em contato conosco pelo WhatsApp para cadastrar seu negócio.
              O processo leva menos de 5 minutos!
            </p>

            <a
              href={formatWhatsAppUrl(
                '5521999999999',
                `Olá! Quero cadastrar meu negócio no ${SITE_NAME}. Tenho interesse no plano ${SUBSCRIPTION_PLANS[selectedPlan].name} (${formatCurrency(SUBSCRIPTION_PLANS[selectedPlan].price)}/mês).`
              )}
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center min-w-[280px] gap-2 rounded-xl bg-accent-500 px-8 py-4 text-base font-bold text-white hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/25 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Aguarde...
                </>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  Falar no WhatsApp
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </a>

            <p className="mt-4 text-xs text-slate-400">
              Plano selecionado: <strong>{SUBSCRIPTION_PLANS[selectedPlan].name}</strong> - {formatCurrency(SUBSCRIPTION_PLANS[selectedPlan].price)}/mês
            </p>
          </div>
        </MotionWrapper>

        {/* FAQ */}
        <MotionWrapper variant="fade-up" delay={0.3}>
          <div className="mt-12">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
              Perguntas Frequentes
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  q: 'Como funciona o cadastro?',
                  a: 'Após escolher seu plano, nossa equipe entra em contato pelo WhatsApp, coleta as informações do seu negócio e cria seu perfil completo em até 24 horas.',
                },
                {
                  q: 'Posso cancelar a qualquer momento?',
                  a: 'Sim! Não existe fidelidade. Você pode cancelar seu plano a qualquer momento e ele permanece ativo até o fim do período pago.',
                },
                {
                  q: 'Como recebo pagamentos?',
                  a: 'O catálogo é uma vitrine digital. Os pagamentos dos clientes são feitos diretamente para você, como já acontece no seu dia a dia.',
                },
                {
                  q: 'Preciso entender de tecnologia?',
                  a: 'De jeito nenhum! Nosso painel é super simples. E se precisar de ajuda, nossa equipe está sempre disponível no WhatsApp.',
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </div>
  )
}
