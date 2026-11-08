import { useCallback, useMemo, useState } from 'react'
import { ParticleField } from './ParticleField'
import { categories, categoryColor, projects, serengetiLogs, type Category, type Project } from './projects'

const GITHUB = 'https://github.com/EFaridRahimli'
const EMAIL = 'erahimlif@gmail.com'
const YEAR = new Date().getFullYear()
const repoUrl = (repo: string) => `${GITHUB}/${repo}`

const featured = projects.filter((p) => p.visual)
const others = projects.filter((p) => !p.visual)

const skills = ['Python', 'PyTorch', 'TensorFlow / Keras', 'YOLO', 'scikit-learn', 'XGBoost', 'AutoGluon', 'NLTK', 'AWS SageMaker', 'Lambda', 'Step Functions', 'React', 'TypeScript']

function SerengetiChart() {
  const W = 600, H = 375, px = 44, py = 36
  const lo = 0.66, hi = 0.82
  const x = (i: number) => px + (i / 19) * (W - px * 2)
  const y = (v: number) => H - py - ((v - lo) / (hi - lo)) * (H - py * 2)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Validation accuracy per epoch: ResNet-50 81.1%, VGG-19 81.0%, MobileNetV2 78.4%">
      {[0.7, 0.75, 0.8].map((v) => (
        <g key={v}>
          <line x1={px} x2={W - px} y1={y(v)} y2={y(v)} className="chart__grid" />
          <text x={px - 8} y={y(v) + 4} textAnchor="end" className="chart__tick">{Math.round(v * 100)}%</text>
        </g>
      ))}
      <text x={W - px} y={H - 10} textAnchor="end" className="chart__tick">epoch 20</text>
      {serengetiLogs.map((s) => (
        <polyline key={s.model} fill="none" stroke={s.color} strokeWidth="1.4" points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
      ))}
      {serengetiLogs.map((s, i) => (
        <g key={s.model} transform={`translate(${px + 8} ${py + i * 20})`}>
          <line x1="0" x2="16" y1="-4" y2="-4" stroke={s.color} strokeWidth="1.4" />
          <text x="24" y="0" className="chart__legend">{s.model} · {(s.values[19] * 100).toFixed(1)}%</text>
        </g>
      ))}
    </svg>
  )
}

function CamelotWheel() {
  // Source key 8A and its harmonic neighbours: 7A, 9A (±1) and 8B (relative major).
  const match = new Set(['7A', '9A', '8B'])
  const cx = 300, cy = 188
  const seg = (n: number, ring: 'A' | 'B') => {
    const a = ((n - 1) / 12) * Math.PI * 2 - Math.PI / 2
    const r = ring === 'B' ? 140 : 96
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  }
  return (
    <svg viewBox="0 0 600 375" role="img" aria-label="Camelot wheel showing key 8A and its compatible keys 7A, 9A and 8B">
      {[58, 118, 162].map((r) => <circle key={r} cx={cx} cy={cy} r={r} className="chart__grid" fill="none" />)}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2 + Math.PI / 12
        return <line key={i} x1={cx + Math.cos(a) * 58} y1={cy + Math.sin(a) * 58} x2={cx + Math.cos(a) * 162} y2={cy + Math.sin(a) * 162} className="chart__grid" />
      })}
      {(['A', 'B'] as const).flatMap((ring) =>
        Array.from({ length: 12 }, (_, i) => {
          const key = `${i + 1}${ring}`
          const p = seg(i + 1, ring)
          const cls = key === '8A' ? 'wheel__key is-source' : match.has(key) ? 'wheel__key is-match' : 'wheel__key'
          return <text key={key} x={p.x} y={p.y + 4} textAnchor="middle" className={cls}>{key}</text>
        }),
      )}
      <text x={cx} y={cy + 5} textAnchor="middle" className="wheel__center">8A</text>
    </svg>
  )
}

function Visual({ p }: { p: Project }) {
  const v = p.visual!
  if (v.kind === 'image') return <img src={v.src} alt={v.alt} width={1200} height={750} loading="lazy" decoding="async" />
  return v.kind === 'serengeti' ? <SerengetiChart /> : <CamelotWheel />
}

function Dot({ c }: { c: Category }) {
  return <span className="dot" style={{ background: categoryColor[c] }} aria-hidden="true" />
}

type CardProps = { p: Project; flash: boolean; onHover: (repo: string | null) => void }

function FeaturedCard({ p, flash, onHover }: CardProps) {
  return (
    <article
      id={`p-${p.repo}`}
      className={flash ? 'feature glass is-flash' : 'feature glass'}
      onPointerEnter={() => onHover(p.repo)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(p.repo)}
      onBlur={() => onHover(null)}
    >
      <div className="feature__media">
        <Visual p={p} />
      </div>
      <div className="feature__body">
        <p className="meta"><Dot c={p.category} />{p.category}<span className="meta__year">{p.year}</span></p>
        <h3><a className="stretch" href={repoUrl(p.repo)} target="_blank" rel="noreferrer">{p.title}</a></h3>
        {p.metric ? (
          <p className="metric"><strong>{p.metric}</strong> {p.metricLabel}</p>
        ) : null}
        <p className="feature__summary">{p.summary}</p>
        <div className="feature__foot">
          <ul className="tags" aria-label="Tech stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          {p.demo ? <a className="demo" href={p.demo} target="_blank" rel="noreferrer">Live demo ↗</a> : null}
        </div>
      </div>
    </article>
  )
}

function Row({ p, flash, onHover }: CardProps) {
  return (
    <li id={`p-${p.repo}`} className={flash ? 'row is-flash' : 'row'} onPointerEnter={() => onHover(p.repo)} onPointerLeave={() => onHover(null)}>
      <a href={repoUrl(p.repo)} target="_blank" rel="noreferrer" onFocus={() => onHover(p.repo)} onBlur={() => onHover(null)}>
        <span className="row__title"><Dot c={p.category} />{p.title}</span>
        <span className="row__summary">{p.summary}</span>
        <span className="row__metric">{p.metric ? <><strong>{p.metric}</strong> {p.metricLabel}</> : p.stack.join(' · ')}</span>
        <span className="row__year">{p.year} ↗</span>
      </a>
    </li>
  )
}

function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copy = () =>
    navigator.clipboard.writeText(EMAIL).then(
      () => setState('copied'),
      () => setState('failed'),
    )
  return (
    <button type="button" className="btn" onClick={copy}>
      {state === 'copied' ? 'Copied ✓' : state === 'failed' ? 'Copy failed: use the link' : 'Copy email'}
    </button>
  )
}

export default function App() {
  const [filter, setFilter] = useState<Category | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [flash, setFlash] = useState<string | null>(null)

  const focus = useMemo<ReadonlySet<string> | null>(() => {
    if (hovered) return new Set([hovered])
    return filter ? new Set(projects.filter((p) => p.category === filter).map((p) => p.repo)) : null
  }, [hovered, filter])

  const pick = useCallback((repo: string) => {
    setFilter(null)
    setFlash(repo)
    // Wait for the unfiltered list to render before scrolling to the project.
    requestAnimationFrame(() => {
      const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(`p-${repo}`)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' })
    })
    setTimeout(() => setFlash((f) => (f === repo ? null : f)), 1800)
  }, [])

  const inFilter = (p: Project) => !filter || p.category === filter
  const shownFeatured = featured.filter(inFilter)
  const shownOthers = others.filter(inFilter)

  return (
    <>
      <ParticleField focus={focus} onPick={pick} />
      <a className="skip" href="#work">Skip to projects</a>

      <header className="nav glass">
        <a href="#top" className="nav__name">Farid Rahimli</a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" data-field-hit>
          <div className="hero__copy">
            <p className="eyebrow">Data scientist · ML engineer · MSc AI, Data Science &amp; Digital Business</p>
            <h1>I build machine learning that holds up outside the notebook.</h1>
            <p className="hero__lead">
              Crop-disease detection, wildlife camera traps, serverless pipelines on AWS. Every result here comes with
              code and an honest benchmark.
            </p>
            <div className="hero__cta">
              <a className="btn btn--solid" href="#work">See the work</a>
              <a className="btn" href={`mailto:${EMAIL}`}>Get in touch</a>
            </div>
          </div>
          <p className="hint" aria-hidden="true">
            <span className="hint__pulse" />Each cluster is a project. Hover to read it, click to open it.
          </p>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title">Selected work</h2>
            <div className="filters" role="group" aria-label="Filter projects by category">
              <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)}>
                All <span>{projects.length}</span>
              </button>
              {categories.map((c) => (
                <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(filter === c ? null : c)}>
                  <Dot c={c} />{c} <span>{projects.filter((p) => p.category === c).length}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{shownFeatured.length + shownOthers.length} projects shown</p>

          {shownFeatured.length ? (
            <div className="features">
              {shownFeatured.map((p) => <FeaturedCard key={p.repo} p={p} flash={flash === p.repo} onHover={setHovered} />)}
            </div>
          ) : null}

          {shownOthers.length ? (
            <div className="more glass">
              <h3 className="more__title">{shownFeatured.length ? 'More projects' : 'Projects'}</h3>
              <ul>{shownOthers.map((p) => <Row key={p.repo} p={p} flash={flash === p.repo} onHover={setHovered} />)}</ul>
            </div>
          ) : null}
        </section>

        <section id="about" className="about glass" aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <div className="about__body">
            <p>
              I'm an MSc student in AI, Data Science and Digital Business. I like problems where a model has to earn its
              place: choosing between ResNet-50 and MobileNetV2 for a battery-powered camera, or adding a confidence gate
              so weak predictions never reach production.
            </p>
            <ul className="tags tags--lg" aria-label="Skills">{skills.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="eyebrow">Get in touch</h2>
          <a className="contact__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className="hero__cta">
            <CopyEmail />
            <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">github.com/EFaridRahimli ↗</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {YEAR} Farid Rahimli</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}
