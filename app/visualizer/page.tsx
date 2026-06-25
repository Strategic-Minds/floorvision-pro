'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ROOMS, SIZES } from '../../lib/blends'
import { ALL_BLENDS } from '../../lib/blends_data'

const CDN = 'https://cdn.floor-wiz.com'

export default function VisualizerPage() {
  const [step, setStep]           = useState(1)
  const [room, setRoom]           = useState(ROOMS[0])
  const [size, setSize]           = useState('18')
  const [blend, setBlend]         = useState(ALL_BLENDS[0])
  const [collection, setCollection] = useState('All')
  const [search, setSearch]       = useState('')
  const [coverage, setCoverage]   = useState(100)
  const [rendering, setRendering] = useState(false)
  const [rendered, setRendered]   = useState(false)
  const [customPhoto, setCustomPhoto] = useState<string|null>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const fileRef    = useRef<HTMLInputElement>(null)
  const previewRef = useRef<string>('')

  // Filtered blends
  const filtered = ALL_BLENDS.filter(b => {
    const bSized = b.id.endsWith(`-${size}`)
    const bColl  = collection === 'All' || b.collection === collection
    const bSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return bSized && bColl && bSearch
  })

  const collections = ['All', ...new Set(ALL_BLENDS.map(b => b.collection).filter(Boolean))]

  // Canvas renderer — composites room background + blend texture overlay
  const render = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setRendering(true)
    const ctx = canvas.getContext('2d')!
    canvas.width  = 1200
    canvas.height = 800

    try {
      // Load room image (full-res)
      const roomUrl = customPhoto || `${room.base_url}${coverage >= 80 ? '100' : '50'}.webp`
      const roomImg = await loadImage(roomUrl)
      ctx.drawImage(roomImg, 0, 0, 1200, 800)

      // Load blend texture
      const blendUrl = `${CDN}/shared_assets/core/latest/assets/images/blends/${blend.id}.webp`
      const blendImg = await loadImage(blendUrl)

      // Compute floor area (bottom ~45% of frame)
      const floorY = Math.round(800 * 0.52)
      const floorH = 800 - floorY

      // Create a perspective-mapped blend texture over the floor region
      ctx.save()
      ctx.globalAlpha = coverage / 100
      ctx.globalCompositeOperation = 'multiply'

      // Tile the blend across floor area with subtle perspective scale
      const tileW = 200, tileH = 200
      for (let y = floorY; y < 800; y += tileH * 0.8) {
        for (let x = -tileW; x < 1300; x += tileW) {
          const progress = (y - floorY) / floorH
          const scale = 0.6 + progress * 0.4
          ctx.drawImage(blendImg, x, y, tileW * scale, tileH * scale)
        }
      }
      ctx.restore()

      // Screen blend for realism
      ctx.save()
      ctx.globalAlpha = (coverage / 100) * 0.35
      ctx.globalCompositeOperation = 'screen'
      for (let y = floorY; y < 800; y += 160) {
        for (let x = -150; x < 1300; x += 180) {
          const progress = (y - floorY) / floorH
          const scale = 0.5 + progress * 0.5
          ctx.drawImage(blendImg, x, y, 170 * scale, 160 * scale)
        }
      }
      ctx.restore()

      // Watermark
      ctx.save()
      ctx.font = 'bold 14px Barlow Condensed, sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.textAlign = 'right'
      ctx.fillText('FloorVision Pro — Powered by XPS', 1185, 790)
      ctx.restore()

      setRendered(true)
      previewRef.current = canvas.toDataURL('image/jpeg', 0.92)
    } catch (e) {
      console.error('Render error:', e)
      // Fallback: show blend image full-screen
      ctx.fillStyle = '#1A1A1A'
      ctx.fillRect(0, 0, 1200, 800)
      try {
        const img = await loadImage(`${CDN}/shared_assets/core/latest/assets/images/blends/${blend.id}.webp`)
        ctx.drawImage(img, 0, 0, 1200, 800)
      } catch {}
      setRendered(true)
    }
    setRendering(false)
  }, [room, blend, coverage, customPhoto, size])

  function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
      setTimeout(() => reject(new Error('timeout')), 8000)
    })
  }

  const downloadResult = () => {
    const a = document.createElement('a')
    a.href = previewRef.current || canvasRef.current?.toDataURL('image/jpeg',0.92) || ''
    a.download = `floorvision-${blend.name.replace(/\s+/g,'-').toLowerCase()}-${room.name.toLowerCase()}.jpg`
    a.click()
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      setCustomPhoto(ev.target?.result as string)
      setStep(3)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (step === 3) render()
  }, [step, render])

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop:80, paddingBottom:0 }}>
        <div className="container" style={{ paddingTop:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16, marginBottom:24 }}>
            <div>
              <div className="label" style={{ marginBottom:8 }}>Interactive Floor Visualizer</div>
              <h1 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:'clamp(32px,5vw,56px)', textTransform:'uppercase', lineHeight:0.92 }}>
                SEE YOUR <span className="gold-grad">DREAM FLOOR</span>
              </h1>
              <p style={{ color:'rgba(240,237,232,0.45)', fontSize:15, marginTop:8 }}>
                451 real XPS blends · 26 room environments · Upload your own photo
              </p>
            </div>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <button onClick={() => fileRef.current?.click()} className="btn-outline" style={{ fontSize:14, padding:'10px 20px' }}>
                📷 Upload My Photo
              </button>
              {rendered && (
                <button onClick={downloadResult} className="btn-primary" style={{ fontSize:14, padding:'10px 20px' }}>
                  ↓ Download Result
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display:'none' }}/>
          </div>

          {/* Steps */}
          <div style={{ display:'flex', gap:0, marginBottom:0 }}>
            {['Choose Room','Pick Blend','View Result'].map((s,i) => (
              <button key={s} onClick={() => setStep(i+1)}
                style={{
                  flex:1, padding:'10px 0', border:'none', cursor:'pointer',
                  background: step===i+1 ? '#C9A84C' : step>i+1 ? 'rgba(201,168,76,0.15)' : 'var(--surface)',
                  color: step===i+1 ? '#0A0A0B' : step>i+1 ? '#C9A84C' : 'rgba(240,237,232,0.4)',
                  fontFamily:'Barlow Condensed', fontWeight:900, fontSize:14, letterSpacing:'0.1em', textTransform:'uppercase',
                  borderBottom: step===i+1 ? '2px solid #C9A84C' : '2px solid var(--border)',
                  transition:'all 0.2s',
                }}>
                {i+1}. {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding:'0 0 80px' }}>
        <div className="container">

          {/* STEP 1 — Room */}
          {step === 1 && (
            <div style={{ paddingTop:32 }}>
              <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:28, textTransform:'uppercase', marginBottom:8 }}>
                Choose Your Room
              </h2>
              <p style={{ color:'rgba(240,237,232,0.45)', fontSize:14, marginBottom:24 }}>
                Select a room preset — or upload your own photo above
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16 }}>
                {ROOMS.map(r => (
                  <button key={r.id} onClick={() => { setRoom(r); setCustomPhoto(null); setStep(2) }}
                    style={{
                      border: `2px solid ${room.id===r.id ? '#C9A84C' : 'var(--border)'}`,
                      borderRadius:10, overflow:'hidden', cursor:'pointer',
                      background:'var(--surface)', transition:'all 0.2s',
                      boxShadow: room.id===r.id ? '0 0 24px rgba(201,168,76,0.25)' : 'none',
                      textAlign:'left',
                    }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.thumb} alt={r.name}
                      style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', display:'block' }}
                      loading="lazy"
                    />
                    <div style={{ padding:'10px 14px' }}>
                      <div style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:16, textTransform:'uppercase', color: room.id===r.id ? '#C9A84C' : 'var(--text)' }}>{r.name}</div>
                      <div style={{ fontSize:11, color:'rgba(240,237,232,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:2 }}>{r.type}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop:32, textAlign:'center' }}>
                <button onClick={() => setStep(2)} className="btn-primary">
                  Continue with {room.name} →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Blend picker */}
          {step === 2 && (
            <div style={{ paddingTop:32 }}>
              <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap', marginBottom:24 }}>
                <div>
                  <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:28, textTransform:'uppercase', marginBottom:4 }}>
                    Choose Blend
                  </h2>
                  <p style={{ color:'rgba(240,237,232,0.45)', fontSize:14 }}>
                    {filtered.length} blends · Real FloorWiz CDN textures
                  </p>
                </div>
                <div style={{ marginLeft:'auto', display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
                  {/* Size selector */}
                  <div style={{ display:'flex', gap:4 }}>
                    {SIZES.map(s => (
                      <button key={s.id} onClick={() => setSize(s.id)}
                        style={{
                          fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, letterSpacing:'0.08em',
                          padding:'6px 12px', borderRadius:5, cursor:'pointer', border:'1px solid',
                          background: size===s.id ? '#C9A84C' : 'transparent',
                          color:       size===s.id ? '#0A0A0B' : 'rgba(240,237,232,0.5)',
                          borderColor: size===s.id ? '#C9A84C' : 'rgba(255,255,255,0.1)',
                        }} title={s.desc}>{s.label}</button>
                    ))}
                  </div>
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search blends..."
                    style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:6, color:'var(--text)', fontSize:14, padding:'8px 14px', width:180, outline:'none', fontFamily:'Barlow' }}
                  />
                </div>
              </div>

              {/* Collection tabs */}
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:20, overflowX:'auto' }}>
                {collections.map(c => (
                  <button key={c} onClick={() => setCollection(c)}
                    style={{
                      fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, letterSpacing:'0.1em',
                      textTransform:'uppercase', padding:'7px 14px', borderRadius:5, cursor:'pointer',
                      border:'1px solid', whiteSpace:'nowrap',
                      background: collection===c ? '#C9A84C' : 'transparent',
                      color:       collection===c ? '#0A0A0B' : 'rgba(240,237,232,0.5)',
                      borderColor: collection===c ? '#C9A84C' : 'rgba(255,255,255,0.1)',
                    }}>{c === 'All' ? 'All Collections' : c}</button>
                ))}
              </div>

              {/* Blend grid */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10, maxHeight:520, overflowY:'auto', paddingRight:4 }}>
                {filtered.slice(0, 200).map(b => (
                  <button key={b.id} onClick={() => { setBlend(b); setStep(3) }}
                    style={{
                      border: `2px solid ${blend.id===b.id ? '#C9A84C' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius:8, overflow:'hidden', cursor:'pointer', background:'var(--surface)',
                      transition:'all 0.15s', padding:0, textAlign:'left',
                      boxShadow: blend.id===b.id ? '0 0 16px rgba(201,168,76,0.3)' : 'none',
                    }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.img_url} alt={b.name}
                      style={{ width:'100%', aspectRatio:'1', objectFit:'cover', display:'block' }}
                      loading="lazy"
                    />
                    <div style={{ padding:'6px 8px 8px' }}>
                      <div style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, textTransform:'uppercase', lineHeight:1.2, color: blend.id===b.id ? '#C9A84C' : 'var(--text)' }}>{b.name}</div>
                    </div>
                  </button>
                ))}
              </div>
              {filtered.length > 200 && (
                <p style={{ marginTop:12, fontSize:13, color:'rgba(240,237,232,0.4)', textAlign:'center' }}>
                  Showing 200 of {filtered.length} — use search to narrow
                </p>
              )}
            </div>
          )}

          {/* STEP 3 — Result */}
          {step === 3 && (
            <div style={{ paddingTop:32 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:24 }}>
                <div>
                  <div style={{ position:'relative', borderRadius:12, overflow:'hidden', border:'1px solid var(--border)', background:'#111', aspectRatio:'3/2' }}>
                    <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block', objectFit:'contain' }}/>
                    {rendering && (
                      <div style={{
                        position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                        background:'rgba(10,10,11,0.8)', gap:12,
                      }}>
                        <div style={{ width:40, height:40, border:'3px solid var(--border)', borderTopColor:'#C9A84C', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
                        <div style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:15, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(240,237,232,0.7)' }}>
                          Rendering...
                        </div>
                      </div>
                    )}
                  </div>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {/* Selected blend info */}
                  <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={blend.img_url} alt={blend.name} style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover' }}/>
                    <div style={{ padding:'14px 16px' }}>
                      <div className="label" style={{ marginBottom:6 }}>{blend.collection}</div>
                      <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:22, textTransform:'uppercase', marginBottom:6 }}>{blend.name}</h3>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:12 }}>
                        {blend.tags.slice(0,4).map(t => (
                          <span key={t} style={{ fontSize:10, fontFamily:'Barlow Condensed', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', padding:'2px 7px', borderRadius:3, background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)', color:'rgba(201,168,76,0.8)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Coverage slider */}
                  <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'14px 16px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:13, letterSpacing:'0.08em', textTransform:'uppercase' }}>Blend Coverage</span>
                      <span style={{ color:'#C9A84C', fontFamily:'Barlow Condensed', fontWeight:900, fontSize:18 }}>{coverage}%</span>
                    </div>
                    <input type="range" min={20} max={100} step={5} value={coverage}
                      onChange={e => setCoverage(+e.target.value)}
                      style={{ width:'100%', accentColor:'#C9A84C' }}
                    />
                  </div>

                  {/* Change controls */}
                  <button onClick={() => setStep(1)} className="btn-outline" style={{ fontSize:13 }}>← Change Room</button>
                  <button onClick={() => setStep(2)} className="btn-outline" style={{ fontSize:13 }}>← Change Blend</button>
                  <button onClick={render} className="btn-outline" style={{ fontSize:13 }}>↺ Re-render</button>

                  {/* CTAs */}
                  {rendered && (
                    <button onClick={downloadResult} className="btn-primary" style={{ justifyContent:'center', fontSize:15 }}>
                      ↓ Download Image
                    </button>
                  )}
                  {blend.eCommerceLink && (
                    <a href={blend.eCommerceLink} target="_blank" rel="noopener noreferrer"
                      className="btn-primary" style={{ justifyContent:'center', fontSize:13, textDecoration:'none' }}>
                      Buy This Blend →
                    </a>
                  )}
                  <a href="/request-sample" className="btn-outline" style={{ justifyContent:'center', fontSize:13, textDecoration:'none' }}>Request Free Sample</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
