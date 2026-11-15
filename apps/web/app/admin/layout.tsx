import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminNavigation from './AdminNavigation'
import SignOutButton from './SignOutButton'
import { createSupabaseServerClient } from '../../lib/supabase/server'

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = headers()
  const pathname = requestHeaders.get('x-spaz-pathname') ?? '/admin'
  const isLoginPage = pathname === '/admin/login'
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return isLoginPage ? <div className="admin-shell"><main className="admin-main">{children}</main></div> : redirect('/admin/login')
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    if (isLoginPage) return <div className="admin-shell"><main className="admin-main">{children}</main></div>
    redirect('/admin/login')
  }

  const { data: adminMembership, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error || !adminMembership) {
    if (isLoginPage) return <div className="admin-shell"><main className="admin-main">{children}</main></div>
    redirect('/admin/login?error=not-authorized')
  }
  if (isLoginPage) redirect('/admin/dashboard')

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h2>Site management</h2>
        <AdminNavigation />
        <SignOutButton />
        <Link href="/" className="admin-back-link">← View public site</Link>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  )
}
