import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, img, type Category, type Project } from './projects'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './components/ui/dialog'
import { cn } from './lib/utils'

const GITHUB = 'https://github.com/EFaridRahimli'
const SECTIONS = ['work', 'about', 'contact'] as const
const FILTERS: ('All' | Category)[] = ['All', 'Vision', 'Data', 'NLP', 'MLOps', 'Apps']
const ease = [0.22, 1, 0.36, 1] as const

export default function App() {
  const [open, setOpen] = useState<Project | null>(null)
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease }}>
      <Nav />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <Work onOpen={setOpen} />
        <About />
        <Contact />
      </main>
      <footer className="mx-auto max-w-6xl px-5 pb-10 pt-6 text-sm text-muted sm:px-8">
        <div className="border-t border-line pt-6">© {new Date().getFullYear()} Farid Rahimli</div>
      </footer>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </MotionConfig>
  )
}

function Nav() {
  const [active, setActive] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const dot = useTransform(useSpring(scrollYProgress, { stiffness: 120, damping: 30 }), (v) => `${v * 100}%`)

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
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-4 z-40 px-4"
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-6 rounded-2xl border border-line/80 bg-paper/75 px-5 py-3 shadow-[0_10px_30px_-18px_rgb(24_24_23/0.3)] backdrop-blur-md sm:px-7">
        <a href="#top" className="whitespace-nowrap text-[17px] font-medium tracking-tight">Farid Rahimli</a>
        {/* hairline doubles as a scroll-progress track */}
        <div className="relative hidden h-px flex-1 bg-line md:block" aria-hidden>
          <motion.span style={{ left: dot }} className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
        </div>
        <ul className="ml-auto flex items-center gap-1 text-sm md:ml-0">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="relative block rounded-full px-3 py-1.5 capitalize text-ink/80 transition-colors hover:text-ink">
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink/[0.06]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">{id}</span>
              </a>
            </li>
          ))}
        </ul>
        <span className="hidden h-5 w-px bg-line sm:block" />
        <a href={GITHUB} target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm text-ink/80 transition-colors hover:text-ink sm:flex">
          <Github className="size-4" /> GitHub
        </a>
      </nav>
    </motion.header>
  )
}

const rise = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }

function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 20 })
  const y = useSpring(my, { stiffness: 60, damping: 20 })
  const { scrollY } = useScroll()
  const drift = useTransform(scrollY, [0, 600], [0, 60])

  return (
    <section
      id="top"
      className="grid items-center gap-10 pb-16 pt-36 md:grid-cols-[1.05fr_1fr] md:pt-40"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width - 0.5) * -16)
        my.set(((e.clientY - r.top) / r.height - 0.5) * -12)
      }}
    >
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}>
        <motion.p variants={rise} className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.32em] text-ink/70">
          AI / Machine Learning Engineer <span className="h-px w-16 bg-ink/30" />
        </motion.p>
        <motion.h1 variants={rise} className="mt-6 text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          Building practical AI / ML systems from data to impact.
        </motion.h1>
        <motion.p variants={rise} className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
          I design, build and deploy machine learning solutions that solve real-world problems, from computer vision and
          forecasting to scalable, production-ready ML workflows.
        </motion.p>
        <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
          <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm text-paper shadow-[0_8px_20px_-8px_rgb(24_24_23/0.6)] transition hover:bg-ink/85">
            View my work <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#about" className="inline-flex items-center rounded-full border border-line bg-card px-6 py-3 text-sm transition hover:border-ink/40">
            About me
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
        style={{ y: drift }}
        className="relative"
      >
        <motion.img
          src={img('05-gamma-ray-classification')}
          alt="Line drawing of a radio telescope dish sending signals toward the stars"
          style={{ x, y }}
          className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.06] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_80%)]"
          fetchPriority="high"
        />
      </motion.div>
    </section>
  )
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <Reveal className="mb-10 grid items-center gap-4 md:grid-cols-[auto_1fr_minmax(0,22rem)] md:gap-8">
      <h2 className="text-3xl font-medium tracking-tight">{title}</h2>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        className="hidden h-px origin-left bg-ink/25 md:block"
      />
      {note && <p className="text-sm leading-relaxed text-muted">{note}</p>}
    </Reveal>
  )
}

function Work({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" className="py-16">
      <SectionHead
        title="Selected Work"
        note="AI / ML projects spanning computer vision, NLP, tabular modelling and MLOps. Open any card for details."
      />
      <Reveal className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              'relative rounded-full border px-4 py-1.5 text-sm transition-colors',
              filter === f ? 'border-ink text-paper' : 'border-line text-ink/70 hover:border-ink/40 hover:text-ink',
            )}
          >
            {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span className="relative">{f}</span>
          </button>
        ))}
      </Reveal>

      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

function ProjectCard({ project: p, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group block w-full rounded-2xl border border-line/80 bg-card p-2.5 text-left shadow-[0_1px_0_rgb(255_255_255/0.8)_inset,0_10px_30px_-22px_rgb(24_24_23/0.35)] transition duration-500 ease-out hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_1px_0_rgb(255_255_255/0.8)_inset,0_24px_50px_-24px_rgb(24_24_23/0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <div className="aspect-[8/5] overflow-hidden rounded-xl bg-plate">
        <img
          src={img(p.slug)}
          alt=""
          loading="lazy"
          className="size-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-end justify-between gap-4 px-2.5 pb-2 pt-4">
        <div>
          <h3 className="font-medium tracking-tight">{p.title}</h3>
          <p className="mt-1 text-[13px] leading-snug text-muted">{p.tagline}</p>
        </div>
        <ArrowRight className="mb-0.5 size-4 shrink-0 text-ink/60 transition group-hover:translate-x-1 group-hover:text-ink" />
      </div>
    </button>
  )
}

function ProjectDialog({ project: p, onClose }: { project: Project | null; onClose: () => void }) {
  // keep the last project rendered while the close animation plays
  const [last, setLast] = useState(p)
  if (p && p !== last) setLast(p)
  const shown = p ?? last

  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      {shown && (
        <DialogContent>
          <div className="rounded-t-2xl bg-plate"><img src={img(shown.slug)} alt="" className="mx-auto max-h-[46vh] w-auto" /></div>
          <div className="p-6 sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">{shown.category}</p>
            <DialogTitle className="mt-2 text-2xl font-medium tracking-tight">{shown.title}</DialogTitle>
            <DialogDescription className="mt-3 leading-relaxed text-muted">{shown.summary}</DialogDescription>

            <ul className="mt-6 divide-y divide-line border-y border-line">
              {shown.results.map((r) => (
                <li key={r} className="flex items-center gap-3 py-2.5 text-sm">
                  <span className="size-1.5 shrink-0 rounded-full bg-ink" /> {r}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {shown.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-ink/75">{s}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={shown.repo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition hover:bg-ink/85">
                <Github className="size-4" /> View on GitHub
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              {shown.demo && (
                <a href={shown.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-ink/40">
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

const TOOLKIT = [
  ['Modelling', 'PyTorch, TensorFlow / Keras, scikit-learn, XGBoost, AutoGluon'],
  ['Vision', 'YOLOv8, ResNet, MobileNet, transfer learning'],
  ['MLOps', 'AWS SageMaker, Lambda, Step Functions, S3, Model Monitor'],
  ['Data', 'pandas, NumPy, Matplotlib, Seaborn'],
]

function About() {
  return (
    <section id="about" className="py-16">
      <SectionHead title="About" />
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-xl leading-relaxed tracking-tight">
            I'm Farid, an AI / ML engineer who likes taking a problem from raw data to a model that actually ships.
          </p>
          <p className="mt-5 leading-relaxed text-muted">
            My work covers computer vision for agriculture and wildlife conservation, classification and forecasting on
            tabular data, NLP, and serverless ML pipelines on AWS. I care about honest evaluation, the trade-off between
            accuracy and cost, and systems that keep working after the notebook is closed.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="divide-y divide-line border-y border-line">
            {TOOLKIT.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-4 text-sm">
                <dt className="font-medium">{k}</dt>
                <dd className="text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-20">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-14 text-center sm:px-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-muted">Contact</p>
        <h2 className="mx-auto mt-4 max-w-xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
          Have a problem worth modelling? Let's talk.
        </h2>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper transition hover:bg-ink/85">
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
