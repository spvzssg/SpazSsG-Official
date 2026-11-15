import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    domains: ['via.placeholder.com', 'images.unsplash.com'],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

export default config
