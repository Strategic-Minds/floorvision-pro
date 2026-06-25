import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent:'*', allow:'/' },
    sitemap:'https://floorvision-pro-strategic-minds-advisory.vercel.app/sitemap.xml',
  }
}
