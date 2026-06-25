import { COLOR_CHARTS } from '../../lib/catalog'

const GALLERY_ITEMS = [
  ...COLOR_CHARTS.map(c => ({ ...c, type: 'chart' as const })),
]

export default function GalleryPage() {
  return (
    <>
      <section style={{ paddingTop:120, paddingBottom:64, borderBottom:'1px solid var(--border)' }}>
        <div className="container">
          <div className="label" style={{ marginBottom:12 }}>Project Gallery</div>
          <h1 className="section-title">REAL FLOORS.<br/><span className="gold-grad">REAL RESULTS.</span></h1>
          <p style={{ color:'rgba(240,237,232,0.5)', fontSize:18, maxWidth:500, marginTop:16 }}>
            Every color shown here is a real product chart — not a render. What you see is what you get.
          </p>
        </div>
      </section>

      <section style={{ padding:'64px 0 100px' }}>
        <div className="container">
          {/* Masonry-style grid */}
          <div style={{ columns:'3 300px', gap:16 }}>
            {GALLERY_ITEMS.map((item, i) => (
              <div key={item.id} style={{
                breakInside:'avoid', marginBottom:16,
                border:'1px solid var(--border)', borderRadius:12, overflow:'hidden',
                background:'var(--surface)', transition:'border-color 0.2s',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.driveUrl}
                  alt={item.name}
                  style={{ width:'100%', display:'block' }}
                  loading="lazy"
                />
                <div style={{ padding:'14px 16px 18px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                    <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:17, textTransform:'uppercase' }}>{item.name}</h3>
                    <span style={{
                      background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)',
                      color:'#C9A84C', fontSize:10, fontFamily:'Barlow Condensed', fontWeight:700,
                      letterSpacing:'0.12em', textTransform:'uppercase', padding:'3px 8px', borderRadius:3,
                      flexShrink:0, marginLeft:8,
                    }}>{item.category}</span>
                  </div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {item.tags.slice(0,2).map(t => (
                      <span key={t} style={{ fontSize:11, color:'rgba(240,237,232,0.35)', fontFamily:'Barlow Condensed', letterSpacing:'0.06em' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:56 }}>
            <a href="/request-sample" className="btn-primary" style={{ fontSize:17, padding:'16px 48px' }}>
              Request Any Sample Free →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
