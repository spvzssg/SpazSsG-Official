import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: 'Spaz SsG — Official Artist Website',
    template: '%s | Spaz SsG',
  },
  description: 'The official home of Spaz SsG. Discover music, videos, livestreams, and The Dreamers Club.',
  keywords: ['Spaz SsG', 'music', 'dark melodic trap', 'The Dreamers Club'],
  openGraph: {
    title: 'Spaz SsG — Official Artist Website',
    description: 'Discover music, videos, livestreams, and The Dreamers Club.',
    siteName: 'Spaz SsG',
    ...(siteUrl ? { url: siteUrl, images: ['/spaz-ssg-logo.png'] } : {}),
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spaz SsG — Official Artist Website',
    description: 'Discover music, videos, livestreams, and The Dreamers Club.',
    ...(siteUrl ? { images: ['/spaz-ssg-logo.png'] } : {}),
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
