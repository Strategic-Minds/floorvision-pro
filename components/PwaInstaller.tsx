'use client'
import { useEffect, useState } from 'react'

export default function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event & { prompt: () => void; userChoice: Promise<{outcome:string}> } | null>(null)
  const [installed, setInstalled] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    // Detect iOS
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) { setInstalled(true); return }

    if (isIos) { setSupported(true); return }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as Event & { prompt: () => void; userChoice: Promise<{outcome:string}> })
      setSupported(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => setInstalled(true))
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setInstalled(true)
    setDeferredPrompt(null)
  }

  if (installed) return (
    <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'rgba(240,237,232,0.5)' }}>
      <span style={{ color:'#4ADE80' }}>✓</span> App Installed
    </div>
  )

  if (!supported) return null

  const isIos = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)

  return (
    <div style={{ position:'relative' }}>
      <button onClick={deferredPrompt ? install : undefined}
        className="btn-primary"
        style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 24px', fontSize:14 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2v14M5 9l7 7 7-7"/><path d="M3 20h18"/>
        </svg>
        Install App
      </button>
      {isIos && (
        <div style={{
          position:'absolute', bottom:'calc(100% + 12px)', left:'50%', transform:'translateX(-50%)',
          background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:10,
          padding:'12px 16px', width:240, fontSize:13, color:'rgba(240,237,232,0.75)',
          textAlign:'center', lineHeight:1.5,
          boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
        }}>
          Tap <strong style={{ color:'#C9A84C' }}>Share</strong> then <strong style={{ color:'#C9A84C' }}>Add to Home Screen</strong>
          <div style={{ position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%) rotate(45deg)', width:12, height:12, background:'var(--surface-2)', border:'1px solid var(--border)', borderTop:'none', borderLeft:'none' }}/>
        </div>
      )}
    </div>
  )
}
