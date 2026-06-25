import type { Metadata } from 'next'
import './globals.css'
import NavClient from './NavClient'

export const metadata: Metadata = {
  title: 'FloorVision Pro — Floor Design Visualizer | Powered by XPS',
  description: 'Visualize 451 epoxy flake blends in your own space. 451 blends, 16 rooms, real FloorWiz CDN.',
  keywords: 'epoxy floor visualizer, flake epoxy, floor coating visualizer, XPS',
  openGraph: { title: 'FloorVision Pro', description: 'Visualize 451 epoxy flake blends.', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>
        <NavClient />
        <main>{children}</main>
        <footer style={{ background:'#231F20', color:'rgba(255,255,255,0.6)', padding:'48px 0 24px', marginTop:80 }}>
          <div className="container">
            <div style={{ display:'flex', gap:48, flexWrap:'wrap', marginBottom:40 }}>
              <div style={{ flex:'0 0 240px' }}>
                <div style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:18, color:'#fff', letterSpacing:'0.02em', textTransform:'uppercase', marginBottom:12 }}>
                  Floor<span style={{ color:'var(--color-accent)' }}>Vision</span> Pro
                </div>
                <p style={{ fontSize:13, lineHeight:1.65, color:'rgba(255,255,255,0.5)' }}>
                  The most powerful epoxy floor visualizer. 451 XPS blends. 16 real room environments.
                </p>
              </div>
              {[
                { head:'VISUALIZER', links:['Open Visualizer','Color Charts','Gallery'] },
                { head:'COLLECTIONS', links:['Insignia Series','Torginol Blends','UV Collection'] },
                { head:'COMPANY', links:['Request Sample','XPS Store','Torginol'] },
              ].map(sec => (
                <div key={sec.head}>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:12 }}>{sec.head}</p>
                  {sec.links.map(l => <a key={l} href="#" style={{ display:'block', fontSize:13, color:'rgba(255,255,255,0.6)', marginBottom:8 }}>{l}</a>)}
                </div>
              ))}
            </div>
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:20, display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(255,255,255,0.35)', flexWrap:'wrap', gap:8 }}>
              <span>© {new Date().getFullYear()} FloorVision Pro. Powered by Xtreme Polishing Systems — America&apos;s #1 Epoxy Superstore.</span>
              <span>451 real blends · 16 rooms · FloorWiz CDN</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
