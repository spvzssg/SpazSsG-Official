'use client'

import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../lib/supabase/client'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient()
    if (supabase) await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return <button className="admin-signout" type="button" onClick={handleSignOut}>Sign out</button>
}
