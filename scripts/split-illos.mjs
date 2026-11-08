// Splits each traced drawing in public/illos into ~6 movable parts for the scroll animation.
// A Potrace path is one `d` of many contours; outer contours and their holes are regrouped,
// then clustered by position (k-means) so each part moves as a unit.
// Run: node scripts/split-illos.mjs   (idempotent: re-reads the single-path or split files)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const DIR = new URL('../public/illos/', import.meta.url)
const K = 6
const FILL = '#e8e6e1'

const contoursOf = (svg) => [...svg.matchAll(/ d="([^"]+)"/g)].flatMap((m) => m[1].split(/(?=M)/).map((s) => s.trim()).filter(Boolean))

function shape(d) {
  const n = d.match(/-?\d+(\.\d+)?/g).map(Number)
  const pts = []
  for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]])
  let area = 0, minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  pts.forEach(([x, y], i) => {
    const [x2, y2] = pts[(i + 1) % pts.length]
    area += x * y2 - x2 * y
    minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y)
  })
  return { d, pts, area: Math.abs(area / 2), box: [minX, minY, maxX, maxY], cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 }
}

const inside = ([x, y], s) => {
  const [a, b, c, d] = s.box
  if (x < a || x > c || y < b || y > d) return false
  let hit = false
  for (let i = 0, j = s.pts.length - 1; i < s.pts.length; j = i++) {
    const [xi, yi] = s.pts[i], [xj, yj] = s.pts[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

/** Even-odd nesting: a contour's parent is the smallest contour around it; odd depth means hole. */
function regroup(shapes) {
  const parent = shapes.map((s, i) =>
    shapes.reduce((best, o, j) => (j !== i && o.area > s.area && inside(s.pts[0], o) && (best < 0 || o.area < shapes[best].area) ? j : best), -1),
  )
  const depth = (i) => (parent[i] < 0 ? 0 : 1 + depth(parent[i]))
  const groups = new Map()
  shapes.forEach((s, i) => {
    const owner = depth(i) % 2 ? parent[i] : i
    if (!groups.has(owner)) groups.set(owner, { ...shapes[owner], d: [] })
    groups.get(owner).d.push(s.d)
  })
  return [...groups.values()]
}

function kmeans(items, k) {
  // farthest-point seeding keeps the result deterministic
  const c = [items.reduce((a, b) => (b.area > a.area ? b : a))].map((p) => [p.cx, p.cy])
  while (c.length < Math.min(k, items.length)) {
    const far = items.reduce((best, p) => {
      const dist = Math.min(...c.map(([x, y]) => (p.cx - x) ** 2 + (p.cy - y) ** 2))
      return dist > best.dist ? { p, dist } : best
    }, { p: items[0], dist: -1 }).p
    c.push([far.cx, far.cy])
  }
  let label = []
  for (let it = 0; it < 20; it++) {
    label = items.map((p) => c.reduce((bi, [x, y], i) => ((p.cx - x) ** 2 + (p.cy - y) ** 2 < (p.cx - c[bi][0]) ** 2 + (p.cy - c[bi][1]) ** 2 ? i : bi), 0))
    c.forEach((_, i) => {
      const m = items.filter((_, j) => label[j] === i)
      const w = m.reduce((s, p) => s + p.area + 1, 0)
      if (m.length) c[i] = [m.reduce((s, p) => s + p.cx * (p.area + 1), 0) / w, m.reduce((s, p) => s + p.cy * (p.area + 1), 0) / w]
    })
  }
  return { c, label }
}

for (const f of readdirSync(DIR).filter((f) => f.endsWith('.svg'))) {
  const svg = readFileSync(new URL(f, DIR), 'utf8')
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1]
  const [, , W, H] = viewBox.split(' ').map(Number)
  const shapes = contoursOf(svg).map(shape)
  const groups = regroup(shapes)
  const { c, label } = kmeans(groups, K)
  const parts = c.map(([x, y], i) => {
    const ds = groups.filter((_, j) => label[j] === i).flatMap((g) => g.d)
    if (!ds.length) return ''
    const vx = x - W / 2, vy = y - H / 2, len = Math.hypot(vx, vy) || 1
    const push = 34 + ((i * 13) % 22) // 34–55 drawing units outward
    const dx = ((vx / len) * push).toFixed(1), dy = ((vy / len) * push).toFixed(1)
    const r = ((i % 2 ? 1 : -1) * (2 + (i % 3))).toFixed(0)
    return `<g class="part" style="--dx:${dx}px;--dy:${dy}px;--r:${r}deg"><path fill-rule="evenodd" d="${ds.join('')}"/></g>`
  })
  writeFileSync(new URL(f, DIR), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="${FILL}">${parts.join('')}</svg>`)
  console.log(f, `${shapes.length} contours -> ${groups.length} shapes -> ${parts.filter(Boolean).length} parts`)
}
