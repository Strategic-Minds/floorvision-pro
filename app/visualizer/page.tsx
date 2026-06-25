'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { ROOMS }     from '../../lib/rooms_data'
import { ALL_BLENDS } from '../../lib/blends_data'
import { getFloorMask } from '../../lib/floor_masks'
import type { Room }  from '../../lib/rooms_data'
import type { Blend } from '../../lib/blends'

const W = 1024
const H = 800

/* ── image loader ─────────────────────────────────────────────────────────── */
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

/* ══════════════════════════════════════════════════════════════════════════════
   COMPOSITOR — offscreen-canvas + stencil masking
   4-canvas pipeline ensures car/walls are NEVER affected by flake layer:
     1. flakeCanvas    = tiled blend texture (full canvas)
     2. stencilCanvas  = white floor trapezoid on transparent
     3. maskedCanvas   = flake ∩ stencil (source-in) → transparent outside floor
     4. aboveCanvas    = original photo with floor erased (destination-out)
   Main: bg → multiply(masked) → screen(masked) → restore above → fade → sheen
══════════════════════════════════════════════════════════════════════════════ */
async function compositeFloor(
  canvas: HTMLCanvasElement,
  roomId: string,
  bgUrl: string,
  blendUrl: string,
  coverage: number,
): Promise<void> {
  canvas.width = W; canvas.height = H
  const [bgImg, blendImg] = await Promise.all([loadImg(bgUrl), loadImg(blendUrl)])
  const poly      = getFloorMask(roomId)
  const alpha     = Math.min(0.95, (coverage / 100) * 0.88)
  const floorTopY = poly[0][1] * H

  /* OFFSCREEN 1: tiled flake texture */
  const fc = document.createElement('canvas'); fc.width = W; fc.height = H
  const fCtx = fc.getContext('2d')!
  const ROWS = 10
  for (let row = 0; row < ROWS; row++) {
    const t = row / (ROWS - 1)
    const rowY = floorTopY + t * (H - floorTopY)
    const ts   = 68 + t * 68
    const cols = Math.ceil(W / ts) + 2
    for (let col = -1; col < cols; col++) {
      const shift = (0.5 - (col + 0.5) / cols) * t * 12
      fCtx.drawImage(blendImg, col * ts + shift, rowY, ts, ts)
    }
  }

  /* OFFSCREEN 2: floor polygon stencil */
  const sc = document.createElement('canvas'); sc.width = W; sc.height = H
  const sCtx = sc.getContext('2d')!
  sCtx.fillStyle = '#fff'
  sCtx.beginPath()
  sCtx.moveTo(poly[0][0]*W, poly[0][1]*H); sCtx.lineTo(poly[1][0]*W, poly[1][1]*H)
  sCtx.lineTo(poly[2][0]*W, poly[2][1]*H); sCtx.lineTo(poly[3][0]*W, poly[3][1]*H)
  sCtx.closePath(); sCtx.fill()

  /* OFFSCREEN 3: masked flake (flake ∩ stencil) */
  const mc = document.createElement('canvas'); mc.width = W; mc.height = H
  const mCtx = mc.getContext('2d')!
  mCtx.drawImage(sc, 0, 0)
  mCtx.globalCompositeOperation = 'source-in'
  mCtx.drawImage(fc, 0, 0)

  /* OFFSCREEN 4: above-floor pixels (original minus floor polygon) */
  const ac = document.createElement('canvas'); ac.width = W; ac.height = H
  const aCtx = ac.getContext('2d')!
  aCtx.drawImage(bgImg, 0, 0, W, H)
  aCtx.globalCompositeOperation = 'destination-out'
  aCtx.fillStyle = '#fff'
  aCtx.beginPath()
  aCtx.moveTo(poly[0][0]*W, poly[0][1]*H); aCtx.lineTo(poly[1][0]*W, poly[1][1]*H)
  aCtx.lineTo(poly[2][0]*W, poly[2][1]*H); aCtx.lineTo(poly[3][0]*W, poly[3][1]*H)
  aCtx.closePath(); aCtx.fill()

  /* MAIN CANVAS */
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, W, H)
  ctx.drawImage(bgImg, 0, 0, W, H)             // Pass 1: background
  ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = alpha
  ctx.drawImage(mc, 0, 0)                       // Pass 2: multiply (floor only)
  ctx.globalCompositeOperation = 'screen';   ctx.globalAlpha = alpha * 0.15
  ctx.drawImage(mc, 0, 0)                       // Pass 3: screen sparkle
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1
  ctx.drawImage(ac, 0, 0)                       // Pass 4: restore car/walls

  /* Pass 5: horizon fade */
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(poly[0][0]*W, poly[0][1]*H); ctx.lineTo(poly[1][0]*W, poly[1][1]*H)
  ctx.lineTo(poly[2][0]*W, poly[2][1]*H); ctx.lineTo(poly[3][0]*W, poly[3][1]*H)
  ctx.closePath(); ctx.clip()
  const fadeH = Math.max(36, (H - floorTopY) * 0.10)
  const fade = ctx.createLinearGradient(0, floorTopY - 4, 0, floorTopY + fadeH)
  fade.addColorStop(0, 'rgba(0,0,0,0.38)'); fade.addColorStop(0.45, 'rgba(0,0,0,0.07)'); fade.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = fade; ctx.fillRect(0, floorTopY - 4, W, fadeH + 4)
  ctx.restore()

  /* Pass 6: epoxy sheen */
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(poly[0][0]*W, poly[0][1]*H); ctx.lineTo(poly[1][0]*W, poly[1][1]*H)
  ctx.lineTo(poly[2][0]*W, poly[2][1]*H); ctx.lineTo(poly[3][0]*W, poly[3][1]*H)
  ctx.closePath(); ctx.clip()
  const sheenH = (H - floorTopY) * 0.26
  const sheen = ctx.createLinearGradient(0, floorTopY, 0, floorTopY + sheenH)
  sheen.addColorStop(0, 'rgba(255,255,255,0.055)'); sheen.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = sheen; ctx.fillRect(0, floorTopY, W, sheenH)
  ctx.restore()

  /* Pass 7: watermark */
  ctx.font = 'bold 12px Poppins,sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.50)'
  ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'
  ctx.fillText('FloorVision Pro — Powered by Xtreme Polishing Systems', W - 10, H - 8)
}

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT — Torginol visualizer layout clone
   Left: full-height canvas render area
   Right: 380px white panel with Rooms / Blends / Customize tabs
══════════════════════════════════════════════════════════════════════════════ */
export default function VisualizerPage() {
  const [step, setStep]           = useState<'rooms'|'blends'|'customize'>('rooms')
  const [room, setRoom]           = useState<Room>(ROOMS[0])
  const [size, setSize]           = useState('18')
  const [blend, setBlend]         = useState<Blend>(
    ALL_BLENDS.find(b => b.id.endsWith('-18')) || ALL_BLENDS[0]
  )
  const [collection, setColl]     = useState('All')
  const [search, setSearch]       = useState('')
  const [coverage, setCoverage]   = useState(85)
  const [rendering, setRendering] = useState(false)
  const [rendered, setRendered]   = useState(false)
  const [customPhoto, setCustom]  = useState<string | null>(null)
  const [saveEmail, setEmail]     = useState('')
  const [saved, setSaved]         = useState(false)

  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const fileRef     = useRef<HTMLInputElement>(null)
  const resultRef   = useRef('')

  /* ── blend filtering ────────────────────────────────────────────────────── */
  const collections = ['All', ...Array.from(new Set(ALL_BLENDS.map(b => b.collection).filter(Boolean)))]
  const filtered = ALL_BLENDS.filter(b => {
    const isFB   = b.id.includes('-FB')
    const bSized = !isFB || b.id.endsWith(`-${size}`)
    const bColl  = collection === 'All' || b.collection === collection
    const bSrch  = !search || b.name.toLowerCase().includes(search.toLowerCase()) ||
                   b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return bSized && bColl && bSrch
  })

  /* ── render ─────────────────────────────────────────────────────────────── */
  const render = useCallback(async () => {
    const canvas = canvasRef.current; if (!canvas) return
    setRendering(true); setRendered(false)
    try {
      await compositeFloor(canvas, customPhoto ? 'custom' : room.id,
                           customPhoto || room.background, blend.img_url, coverage)
      resultRef.current = canvas.toDataURL('image/jpeg', 0.92)
      setRendered(true)
    } catch (err) {
      console.error(err)
      const ctx = canvas.getContext('2d')!
      canvas.width = W; canvas.height = H
      ctx.fillStyle = '#f7f7f7'; ctx.fillRect(0, 0, W, H)
      try { const bi = await loadImg(blend.img_url); ctx.globalAlpha = 0.65; ctx.drawImage(bi, 0, 0, W, H); ctx.globalAlpha = 1 } catch {}
      ctx.font = 'bold 16px Poppins,sans-serif'
      ctx.fillStyle = '#231F20'; ctx.textAlign = 'center'
      ctx.fillText(`${blend.name} · ${room.name}`, W/2, 36)
      ctx.font = '13px Poppins'; ctx.fillStyle = '#999'
      ctx.fillText('Room image unavailable from CDN', W/2, 60)
      resultRef.current = canvas.toDataURL('image/jpeg', 0.92)
      setRendered(true)
    }
    setRendering(false)
  }, [room, blend, coverage, customPhoto])

  useEffect(() => { if (step === 'customize') render() }, [step, render])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (step === 'customize') render() }, [room, blend, coverage])

  const download = () => {
    const a = document.createElement('a')
    a.href = resultRef.current
    a.download = `floorvision-${blend.name.replace(/\s+/g,'-').toLowerCase()}.jpg`
    a.click()
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return
    const reader = new FileReader()
    reader.onload = ev => { setCustom(ev.target?.result as string); setStep('customize') }
    reader.readAsDataURL(f)
  }

  /* ── TORGINOL UI TOKENS ────────────────────────────────────────────────── */
  const T = {
    bg:           '#FFFFFF',
    bgAlt:        '#F7F7F7',
    border:       '#E5E5E5',
    text:         '#231F20',
    textMuted:    '#7C7C7C',
    accent:       '#E31837',
    panelW:       380,
    tabH:         48,
    fontH:        "'Poppins', sans-serif",
    fontB:        "'Open Sans', sans-serif",
  }

  const pillStyle = (active: boolean) => ({
    padding: '5px 14px', borderRadius: 20,
    fontFamily: T.fontH, fontWeight: 700, fontSize: 11,
    letterSpacing: '0.06em', textTransform: 'uppercase' as const,
    border: `1.5px solid ${active ? T.accent : T.border}`,
    background: active ? `${T.accent}14` : 'transparent',
    color: active ? T.accent : T.textMuted,
    cursor: 'pointer', whiteSpace: 'nowrap' as const,
  })

  /* ── RENDER ────────────────────────────────────────────────────────────── */
  return (
    <div style={{ paddingTop: 'var(--nav-h)', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── PAGE HEADER — white, Torginol-style ─────────────────────────── */}
      <div style={{
        background: T.bg, borderBottom: `1px solid ${T.border}`,
        padding: '10px 0', flexShrink: 0
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <span style={{ fontFamily: T.fontH, fontWeight: 800, fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.02em', color: T.text }}>
              Floor<span style={{ color: T.accent }}>Vision</span> Pro
            </span>
            <span style={{ fontFamily: T.fontB, fontSize: 12, color: T.textMuted, marginLeft: 14 }}>
              {filtered.length} blends · 16 rooms · Real FloorWiz CDN
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={() => fileRef.current?.click()}
              style={{ fontFamily: T.fontH, fontWeight: 700, fontSize: 11, letterSpacing: '0.06em',
                       textTransform: 'uppercase', padding: '8px 16px', borderRadius: 4,
                       border: `1.5px solid ${T.border}`, background: 'transparent',
                       color: T.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              Upload My Photo
            </button>
            {rendered && (
              <button onClick={download} style={{
                fontFamily: T.fontH, fontWeight: 700, fontSize: 11, letterSpacing: '0.06em',
                textTransform: 'uppercase', padding: '8px 18px', borderRadius: 4,
                background: T.text, color: '#fff', border: 'none', cursor: 'pointer'
              }}>
                ↓ Download
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }}/>
        </div>
      </div>

      {/* ── MAIN VISUALIZER LAYOUT ─────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }} className="viz-layout">
        <style>{`
          @media(max-width:767px){
            .viz-layout { flex-direction: column !important; }
            .viz-panel  { width: 100% !important; height: 50vh !important; border-left: none !important; border-top: 1px solid #E5E5E5 !important; }
            .viz-canvas { height: 50vh !important; }
          }
        `}</style>

        {/* ── CANVAS — left/main area ────────────────────────────────────── */}
        <div className="viz-canvas" style={{
          flex: 1, position: 'relative',
          background: step === 'customize' ? '#1a1a1a' : T.bgAlt,
          overflow: 'hidden'
        }}>
          {step === 'customize' ? (
            <>
              <canvas ref={canvasRef}
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
                aria-label="Floor visualization"
              />
              {rendering && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.85)', gap: 12
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5">
                    <path d="M21 12a9 9 0 11-6.219-8.56">
                      <animateTransform attributeName="transform" type="rotate"
                        from="0 12 12" to="360 12 12" dur="0.85s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  <span style={{ fontFamily: T.fontB, fontSize: 13, color: T.textMuted }}>
                    Rendering floor…
                  </span>
                </div>
              )}
              {!rendering && !rendered && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexDirection: 'column', gap: 16
                }}>
                  <p style={{ fontFamily: T.fontB, fontSize: 14, color: T.textMuted }}>
                    Click &ldquo;Visualize on Floor&rdquo; to render
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Preview mode — show selected room image */
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 16, padding: 32
            }}>
              <img src={room.background} alt={room.name} crossOrigin="anonymous"
                style={{ maxWidth: '100%', maxHeight: 'calc(100% - 60px)', objectFit: 'contain' }}
              />
              <p style={{ fontFamily: T.fontB, fontSize: 13, color: T.textMuted }}>
                {room.name} — Select a blend, then click Visualize →
              </p>
            </div>
          )}
        </div>

        {/* ── PANEL — right side, white Torginol style ─────────────────── */}
        <div className="viz-panel" style={{
          width: T.panelW, background: T.bg,
          borderLeft: `1px solid ${T.border}`,
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
            {([['rooms','ROOMS'],['blends','BLENDS'],['customize','CUSTOMIZE']] as const).map(([id, label]) => (
              <button key={id} onClick={() => setStep(id)} style={{
                flex: 1, height: T.tabH,
                fontFamily: T.fontH, fontWeight: 700, fontSize: 12,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: step === id ? T.accent : T.textMuted,
                borderBottom: step === id ? `2px solid ${T.accent}` : '2px solid transparent',
                transition: 'all 0.15s'
              }}>{label}</button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

            {/* ─── ROOMS TAB ──────────────────────────────────────────── */}
            {step === 'rooms' && (
              <div>
                {(['Residential','Outdoor','Commercial'] as const).map(type => {
                  const list = ROOMS.filter(r => r.type === type)
                  return (
                    <div key={type} style={{ marginBottom: 24 }}>
                      <p style={{
                        fontFamily: T.fontH, fontWeight: 700, fontSize: 10,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: T.textMuted, marginBottom: 10
                      }}>{type}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                        {list.map(r => (
                          <button key={r.id}
                            onClick={() => { setRoom(r); setStep('blends') }}
                            style={{
                              background: '#fff', padding: 0, cursor: 'pointer', overflow: 'hidden',
                              borderRadius: 4, border: `1.5px solid ${room.id === r.id ? T.accent : T.border}`,
                              boxShadow: room.id === r.id ? `0 0 0 1px ${T.accent}` : 'none',
                              transition: 'all 0.15s'
                            }}>
                            <img src={r.thumb} alt={r.name} loading="lazy" crossOrigin="anonymous"
                              style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                            />
                            <p style={{
                              fontFamily: T.fontB, fontSize: 10, fontWeight: 600,
                              color: room.id === r.id ? T.accent : T.text,
                              margin: '5px 4px', textAlign: 'center', lineHeight: 1.3
                            }}>{r.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* ─── BLENDS TAB ─────────────────────────────────────────── */}
            {step === 'blends' && (
              <div>
                {/* Chip size selector */}
                <div style={{ marginBottom: 14 }}>
                  <p style={{ fontFamily: T.fontH, fontWeight: 700, fontSize: 10, letterSpacing: '0.1em',
                              textTransform: 'uppercase', color: T.textMuted, marginBottom: 8 }}>CHIP SIZE</p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[['16','1/16"'],['18','1/8"'],['14','1/4"']].map(([s,l]) => (
                      <button key={s} onClick={() => setSize(s)} style={pillStyle(size === s)}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search */}
                <div style={{ marginBottom: 10, position: 'relative' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2"
                    style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search blends…"
                    style={{
                      width: '100%', padding: '9px 12px 9px 32px', borderRadius: 4,
                      border: `1px solid ${T.border}`, background: T.bgAlt,
                      color: T.text, fontFamily: T.fontB, fontSize: 13,
                      boxSizing: 'border-box' as const
                    }}
                  />
                </div>

                {/* Collections */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {collections.map(c => (
                    <button key={c} onClick={() => setColl(c)} style={pillStyle(collection === c)}>
                      {c.replace(' Collection','').replace(' Blend','').substring(0,12)}
                    </button>
                  ))}
                </div>

                <p style={{ fontFamily: T.fontB, fontSize: 11, color: T.textMuted, margin: '0 0 10px' }}>
                  {filtered.length} blends
                </p>

                {/* Blend grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {filtered.map(b => (
                    <button key={b.id} onClick={() => setBlend(b)} style={{
                      background: '#fff', padding: 0, cursor: 'pointer', overflow: 'hidden',
                      borderRadius: 4, border: `1.5px solid ${blend.id === b.id ? T.accent : T.border}`,
                      boxShadow: blend.id === b.id ? `0 0 0 1px ${T.accent}` : 'none',
                      transition: 'border-color 0.12s'
                    }}>
                      <img src={b.img_url} alt={b.name} loading="lazy" crossOrigin="anonymous"
                        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── CUSTOMIZE TAB ──────────────────────────────────────── */}
            {step === 'customize' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Active selection preview */}
                <div style={{
                  display: 'flex', gap: 12, alignItems: 'center', padding: '12px',
                  borderRadius: 4, border: `1px solid ${T.border}`, background: T.bgAlt
                }}>
                  <img src={blend.img_url} alt={blend.name} crossOrigin="anonymous"
                    style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 4, border: `1px solid ${T.border}` }}
                  />
                  <div>
                    <p style={{ fontFamily: T.fontH, fontWeight: 700, fontSize: 14,
                                textTransform: 'uppercase', color: T.text, margin: 0 }}>{blend.name}</p>
                    <p style={{ fontFamily: T.fontB, fontSize: 12, color: T.textMuted, margin: 0 }}>{room.name}</p>
                  </div>
                </div>

                {/* Coverage slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontFamily: T.fontH, fontWeight: 700, fontSize: 11,
                                   textTransform: 'uppercase', letterSpacing: '0.08em', color: T.text }}>
                      BLEND COVERAGE
                    </label>
                    <span style={{ fontFamily: T.fontH, fontWeight: 700, fontSize: 15, color: T.accent }}>
                      {coverage}%
                    </span>
                  </div>
                  <input type="range" min={30} max={100} value={coverage}
                    onChange={e => setCoverage(Number(e.target.value))}
                    style={{ width: '100%', accentColor: T.accent }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: T.fontB,
                                fontSize: 10, color: T.textMuted, marginTop: 4 }}>
                    <span>Light</span><span>Standard</span><span>Full Broadcast</span>
                  </div>
                </div>

                {/* Re-render */}
                <button onClick={render} disabled={rendering} style={{
                  width: '100%', padding: '13px 0', borderRadius: 4,
                  background: rendering ? '#bbb' : T.accent, color: '#fff',
                  fontFamily: T.fontH, fontWeight: 700, fontSize: 12,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: 'none', cursor: rendering ? 'not-allowed' : 'pointer'
                }}>
                  {rendering ? 'RENDERING…' : '↻ RE-RENDER FLOOR'}
                </button>

                {/* Download */}
                {rendered && (
                  <button onClick={download} style={{
                    width: '100%', padding: '13px 0', borderRadius: 4,
                    background: T.text, color: '#fff',
                    fontFamily: T.fontH, fontWeight: 700, fontSize: 12,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    border: 'none', cursor: 'pointer'
                  }}>↓ DOWNLOAD IMAGE</button>
                )}

                {/* Commerce buttons */}
                <button style={{
                  width: '100%', padding: '13px 0', borderRadius: 4,
                  background: '#fff', color: T.text,
                  fontFamily: T.fontH, fontWeight: 700, fontSize: 12,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: `1.5px solid ${T.text}`, cursor: 'pointer'
                }}>ADD TO CART</button>

                <button style={{
                  width: '100%', padding: '12px 0', borderRadius: 4,
                  background: 'transparent', color: T.textMuted,
                  fontFamily: T.fontH, fontWeight: 600, fontSize: 11,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: `1px solid ${T.border}`, cursor: 'pointer'
                }}>REQUEST FREE SAMPLE</button>

                {/* Save design */}
                <form onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(()=>setSaved(false),4000) }}>
                  <p style={{ fontFamily: T.fontH, fontWeight: 700, fontSize: 10, letterSpacing: '0.1em',
                              textTransform: 'uppercase', color: T.textMuted, margin: '0 0 8px' }}>
                    SAVE DESIGN SPECS
                  </p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input type="email" value={saveEmail} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        flex: 1, padding: '9px 12px', borderRadius: 4,
                        border: `1px solid ${T.border}`, background: T.bgAlt,
                        color: T.text, fontFamily: T.fontB, fontSize: 13
                      }}
                    />
                    <button type="submit" style={{
                      padding: '9px 18px', borderRadius: 4, background: T.accent,
                      color: '#fff', fontFamily: T.fontH, fontWeight: 700, fontSize: 11,
                      letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', cursor: 'pointer'
                    }}>{saved ? '✓' : 'SEND'}</button>
                  </div>
                </form>

                {/* Change room/blend links */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setStep('rooms')} style={{
                    flex: 1, padding: '8px 0', borderRadius: 4,
                    border: `1px solid ${T.border}`, background: 'transparent',
                    color: T.textMuted, fontFamily: T.fontH, fontWeight: 600,
                    fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer'
                  }}>CHANGE ROOM</button>
                  <button onClick={() => setStep('blends')} style={{
                    flex: 1, padding: '8px 0', borderRadius: 4,
                    border: `1px solid ${T.border}`, background: 'transparent',
                    color: T.textMuted, fontFamily: T.fontH, fontWeight: 600,
                    fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer'
                  }}>CHANGE BLEND</button>
                </div>
              </div>
            )}
          </div>

          {/* ── VISUALIZE CTA (shown on rooms/blends tabs) ─────────────── */}
          {step !== 'customize' && (
            <div style={{ padding: '16px', borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
              <button onClick={() => setStep('customize')} style={{
                width: '100%', padding: '14px 0', borderRadius: 4,
                background: T.accent, color: '#fff',
                fontFamily: T.fontH, fontWeight: 700, fontSize: 13,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer'
              }}>
                VISUALIZE ON FLOOR →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
