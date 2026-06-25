'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { ROOMS }     from '../../lib/rooms_data'
import { ALL_BLENDS } from '../../lib/blends_data'
import type { Room }  from '../../lib/rooms_data'
import type { Blend } from '../../lib/blends_data'

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
    setTimeout(() => rej(new Error('timeout')), 18000)
  })
}

/* ══════════════════════════════════════════════════════════════════════════════
   WEBGL2 RENDERER — Torginol GLSL pipeline (extracted 2026-06-25)
   
   3-pass rendering:
     Pass 1: Flake colorizer  → FBO (u_flake_texture + u_seed randomization)
     Pass 2: HMS shadow AO    → FBO2 (hms.jpg, 6-scale 24-neighbor sampling)
     Pass 3: Final composite  → Screen (diffuse bg + flake+shadow layer)

   Exact shader uniforms from blend-visualiser.min.js:
     u_flake_depth       = coverage/100 (chip density)
     u_seed              = random vec2  (per-blend rotation)
     u_shadowDepthMultiplier = shadow intensity (8.0 default)
     u_textureDepth      = hms.jpg unit
     u_textureColour     = flake layer from FBO
══════════════════════════════════════════════════════════════════════════════ */

const VERT_SIMPLE = `#version 300 es
precision mediump float;
in vec4 a_position; in vec2 a_texcoord;
uniform mat4 u_matrix;
out vec2 v_texcoord;
void main() { gl_Position = u_matrix * a_position; v_texcoord = a_texcoord; }`

const VERT_WITH_STEP = `#version 300 es
precision mediump float;
in vec4 a_position; in vec2 a_texcoord;
uniform mat4 u_matrix; uniform vec2 u_resolution;
out vec2 v_texcoord; out vec2 v_texelStep;
void main() {
  gl_Position = u_matrix * a_position;
  v_texcoord = a_texcoord;
  v_texelStep = vec2(1.0,1.0)/u_resolution;
}`

const FRAG_FLAKE = `#version 300 es
precision mediump float;
#define PI 3.14159
in vec2 v_texcoord; out vec4 fragColor;
uniform sampler2D u_texture;
uniform sampler2D u_flake_texture;
uniform float u_flake_depth;
uniform int u_use_flake_texture;
uniform vec2 u_seed;
vec2 rotate(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.y*cos(a)+p.x*sin(a));}
void main(){
  vec4 t=texture(u_texture,v_texcoord);
  float a=t.a<0.95?0.0:1.0;
  vec4 fc=texture(u_flake_texture,rotate(v_texcoord,2.0*PI*u_seed.x)*0.2+vec2(u_seed.x,1.0-u_seed.y));
  fragColor=vec4(fc.rgb,a*u_flake_depth);
}`

const FRAG_SHADOW = `#version 300 es
precision mediump float;
in vec2 v_texcoord; in vec2 v_texelStep; out vec4 fragColor;
uniform sampler2D u_textureDepth;
uniform sampler2D u_textureColour;
uniform vec2 u_resolution;
uniform float u_shadowDepthMultiplier;
float getAO(vec2 uv,float sp,vec2 step){
  float l=texture(u_textureDepth,uv+vec2(-sp,0)*step).r;
  float r=texture(u_textureDepth,uv+vec2(sp,0)*step).r;
  float t=texture(u_textureDepth,uv+vec2(0,-sp)*step).r;
  float b=texture(u_textureDepth,uv+vec2(0,sp)*step).r;
  float tl=texture(u_textureDepth,uv+vec2(-sp,-sp)*step).r;
  float bl=texture(u_textureDepth,uv+vec2(-sp,sp)*step).r;
  float tr=texture(u_textureDepth,uv+vec2(sp,-sp)*step).r;
  float br=texture(u_textureDepth,uv+vec2(sp,sp)*step).r;
  float ds=sp*2.0;
  float ttll=texture(u_textureDepth,uv+vec2(-ds,-ds)*step).r;
  float ttl=texture(u_textureDepth,uv+vec2(-sp,-ds)*step).r;
  float tt=texture(u_textureDepth,uv+vec2(0,-ds)*step).r;
  float ttr=texture(u_textureDepth,uv+vec2(sp,-ds)*step).r;
  float ttrr=texture(u_textureDepth,uv+vec2(ds,-ds)*step).r;
  float trr=texture(u_textureDepth,uv+vec2(ds,-sp)*step).r;
  float rr=texture(u_textureDepth,uv+vec2(ds,0)*step).r;
  float brr=texture(u_textureDepth,uv+vec2(ds,sp)*step).r;
  float bbrr=texture(u_textureDepth,uv+vec2(ds,ds)*step).r;
  float bbr=texture(u_textureDepth,uv+vec2(sp,ds)*step).r;
  float bb=texture(u_textureDepth,uv+vec2(0,ds)*step).r;
  float bbl=texture(u_textureDepth,uv+vec2(-sp,ds)*step).r;
  float bbll=texture(u_textureDepth,uv+vec2(-ds,ds)*step).r;
  float bll=texture(u_textureDepth,uv+vec2(-ds,sp)*step).r;
  float ll=texture(u_textureDepth,uv+vec2(-ds,0)*step).r;
  float tll=texture(u_textureDepth,uv+vec2(-ds,-sp)*step).r;
  float c=texture(u_textureDepth,uv).r;
  float n=(l+r+t+b+tl+tr+bl+br+ttll+ttl+tt+ttr+ttrr+trr+rr+brr+bbrr+bbr+bb+bbl+bbll+bll+ll+tll)*0.041666666;
  return clamp(1.0-(n-c)*u_shadowDepthMultiplier,0.0,1.0);
}
void main(){
  float ao=pow(getAO(v_texcoord,20.0,v_texelStep),1.0)*pow(getAO(v_texcoord,10.0,v_texelStep),1.0)*pow(getAO(v_texcoord,6.0,v_texelStep),1.0)*pow(getAO(v_texcoord,3.0,v_texelStep),3.0)*pow(getAO(v_texcoord,2.0,v_texelStep),4.0)*pow(getAO(v_texcoord,1.0,v_texelStep),8.0);
  ao=clamp(ao*0.7+0.3,0.0,1.0);
  fragColor=vec4(vec3(ao),1.0)*texture(u_textureColour,v_texcoord);
}`

const FRAG_COMPOSITE = `#version 300 es
precision mediump float;
in vec2 v_texcoord; out vec4 fragColor;
uniform sampler2D u_background;
uniform sampler2D u_flake_layer;
uniform float u_coverage;
void main(){
  vec4 bg=texture(u_background,v_texcoord);
  vec4 fl=texture(u_flake_layer,v_texcoord);
  fragColor=vec4(mix(bg.rgb,fl.rgb,fl.a*u_coverage),1.0);
}`

function gl2Shader(gl:WebGL2RenderingContext,type:number,src:string){
  const s=gl.createShader(type)!
  gl.shaderSource(s,src);gl.compileShader(s)
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s)||'')
  return s
}
function gl2Program(gl:WebGL2RenderingContext,vert:string,frag:string){
  const p=gl.createProgram()!
  gl.attachShader(p,gl2Shader(gl,gl.VERTEX_SHADER,vert))
  gl.attachShader(p,gl2Shader(gl,gl.FRAGMENT_SHADER,frag))
  gl.linkProgram(p)
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p)||'')
  return p
}
function ortho(w:number,h:number){
  return new Float32Array([2/w,0,0,0, 0,-2/h,0,0, 0,0,1,0, -1,1,0,1])
}
function bindTex(gl:WebGL2RenderingContext,img:HTMLImageElement,unit:number,repeat=false){
  const t=gl.createTexture()!
  const wrap=repeat?gl.REPEAT:gl.CLAMP_TO_EDGE
  gl.activeTexture(gl.TEXTURE0+unit)
  gl.bindTexture(gl.TEXTURE_2D,t)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,wrap)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wrap)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img)
  return t
}
function makeFBO(gl:WebGL2RenderingContext,w:number,h:number){
  const fb=gl.createFramebuffer()!
  const tex=gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D,tex)
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
  gl.bindFramebuffer(gl.FRAMEBUFFER,fb)
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0)
  gl.bindFramebuffer(gl.FRAMEBUFFER,null)
  return {fb,tex}
}
function drawQuad(gl:WebGL2RenderingContext,prog:WebGLProgram,w:number,h:number){
  const pos=new Float32Array([0,0,w,0,0,h,0,h,w,0,w,h])
  const uv =new Float32Array([0,1,1,1,0,0,0,0,1,1,1,0])
  const vao=gl.createVertexArray()!
  gl.bindVertexArray(vao)
  const pb=gl.createBuffer()!;gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,pos,gl.STATIC_DRAW)
  const pl=gl.getAttribLocation(prog,'a_position');gl.enableVertexAttribArray(pl);gl.vertexAttribPointer(pl,2,gl.FLOAT,false,0,0)
  const ub=gl.createBuffer()!;gl.bindBuffer(gl.ARRAY_BUFFER,ub);gl.bufferData(gl.ARRAY_BUFFER,uv,gl.STATIC_DRAW)
  const ul=gl.getAttribLocation(prog,'a_texcoord');gl.enableVertexAttribArray(ul);gl.vertexAttribPointer(ul,2,gl.FLOAT,false,0,0)
  gl.drawArrays(gl.TRIANGLES,0,6)
  gl.bindVertexArray(null)
}
function uni(gl:WebGL2RenderingContext,prog:WebGLProgram,name:string){
  return gl.getUniformLocation(prog,name)
}

async function compositeFloorGL2(
  canvas: HTMLCanvasElement,
  _roomId: string,
  bgUrl: string,
  blendUrl: string,
  coverage: number,
  hmsUrl?: string,
): Promise<void> {
  canvas.width = W; canvas.height = H

  // Try WebGL2 first
  const gl = canvas.getContext('webgl2',{alpha:false,antialias:true})
  if (!gl) {
    // Graceful Canvas2D fallback
    await compositeFloorCanvas2D(canvas, bgUrl, blendUrl, coverage)
    return
  }

  const [bgImg, blendImg] = await Promise.all([loadImg(bgUrl), loadImg(blendUrl)])
  const hmsImg = hmsUrl ? await loadImg(hmsUrl).catch(()=>null) : null

  gl.viewport(0,0,W,H)
  const M = ortho(W,H)
  const seed: [number,number] = [Math.random(), Math.random()]

  // Build programs
  const flakeProg  = gl2Program(gl, VERT_SIMPLE,    FRAG_FLAKE)
  const shadowProg = gl2Program(gl, VERT_WITH_STEP,  FRAG_SHADOW)
  const compProg   = gl2Program(gl, VERT_SIMPLE,    FRAG_COMPOSITE)

  // Bind textures: unit 0=bg, unit 1=blend, unit 2=hms, unit 6=fbo1, unit 7=fbo2
  bindTex(gl, bgImg,    0)
  bindTex(gl, blendImg, 1, true)  // REPEAT for tiling
  if (hmsImg) bindTex(gl, hmsImg, 2)

  // FBOs
  const fbo1 = makeFBO(gl, W, H)
  const fbo2 = makeFBO(gl, W, H)

  // ── PASS 1: Flake → FBO1 ────────────────────────────────────────────
  gl.useProgram(flakeProg)
  gl.uniformMatrix4fv(uni(gl,flakeProg,'u_matrix'),false,M)
  gl.uniform1i(uni(gl,flakeProg,'u_texture'),1)
  gl.uniform1i(uni(gl,flakeProg,'u_flake_texture'),1)
  gl.uniform1i(uni(gl,flakeProg,'u_use_flake_texture'),1)
  gl.uniform1f(uni(gl,flakeProg,'u_flake_depth'), coverage/100)
  gl.uniform2fv(uni(gl,flakeProg,'u_seed'), seed)

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo1.fb)
  gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT)
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)
  drawQuad(gl, flakeProg, W, H)

  // ── PASS 2: HMS Shadow AO → FBO2 ────────────────────────────────────
  if (hmsImg) {
    // Bind FBO1 output to unit 6
    gl.activeTexture(gl.TEXTURE6)
    gl.bindTexture(gl.TEXTURE_2D, fbo1.tex)

    gl.useProgram(shadowProg)
    gl.uniformMatrix4fv(uni(gl,shadowProg,'u_matrix'),false,M)
    gl.uniform1i(uni(gl,shadowProg,'u_textureDepth'),   2)  // hms
    gl.uniform1i(uni(gl,shadowProg,'u_textureColour'),  6)  // fbo1
    gl.uniform2f(uni(gl,shadowProg,'u_resolution'), W, H)
    gl.uniform1f(uni(gl,shadowProg,'u_shadowDepthMultiplier'), 8.0)

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo2.fb)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.disable(gl.BLEND)
    drawQuad(gl, shadowProg, W, H)
  }

  // ── PASS 3: Composite → Screen ───────────────────────────────────────
  const finalTex = hmsImg ? fbo2.tex : fbo1.tex
  gl.activeTexture(gl.TEXTURE7)
  gl.bindTexture(gl.TEXTURE_2D, finalTex)

  gl.useProgram(compProg)
  gl.uniformMatrix4fv(uni(gl,compProg,'u_matrix'),false,M)
  gl.uniform1i(uni(gl,compProg,'u_background'),  0)  // diffuse
  gl.uniform1i(uni(gl,compProg,'u_flake_layer'), 7)  // final flake
  gl.uniform1f(uni(gl,compProg,'u_coverage'), coverage/100)

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0,0,W,H)
  gl.disable(gl.BLEND)
  drawQuad(gl, compProg, W, H)
}

// Canvas2D fallback (existing logic, kept for non-WebGL2 browsers)
async function compositeFloorCanvas2D(
  canvas: HTMLCanvasElement,
  bgUrl: string,
  blendUrl: string,
  coverage: number,
): Promise<void> {
  const W2 = canvas.width, H2 = canvas.height
  const [bgImg, blendImg] = await Promise.all([loadImg(bgUrl), loadImg(blendUrl)])
  const alpha = Math.min(0.95, (coverage/100)*0.88)
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0,0,W2,H2)
  ctx.drawImage(bgImg,0,0,W2,H2)
  ctx.globalCompositeOperation='multiply'; ctx.globalAlpha=alpha
  const ts=120, cols=Math.ceil(W2/ts)+2, rows=Math.ceil(H2/ts)+2
  for(let r=0;r<rows;r++) for(let c=-1;c<cols;c++) ctx.drawImage(blendImg,c*ts,r*ts,ts,ts)
  ctx.globalCompositeOperation='source-over'; ctx.globalAlpha=1
}

/* ── wrapper: picks WebGL2 render with hms if available, falls back to Canvas2D ── */
async function compositeFloor(
  canvas: HTMLCanvasElement,
  roomId: string,
  bgUrl: string,
  blendUrl: string,
  coverage: number,
): Promise<void> {
  // Find room data to get hmsUrl
  const room = ROOMS.find(r => r.id === roomId)
  const hmsUrl = room?.hms
  
  try {
    await compositeFloorGL2(canvas, roomId, bgUrl, blendUrl, coverage, hmsUrl)
  } catch (err) {
    console.warn('[WebGL2 failed, Canvas2D fallback]', err)
    canvas.width = W; canvas.height = H
    await compositeFloorCanvas2D(canvas, bgUrl, blendUrl, coverage)
  }
}

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
