import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url:'https://floorvision-pro-strategic-minds-advisory.vercel.app', lastModified:new Date(), changeFrequency:'weekly', priority:1 },
    { url:'https://floorvision-pro-strategic-minds-advisory.vercel.app/color-charts', lastModified:new Date(), changeFrequency:'weekly', priority:0.9 },
    { url:'https://floorvision-pro-strategic-minds-advisory.vercel.app/visualizer', lastModified:new Date(), changeFrequency:'monthly', priority:0.8 },
    { url:'https://floorvision-pro-strategic-minds-advisory.vercel.app/gallery', lastModified:new Date(), changeFrequency:'weekly', priority:0.7 },
    { url:'https://floorvision-pro-strategic-minds-advisory.vercel.app/request-sample', lastModified:new Date(), changeFrequency:'monthly', priority:0.9 },
  ]
}
