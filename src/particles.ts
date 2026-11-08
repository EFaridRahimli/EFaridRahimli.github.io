// Dissolves the visible text and drawings of one view into particles and re-forms them as the next.
// Technique: draw the view's rendered words and images onto an offscreen canvas at their real
// positions, keep pixels with ink, pair them with the next view's pixels, and tween.

export type Pt = { x: number; y: number }

const STRETCH: Record<string, string> = {
  '50%': 'ultra-condensed', '62.5%': 'extra-condensed', '75%': 'condensed', '87.5%': 'semi-condensed',
  '100%': 'normal', '112.5%': 'semi-expanded', '125%': 'expanded', '150%': 'extra-expanded', '200%': 'ultra-expanded',
}

const caseOf = (s: string, t: string) => (t === 'uppercase' ? s.toUpperCase() : t === 'lowercase' ? s.toLowerCase() : s)

/** Ink pixels of everything inside `root` that is on screen, sampled every `step` CSS px, at most `cap` points. */
export function sample(root: HTMLElement, step: number, cap: number): Pt[] {
  const w = innerWidth, h = innerHeight
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d', { willReadFrequently: true })!
  const range = document.createRange()
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)

  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement
    if (!el || el.closest('[data-no-particles]')) continue
    const cs = getComputedStyle(el)
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    ctx.fontStretch = (STRETCH[cs.fontStretch] ?? 'normal') as CanvasFontStretch
    ctx.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing
    const text = n.textContent ?? ''
    for (const m of text.matchAll(/\S+/g)) {
      range.setStart(n, m.index)
      range.setEnd(n, m.index + m[0].length)
      const r = range.getClientRects()[0]
      if (!r || r.width < 2 || r.bottom < 0 || r.top > h) continue // hidden, sr-only or off screen
      const word = caseOf(m[0], cs.textTransform)
      const mt = ctx.measureText(word)
      ctx.fillText(word, r.left, r.top + (r.height - mt.fontBoundingBoxAscent - mt.fontBoundingBoxDescent) / 2 + mt.fontBoundingBoxAscent)
    }
  }
  for (const img of root.querySelectorAll('img')) {
    const r = img.getBoundingClientRect()
    if (img.complete && img.naturalWidth && r.bottom > 0 && r.top < h) ctx.drawImage(img, r.left, r.top, r.width, r.height)
  }

  const d = ctx.getImageData(0, 0, w, h).data
  const pts: Pt[] = []
  for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) if (d[(y * w + x) * 4 + 3] > 110) pts.push({ x, y })
  for (let i = pts.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    ;[pts[i], pts[j]] = [pts[j], pts[i]]
  }
  return pts.slice(0, cap)
}

const easeOut = (t: number) => 1 - (1 - t) ** 3
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/** Pads the shorter list by repeating its points, then pairs left-to-right so the cloud flows rather than swaps. */
function pair(a: Pt[], b: Pt[]) {
  const n = Math.max(a.length, b.length, 1)
  const fill = (p: Pt[]) =>
    p.length
      ? Array.from({ length: n }, (_, i) => p[i % p.length])
      : Array.from({ length: n }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight }))
  const sortBy = (p: Pt[]) =>
    p.map((q) => [q.x + q.y * 0.35 + Math.random() * 60, q] as const).sort((x, y) => x[0] - y[0]).map((x) => x[1])
  return [sortBy(fill(a)), sortBy(fill(b))] as const
}

// in flight the ink shifts toward the accent and settles back to ink
const INK = [17, 18, 20]
const ACCENT = [31, 59, 255]
const SHADES = Array.from({ length: 6 }, (_, i) => `rgb(${INK.map((v, j) => Math.round(v + ((ACCENT[j] - v) * i) / 5)).join(',')})`)

export class ParticleLayer {
  private ctx: CanvasRenderingContext2D
  private raf = 0
  private cur: Pt[] = []
  private size = 2
  private canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
  }

  /** Stops a running transition and returns where the particles are now. */
  stop(): Pt[] {
    cancelAnimationFrame(this.raf)
    return this.cur
  }

  clear() {
    this.stop()
    this.cur = []
    this.ctx.clearRect(0, 0, innerWidth, innerHeight)
  }

  /** Disperse `from`, then fuse into `to`. Resolves when the particles have settled. */
  run(from: Pt[], to: Pt[], step: number, duration = 1250): Promise<void> {
    this.stop()
    const dpr = Math.min(devicePixelRatio || 1, 2)
    this.canvas.width = innerWidth * dpr
    this.canvas.height = innerHeight * dpr
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.size = Math.max(1.4, step * 0.62)

    const [a, b] = pair(from, to)
    const n = a.length
    const off = a.map(() => {
      const ang = Math.random() * Math.PI * 2
      const r = 40 + Math.random() * 150
      return { x: Math.cos(ang) * r, y: Math.sin(ang) * r - 30 }
    })
    const delay = b.map((p) => (p.x / innerWidth) * 0.16 + Math.random() * 0.08)
    const span = 1 - 0.24
    this.cur = a.map((p) => ({ ...p }))
    const buckets: number[][] = SHADES.map(() => [])
    const t0 = performance.now()
    const { ctx } = this

    return new Promise((resolve) => {
      const frame = (now: number) => {
        const t = Math.min(1, (now - t0) / duration)
        buckets.forEach((q) => (q.length = 0))
        for (let i = 0; i < n; i++) {
          const u = Math.min(1, Math.max(0, (t - delay[i]) / span))
          const p = this.cur[i]
          const sx = a[i].x + off[i].x, sy = a[i].y + off[i].y
          if (u < 0.32) {
            const e = easeOut(u / 0.32)
            p.x = a[i].x + off[i].x * e
            p.y = a[i].y + off[i].y * e
          } else {
            const e = easeInOut((u - 0.32) / 0.68)
            p.x = sx + (b[i].x - sx) * e
            p.y = sy + (b[i].y - sy) * e
          }
          buckets[Math.round(Math.sin(Math.PI * u) * 5)].push(i)
        }
        ctx.clearRect(0, 0, innerWidth, innerHeight)
        buckets.forEach((q, k) => {
          ctx.fillStyle = SHADES[k]
          for (const i of q) ctx.fillRect(this.cur[i].x, this.cur[i].y, this.size, this.size)
        })
        if (t < 1) this.raf = requestAnimationFrame(frame)
        else resolve()
      }
      this.raf = requestAnimationFrame(frame)
    })
  }
}
