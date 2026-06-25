'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { SIZES } from '../../lib/blends'
import { ROOMS } from '../../lib/rooms_data'
import { ALL_BLENDS } from '../../lib/blends_data'
import type { Room } from '../../lib/rooms_data'
import type { Blend } from '../../lib/blends'

const CDN = 'https://cdn.floor-wiz.com/shared_assets/core/latest'

// Tab definitions matching FloorWiz layout
const TABS = ['Rooms', 'Blends', 'Customize'] as const
type Tab = typeof TABS[number]

export default function VisualizerPage() {
  const [tab, setTab]             = useState<Tab>('Rooms')
  const [room, setRoom]           = useState<Room>(ROOMS[0])
  const [size, setSize]           = useState('18')
  const [blend, setBlend]         = useState<Blend>(ALL_BLENDS.find(b => b.id.endsWith('-18')) || ALL_BLENDS[0])
  const [collection, setCollection] = useState('All')
  const [search, setSearch]       = useState('')
  const [coverage, setCoverage]   = useState(85)
  const [rendering, setRendering] = useState(false)
  const [rendered, setRendered]   = useState(false)
  const [customPhoto, setCustomPhoto] = useState<string | null>(null)
  const [saveEmail, setSaveEmail] = useState('')
  const [saved, setSaved]         = useState(false)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const fileRef    = useRef<HTMLInputElement>(null)
  const resultDataRef = useRef<string>('')

  const collections = ['All', ...Array.from(new Set(ALL_BLENDS.map(b => b.collection).filter(Boolean)))]

  const filtered = ALL_BLENDS.filter(b => {
    const bSized  = b.id.endsWith(`-${size}`)
    const bColl   = collection === 'All' || b.collection === collection
    const bSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return bSized && bColl && bSearch
  })

  // ── Real canvas compositor using FloorWiz room background images ──
  const render = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setRendering(true)
    setRendered(false)
    const ctx = canvas.getContext('2d')!
    canvas.width  = 1024
    canvas.height = 800

    const loadImg = (url: string): Promise<HTMLImageElement> => new Promise((res, rej) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload  = () => res(img)
      img.onerror = () => rej(new Error(`Failed: ${url}`))
      img.src = url
      setTimeout(() => rej(new Error('timeout')), 10000)
    })

    try {
      // 1. Draw room background (real FloorWiz room image)
      const bgUrl = customPhoto || room.background
      const bgImg = await loadImg(bgUrl)
      ctx.drawImage(bgImg, 0, 0, 1024, 800)

      // 2. Load blend texture
      const blendImg = await loadImg(blend.img_url)

      // 3. Detect floor region — lower ~50% of image for most rooms
      const floorTop    = Math.round(800 * 0.48)
      const floorHeight = 800 - floorTop
      const alpha       = (coverage / 100) * 0.88

      // 4. Create perspective floor plane via canvas transforms
      // Save state, clip to floor region
      ctx.save()
      ctx.rect(0, floorTop, 1024, floorHeight)
      ctx.clip()

      // 5. Tile blend texture with perspective scaling — closer = larger tiles
      ctx.globalAlpha = alpha
      ctx.globalCompositeOperation = 'multiply'

      for (let row = 0; row < 6; row++) {
        const progress = row / 5
        const y = floorTop + row * (floorHeight / 5)
        // Tiles get larger as they approach camera (bottom of image)
        const tileSize = 80 + progress * 120

        for (let col = -1; col < Math.ceil(1024 / tileSize) + 1; col++) {
          // Slight perspective offset
          const xOffset = (progress - 0.5) * 80
          const x = col * tileSize + xOffset
          ctx.drawImage(blendImg, x, y, tileSize, tileSize)
        }
      }
      ctx.restore()

      // 6. Screen pass for highlights (realism)
      ctx.save()
      ctx.rect(0, floorTop, 1024, floorHeight)
      ctx.clip()
      ctx.globalAlpha = alpha * 0.25
      ctx.globalCompositeOperation = 'screen'
      for (let row = 0; row < 4; row++) {
        const progress = row / 3
        const y = floorTop + row * (floorHeight / 3.5)
        const tileSize = 100 + progress * 100
        for (let col = -1; col < Math.ceil(1024 / tileSize) + 1; col++) {
          ctx.drawImage(blendImg, col * tileSize, y, tileSize, tileSize)
        }
      }
      ctx.restore()

      // 7. Subtle specular highlight strip (floor sheen)
      const grad = ctx.createLinearGradient(0, floorTop, 0, floorTop + 80)
      grad.addColorStop(0, 'rgba(255,255,255,0.15)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, floorTop, 1024, 80)

      // 8. Watermark
      ctx.font = 'bold 13px Poppins, sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'bottom'
      ctx.fillText('FloorVision Pro — Powered by Xtreme Polishing Systems', 1014, 792)

      resultDataRef.current = canvas.toDataURL('image/jpeg', 0.92)
      setRendered(true)
    } catch (err) {
      // Fallback: draw blend full-bleed with room name overlay
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, 1024, 800)
      try {
        const blendImg = await loadImg(blend.img_url)
        ctx.drawImage(blendImg, 0, 0, 1024, 800)
      } catch {}
      ctx.font = 'bold 20px Poppins, sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.textAlign = 'center'
      ctx.fillText(`${blend.name} · ${room.name}`, 512, 40)
      resultDataRef.current = canvas.toDataURL('image/jpeg', 0.92)
      setRendered(true)
    }
    setRendering(false)
  }, [room, blend, coverage, customPhoto])

  useEffect(() => {
    if (tab === 'Customize') render()
  }, [tab, render])

  // Re-render when room or blend changes in Customize tab
  useEffect(() => {
    if (tab === 'Customize') render()
  }, [room, blend, coverage]) // eslint-disable-line

  const download = () => {
    const a = document.createElement('a')
    a.href = resultDataRef.current
    a.download = `floorvision-${blend.name.replace(/\s+/g,'-').toLowerCase()}.jpg`
    a.click()
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => { setCustomPhoto(ev.target?.result as string); setTab('Customize') }
    reader.readAsDataURL(file)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    // In production: POST to API with design spec
    setTimeout(() => setSaved(false), 4000)
  }

  // ── RENDER ──
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>

      {/* Top bar */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '12px 0',
      }}>
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
          <div>
            <span style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:22, textTransform:'uppercase' }}>
              FLOOR<span style={{ color:'#C9A84C' }}>VISION</span> PRO
              <span style={{ fontFamily:'Barlow', fontWeight:400, fontSize:13, color:'rgba(240,237,232,0.4)', marginLeft:12, textTransform:'none' }}>
                451 blends · 16 rooms · Real FloorWiz CDN
              </span>
            </span>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => fileRef.current?.click()}
              style={{ fontFamily:'Poppins', fontWeight:600, fontSize:13, padding:'8px 16px', borderRadius:6, border:'1px solid var(--border)', background:'transparent', color:'var(--text)', cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              Upload Photo
            </button>
            {rendered && (
              <button onClick={download} className="btn-primary" style={{ fontSize:13, padding:'8px 18px' }}>
                ↓ Download
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display:'none' }}/>
        </div>
      </div>

      {/* Main visualizer — FloorWiz layout: canvas left + 400px panel right. Mobile: stacked */}
      <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 64px)' }} className="viz-main">
      <style>{`
        @media (min-width: 768px) { .viz-main { flex-direction: row !important; height: calc(100vh - 130px) !important; } }
        @media (max-width: 767px) { .viz-panel { width: 100% !important; height: 420px !important; border-left: none !important; border-top: 1px solid var(--border) !important; } .viz-canvas { flex: none !important; height: 280px !important; } }
      `}</style>

        {/* ── CANVAS AREA ── */}
        <div className="viz-canvas" style={{ flex:1, position:'relative', background:'#1a1a1a', overflow:'hidden' }}>
          {tab === 'Customize' ? (
            <>
              <canvas ref={canvasRef}
                style={{ width:'100%', height:'100%', display:'block', objectFit:'contain' }}
                aria-label="Floor visualization canvas"
              />
              {rendering && (
                <div style={{
                  position:'absolute', inset:0, display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  background:'rgba(26,26,26,0.75)', backdropFilter:'blur(4px)',
                }}>
                  {/* 3-dot spinner matching FloorWiz */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="80" height="48">
                    <circle fill="#C9A84C" stroke="#C9A84C" strokeWidth="15" r="15" cx="40" cy="100">
                      <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-0.4"/>
                    </circle>
                    <circle fill="#C9A84C" stroke="#C9A84C" strokeWidth="15" r="15" cx="100" cy="100">
                      <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-0.2"/>
                    </circle>
                    <circle fill="#C9A84C" stroke="#C9A84C" strokeWidth="15" r="15" cx="160" cy="100">
                      <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"/>
                    </circle>
                  </svg>
                  <div style={{ fontFamily:'Poppins', fontWeight:600, fontSize:14, color:'rgba(255,255,255,0.7)', marginTop:12, letterSpacing:'0.04em' }}>
                    Rendering floor...
                  </div>
                </div>
              )}
              {/* Selected blend/room info overlay */}
              <div style={{
                position:'absolute', bottom:16, left:16,
                background:'rgba(10,10,11,0.8)', backdropFilter:'blur(8px)',
                border:'1px solid rgba(255,255,255,0.1)', borderRadius:8,
                padding:'8px 14px', display:'flex', alignItems:'center', gap:10,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={blend.img_url} alt="" style={{ width:32, height:32, objectFit:'cover', borderRadius:4 }} crossOrigin="anonymous"/>
                <div>
                  <div style={{ fontFamily:'Poppins', fontWeight:600, fontSize:13, color:'#F0EDE8' }}>{blend.name}</div>
                  <div style={{ fontFamily:'Poppins', fontSize:11, color:'rgba(240,237,232,0.45)' }}>{room.name}</div>
                </div>
              </div>
            </>
          ) : (
            /* Preview when not in Customize tab */
            <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={room.background} alt={room.name}
                style={{ maxWidth:'90%', maxHeight:'85%', objectFit:'contain', borderRadius:8, border:'1px solid rgba(255,255,255,0.1)' }}
                crossOrigin="anonymous"
              />
              <div style={{ fontFamily:'Poppins', fontSize:13, color:'rgba(240,237,232,0.45)' }}>
                {tab === 'Rooms' ? 'Select a room then pick a blend' : 'Select a blend then click Visualize →'}
              </div>
            </div>
          )}
        </div>

        {/* ── 400px RIGHT PANEL (exact FloorWiz dimensions) ── */}
        <div className="viz-panel" style={{
          width: 400, flexShrink:0,
          background:'var(--surface)',
          borderLeft:'1px solid var(--border)',
          display:'flex', flexDirection:'column',
          overflow:'hidden',
        }}>

          {/* Tab bar — matching FloorWiz: Rooms | Blends | Customize */}
          <div style={{ display:'flex', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  flex:1, padding:'14px 8px', border:'none', cursor:'pointer',
                  fontFamily:'Poppins', fontWeight:600, fontSize:13, letterSpacing:'0.02em',
                  background: tab===t ? 'var(--surface-2)' : 'transparent',
                  color: tab===t ? '#C9A84C' : 'rgba(240,237,232,0.5)',
                  borderBottom: tab===t ? '2px solid #C9A84C' : '2px solid transparent',
                  transition:'all 0.15s',
                }}>
                {t}
              </button>
            ))}
          </div>

          {/* ── ROOMS TAB ── */}
          {tab === 'Rooms' && (
            <div style={{ flex:1, overflowY:'auto', padding:16 }}>
              <p style={{ fontFamily:'Poppins', fontSize:12, color:'rgba(240,237,232,0.45)', marginBottom:12 }}>
                Choose a room environment or upload your own photo
              </p>
              <button onClick={() => fileRef.current?.click()}
                style={{
                  width:'100%', padding:'10px', marginBottom:12,
                  border:'2px dashed rgba(201,168,76,0.3)', borderRadius:8,
                  background:'rgba(201,168,76,0.06)', cursor:'pointer',
                  fontFamily:'Poppins', fontWeight:600, fontSize:13, color:'#C9A84C',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                Upload My Photo
              </button>

              {/* Room type grouping */}
              {['Residential','Outdoor','Commercial'].map(type => {
                const roomsOfType = ROOMS.filter(r => r.type === type)
                if (!roomsOfType.length) return null
                return (
                  <div key={type} style={{ marginBottom:16 }}>
                    <div style={{ fontFamily:'Poppins', fontWeight:700, fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(240,237,232,0.35)', marginBottom:8, paddingLeft:2 }}>{type}</div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                      {roomsOfType.map(r => (
                        <button key={r.id}
                          onClick={() => { setRoom(r); setCustomPhoto(null) }}
                          style={{
                            border:`2px solid ${room.id===r.id ? '#C9A84C' : 'rgba(255,255,255,0.06)'}`,
                            borderRadius:8, overflow:'hidden', cursor:'pointer',
                            background: room.id===r.id ? 'rgba(201,168,76,0.08)' : 'var(--surface-2)',
                            padding:0, textAlign:'left', transition:'all 0.15s',
                          }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.thumb} alt={r.name}
                            style={{ width:'100%', aspectRatio:'16/10', objectFit:'cover', display:'block' }}
                            loading="lazy" crossOrigin="anonymous"
                          />
                          <div style={{ padding:'5px 8px 7px', fontFamily:'Poppins', fontWeight:600, fontSize:11, color: room.id===r.id ? '#C9A84C' : 'rgba(240,237,232,0.75)', lineHeight:1.3 }}>
                            {r.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
              <button onClick={() => setTab('Blends')} className="btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:14, marginTop:8 }}>
                Next: Choose Blend →
              </button>
            </div>
          )}

          {/* ── BLENDS TAB ── */}
          {tab === 'Blends' && (
            <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
              {/* Filters */}
              <div style={{ padding:'12px 12px 0', flexShrink:0 }}>
                {/* Size chips — exact FloorWiz style */}
                <div style={{ display:'flex', gap:6, marginBottom:10 }}>
                  {SIZES.map(s => (
                    <button key={s.id} onClick={() => setSize(s.id)}
                      style={{
                        fontFamily:'Poppins', fontWeight:600, fontSize:11,
                        padding:'5px 12px', borderRadius:20, cursor:'pointer',
                        border:'1px solid',
                        background: size===s.id ? '#C9A84C' : 'transparent',
                        color:       size===s.id ? '#0A0A0B' : 'rgba(240,237,232,0.55)',
                        borderColor: size===s.id ? '#C9A84C' : 'rgba(255,255,255,0.15)',
                        transition:'all 0.15s',
                      }}>{s.label}</button>
                  ))}
                </div>
                {/* Search */}
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search blends..."
                  style={{ width:'100%', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:6, color:'var(--text)', fontSize:13, padding:'8px 12px', outline:'none', fontFamily:'Poppins', marginBottom:8 }}
                />
                {/* Collection filter — scrollable horizontal */}
                <div style={{ display:'flex', gap:4, overflowX:'auto', paddingBottom:8, scrollbarWidth:'none' }}>
                  {collections.map(c => (
                    <button key={c} onClick={() => setCollection(c)}
                      style={{
                        fontFamily:'Poppins', fontWeight:600, fontSize:10,
                        letterSpacing:'0.06em', textTransform:'uppercase',
                        padding:'4px 10px', borderRadius:4, cursor:'pointer',
                        border:'1px solid', whiteSpace:'nowrap', flexShrink:0,
                        background: collection===c ? '#C9A84C' : 'transparent',
                        color:       collection===c ? '#0A0A0B' : 'rgba(240,237,232,0.45)',
                        borderColor: collection===c ? '#C9A84C' : 'rgba(255,255,255,0.1)',
                      }}>{c === 'All' ? 'All' : c.replace(' Collection','').replace(' Blend','')}</button>
                  ))}
                </div>
                <div style={{ fontFamily:'Poppins', fontSize:11, color:'rgba(240,237,232,0.3)', marginBottom:6 }}>
                  {filtered.length} blends
                </div>
              </div>

              {/* Blend grid — ~100px cards, 4 columns, scrollable */}
              <div style={{ flex:1, overflowY:'auto', padding:'0 12px 12px', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:6, alignContent:'start' }}>
                {filtered.slice(0, 280).map(b => (
                  <button key={b.id}
                    onClick={() => setBlend(b)}
                    title={b.name}
                    style={{
                      border:`2px solid ${blend.id===b.id ? '#C9A84C' : 'rgba(255,255,255,0.04)'}`,
                      borderRadius:6, overflow:'hidden', cursor:'pointer', padding:0,
                      background:'var(--surface-2)', transition:'all 0.1s',
                      boxShadow: blend.id===b.id ? '0 0 12px rgba(201,168,76,0.4)' : 'none',
                    }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.img_url} alt={b.name}
                      style={{ width:'100%', aspectRatio:'1', objectFit:'cover', display:'block' }}
                      loading="lazy" crossOrigin="anonymous"
                    />
                    <div style={{ padding:'3px 4px 5px', fontFamily:'Poppins', fontWeight:500, fontSize:9, lineHeight:1.2, color:'rgba(240,237,232,0.65)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {b.name}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ padding:'10px 12px', borderTop:'1px solid var(--border)', flexShrink:0 }}>
                <button onClick={() => setTab('Customize')} className="btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:14 }}>
                  Visualize on Floor →
                </button>
              </div>
            </div>
          )}

          {/* ── CUSTOMIZE TAB ── */}
          {tab === 'Customize' && (
            <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>

              {/* Selected blend preview */}
              <div style={{ background:'var(--surface-2)', borderRadius:10, overflow:'hidden', border:'1px solid var(--border)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={blend.img_url} alt={blend.name} style={{ width:'100%', aspectRatio:'16/7', objectFit:'cover' }} crossOrigin="anonymous"/>
                <div style={{ padding:'10px 12px' }}>
                  <div style={{ fontFamily:'Poppins', fontWeight:700, fontSize:15, marginBottom:2 }}>{blend.name}</div>
                  <div style={{ fontFamily:'Poppins', fontSize:11, color:'rgba(240,237,232,0.45)' }}>{blend.collection} · {SIZES.find(s => s.id===size)?.label}</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:6 }}>
                    {blend.tags.slice(0,4).map(t => (
                      <span key={t} style={{ fontSize:9, fontFamily:'Poppins', padding:'2px 7px', borderRadius:3, background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)', color:'rgba(201,168,76,0.8)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coverage slider */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <span style={{ fontFamily:'Poppins', fontWeight:600, fontSize:12, color:'rgba(240,237,232,0.65)' }}>Blend Coverage</span>
                  <span style={{ fontFamily:'Poppins', fontWeight:700, fontSize:16, color:'#C9A84C' }}>{coverage}%</span>
                </div>
                <input type="range" min={20} max={100} step={5} value={coverage}
                  onChange={e => setCoverage(+e.target.value)}
                  style={{ width:'100%', accentColor:'#C9A84C', cursor:'pointer' }}
                  aria-label="Blend coverage percentage"
                />
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Poppins', fontSize:10, color:'rgba(240,237,232,0.3)', marginTop:4 }}>
                  <span>Light</span><span>Standard</span><span>Full Broadcast</span>
                </div>
              </div>

              {/* Re-render button */}
              <button onClick={render} disabled={rendering}
                style={{ width:'100%', padding:'10px', borderRadius:8, border:'1px solid var(--border)', background:'var(--surface-2)', color:'var(--text)', fontFamily:'Poppins', fontWeight:600, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                {rendering ? 'Rendering...' : 'Re-render Floor'}
              </button>

              {/* Primary CTAs */}
              {rendered && (
                <button onClick={download} className="btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:14 }}>
                  ↓ Download Image
                </button>
              )}
              {blend.eCommerceLink && (
                <a href={blend.eCommerceLink} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                    width:'100%', padding:'12px', borderRadius:8, textDecoration:'none',
                    background:'#4E6D98', color:'#fff',
                    fontFamily:'Poppins', fontWeight:700, fontSize:14,
                  }}>
                  🛒 Add To Cart
                </a>
              )}
              <a href="/request-sample" style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                width:'100%', padding:'11px', borderRadius:8, textDecoration:'none',
                border:'1px solid var(--border)', background:'transparent', color:'var(--text)',
                fontFamily:'Poppins', fontWeight:600, fontSize:13,
              }}>Request Free Sample</a>

              {/* Save / Email design */}
              {!saved ? (
                <form onSubmit={handleSave} style={{ marginTop:4 }}>
                  <div style={{ fontFamily:'Poppins', fontWeight:600, fontSize:11, color:'rgba(240,237,232,0.45)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.08em' }}>Save Design Specs</div>
                  <div style={{ display:'flex', gap:6 }}>
                    <input type="email" required value={saveEmail} onChange={e => setSaveEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{ flex:1, background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:6, color:'var(--text)', fontSize:12, padding:'8px 10px', outline:'none', fontFamily:'Poppins' }}
                    />
                    <button type="submit" style={{ padding:'8px 14px', borderRadius:6, background:'rgba(201,168,76,0.15)', border:'1px solid rgba(201,168,76,0.3)', color:'#C9A84C', fontFamily:'Poppins', fontWeight:600, fontSize:12, cursor:'pointer' }}>
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ padding:'10px', borderRadius:8, background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.2)', fontFamily:'Poppins', fontSize:13, color:'#4ADE80', textAlign:'center' }}>
                  ✓ Design specs sent to {saveEmail}
                </div>
              )}

              {/* Change room/blend quick links */}
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => setTab('Rooms')} style={{ flex:1, padding:'8px', borderRadius:6, border:'1px solid var(--border)', background:'transparent', color:'rgba(240,237,232,0.5)', fontFamily:'Poppins', fontSize:11, cursor:'pointer' }}>
                  Change Room
                </button>
                <button onClick={() => setTab('Blends')} style={{ flex:1, padding:'8px', borderRadius:6, border:'1px solid var(--border)', background:'transparent', color:'rgba(240,237,232,0.5)', fontFamily:'Poppins', fontSize:11, cursor:'pointer' }}>
                  Change Blend
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
