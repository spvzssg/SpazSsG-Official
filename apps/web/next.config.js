/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
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
