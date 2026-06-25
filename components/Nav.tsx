'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const PwaInstaller = dynamic(() => import('./PwaInstaller'), { ssr: false })

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      background:'rgba(10,10,11,0.94)', backdropFilter:'blur(20px)',
      borderBottom:'1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64, gap:16 }}>
        <a href="/" style={{ textDecoration:'none', flexShrink:0 }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:20, color:'#F0EDE8', letterSpacing:'-0.01em' }}>
            FLOOR<span style={{ color:'#C9A84C' }}>VISION</span> PRO
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display:'flex', gap:20, alignItems:'center' }} className="desktop-nav">
          <style>{`.desktop-nav{display:flex}@media(max-width:767px){.desktop-nav{display:none!important}}`}</style>
          {([['/', 'Home'], ['/color-charts', 'Charts'], ['/visualizer', 'Visualizer'], ['/gallery', 'Gallery']] as [string,string][]).map(([href, label]) => (
            <a key={href} href={href} style={{
              fontFamily:'Poppins', fontWeight:600, fontSize:13, letterSpacing:'0.05em',
              textTransform:'uppercase', color:'rgba(240,237,232,0.6)', textDecoration:'none',
            }}>{label}</a>
          ))}
        </nav>

        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <PwaInstaller />
          <a href="/request-sample" className="btn-primary" style={{ padding:'9px 18px', fontSize:13 }}>
            Free Sample
          </a>
          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            style={{ border:'none', background:'transparent', color:'var(--text)', cursor:'pointer', padding:4 }}
            aria-label="Menu">
            <style>{`.mobile-menu-btn{display:none}@media(max-width:767px){.mobile-menu-btn{display:block!important}}`}</style>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6L6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile drawer */}
      {open && (
        <div style={{ borderTop:'1px solid var(--border)', background:'rgba(10,10,11,0.98)', padding:'16px 24px', display:'flex', flexDirection:'column', gap:12 }}>
          {([['/', 'Home'], ['/color-charts', 'Color Charts'], ['/visualizer', 'Visualizer'], ['/gallery', 'Gallery'], ['/request-sample', 'Free Sample']] as [string,string][]).map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              style={{ fontFamily:'Poppins', fontWeight:600, fontSize:15, color:'var(--text)', textDecoration:'none', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
