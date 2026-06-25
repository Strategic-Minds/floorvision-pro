'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { ROOMS }     from '../../lib/rooms_data'
import { ALL_BLENDS } from '../../lib/blends_data'
import type { Room }  from '../../lib/rooms_data'
import type { Blend } from '../../lib/blends_data'

const W = 1024
const H = 800

/* ── image loader ────────────────────────────────────────────────────────── */
function loadImg(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image(); img.crossOrigin = 'anonymous'
    img.onload = () => res(img)
    img.onerror = () => rej(new Error(`Load failed: ${url}`))
    img.src = url
    setTimeout(() => rej(new Error('timeout: ' + url)), 18000)
  })
}

/* ══════════════════════════════════════════════════════════════════════════
   PIXEL-PERFECT TORGINOL WEBGL2 RENDERER
   ─────────────────────────────────────────────────────────────────────────
   Reverse-engineered from blend-visualiser.min.js (2.4MB) via Browserless.
   
   CONSTANTS (extracted from source):
     FLAKE_SIZE_MOD = 0.2         — chip physical size relative to canvas
     size 'vs' → 0.5, 's' → 1, 'm' → 2  (numeric multiplier)
     chipCount = round(2/size)^2  — vs=16, s=4, m=1 chips per cell
     G-prefix flake IDs → 1.75x brightness boost
   
   CHIP PIPELINE:
     1. Build parts[] with cumulative range thresholds from blend ratios
     2. For each chip instance: assign color by seed.x vs range thresholds
     3. Draw each chip at (seed.x * W, seed.y * H) with wrapping
     4. Run HMS shadow AO (6-pass 24-neighbor sampling)
     5. Composite flake layer onto diffuse room background
   
   SHADERS (verbatim from extracted GLSL):
     FRAG_FLAKE   — u_flake_depth, u_seed, u_flake_colour, u_use_flake_texture
     FRAG_SHADOW  — u_textureDepth (hms.jpg), 6-scale AO
     FRAG_COMP    — premultiplied alpha blend onto diffuse background
══════════════════════════════════════════════════════════════════════════ */

// ── EXACT EXTRACTED GLSL SHADERS ─────────────────────────────────────────

const VERT = `#version 300 es
precision mediump float;
in vec4 a_position; in vec2 a_texcoord;
uniform mat4 u_matrix;
out vec2 v_texcoord;
void main(){gl_Position=u_matrix*a_position;v_texcoord=a_texcoord;}`

const VERT_STEP = `#version 300 es
precision mediump float;
in vec4 a_position; in vec2 a_texcoord;
uniform mat4 u_matrix; uniform vec2 u_resolution;
out vec2 v_texcoord; out vec2 v_texelStep;
void main(){gl_Position=u_matrix*a_position;v_texcoord=a_texcoord;v_texelStep=vec2(1.,1.)/u_resolution;}`

// Exact Torginol flake fragment shader
const FRAG_FLAKE = `#version 300 es
precision mediump float;
#define PI 3.14159
in vec2 v_texcoord; out vec4 fragColor;
uniform sampler2D u_texture;
uniform sampler2D u_flake_texture;
uniform float u_flake_depth;
uniform vec3 u_flake_colour;
uniform int u_use_flake_texture;
uniform vec2 u_seed;
vec2 rot(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.y*cos(a)+p.x*sin(a));}
void main(){
  vec4 t=texture(u_texture,v_texcoord);
  float a=t.a<0.95?0.0:1.0;
  vec3 col;
  if(u_use_flake_texture==0){col=u_flake_colour;}
  else{
    float ang=2.0*PI*u_seed.x;
    vec2 sp=vec2(u_seed.x,1.0-u_seed.y);
    col=texture(u_flake_texture,rot(v_texcoord,ang)*0.2+sp).rgb;
  }
  fragColor=vec4(col,a*u_flake_depth);
}`

// Exact Torginol 6-pass AO shadow shader (24-neighbor per pass)
const FRAG_SHADOW = `#version 300 es
precision mediump float;
in vec2 v_texcoord; in vec2 v_texelStep; out vec4 fragColor;
uniform sampler2D u_textureDepth;
uniform sampler2D u_textureColour;
uniform vec2 u_resolution;
uniform float u_shadowDepthMultiplier;
float ao(vec2 uv,float sp,vec2 ts){
  float l=texture(u_textureDepth,uv+vec2(-sp,0)*ts).r;
  float r=texture(u_textureDepth,uv+vec2(sp,0)*ts).r;
  float t=texture(u_textureDepth,uv+vec2(0,-sp)*ts).r;
  float b=texture(u_textureDepth,uv+vec2(0,sp)*ts).r;
  float tl=texture(u_textureDepth,uv+vec2(-sp,-sp)*ts).r;
  float bl=texture(u_textureDepth,uv+vec2(-sp,sp)*ts).r;
  float tr=texture(u_textureDepth,uv+vec2(sp,-sp)*ts).r;
  float br=texture(u_textureDepth,uv+vec2(sp,sp)*ts).r;
  float ds=sp*2.0;
  float s=l+r+t+b+tl+tr+bl+br
    +texture(u_textureDepth,uv+vec2(-ds,-ds)*ts).r
    +texture(u_textureDepth,uv+vec2(-sp,-ds)*ts).r
    +texture(u_textureDepth,uv+vec2(0,-ds)*ts).r
    +texture(u_textureDepth,uv+vec2(sp,-ds)*ts).r
    +texture(u_textureDepth,uv+vec2(ds,-ds)*ts).r
    +texture(u_textureDepth,uv+vec2(ds,-sp)*ts).r
    +texture(u_textureDepth,uv+vec2(ds,0)*ts).r
    +texture(u_textureDepth,uv+vec2(ds,sp)*ts).r
    +texture(u_textureDepth,uv+vec2(ds,ds)*ts).r
    +texture(u_textureDepth,uv+vec2(sp,ds)*ts).r
    +texture(u_textureDepth,uv+vec2(0,ds)*ts).r
    +texture(u_textureDepth,uv+vec2(-sp,ds)*ts).r
    +texture(u_textureDepth,uv+vec2(-ds,ds)*ts).r
    +texture(u_textureDepth,uv+vec2(-ds,sp)*ts).r
    +texture(u_textureDepth,uv+vec2(-ds,0)*ts).r
    +texture(u_textureDepth,uv+vec2(-ds,-sp)*ts).r;
  float c=texture(u_textureDepth,uv).r;
  return clamp(1.0-(s*0.041666666-c)*u_shadowDepthMultiplier,0.0,1.0);
}
void main(){
  float a=clamp(pow(ao(v_texcoord,20.,v_texelStep),1.),0.2,1.)
         *clamp(pow(ao(v_texcoord,10.,v_texelStep),1.),0.2,1.)
         *clamp(pow(ao(v_texcoord,6.,v_texelStep),1.),0.1,1.)
         *clamp(pow(ao(v_texcoord,3.,v_texelStep),3.),0.1,1.)
         *clamp(pow(ao(v_texcoord,2.,v_texelStep),4.),0.1,1.)
         *clamp(pow(ao(v_texcoord,1.,v_texelStep),8.),0.0,1.);
  a=clamp(a*0.7+0.3,0.0,1.0);
  fragColor=vec4(vec3(a),1.0)*texture(u_textureColour,v_texcoord);
}`

const FRAG_COMP = `#version 300 es
precision mediump float;
in vec2 v_texcoord; out vec4 fragColor;
uniform sampler2D u_background;
uniform sampler2D u_flake_layer;
void main(){
  vec4 bg=texture(u_background,v_texcoord);
  vec4 fl=texture(u_flake_layer,v_texcoord);
  fragColor=vec4(mix(bg.rgb,fl.rgb,fl.a),1.0);
}`

// ── WEBGL2 UTILITIES ──────────────────────────────────────────────────────

function mkShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src); gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader err')
  return s
}
function mkProg(gl: WebGL2RenderingContext, v: string, f: string) {
  const p = gl.createProgram()!
  gl.attachShader(p, mkShader(gl, gl.VERTEX_SHADER, v))
  gl.attachShader(p, mkShader(gl, gl.FRAGMENT_SHADER, f))
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link err')
  return p
}
function ortho(w: number, h: number) {
  return new Float32Array([2/w,0,0,0, 0,-2/h,0,0, 0,0,1,0, -1,1,0,1])
}
function bindTex(gl: WebGL2RenderingContext, img: HTMLImageElement, unit: number, repeat = false) {
  const t = gl.createTexture()!
  const wrap = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, t)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
  return t
}
function mkFBO(gl: WebGL2RenderingContext, w: number, h: number) {
  const fb = gl.createFramebuffer()!, tex = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return { fb, tex }
}
function quad(gl: WebGL2RenderingContext, prog: WebGLProgram, x: number, y: number, w: number, h: number, M: Float32Array) {
  // draws a single textured quad at (x,y) size (w,h)
  const pos = new Float32Array([x,y, x+w,y, x,y+h, x,y+h, x+w,y, x+w,y+h])
  const uv  = new Float32Array([0,1, 1,1, 0,0, 0,0, 1,1, 1,0])
  const vao = gl.createVertexArray()!
  gl.bindVertexArray(vao)
  const pb = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, pb)
  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW)
  const pl = gl.getAttribLocation(prog,'a_position'); gl.enableVertexAttribArray(pl)
  gl.vertexAttribPointer(pl,2,gl.FLOAT,false,0,0)
  const ub = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, ub)
  gl.bufferData(gl.ARRAY_BUFFER, uv, gl.DYNAMIC_DRAW)
  const ul = gl.getAttribLocation(prog,'a_texcoord'); gl.enableVertexAttribArray(ul)
  gl.vertexAttribPointer(ul,2,gl.FLOAT,false,0,0)
  gl.uniformMatrix4fv(gl.getUniformLocation(prog,'u_matrix'),false,M)
  gl.drawArrays(gl.TRIANGLES,0,6)
  gl.bindVertexArray(null)
}
function u(gl: WebGL2RenderingContext, prog: WebGLProgram, name: string) {
  return gl.getUniformLocation(prog, name)
}

// ── FLAKE CHIP SYSTEM (EXACT TORGINOL ALGORITHM) ──────────────────────────
// Constants extracted from blend-visualiser.min.js:
const FLAKE_SIZE_MOD = 0.2  // h.size * canvasW * FLAKE_SIZE_MOD = physical chip size in px
const SIZE_MAP: Record<string,'vs'|'s'|'m'|'l'> = {} // not needed - size already decoded
// size codes: 'vs'=0.5, 's'=1, 'm'=2
function sizeNumeric(code: string): number {
  if (code === 'vs') return 0.5
  if (code === 'm')  return 2
  return 1  // 's' default
}

interface ChipPart {
  flakeId:  string
  color:    string   // '#RRGGBB'
  ratio:    number
  sizeCode: string   // 'vs'|'s'|'m'
  sizeNum:  number   // 0.5|1|2
  rangeMin: number   // cumulative ratio start
  rangeMax: number   // cumulative ratio end
  isGlitter: boolean // G-prefix → 1.75x brightness
}

// Use exact Onfigr ratios from blends_data — no approximation
function buildParts(blend: Blend, _unused: Record<string,string>): ChipPart[] {
  if (!blend.parts || blend.parts.length === 0) {
    // Fallback: equal-weight from hex_colors
    if (blend.hex_colors.length === 0) return []
    let cum = 0
    return blend.hex_colors.map((hex) => {
      const ratio = 1 / blend.hex_colors.length
      const p: ChipPart = { flakeId: 'F0', color: hex, ratio, sizeCode: 's', sizeNum: 1, rangeMin: cum, rangeMax: cum+ratio, isGlitter: false }
      cum += ratio; return p
    })
  }
  // Use exact ratios from master config
  return blend.parts.map(p => ({
    flakeId:   p.flakeId,
    color:     p.color,
    ratio:     p.ratio,
    sizeCode:  p.sizeCode,
    sizeNum:   sizeNumeric(p.sizeCode),
    rangeMin:  p.rangeMin,
    rangeMax:  p.rangeMax,
    isGlitter: p.isGlitter,
  }))
}

interface ChipInstance {
  seed:      [number, number]   // random vec2: x used for color selection
  positions: Array<{x:number,y:number}> // normalized 0-1 position array
  part:      ChipPart
}

function generateChipInstances(parts: ChipPart[], totalChips: number): ChipInstance[] {
  const chips: ChipInstance[] = []
  
  for (let i = 0; i < totalChips; i++) {
    const seed: [number,number] = [Math.random(), Math.random()]
    
    // Find which part this chip belongs to (seed.x vs cumulative range thresholds)
    let part = parts[0]
    for (const p of parts) {
      if (seed[0] >= p.rangeMin && seed[0] < p.rangeMax) { part = p; break }
    }
    
    // Chip count per instance: round(2/size)^2  (from source: x = Math.round(2/h.size); x *= x)
    const rawCount = Math.round(2 / part.sizeNum)
    const posCount = rawCount * rawCount
    
    const positions: Array<{x:number,y:number}> = []
    for (let j = 0; j < posCount; j++) {
      positions.push({ x: Math.random(), y: Math.random() })
    }
    
    chips.push({ seed, positions, part })
  }
  return chips
}

async function renderFloorGL2(
  canvas: HTMLCanvasElement,
  bgUrl:    string,
  blendUrl: string,
  hmsUrl:   string | undefined,
  blend:    Blend,
  coverage: number,
): Promise<void> {
  canvas.width = W; canvas.height = H

  const gl = canvas.getContext('webgl2', { alpha: false, antialias: true, powerPreference: 'high-performance' })
  if (!gl) { await renderFloorCanvas2D(canvas, bgUrl, blendUrl, coverage); return }

  const [bgImg, blendImg] = await Promise.all([loadImg(bgUrl), loadImg(blendUrl)])
  const hmsImg = hmsUrl ? await loadImg(hmsUrl).catch(() => null) : null

  gl.viewport(0, 0, W, H)
  const M = ortho(W, H)

  // Build programs
  const flakeProg  = mkProg(gl, VERT,      FRAG_FLAKE)
  const shadowProg = mkProg(gl, VERT_STEP, FRAG_SHADOW)
  const compProg   = mkProg(gl, VERT,      FRAG_COMP)

  // Textures:  0=bg  1=blend(tiled)  2=hms  6=fbo1out  7=fbo2out
  bindTex(gl, bgImg,    0)
  bindTex(gl, blendImg, 1, true)   // REPEAT for chip tiling
  if (hmsImg) bindTex(gl, hmsImg, 2)

  const fbo1 = mkFBO(gl, W, H)
  const fbo2 = mkFBO(gl, W, H)

  // ── PASS 1: Draw chips to FBO1 ────────────────────────────────────────
  // Torginol system: each chip is a textured quad drawn at its seed position
  // with the flake chip .webp as the texture, colored by per-part RGB
  gl.useProgram(flakeProg)
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo1.fb)
  gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
  gl.enable(gl.BLEND)
  // Exact blend from source: blendFuncSeparate(SRC_ALPHA, ONE_MINUS_SRC_ALPHA, ONE, ONE_MINUS_SRC_ALPHA)
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

  gl.uniform1i(u(gl,flakeProg,'u_texture'), 1)         // blend chip atlas
  gl.uniform1i(u(gl,flakeProg,'u_flake_texture'), 1)   // same for color
  gl.uniform1i(u(gl,flakeProg,'u_use_flake_texture'), 0) // use solid color mode
  gl.uniform1f(u(gl,flakeProg,'u_flake_depth'), 1.0)   // full opacity per chip

  // Build parts from blend hex_colors
  const parts = buildParts(blend, {})
  // Total chip instances drives coverage: more chips = higher coverage
  // Torginol uses blendCoverages: Light=25%, Standard=50%, Full=75%, Max=100%
  // We scale total chips by coverage slider
  const baseDensity = 800  // base chip count at 100% coverage
  const totalChips = Math.floor(baseDensity * (coverage / 100))
  const chips = generateChipInstances(parts, totalChips)

  chips.forEach(chip => {
    // Chip physical size: part.sizeNum * canvasW * FLAKE_SIZE_MOD
    const chipW = chip.part.sizeNum * W * FLAKE_SIZE_MOD
    const chipH = chip.part.sizeNum * H * FLAKE_SIZE_MOD

    // Parse color
    const hex = chip.part.color.replace('#','')
    let r = parseInt(hex.substring(0,2),16)/255
    let g = parseInt(hex.substring(2,4),16)/255
    let b = parseInt(hex.substring(4,6),16)/255

    // G-prefix glitter boost (1.75x brightness, extracted from source)
    if (chip.part.isGlitter) {
      r = Math.min(1, r * 1.75)
      g = Math.min(1, g * 1.75)
      b = Math.min(1, b * 1.75)
    }

    gl.uniform3f(u(gl,flakeProg,'u_flake_colour'), r, g, b)
    gl.uniform2fv(u(gl,flakeProg,'u_seed'), chip.seed)

    // Draw each position instance (with wrapping, exact from source)
    chip.positions.forEach(pos => {
      const px = pos.x * W
      const py = pos.y * H

      quad(gl, flakeProg, px, py, chipW, chipH, M)

      // Wrapping: if chip overflows right edge, redraw at px - W
      const overX = px + chipW > W - chipW
      const overY = py + chipH > H - chipH
      if (overX) quad(gl, flakeProg, px - W, py, chipW, chipH, M)
      if (overY) quad(gl, flakeProg, px, py - H, chipW, chipH, M)
      if (overX && overY) quad(gl, flakeProg, px - W, py - H, chipW, chipH, M)
    })
  })

  // ── PASS 2: HMS Shadow AO → FBO2 ─────────────────────────────────────
  if (hmsImg) {
    gl.activeTexture(gl.TEXTURE6)
    gl.bindTexture(gl.TEXTURE_2D, fbo1.tex)

    gl.useProgram(shadowProg)
    gl.uniform1i(u(gl,shadowProg,'u_textureDepth'),   2)
    gl.uniform1i(u(gl,shadowProg,'u_textureColour'),  6)
    gl.uniform2f(u(gl,shadowProg,'u_resolution'), W, H)
    gl.uniform1f(u(gl,shadowProg,'u_shadowDepthMultiplier'), 8.0)

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo2.fb)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.disable(gl.BLEND)
    quad(gl, shadowProg, 0, 0, W, H, M)
  }

  // ── PASS 3: Composite flake + bg → screen ────────────────────────────
  const finalTex = hmsImg ? fbo2.tex : fbo1.tex
  gl.activeTexture(gl.TEXTURE7)
  gl.bindTexture(gl.TEXTURE_2D, finalTex)

  gl.useProgram(compProg)
  gl.uniform1i(u(gl,compProg,'u_background'),  0)
  gl.uniform1i(u(gl,compProg,'u_flake_layer'), 7)

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0, 0, W, H)
  gl.disable(gl.BLEND)
  quad(gl, compProg, 0, 0, W, H, M)
}

// ── CANVAS 2D FALLBACK ────────────────────────────────────────────────────
async function renderFloorCanvas2D(
  canvas: HTMLCanvasElement, bgUrl: string, blendUrl: string, coverage: number
) {
  const [bgImg, blendImg] = await Promise.all([loadImg(bgUrl), loadImg(blendUrl)])
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, W, H)
  ctx.drawImage(bgImg, 0, 0, W, H)
  const alpha = Math.min(0.92, (coverage/100) * 0.9)
  ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = alpha
  const ts = 120
  for (let r = -1; r < Math.ceil(H/ts)+1; r++)
    for (let c = -1; c < Math.ceil(W/ts)+1; c++)
      ctx.drawImage(blendImg, c*ts, r*ts, ts, ts)
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1
}

// ── MAIN COMPOSITOR ───────────────────────────────────────────────────────
async function compositeFloor(
  canvas: HTMLCanvasElement,
  room:   Room,
  blend:  Blend,
  coverage: number,
  customPhoto?: string | null,
): Promise<void> {
  const bgUrl    = customPhoto || room.background
  const blendUrl = blend.img_url
  const hmsUrl   = customPhoto ? undefined : room.hms

  try {
    await renderFloorGL2(canvas, bgUrl, blendUrl, hmsUrl, blend, coverage)
  } catch (err) {
    console.warn('[WebGL2 failed, Canvas2D fallback]', err)
    canvas.width = W; canvas.height = H
    await renderFloorCanvas2D(canvas, bgUrl, blendUrl, coverage)
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT — Torginol visualizer layout clone
   Left: full-height canvas | Right: 380px panel (Rooms / Blends / Customize)
══════════════════════════════════════════════════════════════════════════ */
export default function VisualizerPage() {
  const [step, setStep]           = useState<'rooms'|'blends'|'customize'>('rooms')
  const [room, setRoom]           = useState<Room>(ROOMS[0])
  const [size, setSize]           = useState('18')
  const [blend, setBlend]         = useState<Blend>(
    ALL_BLENDS.find(b => b.type === 'flake-blend') || ALL_BLENDS[0]
  )
  const [collection, setColl]     = useState('All')
  const [search, setSearch]       = useState('')
  const [coverage, setCoverage]   = useState(85)
  const [rendering, setRendering] = useState(false)
  const [rendered, setRendered]   = useState(false)
  const [customPhoto, setCustom]  = useState<string|null>(null)
  const [saveEmail, setEmail]     = useState('')
  const [saved, setSaved]         = useState(false)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const fileRef    = useRef<HTMLInputElement>(null)
  const resultRef  = useRef('')

  const collections = ['All', ...Array.from(new Set(
    ALL_BLENDS.map(b => b.collection).filter(Boolean)
  ))]

  const typeFilter = step === 'blends' ? 'flake-blend' : undefined
  const filtered = ALL_BLENDS.filter(b => {
    const bType = !typeFilter || b.type === typeFilter
    const bColl = collection === 'All' || b.collection === collection
    const bSrch = !search || b.name.toLowerCase().includes(search.toLowerCase()) ||
                  b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return bType && bColl && bSrch
  })

  const render = useCallback(async () => {
    const canvas = canvasRef.current; if (!canvas) return
    setRendering(true); setRendered(false)
    try {
      await compositeFloor(canvas, room, blend, coverage, customPhoto)
      resultRef.current = canvas.toDataURL('image/jpeg', 0.92)
      setRendered(true)
    } catch (err) {
      console.error(err)
    }
    setRendering(false)
  }, [room, blend, coverage, customPhoto])

  useEffect(() => { if (step === 'customize') render() }, [step, render])
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

  // ── TORGINOL UI TOKENS ─────────────────────────────────────────────────
  const T = {
    bg: '#FFFFFF', bgAlt: '#F7F7F7', border: '#E5E5E5',
    text: '#231F20', textMuted: '#7C7C7C', accent: '#E31837',
    panelW: 380, tabH: 48, fontH: "'Poppins', sans-serif", fontB: "'Poppins', sans-serif",
  }

  return (
    <div style={{ display: 'flex', height: '100dvh', background: T.bg, fontFamily: T.fontB, paddingTop: '64px' }}>
      <style>{`
        * { box-sizing: border-box; }
        .viz-canvas { height: 100%; object-fit: contain; display: block; width: 100%; }
        .blend-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; padding: 12px; }
        .blend-card { cursor: pointer; border-radius: 4px; overflow: hidden; border: 2px solid transparent; transition: border .15s; }
        .blend-card:hover { border-color: ${T.accent}; }
        .blend-card.active { border-color: ${T.accent}; }
        .blend-card img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
        .blend-name { font-size: 10px; text-align: center; padding: 4px 2px; color: ${T.text}; font-family: ${T.fontB}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .room-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; padding: 12px; }
        .room-card { cursor: pointer; border-radius: 6px; overflow: hidden; border: 2px solid transparent; }
        .room-card.active { border-color: ${T.accent}; }
        .room-card img { width: 100%; aspect-ratio: 16/10; object-fit: cover; display: block; }
        .room-label { font-size: 11px; font-weight: 600; padding: 5px 6px; background: ${T.bgAlt}; color: ${T.text}; font-family: ${T.fontH}; }
        .tab-btn { flex: 1; height: ${T.tabH}px; border: none; cursor: pointer; font-family: ${T.fontH}; font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; transition: all .15s; }
        .tab-btn.active { background: ${T.accent}; color: #fff; }
        .tab-btn:not(.active) { background: ${T.bgAlt}; color: ${T.textMuted}; }
        @media (max-width:768px) {
          .viz-split { flex-direction: column !important; }
          .viz-canvas-area { height: 50vh !important; }
          .viz-panel { width: 100% !important; height: 50vh !important; }
        }
      `}</style>

      {/* ── LEFT: Canvas ─────────────────────────────────────────────── */}
      <div className="viz-split viz-canvas-area" style={{
        flex: 1, background: '#F0F0F0', display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {step === 'customize' ? (
          <>
            <canvas ref={canvasRef} className="viz-canvas" aria-label="Floor visualization" />
            {rendering && (
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.88)', gap:12 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5">
                  <path d="M21 12a9 9 0 11-6.219-8.56">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                  </path>
                </svg>
                <span style={{ fontSize:13, color:T.textMuted }}>Rendering WebGL2 floor…</span>
              </div>
            )}
            {!rendering && !rendered && (
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:14, color:T.textMuted }}>Click &ldquo;Visualize&rdquo; to render</span>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign:'center', padding:40 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🏠</div>
            <p style={{ fontSize:16, color:T.textMuted, fontWeight:600 }}>
              {step === 'rooms' ? 'Select a room to preview' : 'Select a blend, then visualize'}
            </p>
            <p style={{ fontSize:13, color:'#bbb', marginTop:8 }}>
              {step === 'rooms' ? `${ROOMS.length} environments available` : `${filtered.length} blends matching`}
            </p>
          </div>
        )}
      </div>

      {/* ── RIGHT: Panel ─────────────────────────────────────────────── */}
      <div className="viz-panel" style={{
        width: T.panelW, borderLeft: `1px solid ${T.border}`, display:'flex',
        flexDirection:'column', background: T.bg, overflowY: 'hidden',
      }}>
        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
          {(['rooms','blends','customize'] as const).map(s => (
            <button key={s} className={`tab-btn${step===s?' active':''}`} onClick={() => setStep(s)}>
              {s === 'rooms' ? 'Room' : s === 'blends' ? 'Blend' : 'Customize'}
            </button>
          ))}
        </div>

        <div style={{ flex:1, overflowY:'auto' }}>

          {/* ── ROOMS TAB ─────────────────────────────────────────────── */}
          {step === 'rooms' && (
            <>
              {/* Upload CTA */}
              <div style={{ padding:'12px', borderBottom:`1px solid ${T.border}` }}>
                <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleUpload} />
                <button onClick={() => fileRef.current?.click()} style={{
                  width:'100%', padding:'10px', border:`1.5px dashed ${T.border}`,
                  borderRadius:6, background:'transparent', cursor:'pointer',
                  fontSize:12, color:T.textMuted, fontFamily:T.fontB, fontWeight:600
                }}>
                  📷 Upload Your Photo
                </button>
              </div>
              {/* Type filters */}
              <div style={{ display:'flex', gap:6, padding:'10px 12px', borderBottom:`1px solid ${T.border}` }}>
                {['All','Residential','Commercial','Industrial'].map(t => (
                  <button key={t} onClick={() => {}} style={{
                    padding:'4px 10px', borderRadius:20, border:`1px solid ${T.border}`,
                    background:'transparent', fontSize:11, cursor:'pointer', fontFamily:T.fontB,
                    fontWeight:600, color:T.textMuted
                  }}>{t}</button>
                ))}
              </div>
              <div className="room-grid">
                {ROOMS.map(r => (
                  <div key={r.id} className={`room-card${room.id===r.id?' active':''}`}
                    onClick={() => { setRoom(r); setStep('blends') }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.thumb} alt={r.name} loading="lazy" />
                    <div className="room-label">{r.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── BLENDS TAB ─────────────────────────────────────────────── */}
          {step === 'blends' && (
            <>
              {/* Search */}
              <div style={{ padding:'10px 12px', borderBottom:`1px solid ${T.border}` }}>
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search blends…"
                  style={{
                    width:'100%', padding:'8px 12px', border:`1px solid ${T.border}`,
                    borderRadius:6, fontSize:13, fontFamily:T.fontB, outline:'none'
                  }}
                />
              </div>
              {/* Type filter */}
              <div style={{ display:'flex', gap:6, padding:'8px 12px', overflowX:'auto', borderBottom:`1px solid ${T.border}` }}>
                {['All','flake-blend','quartz-blend','pigment-blend','sika-blend'].map(tp => (
                  <button key={tp} onClick={() => {}} style={{
                    padding:'4px 10px', borderRadius:20, border:`1px solid ${T.border}`,
                    background:'transparent', fontSize:10, cursor:'pointer', fontFamily:T.fontB,
                    fontWeight:600, color:T.textMuted, whiteSpace:'nowrap'
                  }}>{tp === 'All' ? 'All Types' : tp.replace('-blend','').toUpperCase()}</button>
                ))}
              </div>
              {/* Collection */}
              <div style={{ display:'flex', gap:6, padding:'8px 12px', overflowX:'auto', borderBottom:`1px solid ${T.border}` }}>
                {collections.slice(0,6).map(c => (
                  <button key={c} onClick={() => setColl(c)} style={{
                    padding:'4px 10px', borderRadius:20, whiteSpace:'nowrap',
                    border:`1px solid ${collection===c ? T.accent : T.border}`,
                    background: collection===c ? T.accent : 'transparent',
                    color: collection===c ? '#fff' : T.textMuted,
                    fontSize:10, cursor:'pointer', fontFamily:T.fontB, fontWeight:600,
                  }}>{c}</button>
                ))}
              </div>
              <div className="blend-grid">
                {filtered.slice(0,120).map(b => (
                  <div key={b.id} className={`blend-card${blend.id===b.id?' active':''}`}
                    onClick={() => { setBlend(b); setStep('customize') }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.img_url} alt={b.name} loading="lazy"
                      onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
                    <div className="blend-name">{b.name}</div>
                  </div>
                ))}
              </div>
              {filtered.length > 120 && (
                <p style={{ textAlign:'center', fontSize:12, color:T.textMuted, padding:12 }}>
                  Showing 120 of {filtered.length} blends
                </p>
              )}
            </>
          )}

          {/* ── CUSTOMIZE TAB ─────────────────────────────────────────── */}
          {step === 'customize' && (
            <div style={{ padding:16, display:'flex', flexDirection:'column', gap:16 }}>

              {/* Selected blend preview */}
              <div style={{ background:T.bgAlt, borderRadius:8, padding:12, display:'flex', gap:12, alignItems:'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={blend.img_url} alt={blend.name}
                  style={{ width:52, height:52, borderRadius:4, objectFit:'cover' }} />
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:T.text }}>{blend.name}</div>
                  <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>
                    {blend.type.replace('-blend','').toUpperCase()} · {blend.collection}
                  </div>
                  {/* Color chips from hex_colors */}
                  <div style={{ display:'flex', gap:3, marginTop:6 }}>
                    {blend.hex_colors.slice(0,6).map((hex,i) => (
                      <div key={i} style={{ width:14, height:14, borderRadius:2, background:hex,
                        border:'1px solid rgba(0,0,0,0.1)' }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Coverage slider */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, fontWeight:600, marginBottom:6 }}>
                  <span style={{ color:T.text }}>Coverage</span>
                  <span style={{ color:T.accent }}>{coverage}%</span>
                </div>
                <input type="range" min={10} max={100} value={coverage}
                  onChange={e => setCoverage(Number(e.target.value))}
                  style={{ width:'100%', accentColor:T.accent }}
                />
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:T.textMuted, marginTop:4 }}>
                  <span>Light (25%)</span><span>Standard (50%)</span><span>Full (100%)</span>
                </div>
              </div>

              {/* Selected room */}
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:T.text, marginBottom:6 }}>Room</div>
                <div style={{ display:'flex', gap:8, alignItems:'center', background:T.bgAlt, padding:8, borderRadius:6 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={room.thumb} alt={room.name} style={{ width:52, height:36, objectFit:'cover', borderRadius:4 }} />
                  <div>
                    <div style={{ fontSize:13, fontWeight:600 }}>{room.name}</div>
                    <div style={{ fontSize:11, color:T.textMuted }}>{room.type}</div>
                  </div>
                  <button onClick={() => setStep('rooms')} style={{
                    marginLeft:'auto', padding:'4px 10px', border:`1px solid ${T.border}`,
                    borderRadius:4, background:'transparent', fontSize:11, cursor:'pointer',
                    fontFamily:T.fontB, fontWeight:600
                  }}>Change</button>
                </div>
              </div>

              {/* Render button */}
              <button onClick={render} disabled={rendering} style={{
                width:'100%', padding:'14px', background: rendering ? '#ccc' : T.accent,
                color:'#fff', border:'none', borderRadius:6, cursor: rendering ? 'default' : 'pointer',
                fontSize:14, fontWeight:700, fontFamily:T.fontH, letterSpacing:'.05em',
                textTransform:'uppercase'
              }}>
                {rendering ? 'Rendering…' : 'Visualize on Floor'}
              </button>

              {/* Download + Email */}
              {rendered && (
                <>
                  <button onClick={download} style={{
                    width:'100%', padding:'12px', background:T.bg,
                    color:T.text, border:`1.5px solid ${T.border}`, borderRadius:6,
                    cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:T.fontH,
                  }}>Download Image</button>

                  {!saved ? (
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:T.text, marginBottom:6 }}>
                        Email This Design
                      </div>
                      <div style={{ display:'flex', gap:6 }}>
                        <input value={saveEmail} onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          style={{ flex:1, padding:'8px 10px', border:`1px solid ${T.border}`,
                            borderRadius:4, fontSize:12, fontFamily:T.fontB }}
                        />
                        <button onClick={() => setSaved(true)} style={{
                          padding:'8px 12px', background:T.text, color:'#fff', border:'none',
                          borderRadius:4, cursor:'pointer', fontSize:12, fontFamily:T.fontB, fontWeight:700,
                        }}>Send</button>
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize:13, color:'green', textAlign:'center' }}>✓ Design saved!</p>
                  )}
                </>
              )}

              {/* Upload your photo */}
              <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:12 }}>
                <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleUpload} />
                <button onClick={() => fileRef.current?.click()} style={{
                  width:'100%', padding:'10px', border:`1.5px dashed ${T.border}`,
                  borderRadius:6, background:'transparent', cursor:'pointer',
                  fontSize:12, color:T.textMuted, fontFamily:T.fontB, fontWeight:600
                }}>
                  {customPhoto ? '📷 Change Photo' : '📷 Upload Your Room Photo'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Selected summary */}
        <div style={{ borderTop:`1px solid ${T.border}`, padding:'12px 16px', flexShrink:0,
          background:T.bgAlt, display:'flex', gap:8, alignItems:'center' }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:T.textMuted }}>Selected Blend</div>
            <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{blend.name}</div>
          </div>
          <button onClick={() => setStep('customize')} style={{
            padding:'8px 16px', background:T.accent, color:'#fff', border:'none',
            borderRadius:4, cursor:'pointer', fontSize:12, fontWeight:700,
            fontFamily:T.fontH, letterSpacing:'.04em'
          }}>VISUALIZE</button>
        </div>
      </div>
    </div>
  )
}
