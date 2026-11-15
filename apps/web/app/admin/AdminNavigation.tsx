'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const adminNavigation = [
  { href: '/admin/dashboard', label: 'Overview' },
  { href: '/admin/music', label: 'Music' },
  { href: '/admin/social', label: 'Social content' },
  { href: '/admin/livestreams', label: 'Livestreams' },
  { href: '/admin/announcements', label: 'Announcements' },
]

export default function AdminNavigation() {
  const pathname = usePathname()

  return (
    <nav className="admin-nav" aria-label="Admin navigation">
      {adminNavigation.map((item) => {
        const active = pathname === item.href
        return <Link href={item.href} key={item.href} aria-current={active ? 'page' : undefined}>{item.label}</Link>
      })}
    </nav>
  )
}
