import Link from 'next/link'
import AdminNavigation from './AdminNavigation'

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h2>Site management</h2>
        <AdminNavigation />
        <Link href="/" className="admin-back-link">← View public site</Link>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  )
}
