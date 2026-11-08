import { useCallback, useState } from 'react'
import { ProjectMap } from './ProjectMap'
import { categories, categoryColor, projects, serengetiLogs, yoloResults, type Category, type Project } from './projects'

const GITHUB = 'https://github.com/EFaridRahimli'
const EMAIL = 'erahimlif@gmail.com'
const YEAR = new Date().getFullYear()
const repoUrl = (repo: string) => `${GITHUB}/${repo}`

const featured = projects.filter((p) => p.visual)
const others = projects.filter((p) => !p.visual)
const countIn = (c: Category) => projects.filter((p) => p.category === c).length

const Icon = ({ d }: { d: string }) => (
  <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)
const External = () => <Icon d="M5 11 11 5M6.5 5H11v4.5" />
const Up = () => <Icon d="M8 13V3M4 7l4-4 4 4" />
const Check = () => <Icon d="m3.5 8.5 3 3 6-7" />

function YoloChart() {
  const W = 600, H = 300, left = 120, right = 40, top = 44, rowH = 72
  const x = (v: number) => left + v * (W - left - right)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Test mAP@0.5 and mAP@0.5:0.95: YOLOv8 0.957 and 0.826, YOLOv8 tuned 0.954 and 0.840, YOLOv5s 0.924 and 0.688">
      <g className="chart__legend">
        <rect x={left} y="14" width="10" height="4" rx="2" fill="#7dd3fc" /><text x={left + 16} y="20">mAP@0.5</text>
        <rect x={left + 100} y="14" width="10" height="4" rx="2" fill="#7dd3fc" opacity=".45" /><text x={left + 116} y="20">mAP@0.5:0.95</text>
      </g>
      {[0, 0.5, 1].map((v) => (
        <g key={v}>
          <line x1={x(v)} x2={x(v)} y1={top - 6} y2={H - 18} className="chart__grid" />
          <text x={x(v)} y={H - 4} textAnchor="middle" className="chart__tick">{v}</text>
        </g>
      ))}
      {yoloResults.map((r, i) => {
        const y = top + i * rowH
        return (
          <g key={r.model}>
            <text x={left - 12} y={y + 22} textAnchor="end" className="chart__label">{r.model}</text>
            <rect x={x(0)} y={y + 6} width={x(r.map50) - x(0)} height="12" rx="3" fill="#7dd3fc" />
            <rect x={x(0)} y={y + 24} width={x(r.map5095) - x(0)} height="12" rx="3" fill="#7dd3fc" opacity=".45" />
            <text x={x(r.map50) + 6} y={y + 16} className="chart__tick">{r.map50.toFixed(3)}</text>
            <text x={x(r.map5095) + 6} y={y + 34} className="chart__tick">{r.map5095.toFixed(3)}</text>
          </g>
        )
      })}
    </svg>
  )
}

function SerengetiChart() {
  const W = 600, H = 300, px = 48, py = 28
  const lo = 0.6, hi = 0.85
  const x = (i: number) => px + (i / 19) * (W - px * 2)
  const y = (v: number) => H - py - ((v - lo) / (hi - lo)) * (H - py * 2)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Validation accuracy over 20 epochs: ResNet-50 81.1%, VGG-19 81.0%, MobileNetV2 78.4%">
      {[0.6, 0.7, 0.8].map((v) => (
        <g key={v}>
          <line x1={px} x2={W - px} y1={y(v)} y2={y(v)} className="chart__grid" />
          <text x={px - 8} y={y(v) + 4} textAnchor="end" className="chart__tick">{Math.round(v * 100)}%</text>
        </g>
      ))}
      <text x={W - px} y={H - 6} textAnchor="end" className="chart__tick">epoch 1–20 · axis from 60%</text>
      {serengetiLogs.map((s) => (
        <polyline key={s.model} fill="none" stroke={s.color} strokeWidth="1.6" points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
      ))}
      {serengetiLogs.map((s, i) => (
        <g key={s.model} transform={`translate(${px + 10} ${py + 8 + i * 20})`} className="chart__legend">
          <line x1="0" x2="16" y1="-4" y2="-4" stroke={s.color} strokeWidth="1.6" />
          <text x="24" y="0">{s.model} · {(s.values[19] * 100).toFixed(1)}%</text>
        </g>
      ))}
    </svg>
  )
}

function CamelotWheel() {
  // Source key 8A with its harmonic neighbours: 7A and 9A (one step) and 8B (relative major).
  const cx = 300, cy = 150
  const at = (n: number, ring: 'A' | 'B') => {
    const a = ((n - 1) / 12) * Math.PI * 2 - Math.PI / 2
    const r = ring === 'B' ? 118 : 80
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  }
  const source = at(8, 'A')
  const matches = [at(7, 'A'), at(9, 'A'), at(8, 'B')]
  return (
    <svg viewBox="0 0 600 300" role="img" aria-label="Camelot wheel: key 8A mixes harmonically with 7A, 9A and 8B">
      {[52, 100, 138].map((r) => <circle key={r} cx={cx} cy={cy} r={r} className="chart__grid" fill="none" />)}
      {matches.map((m, i) => <line key={i} x1={source.x} y1={source.y} x2={m.x} y2={m.y} stroke="#c4b5fd" strokeWidth="1.2" />)}
      {(['A', 'B'] as const).flatMap((ring) =>
        Array.from({ length: 12 }, (_, i) => {
          const key = `${i + 1}${ring}`, p = at(i + 1, ring)
          const isSource = key === '8A', isMatch = ['7A', '9A', '8B'].includes(key)
          return (
            <g key={key}>
              {isSource || isMatch ? <circle cx={p.x} cy={p.y} r="13" fill={isSource ? '#c4b5fd' : '#2a2833'} stroke="#c4b5fd" /> : null}
              <text x={p.x} y={p.y + 4} textAnchor="middle" className={isSource ? 'wheel__key is-source' : isMatch ? 'wheel__key is-match' : 'wheel__key'}>{key}</text>
            </g>
          )
        }),
      )}
      <text x={cx} y={cy + 4} textAnchor="middle" className="chart__label">mixes with</text>
    </svg>
  )
}

function Visual({ p }: { p: Project }) {
  const v = p.visual!
  if (v.kind === 'image') return <img src={v.src} alt={v.alt} width={1200} height={600} loading="lazy" decoding="async" />
  if (v.kind === 'yolo') return <YoloChart />
  return v.kind === 'serengeti' ? <SerengetiChart /> : <CamelotWheel />
}

const Dot = ({ c }: { c: Category }) => <span className="dot" style={{ background: categoryColor[c] }} aria-hidden="true" />

function FeaturedCard({ p, flash }: { p: Project; flash: boolean }) {
  return (
    <article id={`p-${p.repo}`} className={flash ? 'feature panel is-flash' : 'feature panel'}>
      <div className="feature__media"><Visual p={p} /></div>
      <div className="feature__body">
        <p className="meta"><Dot c={p.category} />{p.category}<span className="meta__year">{p.year}</span></p>
        <h3><a className="stretch" href={repoUrl(p.repo)} target="_blank" rel="noreferrer">{p.title}</a></h3>
        {p.metric ? <p className="metric"><strong>{p.metric}</strong> {p.metricLabel}</p> : null}
        <p className="feature__summary">{p.summary}</p>
        <div className="feature__foot">
          <p className="stack">{p.stack.join(' · ')}</p>
          {p.demo ? <a className="demo" href={p.demo} target="_blank" rel="noreferrer">Live demo <External /></a> : null}
        </div>
      </div>
    </article>
  )
}

function Row({ p, flash }: { p: Project; flash: boolean }) {
  return (
    <li id={`p-${p.repo}`} className={flash ? 'row is-flash' : 'row'}>
      <a href={repoUrl(p.repo)} target="_blank" rel="noreferrer">
        <span className="row__title"><Dot c={p.category} />{p.title}</span>
        <span className="row__summary">{p.summary}</span>
        <span className="row__metric">{p.metric ? <><strong>{p.metric}</strong> {p.metricLabel}</> : null}</span>
        <span className="row__year">{p.year} <External /></span>
      </a>
    </li>
  )
}

function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copy = () => navigator.clipboard.writeText(EMAIL).then(() => setState('copied'), () => setState('failed'))
  return (
    <button type="button" className="btn btn--dark" onClick={copy}>
      {state === 'copied' ? <>Copied <Check /></> : state === 'failed' ? 'Copy failed: use the link' : 'Copy email'}
    </button>
  )
}

export default function App() {
  const [filter, setFilter] = useState<Category | null>(null)
  const [flash, setFlash] = useState<string | null>(null)

  const pick = useCallback((repo: string) => {
    // Picking from the map shows every project, so the target is never hidden by a filter.
    setFilter(null)
    setFlash(repo)
    requestAnimationFrame(() => {
      const el = document.getElementById(`p-${repo}`)
      const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
      el?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' })
      el?.querySelector('a')?.focus({ preventScroll: true })
    })
    setTimeout(() => setFlash((f) => (f === repo ? null : f)), 2200)
  }, [])

  const inFilter = (p: Project) => !filter || p.category === filter
  const shownFeatured = featured.filter(inFilter)
  const shownOthers = others.filter(inFilter)

  return (
    <>
      <a className="skip" href="#work">Skip to projects</a>
      <header className="nav panel">
        <a href="#top" className="nav__name">Farid Rahimli</a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#about" className="nav__about">About</a>
          <a href="#contact">Contact</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub <External /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__copy">
            <h1>Farid Rahimli</h1>
            <p className="hero__role">Data scientist &amp; ML engineer · MSc AI, Data Science &amp; Digital Business</p>
            <p className="hero__lead">
              I build machine learning that holds up outside the notebook: crop-disease detection, wildlife camera traps
              and serverless pipelines on AWS, each with code and an honest benchmark.
            </p>
            <div className="cta">
              <a className="btn btn--dark" href="#work">See the work</a>
              <a className="btn" href={`mailto:${EMAIL}`}>Get in touch</a>
            </div>
          </div>
          <ProjectMap onPick={pick} />
        </section>

        <section id="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title">Selected work</h2>
            <div className="filters" role="group" aria-label="Filter projects by domain">
              <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)}>All {projects.length}</button>
              {categories.map((c) => (
                <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(filter === c ? null : c)}>
                  <Dot c={c} />{c} {countIn(c)}
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{shownFeatured.length + shownOthers.length} projects shown</p>

          {shownFeatured.length ? (
            <div className="features">{shownFeatured.map((p) => <FeaturedCard key={p.repo} p={p} flash={flash === p.repo} />)}</div>
          ) : null}

          {shownOthers.length ? (
            <div className="more panel">
              <h3 className="more__title">{shownFeatured.length ? 'More projects' : 'Projects'}</h3>
              <ul>{shownOthers.map((p) => <Row key={p.repo} p={p} flash={flash === p.repo} />)}</ul>
            </div>
          ) : null}
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <div>
            <p>
              I'm an MSc student in AI, Data Science and Digital Business. I like problems where a model has to earn its
              place: choosing between ResNet-50 and MobileNetV2 for a battery-powered camera, or adding a confidence gate so
              weak predictions never reach production.
            </p>
            <p className="about__tools">Python · PyTorch · TensorFlow · scikit-learn · XGBoost · AWS SageMaker · React</p>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Get in touch</h2>
          <a className="contact__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className="cta">
            <CopyEmail />
            <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">github.com/EFaridRahimli <External /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {YEAR} Farid Rahimli</span>
        <a href="#top">Back to top <Up /></a>
      </footer>
    </>
  )
}
