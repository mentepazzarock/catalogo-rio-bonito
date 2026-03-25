import { requireAdmin } from '@/lib/dal'
import { AdminShell } from '@/components/admin/admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin()

  return (
    <AdminShell userName={profile.full_name || profile.email || 'Admin'}>
      {children}
    </AdminShell>
  )
}
