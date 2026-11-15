'use client'

import Link from 'next/link'
import { useState } from 'react'
import BrandLogo from './BrandLogo'
import SiteNavLinks from './SiteNavLinks'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__logo" href="/" aria-label="Spaz SsG home" onClick={closeMenu}>
          <BrandLogo className="site-header__logo-image" />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
        <nav id="primary-navigation" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Main navigation">
          <SiteNavLinks onNavigate={closeMenu} />
        </nav>
        <Link className="admin-link" href="/admin/dashboard" onClick={closeMenu}>Admin</Link>
      </div>
    </header>
  )
}
