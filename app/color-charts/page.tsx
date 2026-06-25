'use client'
import { useState } from 'react'
import { COLOR_CHARTS, CATEGORIES } from '../../lib/catalog'

export default function ColorChartsPage() {
  const [active, setActive] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [zoom, setZoom] = useState<typeof COLOR_CHARTS[0] | null>(null)

  const filtered = COLOR_CHARTS.filter(c => {
    const matchCat  = active === 'all' || c.category === active
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop:120, paddingBottom:64, borderBottom:'1px solid var(--border)' }}>
        <div className="container">
          <div className="label" style={{ marginBottom:12 }}>XPS + Torginol Sourced</div>
          <h1 className="section-title" style={{ marginBottom:16 }}>
            COLOR CHART<br/><span className="gold-grad">LIBRARY</span>
          </h1>
          <p style={{ color:'rgba(240,237,232,0.5)', fontSize:18, maxWidth:520 }}>
            Every collection, every colorway. Real product images — no CGI.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{ padding:'32px 0', borderBottom:'1px solid var(--border)', position:'sticky', top:64, background:'rgba(10,10,11,0.95)', backdropFilter:'blur(20px)', zIndex:50 }}>
        <div className="container" style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
          {/* Category pills */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', flex:1 }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActive(cat.id)}
                style={{
                  fontFamily:'Barlow Condensed', fontWeight:700, fontSize:13, letterSpacing:'0.1em',
                  textTransform:'uppercase', padding:'8px 18px', borderRadius:6, cursor:'pointer',
                  transition:'all 0.2s', border:'1px solid',
                  background: active===cat.id ? '#C9A84C' : 'transparent',
                  color:       active===cat.id ? '#0A0A0B'  : 'rgba(240,237,232,0.55)',
                  borderColor: active===cat.id ? '#C9A84C'  : 'rgba(255,255,255,0.1)',
                }}
              >{cat.label}</button>
            ))}
          </div>
          {/* Search */}
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search collections..."
            style={{
              background:'var(--surface)', border:'1px solid var(--border)', borderRadius:6,
              color:'var(--text)', fontSize:14, padding:'9px 16px', width:220, outline:'none',
              fontFamily:'Barlow',
            }}
          />
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding:'56px 0 100px' }}>
        <div className="container">
          <div style={{ marginBottom:24, color:'rgba(240,237,232,0.4)', fontSize:14, fontFamily:'Barlow Condensed', letterSpacing:'0.05em' }}>
            {filtered.length} collection{filtered.length!==1?'s':''} shown
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:24 }}>
            {filtered.map(chart => (
              <article key={chart.id} id={chart.id} className="card" style={{ cursor:'pointer' }}
                onClick={() => setZoom(chart)}>
                <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', background:'var(--surface-2)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={chart.driveUrl} alt={chart.name}
                    style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
                    loading="lazy"
                  />
                  <div style={{
                    position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,11,0.7) 0%, transparent 50%)',
                    opacity:0, transition:'opacity 0.3s',
                  }} className="card-overlay"/>
                  <div style={{
                    position:'absolute', top:12, right:12,
                    background:'rgba(201,168,76,0.9)', color:'#0A0A0B',
                    borderRadius:4, padding:'4px 10px',
                    fontFamily:'Barlow Condensed', fontWeight:900, fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase',
                  }}>
                    {chart.category}
                  </div>
                  <div style={{
                    position:'absolute', bottom:12, left:12, right:12,
                    fontFamily:'Barlow Condensed', fontWeight:900, fontSize:14, color:'#F0EDE8',
                    letterSpacing:'0.06em', textTransform:'uppercase',
                  }}>
                    Click to expand
                  </div>
                </div>
                <div style={{ padding:'22px 22px 26px' }}>
                  <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:22, textTransform:'uppercase', marginBottom:8 }}>{chart.name}</h2>
                  <p style={{ fontSize:14, color:'rgba(240,237,232,0.45)', lineHeight:1.65, marginBottom:16 }}>{chart.description}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }}>
                    {chart.tags.map(tag => (
                      <span key={tag} style={{
                        background:'rgba(201,168,76,0.08)', border:'1px solid rgba(201,168,76,0.18)',
                        color:'rgba(201,168,76,0.75)', fontSize:11, fontFamily:'Barlow Condensed',
                        fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
                        padding:'3px 8px', borderRadius:3,
                      }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    <a href="/request-sample" className="btn-primary" style={{ fontSize:13, padding:'9px 18px', flex:1, justifyContent:'center' }}
                      onClick={e => e.stopPropagation()}>
                      Request Sample
                    </a>
                    <a href={chart.driveUrl} target="_blank" rel="noopener noreferrer"
                      className="btn-outline" style={{ fontSize:13, padding:'9px 18px' }}
                      onClick={e => e.stopPropagation()}>
                      Full Size
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Zoom lightbox */}
      {zoom && (
        <div
          onClick={() => setZoom(null)}
          style={{
            position:'fixed', inset:0, zIndex:200,
            background:'rgba(10,10,11,0.92)', backdropFilter:'blur(16px)',
            display:'flex', alignItems:'center', justifyContent:'center', padding:24,
          }}>
          <div style={{ maxWidth:1000, width:'100%', position:'relative' }} onClick={e=>e.stopPropagation()}>
            <button onClick={() => setZoom(null)}
              style={{ position:'absolute', top:-16, right:-16, zIndex:10, background:'var(--surface-2)', border:'1px solid var(--border)', color:'var(--text)', width:36, height:36, borderRadius:'50%', cursor:'pointer', fontSize:18 }}>✕</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoom.driveUrl} alt={zoom.name} style={{ width:'100%', borderRadius:12, border:'1px solid var(--border)' }} />
            <div style={{ marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:28, textTransform:'uppercase' }}>{zoom.name}</h3>
                <p style={{ color:'rgba(240,237,232,0.5)', marginTop:4 }}>{zoom.description}</p>
              </div>
              <a href="/request-sample" className="btn-primary">Request Sample</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
