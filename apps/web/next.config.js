/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@spaz/types',
    '@spaz/hooks',
    '@spaz/utils',
    '@spaz/services',
    '@spaz/config',
  ],
}

module.exports = nextConfig
