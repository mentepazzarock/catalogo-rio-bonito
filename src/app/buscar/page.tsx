import { getBusinesses, getCategories } from '@/lib/queries'
import { SearchClient } from './search-client'

export default async function SearchPage() {
  const [businesses, categories] = await Promise.all([
    getBusinesses({ limit: 50 }),
    getCategories(),
  ])

  return <SearchClient businesses={businesses} categories={categories} />
}
