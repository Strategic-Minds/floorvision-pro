'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { SIZES } from '../../lib/blends'
import { ROOMS } from '../../lib/rooms_data'
import { ALL_BLENDS } from '../../lib/blends_data'
import { getFloorMask } from '../../lib/floor_masks'
import type { Room } from '../../lib/rooms_data'
import type { Blend } from '../../lib/blends'

const W = 1024
const H = 800
const TABS = ['Rooms', 'Blends', 'Customize'] as const
type Tab = typeof TABS[number]

// ─── image loader ──────────────────────────────────────────────────────────────
function loadImg(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => res(img)
    img.onerror = () => rej(new Error(`Load failed: ${url}`))
    img.src = url
    setTimeout(() => rej(new Error('timeout')), 14000)
  })
}

// ─── COMPOSITOR ───────────────────────────────────────────────────────────────
//
// DESIGN: offscreen-canvas + stencil masking strategy
//
//  ┌─────────────────────────────────────────────────────────────────────────┐
//  │  flakeCanvas   = tiled blend texture, edge-to-edge, no clip            │
//  │  stencilCanvas = white floor polygon on transparent black               │
//  │  maskedFlake   = flakeCanvas ∩ stencil  (source-in composite)          │
//  │                  → flake pixels ONLY inside floor polygon, ZERO bleed  │
//  │  aboveCanvas   = original bgImg with floor polygon erased               │
//  │                  → car, walls, ceiling at pixel-level accuracy          │
//  │                                                                         │
//  │  Main canvas pipeline:                                                  │
//  │    1. Draw bgImg (full)                                                 │
//  │    2. Draw maskedFlake  [multiply, alpha]   ← floor only               │
//  │    3. Draw maskedFlake  [screen,   α*0.15]  ← sparkle, floor only      │
//  │    4. Draw aboveCanvas  [source-over, 1.0]  ← restore car/walls        │
//  │    5. Horizon fade clip to floor polygon                                │
//  │    6. Sheen clip to floor polygon                                       │
//  │    7. Watermark                                                         │
//  └─────────────────────────────────────────────────────────────────────────┘
//
// WHY steps 2+3 are safe even though they use multiply/screen:
//   maskedFlake is TRANSPARENT outside the floor polygon.
//   multiply(rgba, transparent) = transparent → no effect on bg pixels.
//   Step 4 then stamps the original photo back on top for everything above
//   the floor horizon, providing a hard pixel-accurate guarantee.
//
async function compositeFloor(
  canvas: HTMLCanvasElement,
  roomId: string,
  bgUrl: string,
  blendUrl: string,
  coverage: number,
): Promise<void> {
  canvas.width  = W
  canvas.height = H

  const [bgImg, blendImg] = await Promise.all([loadImg(bgUrl), loadImg(blendUrl)])

  const poly      = getFloorMask(roomId)
  const alpha     = Math.min(0.95, (coverage / 100) * 0.88)
  const floorTopY = poly[0][1] * H   // pixel-Y of floor horizon

  // ── 1. OFFSCREEN: tiled flake texture (full canvas, perspective scaling) ──
  const flakeCanvas    = document.createElement('canvas')
  flakeCanvas.width    = W
  flakeCanvas.height   = H
  const fCtx           = flakeCanvas.getContext('2d')!
  fCtx.globalCompositeOperation = 'source-over'
  fCtx.globalAlpha = 1

  const ROWS = 10
  for (let row = 0; row < ROWS; row++) {
    const t        = row / (ROWS - 1)            // 0 = horizon, 1 = camera
    const rowY     = floorTopY + t * (H - floorTopY)
    const tileSize = 68 + t * 68                 // 68 px at horizon → 136 px at camera
    const cols     = Math.ceil(W / tileSize) + 2
    for (let col = -1; col < cols; col++) {
      // Mild lateral convergence toward vertical centre line
      const shift = (0.5 - (col + 0.5) / cols) * t * 12
      fCtx.drawImage(blendImg, col * tileSize + shift, rowY, tileSize, tileSize)
    }
  }

  // ── 2. OFFSCREEN: white floor-polygon stencil ─────────────────────────────
  const stencilCanvas  = document.createElement('canvas')
  stencilCanvas.width  = W
  stencilCanvas.height = H
  const sCtx           = stencilCanvas.getContext('2d')!
  sCtx.clearRect(0, 0, W, H)
  sCtx.fillStyle = '#ffffff'
  sCtx.beginPath()
  sCtx.moveTo(poly[0][0] * W, poly[0][1] * H)
  sCtx.lineTo(poly[1][0] * W, poly[1][1] * H)
  sCtx.lineTo(poly[2][0] * W, poly[2][1] * H)
  sCtx.lineTo(poly[3][0] * W, poly[3][1] * H)
  sCtx.closePath()
  sCtx.fill()

  // ── 3. OFFSCREEN: flake texture masked to floor polygon (source-in) ────────
  //    source-in keeps ONLY pixels where destination (stencil) is opaque.
  //    Result: flake texture is visible ONLY inside the floor polygon.
  //    Every pixel outside the polygon is fully transparent (alpha = 0).
  const maskedCanvas   = document.createElement('canvas')
  maskedCanvas.width   = W
  maskedCanvas.height  = H
  const mCtx           = maskedCanvas.getContext('2d')!
  mCtx.drawImage(stencilCanvas, 0, 0)          // destination = stencil (white floor)
  mCtx.globalCompositeOperation = 'source-in'  // keep src where dest is opaque
  mCtx.globalAlpha = 1
  mCtx.drawImage(flakeCanvas, 0, 0)            // source = flake texture

  // ── 4. OFFSCREEN: above-floor pixels (car, walls, ceiling) ────────────────
  //    Draw original photo, then erase the floor polygon area.
  //    Result: only the pixels ABOVE the floor horizon survive — exact original values.
  const aboveCanvas    = document.createElement('canvas')
  aboveCanvas.width    = W
  aboveCanvas.height   = H
  const aCtx           = aboveCanvas.getContext('2d')!
  aCtx.drawImage(bgImg, 0, 0, W, H)
  aCtx.globalCompositeOperation = 'destination-out'
  aCtx.fillStyle = '#ffffff'
  aCtx.beginPath()
  aCtx.moveTo(poly[0][0] * W, poly[0][1] * H)
  aCtx.lineTo(poly[1][0] * W, poly[1][1] * H)
  aCtx.lineTo(poly[2][0] * W, poly[2][1] * H)
  aCtx.lineTo(poly[3][0] * W, poly[3][1] * H)
  aCtx.closePath()
  aCtx.fill()

  // ── MAIN CANVAS PIPELINE ──────────────────────────────────────────────────
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, W, H)

  // Pass 1: full background photo
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1
  ctx.drawImage(bgImg, 0, 0, W, H)

  // Pass 2: multiply flake layer (maskedCanvas is transparent outside floor → no bleed)
  ctx.globalCompositeOperation = 'multiply'
  ctx.globalAlpha = alpha
  ctx.drawImage(maskedCanvas, 0, 0)

  // Pass 3: screen sparkle pass
  ctx.globalCompositeOperation = 'screen'
  ctx.globalAlpha = alpha * 0.15
  ctx.drawImage(maskedCanvas, 0, 0)

  // Reset blending
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1

  // Pass 4: restore above-floor pixels (car, walls — pixel-perfect original)
  ctx.drawImage(aboveCanvas, 0, 0)

  // Pass 5: horizon fade — softens the hard floor edge
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(poly[0][0] * W, poly[0][1] * H)
  ctx.lineTo(poly[1][0] * W, poly[1][1] * H)
  ctx.lineTo(poly[2][0] * W, poly[2][1] * H)
  ctx.lineTo(poly[3][0] * W, poly[3][1] * H)
  ctx.closePath()
  ctx.clip()
  const fadeH = Math.max(36, (H - floorTopY) * 0.10)
  const fade  = ctx.createLinearGradient(0, floorTopY - 4, 0, floorTopY + fadeH)
  fade.addColorStop(0,   'rgba(0,0,0,0.38)')
  fade.addColorStop(0.45,'rgba(0,0,0,0.07)')
  fade.addColorStop(1,   'rgba(0,0,0,0.00)')
  ctx.fillStyle = fade
  ctx.fillRect(0, floorTopY - 4, W, fadeH + 4)
  ctx.restore()

  // Pass 6: epoxy sheen
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(poly[0][0] * W, poly[0][1] * H)
  ctx.lineTo(poly[1][0] * W, poly[1][1] * H)
  ctx.lineTo(poly[2][0] * W, poly[2][1] * H)
  ctx.lineTo(poly[3][0] * W, poly[3][1] * H)
  ctx.closePath()
  ctx.clip()
  const sheenH = (H - floorTopY) * 0.26
  const sheen  = ctx.createLinearGradient(0, floorTopY, 0, floorTopY + sheenH)
  sheen.addColorStop(0, 'rgba(255,255,255,0.055)')
  sheen.addColorStop(1, 'rgba(255,255,255,0.000)')
  ctx.fillStyle = sheen
  ctx.fillRect(0, floorTopY, W, sheenH)
  ctx.restore()

  // Pass 7: watermark
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1
  ctx.font = 'bold 13px Poppins, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.50)'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  ctx.fillText('FloorVision Pro — Powered by Xtreme Polishing Systems', W - 10, H - 8)
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function VisualizerPage() {
  const [tab, setTab]         = useState<Tab>('Rooms')
  const [room, setRoom]       = useState<Room>(ROOMS[0])
  const [size, setSize]       = useState('18')
  const [blend, setBlend]     = useState<Blend>(
    ALL_BLENDS.find(b => b.id.endsWith('-18')) || ALL_BLENDS[0]
  )
  const [collection, setCollection] = useState('All')
  const [search, setSearch]         = useState('')
  const [coverage, setCoverage]     = useState(85)
  const [rendering, setRendering]   = useState(false)
  const [rendered, setRendered]     = useState(false)
  const [customPhoto, setCustomPhoto] = useState<string | null>(null)
  const [saveEmail, setSaveEmail]   = useState('')
  const [saved, setSaved]           = useState(false)

  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const fileRef       = useRef<HTMLInputElement>(null)
  const resultDataRef = useRef<string>('')

  const collections = ['All', ...Array.from(new Set(
    ALL_BLENDS.map(b => b.collection).filter(Boolean)
  ))]

  const filtered = ALL_BLENDS.filter(b => {
    const isFB    = b.id.includes('-FB')
    const bSized  = !isFB || b.id.endsWith(`-${size}`)
    const bColl   = collection === 'All' || b.collection === collection
    const bSearch = !search
      || b.name.toLowerCase().includes(search.toLowerCase())
      || b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return bSized && bColl && bSearch
  })

  const render = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setRendering(true)
    setRendered(false)
    try {
      const bgUrl  = customPhoto || room.background
      const roomId = customPhoto ? 'custom' : room.id
      await compositeFloor(canvas, roomId, bgUrl, blend.img_url, coverage)
      resultDataRef.current = canvas.toDataURL('image/jpeg', 0.92)
      setRendered(true)
    } catch (err) {
      console.error('Render error:', err)
      // graceful fallback
      const ctx = canvas.getContext('2d')!
      canvas.width = W; canvas.height = H
      ctx.fillStyle = '#111'
      ctx.fillRect(0, 0, W, H)
      try {
        const bi = await loadImg(blend.img_url)
        ctx.globalAlpha = 0.65; ctx.drawImage(bi, 0, 0, W, H); ctx.globalAlpha = 1
      } catch {}
      ctx.font = 'bold 18px Poppins,sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.textAlign = 'center'
      ctx.fillText(`${blend.name} · ${room.name}`, W / 2, 36)
      ctx.font = '13px Poppins,sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.45)'
      ctx.fillText('Room image unavailable from CDN', W / 2, 60)
      resultDataRef.current = canvas.toDataURL('image/jpeg', 0.92)
      setRendered(true)
    }
    setRendering(false)
  }, [room, blend, coverage, customPhoto])

  useEffect(() => { if (tab === 'Customize') render() }, [tab, render])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (tab === 'Customize') render() }, [room, blend, coverage])

  const download = () => {
    const a = document.createElement('a')
    a.href = resultDataRef.current
    a.download = `floorvision-${blend.name.replace(/\s+/g, '-').toLowerCase()}.jpg`
    a.click()
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => { setCustomPhoto(ev.target?.result as string); setTab('Customize') }
    reader.readAsDataURL(file)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 4000)
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>

      {/* ── Top bar ── */}
      <div style={{ borderBottom:'1px solid var(--border)', background:'var(--surface)', padding:'12px 0' }}>
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:22, textTransform:'uppercase' }}>
            FLOOR<span style={{ color:'#C9A84C' }}>VISION</span> PRO
            <span style={{ fontFamily:'Barlow', fontWeight:400, fontSize:13, color:'rgba(240,237,232,0.4)', marginLeft:12, textTransform:'none' }}>
              451 blends · 16 rooms
            </span>
          </span>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => fileRef.current?.click()}
              style={{ fontFamily:'Poppins', fontWeight:600, fontSize:13, padding:'8px 16px', borderRadius:6,
                       border:'1px solid var(--border)', background:'transparent', color:'var(--text)', cursor:'pointer',
                       display:'flex', alignItems:'center', gap:6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
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

      {/* ── Layout ── */}
      <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 130px)' }} className="viz-main">
        <style>{`
          @media(min-width:768px){ .viz-main{ flex-direction:row !important; } }
          @media(max-width:767px){
            .viz-panel{ width:100%!important; height:420px!important; border-left:none!important; border-top:1px solid var(--border)!important; }
            .viz-canvas{ flex:none!important; height:280px!important; }
          }
        `}</style>

        {/* ── Canvas area ── */}
        <div className="viz-canvas" style={{ flex:1, position:'relative', background:'#1a1a1a', overflow:'hidden' }}>
          {tab === 'Customize' ? (
            <>
              <canvas ref={canvasRef}
                style={{ width:'100%', height:'100%', display:'block', objectFit:'contain' }}
                aria-label="Floor visualization"
              />
              {rendering && (
                <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
                              alignItems:'center', justifyContent:'center',
                              background:'rgba(10,10,10,0.75)', color:'white', gap:12 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56">
                      <animateTransform attributeName="transform" type="rotate"
                        from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  <span style={{ fontFamily:'Poppins', fontSize:13, color:'rgba(255,255,255,0.7)' }}>
                    Rendering floor…
                  </span>
                </div>
              )}
              {!rendering && !rendered && (
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
                              justifyContent:'center', color:'rgba(255,255,255,0.35)',
                              fontFamily:'Poppins', fontSize:14 }}>
                  Click "Visualize on Floor →" to render
                </div>
              )}
            </>
          ) : (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
                          height:'100%', flexDirection:'column', gap:12 }}>
              <img src={room.background} alt={room.name} crossOrigin="anonymous"
                style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain', opacity:0.85 }}
              />
              <p style={{ color:'rgba(255,255,255,0.3)', fontFamily:'Poppins', fontSize:12, margin:0 }}>
                Select a blend then click Visualize →
              </p>
            </div>
          )}
        </div>

        {/* ── Panel ── */}
        <div className="viz-panel"
          style={{ width:380, borderLeft:'1px solid var(--border)', background:'var(--surface)',
                   display:'flex', flexDirection:'column', overflow:'hidden' }}>

          {/* tabs */}
          <div style={{ display:'flex', borderBottom:'1px solid var(--border)' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex:1, padding:'14px 0', fontFamily:'Poppins', fontWeight:600, fontSize:13,
                border:'none', cursor:'pointer', background:'transparent',
                color: tab === t ? '#C9A84C' : 'rgba(240,237,232,0.5)',
                borderBottom: tab === t ? '2px solid #C9A84C' : '2px solid transparent',
                transition:'all 0.15s'
              }}>{t}</button>
            ))}
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:'16px' }}>

            {/* ─ ROOMS ─ */}
            {tab === 'Rooms' && (
              <div>
                {(['Residential','Outdoor','Commercial'] as const).map(type => {
                  const list = ROOMS.filter(r => r.type === type)
                  return (
                    <div key={type} style={{ marginBottom:20 }}>
                      <p style={{ fontFamily:'Poppins', fontWeight:600, fontSize:11,
                                  color:'rgba(240,237,232,0.4)', textTransform:'uppercase',
                                  letterSpacing:'0.08em', margin:'0 0 10px' }}>{type}</p>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                        {list.map(r => (
                          <button key={r.id} onClick={() => { setRoom(r); setTab('Blends') }}
                            style={{ background: room.id === r.id ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
                                     border: room.id === r.id ? '1.5px solid #C9A84C' : '1px solid var(--border)',
                                     borderRadius:8, padding:0, cursor:'pointer', overflow:'hidden', transition:'all 0.15s' }}>
                            <img src={r.thumb} alt={r.name} loading="lazy" crossOrigin="anonymous"
                              style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover', display:'block' }}/>
                            <p style={{ fontFamily:'Poppins', fontSize:10, fontWeight:500,
                                        color:'rgba(240,237,232,0.7)', margin:'5px 4px',
                                        textAlign:'center', lineHeight:1.3 }}>{r.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* ─ BLENDS ─ */}
            {tab === 'Blends' && (
              <div>
                {/* Size picker */}
                <div style={{ display:'flex', gap:8, marginBottom:14 }}>
                  {['16','18','14'].map(s => (
                    <button key={s} onClick={() => setSize(s)} style={{
                      padding:'5px 14px', borderRadius:20, fontFamily:'Poppins', fontSize:12, fontWeight:600,
                      cursor:'pointer', border:'1.5px solid',
                      borderColor: size === s ? '#C9A84C' : 'var(--border)',
                      background:  size === s ? 'rgba(201,168,76,0.12)' : 'transparent',
                      color:       size === s ? '#C9A84C' : 'rgba(240,237,232,0.5)'
                    }}>
                      {s === '16' ? '1/16"' : s === '18' ? '1/8"' : '1/4"'}
                    </button>
                  ))}
                </div>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search blends…"
                  style={{ width:'100%', padding:'9px 12px', borderRadius:8,
                           border:'1px solid var(--border)', background:'rgba(255,255,255,0.05)',
                           color:'var(--text)', fontFamily:'Poppins', fontSize:13,
                           marginBottom:12, boxSizing:'border-box' }}/>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
                  {collections.map(c => (
                    <button key={c} onClick={() => setCollection(c)} style={{
                      padding:'4px 12px', borderRadius:20, fontFamily:'Poppins', fontSize:11, fontWeight:600,
                      cursor:'pointer', border:'1.5px solid', whiteSpace:'nowrap',
                      borderColor: collection === c ? '#C9A84C' : 'var(--border)',
                      background:  collection === c ? 'rgba(201,168,76,0.12)' : 'transparent',
                      color:       collection === c ? '#C9A84C' : 'rgba(240,237,232,0.5)'
                    }}>
                      {c.replace(' Collection','').replace(' Blend','').toUpperCase()}
                    </button>
                  ))}
                </div>
                <p style={{ fontFamily:'Poppins', fontSize:12, color:'rgba(240,237,232,0.35)', margin:'0 0 10px' }}>
                  {filtered.length} blends
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
                  {filtered.map(b => (
                    <button key={b.id} onClick={() => setBlend(b)} style={{
                      background: blend.id === b.id ? 'rgba(201,168,76,0.15)' : 'transparent',
                      border: blend.id === b.id ? '1.5px solid #C9A84C' : '1px solid var(--border)',
                      borderRadius:6, padding:0, cursor:'pointer', overflow:'hidden', transition:'border-color 0.12s'
                    }}>
                      <img src={b.img_url} alt={b.name} loading="lazy" crossOrigin="anonymous"
                        style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover', display:'block' }}/>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─ CUSTOMIZE ─ */}
            {tab === 'Customize' && (
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {blend && (
                  <div style={{ display:'flex', gap:12, alignItems:'center', padding:'10px 12px',
                                borderRadius:10, background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)' }}>
                    <img src={blend.img_url} alt={blend.name} crossOrigin="anonymous"
                      style={{ width:52, height:52, objectFit:'cover', borderRadius:6 }}/>
                    <div>
                      <p style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:16,
                                  textTransform:'uppercase', margin:0 }}>{blend.name}</p>
                      <p style={{ fontFamily:'Poppins', fontSize:11, color:'rgba(240,237,232,0.4)', margin:0 }}>
                        {room.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* Coverage */}
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <label style={{ fontFamily:'Poppins', fontWeight:600, fontSize:13 }}>Blend Coverage</label>
                    <span style={{ fontFamily:'Poppins', fontWeight:700, fontSize:15, color:'#C9A84C' }}>{coverage}%</span>
                  </div>
                  <input type="range" min={30} max={100} value={coverage}
                    onChange={e => setCoverage(Number(e.target.value))}
                    style={{ width:'100%', accentColor:'#C9A84C' }}/>
                  <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Poppins',
                                fontSize:10, color:'rgba(240,237,232,0.35)', marginTop:4 }}>
                    <span>Light</span><span>Standard</span><span>Full Broadcast</span>
                  </div>
                </div>

                <button onClick={render} disabled={rendering} style={{
                  width:'100%', padding:'13px 0', borderRadius:8,
                  background: rendering ? 'rgba(201,168,76,0.4)' : '#C9A84C',
                  color:'#0A0A0A', fontFamily:'Poppins', fontWeight:700, fontSize:14,
                  border:'none', cursor: rendering ? 'not-allowed' : 'pointer', transition:'background 0.15s'
                }}>
                  {rendering ? 'Rendering…' : '↻ Re-render Floor'}
                </button>

                {rendered && (
                  <button onClick={download} style={{
                    width:'100%', padding:'13px 0', borderRadius:8,
                    background:'rgba(201,168,76,0.12)', color:'#C9A84C',
                    fontFamily:'Poppins', fontWeight:700, fontSize:14,
                    border:'1.5px solid #C9A84C', cursor:'pointer'
                  }}>↓ Download Image</button>
                )}

                <button style={{
                  width:'100%', padding:'13px 0', borderRadius:8, background:'#4E6D98',
                  color:'white', fontFamily:'Poppins', fontWeight:700, fontSize:14,
                  border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8
                }}>🛒 Add To Cart</button>

                <button style={{
                  width:'100%', padding:'12px 0', borderRadius:8, background:'transparent',
                  color:'rgba(240,237,232,0.6)', fontFamily:'Poppins', fontWeight:500, fontSize:13,
                  border:'1px solid var(--border)', cursor:'pointer'
                }}>Request Free Sample</button>

                <form onSubmit={handleSave}>
                  <p style={{ fontFamily:'Poppins', fontWeight:600, fontSize:12, textTransform:'uppercase',
                              letterSpacing:'0.07em', color:'rgba(240,237,232,0.45)', margin:'0 0 8px' }}>
                    Save Design Specs
                  </p>
                  <div style={{ display:'flex', gap:8 }}>
                    <input type="email" value={saveEmail} onChange={e => setSaveEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{ flex:1, padding:'9px 12px', borderRadius:8,
                               border:'1px solid var(--border)', background:'rgba(255,255,255,0.05)',
                               color:'var(--text)', fontFamily:'Poppins', fontSize:13 }}/>
                    <button type="submit" style={{
                      padding:'9px 18px', borderRadius:8, background:'#C9A84C', color:'#0A0A0A',
                      fontFamily:'Poppins', fontWeight:700, fontSize:13, border:'none', cursor:'pointer'
                    }}>{saved ? '✓' : 'Send'}</button>
                  </div>
                </form>

                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={() => setTab('Rooms')} style={{
                    flex:1, padding:'9px 0', borderRadius:8, border:'1px solid var(--border)',
                    background:'transparent', color:'rgba(240,237,232,0.6)',
                    fontFamily:'Poppins', fontSize:12, cursor:'pointer'
                  }}>Change Room</button>
                  <button onClick={() => setTab('Blends')} style={{
                    flex:1, padding:'9px 0', borderRadius:8, border:'1px solid var(--border)',
                    background:'transparent', color:'rgba(240,237,232,0.6)',
                    fontFamily:'Poppins', fontSize:12, cursor:'pointer'
                  }}>Change Blend</button>
                </div>
              </div>
            )}
          </div>

          {/* Visualize CTA */}
          {tab !== 'Customize' && (
            <div style={{ padding:'16px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => setTab('Customize')} style={{
                width:'100%', padding:'14px 0', borderRadius:8, background:'#C9A84C',
                color:'#0A0A0A', fontFamily:'Poppins', fontWeight:700, fontSize:15,
                border:'none', cursor:'pointer'
              }}>Visualize on Floor →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
