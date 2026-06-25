import { COLOR_CHARTS, STATS } from '../lib/catalog'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        minHeight:'100vh', display:'flex', alignItems:'center',
        paddingTop:64, position:'relative', overflow:'hidden',
      }}>
        {/* BG gradient mesh */}
        <div style={{
          position:'absolute', inset:0, zIndex:0,
          background:`
            radial-gradient(ellipse 80% 60% at 60% 20%, rgba(201,168,76,0.1), transparent),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(201,168,76,0.06), transparent),
            #0A0A0B`,
        }}/>
        {/* Grid lines */}
        <div style={{
          position:'absolute', inset:0, zIndex:0, opacity:0.04,
          backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize:'60px 60px',
        }}/>

        <div className="container" style={{ position:'relative', zIndex:1, padding:'80px 0' }}>
          <div className="label" style={{ marginBottom:20 }}>America&#39;s #1 Epoxy Color System</div>

          <h1 className="hero-title" style={{ maxWidth:900, marginBottom:24 }}>
            VISUALIZE YOUR
            <br/>
            <span className="gold-grad">DREAM FLOOR</span>
            <br/>
            BEFORE YOU POUR
          </h1>

          <p style={{ fontSize:20, color:'rgba(240,237,232,0.55)', maxWidth:520, lineHeight:1.65, marginBottom:40 }}>
            Browse 58+ professional colorways across 15 collections. Real color charts from XPS &amp; Torginol — shipped to your door.
          </p>

          <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:72 }}>
            <a href="/color-charts" className="btn-primary">Browse Color Charts</a>
            <a href="/visualizer" className="btn-outline">Open Visualizer</a>
          </div>

          {/* Stats row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, maxWidth:640 }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:40, color:'#C9A84C', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:13, color:'rgba(240,237,232,0.45)', marginTop:4, letterSpacing:'0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS GRID ── */}
      <section style={{ padding:'100px 0' }}>
        <div className="container">
          <div style={{ marginBottom:56 }}>
            <div className="label" style={{ marginBottom:12 }}>The Full Catalog</div>
            <h2 className="section-title">15 COLLECTIONS.<br/><span className="gold-grad">58+ COLORWAYS.</span></h2>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:20 }}>
            {COLOR_CHARTS.slice(0,12).map(chart => (
              <ChartCard key={chart.id} chart={chart} />
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:48 }}>
            <a href="/color-charts" className="btn-outline">View All 15 Collections →</a>
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <section style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'80px 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:48 }}>
            {[
              { icon:'◈', title:'REAL PRODUCT IMAGES', desc:'Every color chart is the actual product — no CGI, no mockups. What you see is what ships.' },
              { icon:'◉', title:'XPS + TORGINOL SOURCED', desc:'Direct from Xtreme Polishing Systems and Torginol — America\'s two premier flake manufacturers.' },
              { icon:'◎', title:'SAMPLE TO DOOR IN 48HRS', desc:'Request physical samples of any colorway and we ship priority mail — so you verify before you buy.' },
            ].map(f => (
              <div key={f.title}>
                <div style={{ fontSize:28, color:'#C9A84C', marginBottom:16 }}>{f.icon}</div>
                <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:20, letterSpacing:'0.06em', marginBottom:10 }}>{f.title}</h3>
                <p style={{ color:'rgba(240,237,232,0.5)', fontSize:15, lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'100px 0', textAlign:'center' }}>
        <div className="container">
          <div className="label" style={{ marginBottom:16 }}>Ready to Choose?</div>
          <h2 className="section-title" style={{ marginBottom:24 }}>GET A FREE<br/><span className="gold-grad">COLOR SAMPLE</span></h2>
          <p style={{ color:'rgba(240,237,232,0.5)', fontSize:18, maxWidth:480, margin:'0 auto 40px' }}>
            Pick any colorway, request a free physical sample chip. Ships within 48 hours anywhere in the US.
          </p>
          <a href="/request-sample" className="btn-primary" style={{ fontSize:17, padding:'16px 40px' }}>
            Request Free Sample →
          </a>
        </div>
      </section>
    </>
  )
}

function ChartCard({ chart }: { chart: typeof COLOR_CHARTS[0] }) {
  return (
    <a href={`/color-charts#${chart.id}`} className="card" style={{ textDecoration:'none', display:'block' }}>
      <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', background:'var(--surface-2)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={chart.driveUrl} alt={chart.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} loading="lazy" />
        <div style={{
          position:'absolute', top:12, left:12,
          background:'rgba(10,10,11,0.75)', backdropFilter:'blur(8px)',
          border:'1px solid rgba(255,255,255,0.1)', borderRadius:4,
          padding:'4px 10px',
          fontFamily:'Barlow Condensed', fontWeight:700, fontSize:11, letterSpacing:'0.12em',
          color:'#C9A84C', textTransform:'uppercase',
        }}>
          {chart.category}
        </div>
      </div>
      <div style={{ padding:'20px 20px 24px' }}>
        <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:20, marginBottom:8, textTransform:'uppercase' }}>{chart.name}</h3>
        <p style={{ fontSize:13, color:'rgba(240,237,232,0.45)', lineHeight:1.6, marginBottom:14 }}>{chart.description}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {chart.tags.slice(0,3).map(tag => (
            <span key={tag} style={{
              background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)',
              color:'rgba(201,168,76,0.8)', fontSize:11, fontFamily:'Barlow Condensed',
              fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
              padding:'3px 8px', borderRadius:3,
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </a>
  )
}
