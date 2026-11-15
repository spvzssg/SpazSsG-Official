import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spaz SsG - Official Artist Platform',
  description: 'Official home for Spaz SsG. Music, livestreams, content, and The Dreamers Club community.',
  keywords: ['Spaz SsG', 'Hip-Hop', 'Music', 'Streaming', 'Artist'],
  openGraph: {
    title: 'Spaz SsG - Official Artist Platform',
    description: 'Official home for Spaz SsG. Music, livestreams, content, and The Dreamers Club community.',
    url: 'https://spazssq.com',
    siteName: 'Spaz SsG',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spaz SsG',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spaz SsG - Official Artist Platform',
    description: 'Official home for Spaz SsG',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08090C" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
