import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedSection } from '@/components/home/featured-section'
import { PromotionsSection } from '@/components/home/promotions-section'
import { CTASection } from '@/components/home/cta-section'
import { getCategories, getBusinesses, getActivePromotions, getPublicStats } from '@/lib/queries'

export default async function HomePage() {
  const [categories, featured, promotions, stats] = await Promise.all([
    getCategories(),
    getBusinesses({ featured: true, limit: 8 }),
    getActivePromotions(6),
    getPublicStats(),
  ])

  return (
    <>
      <HeroSection stats={stats} />
      <CategoriesSection categories={categories} />
      <FeaturedSection businesses={featured} />
      <PromotionsSection promotions={promotions} />
      <CTASection />
    </>
  )
}
