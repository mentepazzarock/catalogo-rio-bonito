import { requireBusinessOwner } from '@/lib/dal'
import { getBusinessesByOwner } from '@/lib/queries'
import { PainelShell } from '@/components/painel/painel-shell'

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await requireBusinessOwner()
  const businesses = await getBusinessesByOwner(user.id)
  const mainBusiness = businesses[0]

  return (
    <PainelShell
      userName={profile.full_name || profile.email || 'Lojista'}
      businessName={mainBusiness?.name}
    >
      {children}
    </PainelShell>
  )
}
