'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/social', label: 'Socials' },
  { href: '/live', label: 'Live' },
  { href: '/dreamers-club', label: 'Dreamers Club' },
  { href: '/everything-spaz', label: 'All Links' },
  { href: '/about', label: 'About' },
]

export default function SiteNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return <>
    {navigation.map((item) => {
      const active = pathname === item.href
      return <Link href={item.href} key={item.href} aria-current={active ? 'page' : undefined} onClick={onNavigate}>{item.label}</Link>
    })}
  </>
}
