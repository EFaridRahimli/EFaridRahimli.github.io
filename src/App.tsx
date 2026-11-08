import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowRight, ArrowUpRight, Folder } from 'lucide-react'
import { projects, type Category, type Project } from './projects'
import { illustrations, sector, SvgDefs } from './illustrations'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './components/ui/dialog'
import { cn } from './lib/utils'

const GITHUB = 'https://github.com/EFaridRahimli'
const SECTIONS = ['projects', 'about', 'stack', 'contact'] as const
const FILTERS: ('All' | Category)[] = ['All', 'Vision', 'Data', 'NLP', 'MLOps', 'Apps']
const STACK_LINE = ['Python', 'FastAPI', 'RAG', 'UE5', 'Godot', 'ML']
const PER_PAGE = 3
const ease = [0.22, 1, 0.36, 1] as const

export default function App() {
  const [open, setOpen] = useState<Project | null>(null)
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease }}>
      <SvgDefs />
      <Nav />
      <main className="mx-auto max-w-[1520px] px-5 sm:px-10">
        <Hero />
        <Featured onOpen={setOpen} />
        <AllProjects onOpen={setOpen} />
        <About />
        <Stack />
        <Contact />
      </main>
      <footer className="mx-auto max-w-[1520px] px-5 pb-10 sm:px-10">
        <div className="flex justify-between border-t border-line pt-6 text-xs uppercase tracking-[0.2em] text-muted">
          <span>© {new Date().getFullYear()} Farid Rahimli</span>
          <a href="#top" className="hover:text-ink">Back to top ↑</a>
        </div>
      </footer>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </MotionConfig>
  )
}

const Label = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn('text-xs uppercase tracking-[0.28em]', className)}>{children}</p>
)

function Nav() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-paper/70 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-[1520px] items-center px-5 sm:px-10">
        <a href="#top" className="flex h-10 items-center border-r border-line pr-8 font-sans text-[26px] font-light tracking-tight sm:ml-8">
          FR
        </a>
        <ul className="ml-auto flex items-center gap-1 text-[13px] sm:gap-4">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="relative block px-2 py-2 capitalize text-ink/80 transition-colors hover:text-ink sm:px-3">
                {id}
                {active === id && <motion.span layoutId="nav-line" className="absolute inset-x-2 -bottom-0.5 h-px bg-ink sm:inset-x-3" />}
              </a>
            </li>
          ))}
        </ul>
        <span className="relative ml-6 hidden size-3 sm:mr-6 sm:block" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-ink/30 [animation-duration:2.4s]" />
          <span className="absolute inset-0 rounded-full bg-ink" />
        </span>
      </nav>
      <div className="mx-auto max-w-[1520px] px-5 sm:px-10">
        <div className="h-px bg-line" />
      </div>
    </header>
  )
}

const rise = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 50, damping: 18 })
  const y = useSpring(my, { stiffness: 50, damping: 18 })

  return (
    <section
      id="top"
      className="relative grid items-center gap-8 pb-10 pt-32 lg:min-h-[640px] lg:grid-cols-[0.95fr_1.05fr] lg:pt-28"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
      }}
    >
      <span className="absolute left-0 top-[96px] hidden text-2xl font-extralight text-ink/50 sm:block" aria-hidden>+</span>
      <span className="absolute right-0 top-[96px] hidden text-2xl font-extralight text-ink/50 sm:block" aria-hidden>+</span>

      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.09, delayChildren: 0.1 }} className="sm:pl-12">
        <motion.div variants={rise}><Label>Hello, I'm</Label></motion.div>
        <motion.h1 variants={rise} className="mt-5 font-sans text-[clamp(3.2rem,7vw,5.4rem)] font-light leading-none tracking-[-0.035em]">
          Farid Rahimli
        </motion.h1>
        <motion.p variants={rise} className="mt-6 flex flex-wrap gap-y-1 text-[clamp(0.78rem,1.3vw,1.05rem)] uppercase tracking-[0.14em] sm:tracking-[0.2em]">
          {['AI Engineer', 'Game Developer', 'Builder'].map((t, i) => (
            <span key={t} className="whitespace-nowrap">{i > 0 && <span className="px-2 text-ink/50 sm:px-3">/</span>}{t}</span>
          ))}
        </motion.p>
        <motion.span variants={rise} className="mt-9 block h-px w-10 bg-ink/60" />
        <motion.p variants={rise} className="mt-9 max-w-md text-[14px] leading-relaxed text-ink/85">
          Building AI systems, tools, and interactive experiences at the intersection of technology and design.
        </motion.p>
        <motion.div variants={rise} className="mt-10 flex flex-wrap gap-3 text-[14px]">
          <a href="#projects" className="group inline-flex items-center gap-8 rounded-lg bg-ink px-9 py-3.5 text-paper shadow-[0_10px_24px_-12px_rgb(28_28_27/0.7)] transition hover:bg-ink/85">
            View Projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#about" className="glass inline-flex items-center rounded-lg px-9 py-3.5 transition hover:bg-white/40">
            About Me
          </a>
        </motion.div>
      </motion.div>

      <HeroDiagram x={x} y={y} />
    </section>
  )
}

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.6, ease, delay },
})

function HeroDiagram({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const gx = useTransform(x, (v) => v * -14)
  const gy = useTransform(y, (v) => v * -10)
  const sx = useTransform(x, (v) => v * 6)
  const sy = useTransform(y, (v) => v * 6)

  return (
    <div className="relative mx-auto aspect-[880/520] w-full max-w-[880px]" aria-hidden>
      <svg viewBox="0 0 880 520" fill="none" stroke="currentColor" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <radialGradient id="fade" cx="0.62" cy="0.62" r="0.5">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="fade-mask"><rect width="880" height="520" fill="url(#fade)" /></mask>
        </defs>
        <motion.g style={{ x: sx, y: sy }}>
          <motion.path d="M0,270H880" strokeOpacity=".35" {...draw(0)} />
          <motion.path d="M90,270H800" strokeOpacity=".9" {...draw(0.1)} />
          <motion.path d="M520,0V520" strokeOpacity=".9" {...draw(0.2)} />
          <motion.path d="M520,35A235,235 0 1 1 385,462" strokeWidth="1.2" {...draw(0.35)} />
          {/* fade, not draw: pathLength animation would overwrite the dash pattern */}
          <motion.path d="M520,35A235,235 0 0 0 330,410" strokeOpacity=".55" strokeDasharray="4 5" className="hero-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.5 }} />
          <motion.circle cx="520" cy="270" r="130" strokeOpacity=".5" {...draw(0.6)} />
          <motion.circle cx="128" cy="270" r="19" {...draw(0.8)} />
          <circle cx="98" cy="270" r="2.5" fill="currentColor" stroke="none" />
        </motion.g>
        <motion.g style={{ x: sx, y: sy }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.7 }}>
          <path d="M520,270V140A130,130 0 0 1 650,270Z" fill="currentColor" stroke="none" filter="url(#grain)" opacity=".5" />
          <g mask="url(#fade-mask)">
            <path d={sector(520, 270, 130, 235, 0, 115)} fill="currentColor" stroke="none" filter="url(#grain)" opacity=".55" />
          </g>
        </motion.g>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.9 }}
        style={{ x: gx, y: gy }}
        className="glass absolute left-[19%] top-[33%] h-[36%] w-[34%] rounded-xl"
      />
      <motion.span
        style={{ x: sx, y: sy }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 300, damping: 18 }}
        className="absolute left-[28%] top-[52%] -ml-1.5 -mt-1.5 size-3 bg-ink"
      />
    </div>
  )
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-8 flex items-center gap-8">
      <Label className="shrink-0 text-[13px]">{title}</Label>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease, delay: 0.15 }}
        className="h-px flex-1 origin-left bg-line"
      />
      {children}
    </Reveal>
  )
}

function Featured({ onOpen }: { onOpen: (p: Project) => void }) {
  const pages = Math.ceil(projects.length / PER_PAGE)
  const [[page, dir], setPage] = useState([0, 1])
  const go = (p: number) => setPage([p, p > page ? 1 : -1])

  return (
    <section className="pb-6 pt-4">
      <SectionHead title="Featured Projects">
        <a href="#projects" className="group flex shrink-0 items-center gap-3 text-[13px] uppercase tracking-[0.2em]">
          View all <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </SectionHead>

      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.ul
          key={page}
          custom={dir}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 60 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d * -60 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease }}
          className="grid gap-5 md:grid-cols-3"
        >
          {projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE).map((p) => (
            <li key={p.slug}><ProjectCard project={p} onOpen={() => onOpen(p)} /></li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <div className="mt-10 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em]">
        <span className="size-2.5 shrink-0 bg-ink" />
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          {STACK_LINE.map((s, i) => (
            <span key={s}>{i > 0 && <span className="mr-4 text-ink/40">/</span>}{s}</span>
          ))}
        </p>
        <span className="hidden h-px flex-1 bg-line md:block" />
        <div className="ml-auto flex gap-2 md:ml-0">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Show featured projects page ${i + 1}`}
              aria-current={i === page}
              className="group py-2"
            >
              <span className={cn('block h-[3px] w-8 rounded-full transition-colors duration-500', i === page ? 'bg-ink' : 'bg-ink/15 group-hover:bg-ink/35')} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p, onOpen }: { project: Project; onOpen: () => void }) {
  const Illo = illustrations[p.slug]
  return (
    <button
      onClick={onOpen}
      className="glass group relative flex h-full min-h-[200px] w-full items-stretch gap-4 overflow-hidden rounded-2xl p-6 text-left transition duration-500 ease-out hover:-translate-y-1 hover:bg-white/30 hover:shadow-[0_1px_0_rgb(255_255_255/0.7)_inset,0_28px_50px_-28px_rgb(28_28_27/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:p-8"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <Folder className="size-5 stroke-[1.25]" />
        <h3 className="mt-auto pt-8 font-sans text-[21px] font-normal tracking-tight">{p.title}</h3>
        <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink/80">{p.tagline}</p>
      </div>
      <div className="w-[42%] shrink-0 self-center text-ink">
        <Illo />
      </div>
      <ArrowUpRight className="absolute right-4 top-4 size-4 opacity-0 transition duration-300 group-hover:opacity-60" />
    </button>
  )
}

function AllProjects({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-20">
      <SectionHead title={`All Projects · ${projects.length}`} />
      <Reveal className="mb-8 flex flex-wrap gap-2 text-[12px] uppercase tracking-[0.14em]">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn('relative rounded-lg px-4 py-2 transition-colors', filter === f ? 'text-paper' : 'glass text-ink/75 hover:text-ink')}
          >
            {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-lg bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span className="relative">{f}</span>
          </button>
        ))}
      </Reveal>

      <motion.ul layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: Math.min(i, 5) * 0.05 } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            >
              <ProjectCard project={p} onOpen={() => onOpen(p)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  )
}

function ProjectDialog({ project: p, onClose }: { project: Project | null; onClose: () => void }) {
  // keep the last project rendered while the close animation plays
  const [last, setLast] = useState(p)
  if (p && p !== last) setLast(p)
  const shown = p ?? last
  const Illo = shown && illustrations[shown.slug]

  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      {shown && Illo && (
        <DialogContent>
          <div className="rounded-t-2xl border-b border-line bg-plate px-10 py-8">
            <div className="mx-auto max-w-[360px]"><Illo /></div>
          </div>
          <div className="p-6 sm:p-9">
            <Label className="text-muted">{shown.category}</Label>
            <DialogTitle className="mt-3 font-sans text-3xl font-light tracking-tight">{shown.title}</DialogTitle>
            <DialogDescription className="mt-4 text-[13.5px] leading-relaxed text-ink/80">{shown.summary}</DialogDescription>

            <ul className="mt-7 divide-y divide-line border-y border-line text-[13px]">
              {shown.results.map((r) => (
                <li key={r} className="flex items-center gap-3 py-3">
                  <span className="size-1.5 shrink-0 bg-ink" /> {r}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted">{shown.stack.join('  /  ')}</p>

            <div className="mt-8 flex flex-wrap gap-3 text-[13px]">
              <a href={shown.repo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-paper transition hover:bg-ink/85">
                <Github className="size-4" /> View on GitHub
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              {shown.demo && (
                <a href={shown.demo} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-lg px-6 py-3 transition hover:bg-white/40">
                  Live demo <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

function About() {
  return (
    <section id="about" className="py-16">
      <SectionHead title="About" />
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="font-sans text-[clamp(1.5rem,2.6vw,2.1rem)] font-light leading-snug tracking-tight">
            I build AI systems and interactive experiences, taking problems from raw data to things people can use.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="text-[14px] leading-relaxed text-ink/80">
          <p>
            My public work covers computer vision for agriculture and wildlife conservation, classification and
            forecasting on tabular data, NLP, and serverless ML pipelines on AWS.
          </p>
          <p className="mt-4">
            I care about honest evaluation, the trade-off between accuracy and cost, and systems that keep working after
            the notebook is closed.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const TOOLKIT = [
  ['Modelling', 'PyTorch, TensorFlow / Keras, scikit-learn, XGBoost, AutoGluon'],
  ['Vision', 'YOLOv8, ResNet, MobileNet, transfer learning'],
  ['MLOps', 'AWS SageMaker, Lambda, Step Functions, S3, Model Monitor'],
  ['Data', 'pandas, NumPy, Matplotlib, Seaborn'],
  ['Build', 'Python, FastAPI, RAG, TypeScript, UE5, Godot'],
]

function Stack() {
  return (
    <section id="stack" className="py-16">
      <SectionHead title="Stack" />
      <dl className="glass divide-y divide-line/70 rounded-2xl px-6 sm:px-9">
        {TOOLKIT.map(([k, v], i) => (
          <Reveal key={k} delay={i * 0.05} className="grid gap-1 py-5 text-[13.5px] sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="uppercase tracking-[0.2em]">{k}</dt>
            <dd className="text-ink/75">{v}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-20">
      <SectionHead title="Contact" />
      <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <h2 className="max-w-2xl font-sans text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.03em]">
          Have something worth building? Let's talk.
        </h2>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-ink px-8 py-3.5 text-[14px] text-paper transition hover:bg-ink/85">
          <Github className="size-4" /> github.com/EFaridRahimli
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </section>
  )
}

function Github({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}
