// Places documents in 2D by text similarity: TF-IDF vectors, cosine distance, classical MDS.
const STOP = new Set(
  'a an and the of to in for with on at by from as is it its that this into than then so are be or via each their them per one two'.split(' '),
)

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2 && !STOP.has(t))
}

function tfidf(docs: string[][]): Map<string, number>[] {
  const df = new Map<string, number>()
  for (const d of docs) for (const t of new Set(d)) df.set(t, (df.get(t) ?? 0) + 1)
  return docs.map((d) => {
    const v = new Map<string, number>()
    for (const t of d) v.set(t, (v.get(t) ?? 0) + 1)
    let norm = 0
    for (const [t, c] of v) {
      const w = c * (Math.log((1 + docs.length) / (1 + df.get(t)!)) + 1)
      v.set(t, w)
      norm += w * w
    }
    norm = Math.sqrt(norm) || 1
    for (const [t, w] of v) v.set(t, w / norm)
    return v
  })
}

const cosine = (a: Map<string, number>, b: Map<string, number>) => {
  let s = 0
  for (const [t, w] of a) s += w * (b.get(t) ?? 0)
  return s
}

// Leading eigenvector of a symmetric matrix by power iteration (deterministic start).
function topEigen(m: number[][]): { value: number; vector: number[] } {
  const n = m.length
  let v = Array.from({ length: n }, (_, i) => i + 1)
  for (let it = 0; it < 500; it++) {
    const next = m.map((row) => row.reduce((s, x, j) => s + x * v[j], 0))
    const norm = Math.hypot(...next) || 1
    v = next.map((x) => x / norm)
  }
  // Rayleigh quotient keeps the sign of the eigenvalue.
  const value = v.reduce((s, x, i) => s + x * m[i].reduce((a, y, j) => a + y * v[j], 0), 0)
  return { value, vector: v }
}

/** Returns one [x, y] per document, each normalised to the range 0..1. */
export function embed2d(texts: string[]): [number, number][] {
  const n = texts.length
  const vecs = tfidf(texts.map(tokenize))
  const d2 = vecs.map((a) => vecs.map((b) => (1 - cosine(a, b)) ** 2))
  // Double-centre the squared distances: B = -1/2 * J * D² * J.
  const rowMean = d2.map((r) => r.reduce((s, x) => s + x, 0) / n)
  const all = rowMean.reduce((s, x) => s + x, 0) / n
  let b = d2.map((r, i) => r.map((x, j) => -0.5 * (x - rowMean[i] - rowMean[j] + all)))
  const coords: number[][] = []
  for (let k = 0; k < 2; k++) {
    const { value, vector } = topEigen(b)
    const scale = Math.sqrt(Math.max(value, 0))
    coords.push(vector.map((x) => x * scale))
    b = b.map((r, i) => r.map((x, j) => x - value * vector[i] * vector[j]))
  }
  const norm = (xs: number[]) => {
    const lo = Math.min(...xs), hi = Math.max(...xs)
    return xs.map((x) => (hi - lo ? (x - lo) / (hi - lo) : 0.5))
  }
  const [xs, ys] = coords.map(norm)
  return xs.map((x, i) => [x, ys[i]])
}
