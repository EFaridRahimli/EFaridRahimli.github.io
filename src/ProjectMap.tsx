import { useEffect, useRef, useState } from 'react'
import { embed2d } from './embed'
import { categories, categoryColor, projects } from './projects'

const DOTS = 14
const PAD = { x: 56, y: 44 }

// Embed once per page load: projects placed by text similarity of title, summary, stack and domain.
const positions = (() => {
  const pts = embed2d(projects.map((p) => [p.title, p.summary, p.stack.join(' '), p.category].join(' ')))
  // Display-only: nudge clusters apart that land on (almost) the same point, so both stay readable.
  for (let it = 0; it < 60; it++) {
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[j][0] - pts[i][0], dy = pts[j][1] - pts[i][1]
        const d = Math.hypot(dx, dy)
        if (d < 0.14) {
          const push = (0.14 - d) / 2, ux = d ? dx / d : 1, uy = d ? dy / d : 0
          pts[i] = [pts[i][0] - ux * push, pts[i][1] - uy * push]
          pts[j] = [pts[j][0] + ux * push, pts[j][1] + uy * push]
        }
      }
  }
  return pts.map(([x, y]) => [Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y))] as const)
})()

// Per-dot offsets stay in unit space so a resize rescales clusters instead of re-scattering them.
const dots = projects.flatMap((_, c) =>
  Array.from({ length: DOTS }, () => {
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random())
    // sx/sy: scattered start point for the one-time "settle" into the embedding.
    return { c, ox: Math.cos(a) * r, oy: Math.sin(a) * r, seed: Math.random() * 1000, sx: Math.random(), sy: Math.random() }
  }),
)

const coarse = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches

export function ProjectMap({ onPick }: { onPick: (repo: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pickRef = useRef(onPick)
  const [active, setActive] = useState(-1)
  const activeRef = useRef(-1)

  useEffect(() => {
    pickRef.current = onPick
  }, [onPick])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, R = 0, raf = 0, visible = true, dirty = true, start = -1

    // Padding scales with the slide so wide screens pull clusters inward instead of into the corners.
    const centre = (c: number) => {
      const px = Math.max(PAD.x, w * 0.14), py = Math.max(PAD.y, h * 0.16)
      return { x: px + positions[c][0] * (w - px * 2), y: py + positions[c][1] * (h - py * 2) }
    }
    const setHover = (c: number) => {
      if (c < 0) canvas.style.cursor = ''
      if (c === activeRef.current) return
      activeRef.current = c
      setActive(c)
      dirty = true
    }
    const nearest = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left, y = e.clientY - rect.top
      let best = -1, bestD = (R * 2.4) ** 2
      projects.forEach((_, c) => {
        const p = centre(c), d = (p.x - x) ** 2 + (p.y - y) ** 2
        if (d < bestD) { bestD = d; best = c }
      })
      return best
    }

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.max(14, Math.min(w, h) * 0.055)
      dirty = true
    }

    const draw = (t: number) => {
      const act = activeRef.current
      if (start < 0) start = t
      // Ease-out from scattered noise to the embedded layout over 1.6s, once per page load.
      const settle = reduced ? 1 : 1 - (1 - Math.min(1, (t - start) / 1600)) ** 4
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        const p = centre(d.c)
        const on = act === d.c
        const wob = reduced ? 0 : 0.18
        const k = on ? 0.6 : 1
        const hx = p.x + (d.ox * k + Math.sin(t * 0.0006 + d.seed) * wob) * R
        const hy = p.y + (d.oy * k + Math.cos(t * 0.0005 + d.seed * 1.7) * wob) * R
        const x = d.sx * w + (hx - d.sx * w) * settle
        const y = d.sy * h + (hy - d.sy * h) * settle
        ctx.globalAlpha = act < 0 ? 0.75 : on ? 1 : 0.18
        ctx.fillStyle = categoryColor[projects[d.c].category]
        ctx.beginPath()
        ctx.arc(x, y, on ? 2.4 : 1.9, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (act >= 0) {
        const p = projects[act], c = centre(act)
        const title = p.title, metric = p.metric ? `  ${p.metric} ${p.metricLabel}` : ''
        const titleFont = '500 15px Archivo, system-ui, sans-serif'
        const metricFont = '400 14px Archivo, system-ui, sans-serif'
        ctx.font = titleFont
        const tw = ctx.measureText(title).width
        ctx.font = metricFont
        const mw = ctx.measureText(metric).width
        // Keep the label inside the canvas: above the cluster, or below it near the top edge.
        const x = Math.min(Math.max(c.x - (tw + mw) / 2, 8), w - tw - mw - 8)
        const y = c.y - R * 1.6 < 18 ? c.y + R * 1.6 + 12 : c.y - R * 1.6
        ctx.textAlign = 'left'
        ctx.fillStyle = '#e8ece6'
        ctx.font = titleFont
        ctx.fillText(title, x, y)
        ctx.fillStyle = categoryColor[p.category]
        ctx.font = metricFont
        ctx.fillText(metric, x + tw, y)
      }
    }

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible || (reduced && !dirty)) return
      dirty = false
      draw(t)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const c = nearest(e)
      canvas.style.cursor = c >= 0 ? 'pointer' : ''
      setHover(c)
    }
    // Touch fires pointerleave after every tap, which would wipe the tap preview; only a mouse "leaves".
    const onLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') setHover(-1) }
    const onClick = (e: MouseEvent) => {
      // Mouse: click what is highlighted, so a click at the edge of the hover radius never misses.
      const c = !coarse && activeRef.current >= 0 ? activeRef.current : nearest(e)
      if (c < 0) return setHover(-1)
      // Touch: first tap previews, second tap on the same cluster jumps. Mouse: click jumps.
      if (coarse && activeRef.current !== c) return setHover(c)
      pickRef.current(projects[c].repo)
    }
    const onScroll = () => { if (!coarse) setHover(-1) }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    // Only animate while the map is on screen.
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; dirty = true })
    io.observe(canvas)
    raf = requestAnimationFrame(frame)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onClick)
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onClick)
      removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <figure className="map">
      <div className="slide map__slide">
        <canvas ref={canvasRef} className="map__canvas" aria-hidden="true" />
      </div>
      <figcaption className="map__caption">
        <p className="sr-only" aria-live="polite">{coarse && active >= 0 ? `${projects[active].title} selected. Tap again to jump to it.` : ''}</p>
        <p className="map__note">
          Each cluster is one project, placed by how similar its write-up is to the others (TF-IDF and MDS), so closer
          clusters are more alike. {coarse ? 'Tap a cluster to see it, then tap again to jump to it.' : 'Hover a cluster to see it, click to jump to it.'}
        </p>
        <ul className="legend" aria-label="Domains">
          {categories.map((c) => (
            <li key={c}><span className="dot" style={{ background: categoryColor[c] }} aria-hidden="true" />{c}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
