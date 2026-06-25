'use client'
import { useState } from 'react'
import { COLOR_CHARTS } from '../../lib/catalog'

export default function RequestSamplePage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', city:'', state:'', zip:'', color:'', notes:'' })
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(prev => ({...prev, [k]: e.target.value}))

  if (submitted) return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:64 }}>
      <div style={{ textAlign:'center', maxWidth:520 }}>
        <div style={{ fontSize:48, marginBottom:24 }}>✓</div>
        <h1 style={{ fontFamily:'Barlow Condensed', fontWeight:900, fontSize:48, textTransform:'uppercase', marginBottom:16 }}>
          SAMPLE <span style={{ color:'#C9A84C' }}>REQUESTED</span>
        </h1>
        <p style={{ color:'rgba(240,237,232,0.55)', fontSize:18, lineHeight:1.65, marginBottom:32 }}>
          Your free color sample is on its way. Expect it within 48–72 hours. We&#39;ll email your tracking number shortly.
        </p>
        <a href="/color-charts" className="btn-outline">Browse More Colors →</a>
      </div>
    </section>
  )

  return (
    <>
      <section style={{ paddingTop:120, paddingBottom:64, borderBottom:'1px solid var(--border)' }}>
        <div className="container">
          <div className="label" style={{ marginBottom:12 }}>Free Physical Samples</div>
          <h1 className="section-title">REQUEST A<br/><span className="gold-grad">FREE SAMPLE</span></h1>
          <p style={{ color:'rgba(240,237,232,0.5)', fontSize:18, maxWidth:480, marginTop:16 }}>
            Pick any colorway. We ship a real physical sample chip to your door — free, within 48 hours.
          </p>
        </div>
      </section>

      <section style={{ padding:'64px 0 100px' }}>
        <div className="container" style={{ maxWidth:720 }}>
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
            style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:48 }}>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
              {([['name','Full Name','text',true],['email','Email Address','email',true],
                 ['phone','Phone Number','tel',false],['zip','ZIP Code','text',true]] as const).map(([k,label,type,req]) => (
                <div key={k}>
                  <label style={{ display:'block', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(240,237,232,0.5)', marginBottom:8 }}>
                    {label}{req && <span style={{ color:'#C9A84C' }}> *</span>}
                  </label>
                  <input required={req} type={type} value={form[k as keyof typeof form]} onChange={set(k as keyof typeof form)}
                    style={{ width:'100%', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', fontSize:15, padding:'12px 16px', outline:'none', fontFamily:'Barlow' }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(240,237,232,0.5)', marginBottom:8 }}>
                Street Address <span style={{ color:'#C9A84C' }}>*</span>
              </label>
              <input required value={form.address} onChange={set('address')}
                style={{ width:'100%', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', fontSize:15, padding:'12px 16px', outline:'none', fontFamily:'Barlow' }}
              />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:20, marginBottom:20 }}>
              <div>
                <label style={{ display:'block', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(240,237,232,0.5)', marginBottom:8 }}>City <span style={{ color:'#C9A84C' }}>*</span></label>
                <input required value={form.city} onChange={set('city')}
                  style={{ width:'100%', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', fontSize:15, padding:'12px 16px', outline:'none', fontFamily:'Barlow' }}
                />
              </div>
              <div>
                <label style={{ display:'block', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(240,237,232,0.5)', marginBottom:8 }}>State</label>
                <input value={form.state} onChange={set('state')} maxLength={2}
                  style={{ width:80, background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', fontSize:15, padding:'12px 16px', outline:'none', fontFamily:'Barlow', textTransform:'uppercase' }}
                />
              </div>
            </div>

            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(240,237,232,0.5)', marginBottom:8 }}>
                Choose Colorway <span style={{ color:'#C9A84C' }}>*</span>
              </label>
              <select required value={form.color} onChange={set('color')}
                style={{ width:'100%', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:8, color: form.color ? 'var(--text)' : 'rgba(240,237,232,0.35)', fontSize:15, padding:'12px 16px', outline:'none', fontFamily:'Barlow' }}>
                <option value="">Select a collection...</option>
                {COLOR_CHARTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div style={{ marginBottom:32 }}>
              <label style={{ display:'block', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(240,237,232,0.5)', marginBottom:8 }}>
                Project Notes (optional)
              </label>
              <textarea value={form.notes} onChange={set('notes')} rows={3}
                placeholder="Garage, 2-car, roughly 400 sq ft..."
                style={{ width:'100%', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', fontSize:15, padding:'12px 16px', outline:'none', resize:'vertical', fontFamily:'Barlow' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:17, padding:'16px' }}>
              Request Free Sample →
            </button>

            <p style={{ textAlign:'center', marginTop:16, fontSize:13, color:'rgba(240,237,232,0.3)' }}>
              Free shipping. No credit card. Ships within 48 hours.
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
