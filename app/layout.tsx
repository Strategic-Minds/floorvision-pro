import type { Metadata } from 'next'
import './globals.css'
import Nav from '../components/Nav'

export const metadata: Metadata = {
  title: 'FloorVision Pro | Epoxy Floor Visualizer & Color System',
  description: 'Browse 58+ professional epoxy floor color systems. Polymer flake, metallic, quartz, UV, glitter & hybrid collections. Powered by Xtreme Polishing Systems.',
  keywords: 'epoxy floor colors, polymer flake, metallic epoxy, floor visualizer, color charts, XPS, Torginol',
  openGraph: {
    title: 'FloorVision Pro — Professional Epoxy Color System',
    description: '58+ colorways across 15 collections. Browse real floor color charts from XPS & Torginol.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
    <footer style={{
      borderTop:'1px solid rgba(255,255,255,0.07)',
      padding:'48px 0 32px', marginTop:80,
    }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:40 }}>
          <div>
            <div style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:24, marginBottom:12, letterSpacing:'-0.01em' }}>
              FLOOR<span style={{ color:'#C9A84C' }}>VISION</span> PRO
            </div>
            <p style={{ color:'rgba(240,237,232,0.45)', fontSize:14, lineHeight:1.7, maxWidth:280 }}>
              Professional epoxy floor color visualization system. Browse, compare, and order from 58+ colorways.
            </p>
          </div>
          {[
            { title:'Products', links:[['Color Charts','/color-charts'],['Visualizer','/visualizer'],['Gallery','/gallery']] },
            { title:'Collections', links:[['Polymer Flake','/color-charts'],['Metallic','/color-charts'],['Quartz','/color-charts']] },
            { title:'Company', links:[['Request Sample','/request-sample'],['XPS Store','https://xtremepolishingsystems.com'],['Torginol','https://torginol.com']] },
          ].map(col => (
            <div key={col.title}>
              <div className="label" style={{ marginBottom:16 }}>{col.title}</div>
              {col.links.map(([label, href]) => (
                <a key={label} href={href} style={{
                  display:'block', color:'rgba(240,237,232,0.45)', fontSize:14,
                  textDecoration:'none', marginBottom:8,
                }}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ color:'rgba(240,237,232,0.25)', fontSize:13 }}>
            © 2026 FloorVision Pro. Powered by <strong style={{ color:'rgba(240,237,232,0.45)' }}>Xtreme Polishing Systems</strong> — America&#39;s #1 Epoxy Superstore.
          </span>
          <span style={{ color:'rgba(240,237,232,0.2)', fontSize:12 }}>Color charts sourced from XPS &amp; Torginol</span>
        </div>
      </div>
    </footer>
  )
}
