import { requireAdmin } from '@/lib/dal'
import { getAllBusinesses } from '@/lib/queries'
import { NegociosClient } from './negocios-client'

export default async function AdminNegociosPage() {
  await requireAdmin()
  const businesses = await getAllBusinesses()

  return <NegociosClient businesses={businesses} />
}
