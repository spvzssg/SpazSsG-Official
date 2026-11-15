import type { Metadata } from 'next'
import Link from 'next/link'
import LoginForm from '../LoginForm'
import { getSupabasePublicConfig } from '../../../lib/supabase/config'

export const metadata: Metadata = { title: 'Admin sign in', robots: { index: false, follow: false } }

export default function AdminLoginPage() {
  const configured = Boolean(getSupabasePublicConfig())

  return <div className="admin-login-page">
    <div className="admin-login-card">
      <Link className="text-link" href="/">← Back to the public site</Link>
      <div className="eyebrow" style={{ marginTop: 30 }}>Private area</div>
      <h1 className="page-heading">Admin sign in</h1>
      <p className="muted">Sign in using an account authorized for the website.</p>
      {!configured && <div className="admin-notice" role="status">Supabase is not configured in this environment. Add the public URL and anon key to `.env.local` to enable sign-in.</div>}
      <LoginForm />
    </div>
  </div>
}
