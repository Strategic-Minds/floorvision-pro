import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'cdn.floor-wiz.com' },
      { protocol: 'https', hostname: 'images.xtremepolishingsystems.com' },
    ],
    unoptimized: true,
  },
}
export default nextConfig
