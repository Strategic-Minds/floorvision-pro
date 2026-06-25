'use client'
/**
 * FloorVision Pro — WebGL2 Renderer
 * ═══════════════════════════════════════════════════════════════════════════
 * Implements the EXACT Torginol/Onfigr rendering pipeline extracted from
 * blend-visualiser.min.js via Browserless network interception (2026-06-25)
 *
 * Pipeline (mirrors Torginol's 3-pass WebGL2 system):
 *   Pass 1 — diffuse.jpg    → background texture (full room)
 *   Pass 2 — blend.webp     → flake texture, colored + rotated via u_seed
 *   Pass 3 — hms.jpg        → depth/shadow AO map, 6 sample scales
 *
 * Shader uniforms (from extracted GLSL):
 *   u_texture           = blend flake shape texture
 *   u_flake_texture     = color texture for the blend (FB-* image)
 *   u_flake_depth       = coverage % (0.0 → 1.0)
 *   u_flake_colour      = solid color fallback (vec3)
 *   u_use_flake_texture = 1 = use img, 0 = use solid color
 *   u_seed              = random vec2 per session (flake rotation + position)
 *   u_textureDepth      = hms.jpg grayscale height map
 *   u_textureColour     = composited flake layer (ping-pong buffer)
 *   u_shadowDepthMultiplier = shadow intensity
 *   u_resolution        = canvas resolution vec2
 *   u_sampleSpacing     = AO kernel size
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useCallback } from 'react'

// ── SHADERS (verbatim from Torginol's extracted GLSL) ──────────────────────

const VERTEX_SHADER = `#version 300 es
precision mediump float;

in vec4 a_position;
in vec2 a_texcoord;
uniform mat4 u_matrix;
out vec2 v_texcoord;
uniform vec2 u_resolution;
out vec2 v_texelStep;

void main() {
  gl_Position = u_matrix * a_position;
  v_texcoord = a_texcoord;
  v_texelStep = vec2(1.0, 1.0) / u_resolution;
}`

const VERTEX_SIMPLE = `#version 300 es
precision mediump float;

in vec4 a_position;
in vec2 a_texcoord;
uniform mat4 u_matrix;
out vec2 v_texcoord;

void main() {
  gl_Position = u_matrix * a_position;
  v_texcoord = a_texcoord;
}`

/** Pass 2: Flake colorizer — applies u_flake_texture or u_flake_colour to each chip */
const FLAKE_FRAG = `#version 300 es
precision mediump float;

#define PI 3.14159

in vec2 v_texcoord;
out vec4 fragColor;

uniform sampler2D u_texture;
uniform sampler2D u_flake_texture;
uniform float u_flake_depth;
uniform vec3 u_flake_colour;
uniform int u_use_flake_texture;
uniform vec2 u_seed;

vec2 rotate(vec2 point, float angle) {
  return vec2(
    point.x * cos(angle) - point.y * sin(angle),
    point.y * cos(angle) + point.x * sin(angle)
  );
}

void main() {
  vec4 texCol = texture(u_texture, v_texcoord);
  float flakeAlpha = texCol.a;

  // Hard threshold — only render solid chip pixels
  if (flakeAlpha < 0.95) {
    flakeAlpha = 0.0;
  } else {
    flakeAlpha = 1.0;
  }

  vec3 outColour;

  if (u_use_flake_texture == 0) {
    outColour = u_flake_colour.rgb;
  } else {
    float angle    = 2.0 * PI * u_seed.x;
    vec2 startPos  = vec2(u_seed.x, 1.0 - u_seed.y);
    vec4 flakeColour = texture(
      u_flake_texture,
      rotate(v_texcoord, angle) * 0.2 + startPos
    );
    outColour = flakeColour.rgb;
  }

  // Apply coverage — u_flake_depth gates the alpha
  fragColor = vec4(outColour, flakeAlpha * u_flake_depth);
}`

/**
 * Pass 3: HMS Shadow AO — Torginol's 6-pass ambient occlusion algorithm
 * Uses hms.jpg as height map. 24-neighbor sampling per pixel at 6 scales:
 *   20.0, 10.0, 6.0, 3.0, 2.0, 1.0 pixel radii
 * All 6 AO values are MULTIPLIED together → very sharp edges + soft penumbra
 */
const SHADOW_FRAG = `#version 300 es
precision mediump float;

in vec2 v_texcoord;
in vec2 v_texelStep;
out vec4 fragColor;

uniform sampler2D u_textureDepth;
uniform sampler2D u_textureColour;
uniform vec2 u_resolution;
uniform float u_sampleSpacing;
uniform float u_shadowDepthMultiplier;

vec2 snapToTexel(vec2 uv, vec2 maxScreenCoords) {
  return floor((uv * maxScreenCoords) + 0.5) * (1.0 / maxScreenCoords);
}

float doEdgeHeightDifference(vec2 uv, float sampleSpacing, vec2 texelStepSize, vec2 resolution) {
  float l    = texture(u_textureDepth, uv + vec2(-sampleSpacing,  0.0)           * texelStepSize).r;
  float r    = texture(u_textureDepth, uv + vec2( sampleSpacing,  0.0)           * texelStepSize).r;
  float t    = texture(u_textureDepth, uv + vec2( 0.0,           -sampleSpacing) * texelStepSize).r;
  float b    = texture(u_textureDepth, uv + vec2( 0.0,            sampleSpacing) * texelStepSize).r;
  float tl   = texture(u_textureDepth, uv + vec2(-sampleSpacing, -sampleSpacing) * texelStepSize).r;
  float bl   = texture(u_textureDepth, uv + vec2(-sampleSpacing,  sampleSpacing) * texelStepSize).r;
  float tr   = texture(u_textureDepth, uv + vec2( sampleSpacing, -sampleSpacing) * texelStepSize).r;
  float br   = texture(u_textureDepth, uv + vec2( sampleSpacing,  sampleSpacing) * texelStepSize).r;

  float ds   = sampleSpacing * 2.0;
  float ttll = texture(u_textureDepth, uv + vec2(-ds, -ds) * texelStepSize).r;
  float ttl  = texture(u_textureDepth, uv + vec2(-sampleSpacing, -ds) * texelStepSize).r;
  float tt   = texture(u_textureDepth, uv + vec2( 0.0, -ds) * texelStepSize).r;
  float ttr  = texture(u_textureDepth, uv + vec2( sampleSpacing, -ds) * texelStepSize).r;
  float ttrr = texture(u_textureDepth, uv + vec2( ds, -ds) * texelStepSize).r;
  float trr  = texture(u_textureDepth, uv + vec2( ds, -sampleSpacing) * texelStepSize).r;
  float rr   = texture(u_textureDepth, uv + vec2( ds,  0.0) * texelStepSize).r;
  float brr  = texture(u_textureDepth, uv + vec2( ds,  sampleSpacing) * texelStepSize).r;
  float bbrr = texture(u_textureDepth, uv + vec2( ds,  ds) * texelStepSize).r;
  float bbr  = texture(u_textureDepth, uv + vec2( sampleSpacing, ds) * texelStepSize).r;
  float bb   = texture(u_textureDepth, uv + vec2( 0.0, ds) * texelStepSize).r;
  float bbl  = texture(u_textureDepth, uv + vec2(-sampleSpacing, ds) * texelStepSize).r;
  float bbll = texture(u_textureDepth, uv + vec2(-ds, ds) * texelStepSize).r;
  float bll  = texture(u_textureDepth, uv + vec2(-ds,  sampleSpacing) * texelStepSize).r;
  float ll   = texture(u_textureDepth, uv + vec2(-ds,  0.0) * texelStepSize).r;
  float tll  = texture(u_textureDepth, uv + vec2(-ds, -sampleSpacing) * texelStepSize).r;

  float centre       = texture(u_textureDepth, uv).r;
  float neighbourTot = l + r + t + b + tl + tr + bl + br +
                       ttll + ttl + tt + ttr + ttrr + trr +
                       rr + brr + bbrr + bbr + bb + bbl + bbll + bll + ll + tll;
  float neighbourWeight = neighbourTot * 0.041666666;  // / 24
  float heightDiff      = (neighbourWeight - centre) * u_shadowDepthMultiplier;
  float AO              = 1.0 - heightDiff;
  return clamp(AO, 0.0, 1.0);
}

void main() {
  // 6 AO passes at different scales — exact match to Torginol
  float ao20 = pow(doEdgeHeightDifference(v_texcoord, 20.0, v_texelStep, u_resolution), 1.0);
  float ao10 = pow(doEdgeHeightDifference(v_texcoord, 10.0, v_texelStep, u_resolution), 1.0);
  float ao6  = pow(doEdgeHeightDifference(v_texcoord,  6.0, v_texelStep, u_resolution), 1.0);
  float ao3  = pow(doEdgeHeightDifference(v_texcoord,  3.0, v_texelStep, u_resolution), 3.0);
  float ao2  = pow(doEdgeHeightDifference(v_texcoord,  2.0, v_texelStep, u_resolution), 4.0);
  float ao1  = pow(doEdgeHeightDifference(v_texcoord,  1.0, v_texelStep, u_resolution), 8.0);

  ao20 = clamp(ao20, 0.2, 1.0);
  ao10 = clamp(ao10, 0.2, 1.0);
  ao6  = clamp(ao6,  0.1, 1.0);
  ao3  = clamp(ao3,  0.1, 1.0);
  ao2  = clamp(ao2,  0.1, 1.0);
  ao1  = clamp(ao1,  0.0, 1.0);

  float fAO = ao20 * ao10 * ao6 * ao3 * ao2 * ao1;
  fAO = fAO * 0.7 + 0.3;
  fAO = clamp(fAO, 0.0, 1.0);

  vec4 AO       = vec4(vec3(fAO), 1.0);
  vec4 colourIn = texture(u_textureColour, v_texcoord);
  fragColor     = AO * colourIn;
}`

/** Pass 4: Final composite — blend flake layer onto diffuse background using alpha */
const COMPOSITE_FRAG = `#version 300 es
precision mediump float;

in vec2 v_texcoord;
out vec4 fragColor;

uniform sampler2D u_background;   // diffuse.jpg
uniform sampler2D u_flake_layer;  // flake pass output (with AO applied)
uniform float u_coverage;         // global coverage 0-1

void main() {
  vec4 bg    = texture(u_background, v_texcoord);
  vec4 flake = texture(u_flake_layer, v_texcoord);

  // Premultiplied alpha blend
  float a    = flake.a * u_coverage;
  vec3 col   = mix(bg.rgb, flake.rgb, a);

  fragColor = vec4(col, 1.0);
}`

// ── WEBGL2 UTILITIES ──────────────────────────────────────────────────────

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const err = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile error: ${err}`)
  }
  return shader
}

function createProgram(gl: WebGL2RenderingContext, vert: string, frag: string): WebGLProgram {
  const prog = gl.createProgram()!
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, vert))
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, frag))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error(`Program link error: ${gl.getProgramInfoLog(prog)}`)
  }
  return prog
}

function orthoMatrix(w: number, h: number): Float32Array {
  // Orthographic projection: maps 0..w, 0..h to NDC
  return new Float32Array([
     2/w,   0,    0, 0,
     0,    -2/h,  0, 0,
     0,     0,    1, 0,
    -1,     1,    0, 1,
  ])
}

function loadTexture(
  gl: WebGL2RenderingContext,
  img: HTMLImageElement | HTMLCanvasElement,
  unit: number,
  wrapS: number = WebGL2RenderingContext.CLAMP_TO_EDGE,
  wrapT: number = WebGL2RenderingContext.CLAMP_TO_EDGE,
): WebGLTexture {
  const tex = gl.createTexture()!
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
  return tex
}

function createFBO(gl: WebGL2RenderingContext, w: number, h: number): { fb: WebGLFramebuffer; tex: WebGLTexture; unit: number } {
  const fb  = gl.createFramebuffer()!
  const tex = gl.createTexture()!
  const unit = 5  // always bind FBO output to unit 5
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return { fb, tex, unit }
}

function setQuadBuffer(gl: WebGL2RenderingContext, prog: WebGLProgram, w: number, h: number) {
  // Full-canvas quad: 2 triangles covering 0,0 → w,h
  const positions = new Float32Array([0,0, w,0, 0,h, 0,h, w,0, w,h])
  const texcoords  = new Float32Array([0,1, 1,1, 0,0, 0,0, 1,1, 1,0])
  const vao = gl.createVertexArray()!
  gl.bindVertexArray(vao)

  const posBuf = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
  const posLoc = gl.getAttribLocation(prog, 'a_position')
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  const uvBuf = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
  gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW)
  const uvLoc = gl.getAttribLocation(prog, 'a_texcoord')
  gl.enableVertexAttribArray(uvLoc)
  gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0)

  return vao
}

function loadImg(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => res(img)
    img.onerror = () => rej(new Error(`Failed: ${url}`))
    img.src = url
    setTimeout(() => rej(new Error('Timeout loading: ' + url)), 20000)
  })
}

// ── COMPONENT ─────────────────────────────────────────────────────────────

interface FloorRendererProps {
  width?:    number
  height?:   number
  bgUrl:     string    // diffuse.jpg
  hmsUrl?:   string    // hms.jpg (height-map-shadow)
  blendUrl:  string    // blend .webp texture
  coverage:  number    // 0–100
  shadowMult?: number  // default 8.0 — higher = stronger shadow edges
  onReady?:  () => void
  onError?:  (msg: string) => void
  style?:    React.CSSProperties
}

export default function FloorRenderer({
  width       = 1024,
  height      = 768,
  bgUrl,
  hmsUrl,
  blendUrl,
  coverage,
  shadowMult  = 8.0,
  onReady,
  onError,
  style,
}: FloorRendererProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const glRef      = useRef<WebGL2RenderingContext | null>(null)
  const seedRef    = useRef<[number, number]>([Math.random(), Math.random()])

  const render = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Init WebGL2 ──────────────────────────────────────────────────────
    let gl = glRef.current
    if (!gl) {
      gl = canvas.getContext('webgl2', {
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      })
      if (!gl) {
        onError?.('WebGL2 not supported — falling back to Canvas 2D')
        return
      }
      glRef.current = gl
    }

    canvas.width  = width
    canvas.height = height
    gl.viewport(0, 0, width, height)

    try {
      // ── Load textures ────────────────────────────────────────────────
      const [bgImg, blendImg] = await Promise.all([
        loadImg(bgUrl),
        loadImg(blendUrl),
      ])
      const hmsImg = hmsUrl ? await loadImg(hmsUrl).catch(() => null) : null

      // ── Build programs ───────────────────────────────────────────────
      const flakeProg  = createProgram(gl, VERTEX_SIMPLE,  FLAKE_FRAG)
      const shadowProg = createProgram(gl, VERTEX_SHADER,  SHADOW_FRAG)
      const compProg   = createProgram(gl, VERTEX_SIMPLE,  COMPOSITE_FRAG)
      const ortho      = orthoMatrix(width, height)

      // ── Bind textures ────────────────────────────────────────────────
      //  unit 0 = background (diffuse)
      //  unit 1 = blend (flake chip atlas)
      //  unit 2 = hms (height map)
      //  unit 5 = FBO output (ping-pong)
      const bgTex    = loadTexture(gl, bgImg,    0, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE)
      const blendTex = loadTexture(gl, blendImg, 1, gl.REPEAT, gl.REPEAT)
      const hmsTex   = hmsImg ? loadTexture(gl, hmsImg, 2) : null

      // ── Framebuffer for off-screen render ────────────────────────────
      const fbo    = createFBO(gl, width, height)
      const fbo2   = createFBO(gl, width, height)  // second ping-pong for shadow pass

      // ─────────────────────────────────────────────────────────────────
      // PASS 1: Render flake layer to FBO (flakeProg)
      //   → Tiles blend.webp across canvas, rotated by u_seed
      //   → u_flake_depth gates how many chips are visible
      // ─────────────────────────────────────────────────────────────────
      gl.useProgram(flakeProg)
      const flakeVao = setQuadBuffer(gl, flakeProg, width, height)
      gl.bindVertexArray(flakeVao)

      gl.uniformMatrix4fv(gl.getUniformLocation(flakeProg, 'u_matrix'), false, ortho)
      gl.uniform1i(gl.getUniformLocation(flakeProg, 'u_texture'),         1)  // blend chip atlas
      gl.uniform1i(gl.getUniformLocation(flakeProg, 'u_flake_texture'),   1)  // same (color from atlas)
      gl.uniform1i(gl.getUniformLocation(flakeProg, 'u_use_flake_texture'), 1)
      gl.uniform1f(gl.getUniformLocation(flakeProg, 'u_flake_depth'),   coverage / 100)
      gl.uniform2fv(gl.getUniformLocation(flakeProg, 'u_seed'),          seedRef.current)
      gl.uniform3f(gl.getUniformLocation(flakeProg, 'u_flake_colour'),   0.5, 0.5, 0.5)

      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.fb)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      // ─────────────────────────────────────────────────────────────────
      // PASS 2: HMS Shadow AO (shadowProg)
      //   → Takes FBO output + hms.jpg
      //   → Applies 6-scale 24-neighbor AO sampling
      //   → Output: flake layer with proper depth shadows
      // ─────────────────────────────────────────────────────────────────
      if (hmsTex) {
        gl.useProgram(shadowProg)
        const shadowVao = setQuadBuffer(gl, shadowProg, width, height)
        gl.bindVertexArray(shadowVao)

        gl.uniformMatrix4fv(gl.getUniformLocation(shadowProg, 'u_matrix'),      false, ortho)
        gl.uniform1i(gl.getUniformLocation(shadowProg, 'u_textureDepth'),         2)    // hms unit
        gl.uniform1i(gl.getUniformLocation(shadowProg, 'u_textureColour'),        5)    // fbo output
        gl.uniform2f(gl.getUniformLocation(shadowProg, 'u_resolution'),     width, height)
        gl.uniform1f(gl.getUniformLocation(shadowProg, 'u_shadowDepthMultiplier'), shadowMult)
        gl.uniform1f(gl.getUniformLocation(shadowProg, 'u_sampleSpacing'),         1.0)

        // Bind FBO1 output to unit 5 for shadow input
        gl.activeTexture(gl.TEXTURE5)
        gl.bindTexture(gl.TEXTURE_2D, fbo.tex)

        // Render shadow pass → FBO2
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo2.fb)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.disable(gl.BLEND)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }

      // ─────────────────────────────────────────────────────────────────
      // PASS 3: Final composite to screen (compProg)
      //   → background (diffuse) + flake layer (with AO if hms available)
      //   → u_coverage controls global blend opacity
      // ─────────────────────────────────────────────────────────────────
      gl.useProgram(compProg)
      const compVao = setQuadBuffer(gl, compProg, width, height)
      gl.bindVertexArray(compVao)

      gl.uniformMatrix4fv(gl.getUniformLocation(compProg, 'u_matrix'),    false, ortho)
      gl.uniform1i(gl.getUniformLocation(compProg, 'u_background'),        0)  // diffuse unit
      gl.uniform1f(gl.getUniformLocation(compProg, 'u_coverage'),   coverage / 100)

      // Use shadow-processed layer if available, else raw flake
      const flakeOutputTex = hmsTex ? fbo2.tex : fbo.tex
      gl.activeTexture(gl.TEXTURE5)
      gl.bindTexture(gl.TEXTURE_2D, flakeOutputTex)
      gl.uniform1i(gl.getUniformLocation(compProg, 'u_flake_layer'), 5)

      // Render to screen
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, width, height)
      gl.disable(gl.BLEND)
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      onReady?.()

    } catch (err) {
      console.error('[FloorRenderer]', err)
      onError?.(String(err))
    }
  }, [bgUrl, hmsUrl, blendUrl, coverage, width, height, shadowMult, onReady, onError])

  // Re-render whenever props change
  useEffect(() => {
    render()
  }, [render])

  // Randomize seed on mount
  useEffect(() => {
    seedRef.current = [Math.random(), Math.random()]
  }, [blendUrl])  // new seed when blend changes

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        display: 'block',
        maxWidth: '100%',
        ...style,
      }}
    />
  )
}
