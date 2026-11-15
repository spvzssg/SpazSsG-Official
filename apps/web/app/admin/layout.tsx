'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-midnight-black">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-charcoal border-r border-midnight-black transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-midnight-black">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 text-electric-cyan hover:text-burnt-orange"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 rounded-lg text-metallic-silver hover:bg-midnight-black hover:text-electric-cyan"
          >
            {sidebarOpen && 'Dashboard'}
          </Link>
          <Link
            href="/admin/music"
            className="block px-4 py-2 rounded-lg text-metallic-silver hover:bg-midnight-black hover:text-electric-cyan"
          >
            {sidebarOpen && 'Music'}
          </Link>
          <Link
            href="/admin/social"
            className="block px-4 py-2 rounded-lg text-metallic-silver hover:bg-midnight-black hover:text-electric-cyan"
          >
            {sidebarOpen && 'Social'}
          </Link>
          <Link
            href="/admin/livestreams"
            className="block px-4 py-2 rounded-lg text-metallic-silver hover:bg-midnight-black hover:text-electric-cyan"
          >
            {sidebarOpen && 'Livestreams'}
          </Link>
          <Link
            href="/admin/announcements"
            className="block px-4 py-2 rounded-lg text-metallic-silver hover:bg-midnight-black hover:text-electric-cyan"
          >
            {sidebarOpen && 'Announcements'}
          </Link>
        </nav>

        <div className="p-4 border-t border-midnight-black">
          <Link
            href="/"
            className="block px-4 py-2 rounded-lg text-burnt-orange hover:bg-midnight-black text-center"
          >
            {sidebarOpen ? 'Back to Site' : '←'}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
