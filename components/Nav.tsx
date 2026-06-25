'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const PwaInstaller = dynamic(() => import('./PwaInstaller'), { ssr: false })

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      background:'rgba(10,10,11,0.92)', backdropFilter:'blur(20px)',
      borderBottom:'1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:64, gap:16 }}>
        <a href="/" style={{ textDecoration:'none', flexShrink:0 }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:22, color:'#F0EDE8', letterSpacing:'-0.01em' }}>
            FLOOR<span style={{ color:'#C9A84C' }}>VISION</span> PRO
          </span>
        </a>
        <nav style={{ display:'flex', gap:24, alignItems:'center' }}>
          {([['/', 'Home'], ['/color-charts', 'Charts'], ['/visualizer', 'Visualizer'], ['/gallery', 'Gallery']] as [string,string][]).map(([href, label]) => (
            <a key={href} href={href} style={{
              fontFamily:'Barlow Condensed', fontWeight:700, fontSize:14, letterSpacing:'0.1em',
              textTransform:'uppercase', color:'rgba(240,237,232,0.65)', textDecoration:'none',
              transition:'color 0.2s',
            }}
            onMouseOver={e=>(e.currentTarget.style.color='#C9A84C')}
            onMouseOut={e=>(e.currentTarget.style.color='rgba(240,237,232,0.65)')}
            >{label}</a>
          ))}
        </nav>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <PwaInstaller />
          <a href="/request-sample" className="btn-primary" style={{ padding:'10px 20px', fontSize:13 }}>
            Free Sample
          </a>
        </div>
      </div>
    </header>
  )
}
