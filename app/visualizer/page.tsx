'use client'
import { useState } from 'react'
import { COLOR_CHARTS, ROOM_TYPES } from '../../lib/catalog'

const FLOOR_COLORS: { id: string; name: string; hex: string; category: string }[] = [
  { id:'charcoal-granite',  name:'Charcoal Granite',  hex:'#3C3C3C', category:'flake' },
  { id:'arctic-white',      name:'Arctic White',       hex:'#E8E4DC', category:'flake' },
  { id:'sandstone',         name:'Sandstone',          hex:'#C4A97A', category:'flake' },
  { id:'slate-blue',        name:'Slate Blue',         hex:'#4A5568', category:'flake' },
  { id:'deep-espresso',     name:'Deep Espresso',      hex:'#2D1F14', category:'flake' },
  { id:'battleship-grey',   name:'Battleship Grey',    hex:'#6B7280', category:'flake' },
  { id:'copper-metallic',   name:'Copper Metallic',    hex:'#A0522D', category:'metallic' },
  { id:'silver-mirror',     name:'Silver Mirror',      hex:'#C0C0C0', category:'metallic' },
  { id:'obsidian-black',    name:'Obsidian Black',     hex:'#1A1A1A', category:'metallic' },
  { id:'ocean-pearl',       name:'Ocean Pearl',        hex:'#6B9BB8', category:'metallic' },
  { id:'champagne-gold',    name:'Champagne Gold',     hex:'#C9A84C', category:'metallic' },
  { id:'moonstone',         name:'Moonstone',          hex:'#D4D0C8', category:'quartz' },
  { id:'terracotta',        name:'Terracotta',         hex:'#C07850', category:'quartz' },
  { id:'coastal-cream',     name:'Coastal Cream',      hex:'#E8DEC8', category:'quartz' },
]

export default function VisualizerPage() {
  const [room, setRoom] = useState('garage')
  const [color, setColor] = useState(FLOOR_COLORS[0])
  const [catFilter, setCatFilter] = useState('all')
  const [step, setStep] = useState(1)

  const filteredColors = catFilter === 'all' ? FLOOR_COLORS : FLOOR_COLORS.filter(c => c.category === catFilter)

  return (
    <>
      <section style={{ paddingTop:100, paddingBottom:32, borderBottom:'1px solid var(--border)' }}>
        <div className="container">
          <div className="label" style={{ marginBottom:10 }}>Interactive Floor Visualizer</div>
          <h1 className="section-title">SEE IT<br/><span className="gold-grad">IN YOUR SPACE</span></h1>
        </div>
      </section>

      <section style={{ padding:'48px 0 80px' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:32 }}>

            {/* ── Preview Panel ── */}
            <div>
              {/* Step progress */}
              <div style={{ display:'flex', gap:8, marginBottom:24 }}>
                {['Room Type','Floor Color','View Result'].map((s,i) => (
                  <div key={s} style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{
                      width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:'Barlow Condensed', fontWeight:900, fontSize:14,
                      background: step > i+1 ? '#C9A84C' : step === i+1 ? '#C9A84C' : 'var(--surface-2)',
                      color: step >= i+1 ? '#0A0A0B' : 'rgba(240,237,232,0.4)',
                      border: step === i+1 ? 'none' : '1px solid var(--border)',
                    }}>{i+1}</div>
                    <span style={{ fontSize:13, color: step===i+1 ? 'var(--text)' : 'rgba(240,237,232,0.4)', fontFamily:'Barlow Condensed', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' }}>{s}</span>
                    {i < 2 && <span style={{ color:'var(--border)', margin:'0 4px' }}>→</span>}
                  </div>
                ))}
              </div>

              {/* Floor preview */}
              <div style={{
                position:'relative', borderRadius:16, overflow:'hidden',
                border:'1px solid var(--border)', background:'var(--surface-2)',
                aspectRatio:'16/9',
              }}>
                {/* Room BG placeholder */}
                <div style={{
                  position:'absolute', inset:0,
                  background:`linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 40%, ${color.hex}88 40%, ${color.hex} 100%)`,
                }}/>
                {/* Floor color overlay */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0, height:'60%',
                  background:`linear-gradient(to bottom, ${color.hex}CC, ${color.hex})`,
                  borderRadius:'0 0 16px 16px',
                }}/>
                {/* Reflective shine */}
                <div style={{
                  position:'absolute', bottom:'20%', left:'10%', right:'10%', height:'2px',
                  background:'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                }}/>
                {/* Room label */}
                <div style={{
                  position:'absolute', top:16, left:16,
                  background:'rgba(10,10,11,0.7)', backdropFilter:'blur(8px)',
                  border:'1px solid rgba(255,255,255,0.1)', borderRadius:6,
                  padding:'6px 14px',
                  fontFamily:'Barlow Condensed', fontWeight:700, fontSize:13, letterSpacing:'0.1em', textTransform:'uppercase',
                  color:'rgba(240,237,232,0.8)',
                }}>
                  {ROOM_TYPES.find(r=>r.id===room)?.label || room}
                </div>
                {/* Color label */}
                <div style={{
                  position:'absolute', bottom:16, right:16,
                  background:'rgba(10,10,11,0.8)', backdropFilter:'blur(8px)',
                  border:'1px solid rgba(201,168,76,0.3)', borderRadius:6,
                  padding:'8px 16px', display:'flex', alignItems:'center', gap:10,
                }}>
                  <div style={{ width:14, height:14, borderRadius:3, background:color.hex, border:'1px solid rgba(255,255,255,0.2)' }}/>
                  <span style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:14, textTransform:'uppercase', letterSpacing:'0.08em' }}>{color.name}</span>
                </div>
                {/* Category badge */}
                <div style={{
                  position:'absolute', bottom:16, left:16,
                  background:'rgba(201,168,76,0.15)', border:'1px solid rgba(201,168,76,0.3)',
                  borderRadius:4, padding:'4px 10px',
                  fontFamily:'Barlow Condensed', fontWeight:700, fontSize:11, letterSpacing:'0.12em',
                  color:'#C9A84C', textTransform:'uppercase',
                }}>{color.category}</div>
              </div>

              {/* Action buttons */}
              <div style={{ display:'flex', gap:12, marginTop:20 }}>
                <a href="/request-sample" className="btn-primary" style={{ flex:1, justifyContent:'center' }}>
                  Request This Color →
                </a>
                <a href="/color-charts" className="btn-outline">
                  View Full Chart
                </a>
              </div>
            </div>

            {/* ── Controls Panel ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

              {/* Room selector */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:20 }}>
                <div className="label" style={{ marginBottom:14 }}>1. Choose Room</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {ROOM_TYPES.map(r => (
                    <button key={r.id} onClick={() => { setRoom(r.id); if(step<2) setStep(2) }}
                      style={{
                        background: room===r.id ? 'rgba(201,168,76,0.15)' : 'var(--surface-2)',
                        border: `1px solid ${room===r.id ? '#C9A84C' : 'var(--border)'}`,
                        borderRadius:8, padding:'10px 12px', cursor:'pointer', textAlign:'left',
                        color: room===r.id ? '#C9A84C' : 'rgba(240,237,232,0.6)',
                        fontFamily:'Barlow Condensed', fontWeight:700, fontSize:13,
                        letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.2s',
                      }}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color selector */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:20 }}>
                <div className="label" style={{ marginBottom:10 }}>2. Choose Color</div>
                <div style={{ display:'flex', gap:6, marginBottom:12, flexWrap:'wrap' }}>
                  {['all','flake','metallic','quartz'].map(cat => (
                    <button key={cat} onClick={() => setCatFilter(cat)}
                      style={{
                        fontFamily:'Barlow Condensed', fontWeight:700, fontSize:11,
                        letterSpacing:'0.1em', textTransform:'uppercase',
                        padding:'5px 12px', borderRadius:4, cursor:'pointer', border:'1px solid',
                        background: catFilter===cat ? '#C9A84C' : 'transparent',
                        color:       catFilter===cat ? '#0A0A0B' : 'rgba(240,237,232,0.45)',
                        borderColor: catFilter===cat ? '#C9A84C' : 'rgba(255,255,255,0.1)',
                      }}>{cat}</button>
                  ))}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:6 }}>
                  {filteredColors.map(c => (
                    <button key={c.id} onClick={() => { setColor(c); setStep(3) }}
                      title={c.name}
                      style={{
                        aspectRatio:'1', background:c.hex, borderRadius:6, cursor:'pointer',
                        border: color.id===c.id ? '2px solid #C9A84C' : '2px solid transparent',
                        boxShadow: color.id===c.id ? '0 0 12px rgba(201,168,76,0.5)' : 'none',
                        transition:'all 0.15s',
                      }}/>
                  ))}
                </div>
                <div style={{ marginTop:12, padding:'10px 14px', background:'var(--surface-2)', borderRadius:8, display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:20, height:20, background:color.hex, borderRadius:4, border:'1px solid rgba(255,255,255,0.2)', flexShrink:0 }}/>
                  <div>
                    <div style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:15, textTransform:'uppercase' }}>{color.name}</div>
                    <div style={{ fontSize:11, color:'rgba(240,237,232,0.4)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{color.category}</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div style={{ background:'rgba(201,168,76,0.07)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:12, padding:20, textAlign:'center' }}>
                <div style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:18, marginBottom:8, textTransform:'uppercase' }}>
                  Like what you see?
                </div>
                <p style={{ fontSize:13, color:'rgba(240,237,232,0.5)', marginBottom:14, lineHeight:1.5 }}>
                  Request a free physical sample chip — ships within 48 hours.
                </p>
                <a href="/request-sample" className="btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:13 }}>
                  Get Free Sample →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
