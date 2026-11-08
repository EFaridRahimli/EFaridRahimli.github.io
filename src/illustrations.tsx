import type { ReactNode } from 'react'

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

const Illo = ({ slug }: { slug: string }) => (
  <div className="illo relative">
    <img src={`${import.meta.env.BASE_URL}illos/${slug}.svg`} alt="" width={960} height={720} loading="lazy" decoding="async" className="block h-auto w-full" />
    {LABELS[slug] && (
      <span className="illo-label absolute" style={{ left: `${AT[slug]?.[0] ?? 3}%`, top: `${AT[slug]?.[1] ?? 3}%` }}>
        {LABELS[slug]}
      </span>
    )}
  </div>
)

export const illustrations: Record<string, () => ReactNode> = Object.fromEntries(
  Object.keys(LABELS).map((slug) => [slug, () => <Illo slug={slug} />]),
)
