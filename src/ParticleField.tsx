import { useEffect, useRef } from 'react'
import { categoryColor, projects } from './projects'

type Particle = { x: number; y: number; vx: number; vy: number; hx: number; hy: number; c: number; seed: number }
type Cluster = { x: number; y: number; color: string; repo: string; title: string }

const LINK_DIST = 48

// Each project is a cluster of points: an "embedding space" of the portfolio.
// Hovering a cluster names it, clicking it calls onPick, and `focus` makes clusters gather and glow.
export function ParticleField({ focus, onPick }: { focus: ReadonlySet<string> | null; onPick: (repo: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const focusRef = useRef(focus)
  const pickRef = useRef(onPick)
  const dirtyRef = useRef(true)

  useEffect(() => {
    focusRef.current = focus
    dirtyRef.current = true
  }, [focus])
  useEffect(() => {
    pickRef.current = onPick
  }, [onPick])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, spread = 0, per = 0
    let clusters: Cluster[] = []
    let particles: Particle[] = []
    let mouse: { x: number; y: number } | null = null
    let hovered = -1
    let hitEl: HTMLElement | null = null
    let raf = 0

    const layout = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = innerWidth
      h = innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const narrow = w < 760
      spread = Math.min(w, h) * (narrow ? 0.05 : 0.045)
      // Desktop: keep clusters right of the hero copy. Narrow: above it.
      const cx = narrow ? w * 0.5 : w * 0.7
      const cy = narrow ? h * 0.36 : h * 0.5
      const rx = narrow ? w * 0.4 : w * 0.24
      const ry = narrow ? h * 0.24 : h * 0.3
      // Golden-angle spiral keeps clusters evenly spaced without overlap.
      clusters = projects.map((p, i) => {
        const r = Math.sqrt((i + 0.6) / projects.length)
        const a = i * 2.39996 + 0.8
        return { x: cx + Math.cos(a) * r * rx, y: cy + Math.sin(a) * r * ry, color: categoryColor[p.category], repo: p.repo, title: p.title }
      })
      const total = Math.max(110, Math.min(340, Math.round((w * h) / 4200)))
      per = Math.floor(total / clusters.length)
      particles = []
      clusters.forEach((cl, c) => {
        for (let k = 0; k < per; k++) {
          const g = () => (Math.random() + Math.random() + Math.random() - 1.5) * spread * 1.6
          const hx = cl.x + g(), hy = cl.y + g()
          particles.push({ x: hx + (Math.random() - 0.5) * 40, y: hy + (Math.random() - 0.5) * 40, vx: 0, vy: 0, hx, hy, c, seed: Math.random() * 1000 })
        }
      })
      dirtyRef.current = true
    }

    const nearest = (x: number, y: number) => {
      let best = -1, bestD = (spread * 2.4) ** 2
      clusters.forEach((cl, i) => {
        const d = (cl.x - x) ** 2 + (cl.y - y) ** 2
        if (d < bestD) { bestD = d; best = i }
      })
      return best
    }

    // Only the empty field area (hero) is interactive; links and buttons keep their own behaviour.
    const fieldTarget = (t: EventTarget | null) => {
      const el = t instanceof Element ? t : null
      return el && !el.closest('a,button') ? (el.closest('[data-field-hit]') as HTMLElement | null) : null
    }

    const onMove = (e: PointerEvent) => {
      mouse = { x: e.clientX, y: e.clientY }
      const el = fieldTarget(e.target)
      const next = el ? nearest(e.clientX, e.clientY) : -1
      if (hitEl && hitEl !== el) hitEl.style.cursor = ''
      hitEl = el
      if (el) el.style.cursor = next >= 0 ? 'pointer' : ''
      if (next !== hovered) { hovered = next; dirtyRef.current = true }
    }
    const onLeave = () => { mouse = null; if (hovered !== -1) { hovered = -1; dirtyRef.current = true } }
    const onClick = (e: MouseEvent) => {
      if (!fieldTarget(e.target)) return
      const i = nearest(e.clientX, e.clientY)
      if (i >= 0) pickRef.current(clusters[i].repo)
    }

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      if (reduced && !dirtyRef.current) return
      dirtyRef.current = false
      const focusSet = focusRef.current
      const active = (c: number) => (hovered >= 0 ? hovered === c : focusSet ? focusSet.has(clusters[c].repo) : false)
      const anyActive = hovered >= 0 || !!focusSet

      for (const p of particles) {
        const cl = clusters[p.c]
        const on = active(p.c)
        const pull = on ? 0.42 : 1
        let tx = cl.x + (p.hx - cl.x) * pull
        let ty = cl.y + (p.hy - cl.y) * pull
        if (reduced) { p.x = tx; p.y = ty; continue }
        tx += Math.sin(t * 0.0005 + p.seed) * spread * 0.35
        ty += Math.cos(t * 0.0004 + p.seed * 1.3) * spread * 0.35
        p.vx += (tx - p.x) * (on ? 0.006 : 0.0025)
        p.vy += (ty - p.y) * (on ? 0.006 : 0.0025)
        if (mouse && p.c !== hovered) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy
          if (d2 < 9000 && d2 > 1) { const f = ((1 - d2 / 9000) * 0.9) / Math.sqrt(d2); p.vx += dx * f; p.vy += dy * f }
        }
        p.vx *= 0.9
        p.vy *= 0.9
        p.x += p.vx
        p.y += p.vy
      }

      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 0.6
      clusters.forEach((cl, c) => {
        const on = active(c)
        const alpha = on ? 1 : anyActive ? 0.25 : 0.6
        const start = c * per, end = start + per
        ctx.strokeStyle = cl.color
        ctx.globalAlpha = (on ? 0.32 : 0.1) * alpha
        ctx.beginPath()
        for (let i = start; i < end; i++) {
          const a = particles[i]
          for (let j = i + 1; j < end; j++) {
            const b = particles[j]
            const dx = a.x - b.x, dy = a.y - b.y
            if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y) }
          }
        }
        ctx.stroke()
        ctx.fillStyle = cl.color
        ctx.globalAlpha = (on ? 0.95 : 0.55) * alpha
        ctx.beginPath()
        const r = on ? 1.6 : 1.1
        for (let i = start; i < end; i++) { const p = particles[i]; ctx.moveTo(p.x + r, p.y); ctx.arc(p.x, p.y, r, 0, Math.PI * 2) }
        ctx.fill()
        if (on) {
          ctx.globalAlpha = 0.9
          ctx.font = '500 11px "Geist Mono", ui-monospace, monospace'
          ctx.textAlign = 'center'
          // Label below clusters near the top so it never sits under the nav.
          ctx.fillText(cl.title.toUpperCase(), cl.x, cl.y < h * 0.3 ? cl.y + spread * 2.5 : cl.y - spread * 2.1)
        }
      })
      ctx.globalAlpha = 1
    }

    layout()
    raf = requestAnimationFrame(frame)
    addEventListener('resize', layout)
    addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', layout)
      removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      removeEventListener('click', onClick)
    }
  }, [])

  return <canvas ref={canvasRef} className="field" aria-hidden="true" />
}
