'use client'
import Link from 'next/link'
export default function NavClient() {
  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, background:'#fff', borderBottom:'1px solid #E5E5E5', height:'var(--nav-h)' }}>
      <div style={{ background:'#231F20', padding:'6px 0' }}>
        <div className="container" style={{ display:'flex', justifyContent:'flex-end', gap:24, alignItems:'center' }}>
          {['AFFILIATE LOCATOR','SAMPLES','MY ACCOUNT','VIEW CART'].map(t => (
            <a key={t} href="#" style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, letterSpacing:'0.08em', color:'rgba(255,255,255,0.8)', textTransform:'uppercase' }}>{t}</a>
          ))}
        </div>
      </div>
      <div className="container" style={{ display:'flex', alignItems:'center', height:'calc(var(--nav-h) - 29px)', gap:0 }}>
        <Link href="/" style={{ marginRight:48 }}>
          <div style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:20, color:'#231F20', letterSpacing:'0.02em', textTransform:'uppercase' }}>
            Floor<span style={{ color:'var(--color-accent)' }}>Vision</span>
            <span style={{ display:'block', fontSize:9, fontWeight:700, letterSpacing:'0.2em', color:'var(--color-text-muted)', marginTop:-4, textTransform:'uppercase' }}>POWERED BY XPS</span>
          </div>
        </Link>
        <nav style={{ display:'flex', gap:0, flex:1 }}>
          {[['Visualizer','/visualizer'],['Color Charts','/color-charts'],['Gallery','/gallery'],['Request Sample','/request-sample']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily:'var(--font-heading)', fontWeight:600, fontSize:13, color:'#231F20', textTransform:'uppercase', letterSpacing:'0.06em', padding:'0 18px', height:'100%', display:'flex', alignItems:'center' }}>{label}</Link>
          ))}
        </nav>
        <Link href="/visualizer" style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:12, letterSpacing:'0.06em', textTransform:'uppercase', padding:'10px 20px', background:'var(--color-accent)', color:'#fff', borderRadius:4, textDecoration:'none' }}>
          FLOOR DESIGN VISUALIZER
        </Link>
      </div>
    </header>
  )
}
