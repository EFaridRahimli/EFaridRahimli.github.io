import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, type Project } from './projects'
import { illustrations } from './illustrations'
import { ParticleLayer, sample } from './particles'

const GITHUB = 'https://github.com/EFaridRahimli'
const EMAIL = 'erahimlif@gmail.com'

type Route = { view: 'index' } | { view: 'projects' } | { view: 'about' } | { view: 'project'; p: Project; i: number }

function parse(hash: string): Route {
  const [, a, b] = hash.split('/')
  if (a === 'projects') return { view: 'projects' }
  if (a === 'about') return { view: 'about' }
  const i = projects.findIndex((p) => p.slug === b)
  if (a === 'p' && i >= 0) return { view: 'project', p: projects[i], i }
  return { view: 'index' }
}

const titleOf = (r: Route) =>
  r.view === 'project' ? `${r.p.title} · Farid Rahimli` : r.view === 'index' ? 'Farid Rahimli · ML Engineer' : `${r.view === 'projects' ? 'Projects' : 'About'} · Farid Rahimli`
const nn = (i: number) => String(i + 1).padStart(2, '0')
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
// shortcut: particle budget by width only; upgrade to a frame-time probe if low-end phones stutter
const budget = () => (innerWidth < 640 ? { step: 4, cap: 3800 } : { step: 3, cap: 9000 })
const settle = (el: HTMLElement) =>
  Promise.race([
    Promise.all([document.fonts.ready, ...[...el.querySelectorAll('img')].map((img) => img.decode().catch(() => {}))]),
    new Promise((r) => setTimeout(r, 900)),
  ])

export default function App() {
  const [route, setRoute] = useState(() => parse(location.hash))
  const view = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    const el = view.current!
    const layer = new ParticleLayer(canvas.current!)
    let token = 0
    let running = false

    const focusHeading = () => el.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })

    const go = async (next: Route, intro = false) => {
      const id = ++token
      document.title = titleOf(next)
      if (reduced()) {
        flushSync(() => setRoute(next))
        scrollTo(0, 0)
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' })
        if (!intro) focusHeading()
        return
      }
      const { step, cap } = budget()
      const from = running ? layer.stop() : intro ? [] : sample(el, step, cap)
      running = true
      el.style.opacity = '0'
      flushSync(() => setRoute(next))
      scrollTo(0, 0)
      await settle(el)
      if (id !== token) return
      await layer.run(from, sample(el, step, cap), step, intro ? 600 : 1250)
      if (id !== token) return
      el.style.opacity = ''
      // the real text fades in over the settled dots, then the dots go
      await el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' }).finished
      if (id !== token) return
      layer.clear()
      running = false
      if (!intro) focusHeading()
    }

    const onHash = () => go(parse(location.hash))
    addEventListener('hashchange', onHash)
    go(parse(location.hash), true)
    return () => {
      token++
      layer.clear()
      el.style.opacity = ''
      removeEventListener('hashchange', onHash)
    }
  }, [])

  return (
    <>
      <Header route={route} />
      <canvas ref={canvas} aria-hidden className="pointer-events-none fixed inset-0 z-10 size-full" />
      <main ref={view} className="px-(--gut)">
        {route.view === 'index' && <Index />}
        {route.view === 'projects' && <Projects />}
        {route.view === 'project' && <ProjectView p={route.p} i={route.i} />}
        {route.view === 'about' && <About />}
      </main>
    </>
  )
}

function Header({ route }: { route: Route }) {
  const cur = (v: Route['view']) => (route.view === v || (v === 'projects' && route.view === 'project') ? 'page' : undefined)
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-ground px-(--gut) py-3 text-[14px]">
      <a href="#/" aria-current={cur('index')} className="link -mx-2 px-2 py-3 font-semibold">
        Farid Rahimli
      </a>
      <nav aria-label="Main" className="flex gap-1 sm:gap-4">
        <a href="#/projects" aria-current={cur('projects')} className="link px-2 py-3">Projects</a>
        <a href="#/about" aria-current={cur('about')} className="link px-2 py-3">About</a>
        <a href={`mailto:${EMAIL}`} className="link -mr-2 px-2 py-3">Email</a>
      </nav>
    </header>
  )
}

/** Display lines sized so the widest line spans the full measure exactly. */
function Fit({ lines, className = '' }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const key = lines.join('\n')
  useLayoutEffect(() => {
    const el = ref.current!
    const fit = () => {
      el.style.fontSize = '100px'
      const widest = Math.max(...[...el.children].map((c) => c.getBoundingClientRect().width))
      el.style.fontSize = `${(100 * el.clientWidth) / widest}px`
    }
    fit()
    document.fonts.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [key])
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((l) => (
        <span key={l} className="block w-max whitespace-nowrap">{l}</span>
      ))}
    </span>
  )
}

const Arrow = ({ dir = 'right' }: { dir?: 'right' | 'left' | 'out' }) => {
  const Icon = dir === 'left' ? ArrowLeft : dir === 'out' ? ArrowUpRight : ArrowRight
  return <Icon aria-hidden className="inline size-[0.9em] translate-y-[-0.05em] stroke-[1.75]" />
}

/** A perpetual ticker row: the sequence twice, sliding by half its width. The copy is inert so links tab once. */
function Tape({ children, dur, reverse, className = '', decorative }: { children: ReactNode; dur: number; reverse?: boolean; className?: string; decorative?: boolean }) {
  return (
    <div className={`tape border-t border-line ${className}`} aria-hidden={decorative || undefined}>
      <div className="tape-track" style={{ '--dur': `${dur}s` } as CSSProperties} data-reverse={reverse || undefined}>
        <div className="tape-seq">{children}</div>
        <div className="tape-seq" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  )
}

const Sep = () => <span aria-hidden className="text-muted">/</span>

function Index() {
  const [paused, setPaused] = useState(false)
  return (
    <section className={`-mx-(--gut) flex min-h-svh flex-col pt-16 ${paused ? 'is-paused' : ''}`}>
      <h1 tabIndex={-1} className="sr-only">Farid Rahimli, ML engineer</h1>
      <div className="flex flex-1 flex-col justify-center">
        <div aria-hidden className="border-t border-line px-(--gut) py-[2vh]">
          <Fit className="display md:hidden" lines={['Farid', 'Rahimli']} />
          <Fit className="display hidden md:block" lines={['Farid Rahimli']} />
        </div>
        <Tape dur={60} reverse decorative className="py-3 text-[clamp(0.95rem,1.6vw,1.35rem)] tabular-nums">
          {projects.map((p) => (
            <span key={p.slug} className="flex items-baseline gap-[0.6em] pr-[1.4em]">
              <b className="font-bold text-accent">{p.ticker}</b>
              <span>{p.quote}</span>
              {p.delta && <span className="text-up">{p.delta}</span>}
            </span>
          ))}
        </Tape>
        <Tape dur={90} className="display-sm py-[1vh] text-[clamp(2.4rem,10vh,7rem)]">
          {projects.map((p) => (
            <span key={p.slug} className="flex items-baseline gap-[0.6em]">
              <a href={`#/p/${p.slug}`} className="link display-sm">{p.title}</a>
              <Sep />
            </span>
          ))}
        </Tape>
      </div>
      <div className="grid items-end gap-6 border-t border-line px-(--gut) pt-5 pb-(--gut) md:grid-cols-12">
        <p className="max-w-[44ch] text-pretty leading-relaxed md:col-span-6">
          ML engineer. Vision models for crops and wildlife, serverless inference on AWS, measured honestly.
        </p>
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
          className="link justify-self-start py-3 text-[13px] uppercase tracking-[0.12em] text-muted md:col-span-2"
        >
          {paused ? 'Resume ticker' : 'Pause ticker'}
        </button>
        <a href="#/projects" className="link display-sm justify-self-start text-[clamp(2.2rem,4.4vw,4rem)] md:col-span-4 md:justify-self-end">
          Projects <span className="tabular-nums">({projects.length})</span> <Arrow />
        </a>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="pb-(--gut) pt-24">
      <h1 tabIndex={-1} className="display outline-none">
        <Fit lines={['Projects']} />
      </h1>
      <p className="mt-6 max-w-[48ch] text-[17px] text-muted">
        {projects.length} public projects, each with its measured result. Coursework is marked as coursework.
      </p>
      <ol className="mt-14 md:mt-20">
        {projects.map((p) => (
          <li key={p.slug}>
            <a href={`#/p/${p.slug}`} className="group grid grid-cols-[4rem_1fr] items-baseline gap-x-4 border-t border-line py-3 md:grid-cols-12 md:py-4">
              <span className="text-[14px] font-bold text-accent md:col-span-1">{p.ticker}</span>
              <span className="display-sm text-[clamp(1.9rem,4.6vw,4.6rem)] transition-colors md:col-span-7">{p.title}</span>
              <span className="col-start-2 mt-1 text-[14px] text-muted md:col-span-4 md:col-start-auto md:mt-0 md:text-right">
                {p.category}
                {p.coursework && ` · ${p.coursework}`}
                <span className="block tabular-nums text-ink">
                  {p.quote}
                  {p.delta && <span className="ml-3 text-up">{p.delta}</span>}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ProjectView({ p, i }: { p: Project; i: number }) {
  const Illo = illustrations[p.slug]
  const prev = projects[(i + projects.length - 1) % projects.length]
  const next = projects[(i + 1) % projects.length]
  return (
    <article className="pb-(--gut) pt-24">
      <p className="text-[14px] text-muted">
        <a href="#/projects" className="link -ml-2 inline-flex items-center gap-1.5 px-2 py-3 text-ink">
          <Arrow dir="left" /> Projects
        </a>
        <span className="ml-3 tabular-nums">{nn(i)} / {projects.length}</span>
      </p>
      <h1 tabIndex={-1} className="display mt-4 max-w-[15ch] text-balance text-[clamp(3.2rem,9.5vw,10rem)] outline-none">
        {p.title}
      </h1>
      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[15px] tabular-nums">
        <b className="text-accent">{p.ticker}</b>
        <span>{p.quote}</span>
        {p.delta && <span className="text-up">{p.delta}</span>}
        <span className="text-muted">{p.category}{p.coursework && ` · ${p.coursework}`}</span>
      </p>
      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
        <div className="illo-plate md:col-span-6">
          <Illo />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="text-pretty text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-tight tabular-nums">{p.results[0]}</p>
          <p className="mt-6 text-pretty text-[17px] leading-relaxed">{p.summary}</p>
          {p.results.length > 1 && (
            <ul className="mt-6 space-y-1.5 text-[17px]">
              {p.results.slice(1).map((r) => (
                <li key={r} className="tabular-nums">{r}</li>
              ))}
            </ul>
          )}
          <p className="mt-6 text-[14px] text-muted">{p.stack.join(', ')}</p>
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[17px] font-semibold">
            <a href={p.repo} target="_blank" rel="noreferrer" className="link py-2">
              Code on GitHub <Arrow dir="out" />
            </a>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="link py-2">
                Live demo <Arrow dir="out" />
              </a>
            )}
          </p>
        </div>
      </div>
      <nav aria-label="More projects" className="mt-20 grid gap-6 md:mt-28 md:grid-cols-2">
        <a href={`#/p/${prev.slug}`} className="link group">
          <span className="text-[14px] text-muted"><Arrow dir="left" /> Previous</span>
          <span className="display-sm mt-1 block text-[clamp(1.6rem,3vw,2.75rem)]">{prev.title}</span>
        </a>
        <a href={`#/p/${next.slug}`} className="link group md:text-right">
          <span className="text-[14px] text-muted">Next <Arrow /></span>
          <span className="display-sm mt-1 block text-[clamp(1.6rem,3vw,2.75rem)]">{next.title}</span>
        </a>
      </nav>
    </article>
  )
}

const TOOLKIT = [
  ['Modelling', 'PyTorch, TensorFlow / Keras, scikit-learn, XGBoost, AutoGluon'],
  ['Vision', 'YOLOv8, ResNet, MobileNet, transfer learning'],
  ['MLOps', 'AWS SageMaker, Lambda, Step Functions, S3, Model Monitor'],
  ['Data', 'pandas, NumPy, Matplotlib, Seaborn'],
  ['Build', 'Python, FastAPI, RAG, TypeScript'],
]

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <h2 className="text-[14px] text-muted">{title}</h2>
    <div className="mt-3">{children}</div>
  </div>
)

function About() {
  return (
    <section className="pb-(--gut) pt-24">
      <h1 tabIndex={-1} className="display outline-none">
        <Fit lines={['About']} />
      </h1>
      <p className="mt-10 max-w-[28ch] text-balance text-[clamp(1.75rem,3.4vw,3.25rem)] font-medium leading-[1.1]">
        I build machine‑learning systems, taking problems from raw data to models people can use.
      </p>
      <div className="mt-16 grid gap-12 text-[17px] leading-relaxed md:grid-cols-12">
        <div className="md:col-span-5">
          <Block title="Work">
            <p className="max-w-[60ch] text-pretty">
              My public work covers computer vision for agriculture and wildlife conservation, classification and forecasting on
              tabular data, NLP, and serverless ML pipelines on AWS.
            </p>
            <p className="mt-4 max-w-[60ch] text-pretty">
              I care about honest evaluation, the trade-off between accuracy and cost, and systems that keep working after the
              notebook is closed.
            </p>
          </Block>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Block title="Toolkit">
            <dl className="grid grid-cols-[7rem_1fr] gap-x-6 gap-y-2">
              {TOOLKIT.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-semibold">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </div>
      </div>
      <div className="mt-24 md:mt-32">
        <h2 className="sr-only">Email</h2>
        <a href={`mailto:${EMAIL}`} className="link display mt-1 block py-1 lowercase">
          <Fit lines={[EMAIL]} />
        </a>
        <p className="mt-6 flex flex-wrap justify-between gap-4 text-[14px] text-muted">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="link -ml-2 px-2 py-3 text-ink">
            GitHub <Arrow dir="out" />
          </a>
          <span className="py-3">© {new Date().getFullYear()} Farid Rahimli</span>
        </p>
      </div>
    </section>
  )
}
