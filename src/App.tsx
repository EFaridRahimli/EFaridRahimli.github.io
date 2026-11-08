import { useState } from 'react'
import { categories, projects, type Project } from './projects'

const GITHUB = 'https://github.com/EFaridRahimli'
const EMAIL = 'erahimlif@gmail.com'

const skills = [
  { group: 'Machine learning', items: ['Deep learning (CNNs, transfer learning)', 'Object detection (YOLO)', 'Gradient boosting', 'NLP', 'AutoML'] },
  { group: 'Tools', items: ['Python', 'TensorFlow / Keras', 'PyTorch', 'scikit-learn', 'XGBoost', 'pandas'] },
  { group: 'Cloud & web', items: ['AWS SageMaker', 'Lambda', 'Step Functions', 'React', 'Vercel'] },
]

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className={p.featured ? 'card card--featured' : 'card'}>
      <div className="card__meta">
        <span>{p.category}</span>
        <span>{p.year}</span>
      </div>
      <h3 className="card__title">{p.title}</h3>
      <p className="card__metric">
        <strong>{p.metric}</strong>
        <span>{p.metricLabel}</span>
      </p>
      <p className="card__summary">{p.summary}</p>
      <ul className="card__stack" aria-label="Tech stack">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="card__links">
        <a href={`${GITHUB}/${p.repo}`} target="_blank" rel="noreferrer">
          Code <span aria-hidden="true">↗</span>
        </a>
        {p.demo ? (
          <a href={p.demo} target="_blank" rel="noreferrer">
            Live demo <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default function App() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <a className="skip" href="#work">Skip to projects</a>
      <header className="nav">
        <a href="#top" className="nav__logo" aria-label="Farid Rahimli, home">FR</a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">Data scientist & ML engineer</p>
          <h1>
            Farid Rahimli<span className="dot">.</span>
          </h1>
          <p className="hero__lead">
            I build machine-learning systems that turn messy real-world data into decisions. My work spans crop-disease
            detection, wildlife camera traps and serverless ML pipelines on AWS.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#work">View projects</a>
            <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <dl className="hero__stats">
            <div><dt>Projects</dt><dd>{projects.length}</dd></div>
            <div><dt>Focus areas</dt><dd>{categories.length - 1}</dd></div>
            <div><dt>Best test accuracy</dt><dd>98.5%</dd></div>
          </dl>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title">Selected work</h2>
            <div className="filters" role="group" aria-label="Filter projects by category">
              {categories.map((c) => (
                <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
          <div className="grid">
            {shown.map((p) => (
              <ProjectCard key={p.repo} p={p} />
            ))}
          </div>
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <div className="about__body">
            <p>
              I'm an MSc student in AI, Data Science and Digital Business. I like problems where a model has to earn its
              place: picking MobileNetV2 over ResNet-50 for a battery-powered camera, or adding a confidence gate so weak
              predictions never reach production.
            </p>
            <p>
              Each project starts from a business question, gets benchmarked honestly, and ships with documentation
              someone else can run.
            </p>
          </div>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <h3>{s.group}</h3>
                <ul>
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="eyebrow">Get in touch</h2>
          <a className="contact__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">github.com/EFaridRahimli ↗</a>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Farid Rahimli</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}
