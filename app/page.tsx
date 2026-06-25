import Link from 'next/link'

export default function HomePage() {
  const collections = [
    { name: 'Insignia Series', count: '40+ blends', color: '#1a3a5c', img: 'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/xps/XPS-FB201-18.webp' },
    { name: 'Torginol Signature', count: '80+ blends', color: '#2d4a22', img: 'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/xps/XPS-FB205-18.webp' },
    { name: 'Hybrid Stone', count: '30+ blends', color: '#5c3a1a', img: 'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/xps/XPS-FB209-18.webp' },
    { name: 'UV Collection', count: '25+ blends', color: '#3a1a5c', img: 'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/xps/XPS-FB213-18.webp' },
  ]

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>

      {/* ── HERO ── */}
      <section style={{
        background: '#231F20',
        padding: '80px 0 72px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/static/new/residential-garage-07_background.webp)`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.25
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{
              fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 12,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--color-accent)', marginBottom: 16
            }}>FLOOR DESIGN VISUALIZER</p>
            <h1 style={{ color: '#fff', marginBottom: 24, fontSize: 'clamp(32px, 5vw, 56px)' }}>
              See It Before<br />You Install It
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginBottom: 36, maxWidth: 480 }}>
              451 real XPS blends. 16 room environments. Upload your own photo and see exactly what your floor will look like.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/visualizer" className="btn btn-red" style={{ fontSize: 14 }}>
                OPEN VISUALIZER
              </Link>
              <Link href="/color-charts" className="btn" style={{
                background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14,
                border: '1px solid rgba(255,255,255,0.25)'
              }}>
                VIEW COLOR CHARTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: 'var(--color-accent)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
          {[
            ['451', 'REAL BLENDS'],
            ['16', 'ROOM ENVIRONMENTS'],
            ['3', 'CHIP SIZES'],
            ['100%', 'FREE TO USE'],
          ].map(([num, label]) => (
            <div key={label} style={{
              flex: 1, textAlign: 'center', padding: '0 24px',
              borderRight: '1px solid rgba(255,255,255,0.25)'
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 28, color: '#fff' }}>{num}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="label" style={{ marginBottom: 8 }}>HOW IT WORKS</p>
            <h2>Three Steps to Your Perfect Floor</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '01', title: 'CHOOSE A ROOM', body: 'Pick from 16 professionally photographed environments — garage, bedroom, living room, kitchen, and more.' },
              { n: '02', title: 'SELECT YOUR BLEND', body: 'Browse 451 real XPS flake blends. Filter by collection, chip size, or search by name.' },
              { n: '03', title: 'VISUALIZE & DOWNLOAD', body: 'See your chosen blend rendered on the real floor. Download the image or save your design specs.' },
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--color-accent)', margin: '0 auto 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff'
                }}>{s.n}</div>
                <h3 style={{ fontSize: 15, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/visualizer" className="btn btn-red">LAUNCH VISUALIZER →</Link>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section style={{ padding: '72px 0', background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <p className="label" style={{ marginBottom: 8 }}>BROWSE BY COLLECTION</p>
            <h2>451 Blends. Endless Possibilities.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {collections.map(c => (
              <Link key={c.name} href="/visualizer" className="product-card" style={{ display: 'block' }}>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                  <img src={c.img} alt={c.name} crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '16px' }}>
                  <p style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 13,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                    color: 'var(--color-text)', marginBottom: 4
                  }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{c.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: '#231F20', padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: 16 }}>Ready To Design Your Floor?</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, marginBottom: 32 }}>
            Free to use. No account required. Results in seconds.
          </p>
          <Link href="/visualizer" className="btn btn-red" style={{ fontSize: 15, padding: '14px 40px' }}>
            START VISUALIZING NOW →
          </Link>
        </div>
      </section>

    </div>
  )
}
