import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  MessageCircle,
  Globe,
  Instagram,
  Facebook,
  Clock,
  BadgeCheck,
  Navigation,
  Star,
  Tag,
  ChevronLeft,
} from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'
import { Badge } from '@/components/ui/badge'
import { CategoryIcon } from '@/components/ui/icon-map'
import { MotionWrapper } from '@/components/ui/motion-wrapper'
import { getBusinessBySlug } from '@/lib/queries'
import { formatPhone, formatCurrency, formatWhatsAppUrl, isOpenNow } from '@/lib/utils'
import { getCategoryGradient } from '@/lib/category-colors'
import { DAYS_OF_WEEK, SITE_NAME, BUSINESS_ATTRIBUTES_LABELS } from '@/lib/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)
  if (!business) return { title: 'Negócio não encontrado' }

  return {
    title: `${business.name} - ${business.categories[0]?.name || 'Negócio'}`,
    description: business.short_description || business.description?.slice(0, 160),
    openGraph: {
      title: `${business.name} | ${SITE_NAME}`,
      description: business.short_description || business.description?.slice(0, 160),
      type: 'profile',
    },
  }
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)

  if (!business) notFound()

  const open = isOpenNow(business.hours)
  const category = business.categories[0]
  const gradientClass = getCategoryGradient(category?.slug)
  const activePromotions = business.promotions.filter((p: { is_active: boolean }) => p.is_active)
  const featuredProducts = business.products.filter((p: { is_featured: boolean }) => p.is_featured)

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 md:pb-0">
      {/* Cover */}
      <div className={`relative h-48 sm:h-64 bg-gradient-to-br ${gradientClass} overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.1]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 left-4 z-10">
          <Link
            href="/buscar"
            className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white transition-colors shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        {/* Profile Header */}
        <MotionWrapper variant="fade-up" delay={0} once>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className={`flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white shadow-lg bg-gradient-to-br ${gradientClass}`}>
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {business.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{business.name}</h1>
                  {business.is_verified && <BadgeCheck className="h-6 w-6 text-primary-500 shrink-0 mt-1" />}
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {category && (
                    <div className="flex items-center gap-1.5">
                      <CategoryIcon name={category.icon} className="h-4 w-4 text-primary-500" />
                      <span className="text-sm font-bold text-slate-700">{category.name}</span>
                    </div>
                  )}
                  <Badge variant={open ? 'success' : 'danger'} size="md">
                    <Clock className="h-3 w-3 mr-1" />
                    {open ? 'Aberto agora' : 'Fechado'}
                  </Badge>
                  {business.is_featured && <Badge variant="warning" size="md">Destaque</Badge>}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <StarRating rating={business.average_rating} size={18} showValue totalReviews={business.total_reviews} />
                </div>

                <p className="text-sm text-slate-500 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {business.address} - {business.city}, {business.state}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
              {business.whatsapp && (
                <a href={formatWhatsAppUrl(business.whatsapp, `Olá! Vi o ${business.name} no ${SITE_NAME} e gostaria de mais informações.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-white hover:bg-accent-600 transition-colors shadow-sm">
                  <MessageCircle className="h-4 w-4" />WhatsApp
                </a>
              )}
              {business.phone && (
                <a href={`tel:${business.phone}`} className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-bold text-white hover:bg-primary-700 transition-colors shadow-sm">
                  <Phone className="h-4 w-4" />Ligar
                </a>
              )}
              {business.latitude && business.longitude && (
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors">
                  <Navigation className="h-4 w-4" />Rota
                </a>
              )}
              {business.instagram && (
                <a href={`https://instagram.com/${business.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors">
                  <Instagram className="h-4 w-4" />Instagram
                </a>
              )}
            </div>
          </div>
        </MotionWrapper>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <MotionWrapper variant="fade-up" delay={0.1}>
              <section className="rounded-2xl bg-white border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Sobre</h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{business.description}</p>
                {business.attributes && (() => {
                  const activeAttrs = Object.entries(business.attributes).filter(([, v]) => v)
                  if (activeAttrs.length === 0) return null
                  return (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2">
                        {activeAttrs.map(([key]) => (
                          <span key={key} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                            {BUSINESS_ATTRIBUTES_LABELS[key] || key}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })()}
              </section>
            </MotionWrapper>

            {/* Promotions */}
            {activePromotions.length > 0 && (
              <MotionWrapper variant="fade-up" delay={0.15}>
                <section className="rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100/50 border border-accent-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-accent-600" />
                    <h2 className="text-lg font-bold text-slate-900">Promoções Ativas</h2>
                  </div>
                  <div className="space-y-3">
                    {activePromotions.map((promo) => (
                      <div key={promo.id} className="rounded-xl bg-white p-4 border border-accent-200 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-base font-bold text-slate-900">{promo.title}</h3>
                          <Badge variant="success" size="md">
                            {promo.discount_type === 'percentage' && `${promo.discount_value}% OFF`}
                            {promo.discount_type === 'fixed' && `R$${promo.discount_value} OFF`}
                            {promo.discount_type === 'coupon' && 'Cupom'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{promo.description}</p>
                        {promo.coupon_code && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">Código:</span>
                            <code className="rounded-md bg-accent-100 px-2 py-1 text-sm font-bold text-accent-700">{promo.coupon_code}</code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </MotionWrapper>
            )}

            {/* Products */}
            {business.products.length > 0 && (
              <MotionWrapper variant="fade-up" delay={0.2}>
                <section className="rounded-2xl bg-white border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">
                    Produtos {featuredProducts.length > 0 && <Badge variant="warning" size="sm" className="ml-2">Destaques</Badge>}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {business.products.map((product) => (
                      <div key={product.id} className={`rounded-xl border p-4 transition-colors hover:border-slate-300 ${product.is_featured ? 'border-warm-200 bg-warm-50/50' : 'border-slate-100'}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {product.name}
                              {product.is_featured && <Star className="inline h-3 w-3 text-warm-500 fill-warm-500 ml-1" />}
                            </h3>
                            {product.description && <p className="text-xs text-slate-500 mt-0.5">{product.description}</p>}
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            {product.promotional_price ? (
                              <>
                                <span className="text-xs text-slate-400 line-through block">{formatCurrency(product.price!)}</span>
                                <span className="text-sm font-bold text-accent-600">{formatCurrency(product.promotional_price)}</span>
                              </>
                            ) : product.price ? (
                              <span className="text-sm font-bold text-slate-900">{formatCurrency(product.price)}</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </MotionWrapper>
            )}

            {/* Services */}
            {business.services.length > 0 && (
              <MotionWrapper variant="fade-up" delay={0.25}>
                <section className="rounded-2xl bg-white border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Serviços</h2>
                  <div className="space-y-3">
                    {business.services.map((service) => (
                      <div key={service.id} className={`flex items-center justify-between rounded-xl border p-4 transition-colors hover:border-slate-300 ${service.is_featured ? 'border-primary-200 bg-primary-50/50' : 'border-slate-100'}`}>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {service.name}
                            {service.is_featured && <Badge variant="info" size="sm" className="ml-2">Popular</Badge>}
                          </h3>
                          {service.description && <p className="text-xs text-slate-500 mt-0.5">{service.description}</p>}
                          {service.duration_minutes && (
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />{service.duration_minutes} min
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 ml-4 text-right">
                          {service.price && <span className="text-sm font-bold text-slate-900">{formatCurrency(service.price)}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </MotionWrapper>
            )}

            {/* Reviews */}
            <MotionWrapper variant="fade-up" delay={0.3}>
              <section className="rounded-2xl bg-white border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Avaliações ({business.total_reviews})</h2>
                  <StarRating rating={business.average_rating} size={18} showValue />
                </div>
                {business.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {business.reviews.map((review) => (
                      <div key={review.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold">U</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <StarRating rating={review.rating} size={12} />
                              <span className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                        {review.comment && <p className="text-sm text-slate-600 ml-12">{review.comment}</p>}
                        {review.reply && (
                          <div className="mt-2 ml-12 rounded-lg bg-slate-50 p-3">
                            <span className="text-xs font-semibold text-slate-500">Resposta do negócio:</span>
                            <p className="text-sm text-slate-600 mt-0.5">{review.reply}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Ainda não há avaliações.</p>
                )}
              </section>
            </MotionWrapper>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MotionWrapper variant="fade-up" delay={0.15}>
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4">Contato</h3>
                <div className="space-y-3">
                  {business.phone && (
                    <a href={`tel:${business.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-primary-600 transition-colors">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />{formatPhone(business.phone)}
                    </a>
                  )}
                  {business.whatsapp && (
                    <a href={formatWhatsAppUrl(business.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-600 hover:text-accent-600 transition-colors">
                      <MessageCircle className="h-4 w-4 text-slate-400 shrink-0" />{formatPhone(business.whatsapp)}
                    </a>
                  )}
                  {business.email && (
                    <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-primary-600 transition-colors">
                      <Globe className="h-4 w-4 text-slate-400 shrink-0" />{business.email}
                    </a>
                  )}
                  {business.instagram && (
                    <a href={`https://instagram.com/${business.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-600 hover:text-pink-600 transition-colors">
                      <Instagram className="h-4 w-4 text-slate-400 shrink-0" />{business.instagram}
                    </a>
                  )}
                  {business.facebook && (
                    <a href={`https://facebook.com/${business.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                      <Facebook className="h-4 w-4 text-slate-400 shrink-0" />{business.facebook}
                    </a>
                  )}
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fade-up" delay={0.25}>
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4">Endereço</h3>
                <p className="text-sm text-slate-600 mb-3">
                  {business.address}<br />
                  {business.neighborhood && `${business.neighborhood} - `}{business.city}, {business.state}
                  {business.zip_code && <><br />CEP: {business.zip_code}</>}
                </p>
                {business.latitude && business.longitude && (
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors justify-center">
                    <Navigation className="h-4 w-4" />Obter Rota via Google
                  </a>
                )}
              </div>
            </MotionWrapper>

            {/* Business Hours */}
            <MotionWrapper variant="fade-up" delay={0.35}>
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4">Horário de Funcionamento</h3>
                <div className="space-y-2">
                  {DAYS_OF_WEEK.map(({ key, label }) => {
                    const hourEntry = business.hours.find(h => h.day_of_week === key)
                    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
                    const isToday = days[new Date().getDay()] === key

                    return (
                      <div key={key} className={`flex items-center justify-between py-1.5 text-sm transition-colors ${isToday ? 'font-semibold text-primary-700 bg-primary-50 px-2 -mx-2 rounded-md' : 'text-slate-600'}`}>
                        <span className="flex items-center gap-2">
                          {isToday && <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />}
                          {label}
                        </span>
                        <span>{hourEntry ? (hourEntry.is_closed ? 'Fechado' : `${hourEntry.open_time} - ${hourEntry.close_time}`) : 'Não informado'}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp CTA for Mobile */}
      {business.whatsapp && (
        <div className="fixed bottom-20 right-4 z-40 md:hidden animate-scale-in">
          <a href={formatWhatsAppUrl(business.whatsapp, `Olá! Vi o ${business.name} no ${SITE_NAME} e gostaria de mais informações.`)} target="_blank" rel="noopener noreferrer" className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg shadow-accent-500/30 hover:bg-accent-600 transition-colors active:scale-95">
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>
      )}
    </div>
  )
}
