import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '../components/Nav'

export const viewport: Viewport = {
  themeColor: '#C9A84C',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'FloorVision Pro | Professional Epoxy Floor Visualizer',
  description: '451 real XPS & Torginol epoxy floor blends. Interactive visualizer, 26 room environments, download results. Powered by Xtreme Polishing Systems.',
  keywords: 'epoxy floor visualizer, epoxy colors, polymer flake, metallic epoxy, floor color charts, XPS, Torginol, FloorWiz',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'FloorVision Pro' },
  openGraph: {
    title: 'FloorVision Pro — 451 Epoxy Blends',
    description: 'Real FloorWiz technology. 451 XPS blends, 26 rooms, photo upload, instant download.',
    type: 'website',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-touch-icon': '/icon-192.png',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop:'1px solid rgba(255,255,255,0.07)', padding:'48px 0 32px', marginTop:80 }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:40 }}>
          <div>
            <div style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:24, marginBottom:12 }}>
              FLOOR<span style={{ color:'#C9A84C' }}>VISION</span> PRO
            </div>
            <p style={{ color:'rgba(240,237,232,0.45)', fontSize:14, lineHeight:1.7, maxWidth:280 }}>
              The most powerful epoxy floor visualizer built on real FloorWiz technology. 451 XPS blends, 26 room environments.
            </p>
          </div>
          {[
            { title:'Visualizer', links:[['Open Visualizer','/visualizer'],['Color Charts','/color-charts'],['Gallery','/gallery']] },
            { title:'Collections', links:[['Insignia Series','/color-charts'],['Torginol Blends','/color-charts'],['UV Collection','/color-charts']] },
            { title:'Company', links:[['Request Sample','/request-sample'],['XPS Store','https://xtremepolishingsystems.com'],['Torginol','https://torginol.com']] },
          ].map(col => (
            <div key={col.title}>
              <div className="label" style={{ marginBottom:16 }}>{col.title}</div>
              {col.links.map(([label, href]) => (
                <a key={label} href={href} style={{ display:'block', color:'rgba(240,237,232,0.45)', fontSize:14, textDecoration:'none', marginBottom:8 }}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ color:'rgba(240,237,232,0.25)', fontSize:13 }}>
            © 2026 FloorVision Pro. Powered by <strong style={{ color:'rgba(240,237,232,0.45)' }}>Xtreme Polishing Systems</strong> — America&#39;s #1 Epoxy Superstore.
          </span>
          <span style={{ color:'rgba(240,237,232,0.2)', fontSize:12 }}>451 real blends · 26 rooms · FloorWiz CDN</span>
        </div>
      </div>
    </footer>
  )
}
