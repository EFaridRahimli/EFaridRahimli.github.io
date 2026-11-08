import { useEffect, useRef, type ReactNode } from 'react'

// Line art generated as raster images, traced to SVG with Potrace (public/illos/*.svg).
// The data label is live text on top so it stays crisp and readable at every size.
const LABELS: Record<string, string | undefined> = {
  '01-tomato-leaf-detection': undefined,
  '02-serengeti-camera-trap': undefined,
  '03-grape-leaf-classification': undefined,
  '04-keysync': '8A → 9A',
  '05-gamma-ray-classification': undefined,
  '06-bike-sharing-demand': 'score 1.864 → 0.421',
  '07-hotel-cancellation': 'accuracy 0.89',
  '08-movie-review-sentiment': undefined,
  '09-serverless-ml-workflow': 'conf ≥ 0.67',
  '10-dog-breed-classifier': 'resnet-18 → breed',
  '11-car-dealership-eda': 'n = 558,837',
}

// where a label points at one detail, place it beside that detail (percent of the drawing)
const AT: Record<string, [number, number]> = {
  '04-keysync': [38, 4],
  '09-serverless-ml-workflow': [64, 22],
}

// The <img> sizes the box and feeds the particle sampler; once the same file is inlined on top,
// its parts (<g class="part">, from scripts/split-illos.mjs) can move with scroll and the img hides.
function Illo({ slug }: { slug: string }) {
  const src = `${import.meta.env.BASE_URL}illos/${slug}.svg`
  const img = useRef<HTMLImageElement>(null)
  const inline = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let alive = true
    fetch(src)
      .then((r) => (r.ok ? r.text() : ''))
      .then((svg) => {
        if (!alive || !svg.startsWith('<svg') || !inline.current || !img.current) return
        inline.current.innerHTML = svg
        img.current.style.opacity = '0'
      })
      .catch(() => {}) // the static img stays visible
    return () => {
      alive = false
    }
  }, [src])
  return (
    <div className="illo relative">
      <img ref={img} src={src} alt="" width={960} height={720} loading="lazy" decoding="async" className="block h-auto w-full" />
      <div ref={inline} aria-hidden className="illo-svg absolute inset-0" />
      {LABELS[slug] && (
        <span className="illo-label absolute" style={{ left: `${AT[slug]?.[0] ?? 3}%`, top: `${AT[slug]?.[1] ?? 3}%` }}>
          {LABELS[slug]}
        </span>
      )}
    </div>
  )
}

export const illustrations: Record<string, () => ReactNode> = Object.fromEntries(
  Object.keys(LABELS).map((slug) => [slug, () => <Illo slug={slug} />]),
)
