import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedSection } from '@/components/home/featured-section'
import { PromotionsSection } from '@/components/home/promotions-section'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      <PromotionsSection />
      <CTASection />
    </>
  )
}
