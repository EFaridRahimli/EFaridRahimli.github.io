import type { ReactNode } from 'react'

// Shared SVG defs: a film-grain filter used by every illustration and the hero diagram.
export function SvgDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 -2.6 1.75" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  )
}

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="1" className="illo size-full" aria-hidden>
    {children}
  </svg>
)

// Grain-filled shape, the soft graphite shading in the mockup.
const Grain = ({ d, o = 0.55 }: { d: string; o?: number }) => (
  <path d={d} fill="currentColor" stroke="none" filter="url(#grain)" opacity={o} />
)

const brackets = (x: number, y: number, w: number, h: number, s = 10) =>
  `M${x},${y + s}V${y}H${x + s}M${x + w - s},${y}H${x + w}V${y + s}M${x + w},${y + h - s}V${y + h}H${x + w - s}M${x + s},${y + h}H${x}V${y + h - s}`

const diamond = (cx: number, cy: number, a: number, b: number) => `M${cx},${cy - b}L${cx + a},${cy}L${cx},${cy + b}L${cx - a},${cy}Z`

const xy = (cx: number, cy: number, r: number, deg: number) => {
  const t = (deg * Math.PI) / 180
  return [cx + r * Math.cos(t), cy + r * Math.sin(t)] as const
}
const pt = (cx: number, cy: number, r: number, deg: number) => xy(cx, cy, r, deg).map((n) => n.toFixed(2)).join(',')

export const sector = (cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) => {
  const large = a1 - a0 > 180 ? 1 : 0
  return `M${pt(cx, cy, r1, a0)}A${r1},${r1} 0 ${large} 1 ${pt(cx, cy, r1, a1)}L${pt(cx, cy, r0, a1)}A${r0},${r0} 0 ${large} 0 ${pt(cx, cy, r0, a0)}Z`
}

const Label = ({ x, y, children }: { x: number; y: number; children: string }) => (
  <text x={x} y={y} fill="currentColor" stroke="none" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing=".4">
    {children}
  </text>
)

const Tomato = () => (
  <Svg>
    <path d="M30,122C48,70 100,38 168,30C158,88 112,124 30,122Z" />
    <path d="M30,122Q98,82 168,30" />
    {[[60, 102, 58, 84], [82, 90, 76, 70], [104, 76, 102, 54], [126, 62, 128, 44], [70, 97, 84, 112], [96, 82, 112, 100], [120, 66, 136, 82]].map(([a, b, c, d]) => (
      <path key={a + c} d={`M${a},${b}Q${(a + c) / 2 + 4},${(b + d) / 2} ${c},${d}`} strokeOpacity=".55" />
    ))}
    <Grain d="M112,62a6,6 0 1,0 12,0a6,6 0 1,0 -12,0M128,74a4,4 0 1,0 8,0a4,4 0 1,0 -8,0" o={0.9} />
    <path className="float" d={brackets(102, 48, 44, 38, 7)} strokeWidth="1.3" />
    <g className="float">
      <path d="M102,48L92,26H30" strokeOpacity=".45" />
      <Label x={30} y={22}>blight 0.96</Label>
    </g>
  </Svg>
)

const Serengeti = () => (
  <Svg>
    <path d={brackets(14, 16, 172, 120, 10)} />
    <path d="M22,110H178" strokeOpacity=".5" />
    <Grain d="M40,64C46,56 92,54 100,62C92,68 48,70 40,64Z" o={0.7} />
    <path d="M70,110L72,86L64,70M72,86L82,68M72,92L60,74" />
    <g className="float">
      <path d={brackets(108, 78, 50, 38, 6)} strokeWidth="1.3" />
      <ellipse cx="128" cy="97" rx="13" ry="6" />
      <path d="M139,94L146,84L151,86L144,97M146,84l1,-3M116,96l-3,6M120,102v10M124,102v10M133,102v10M137,101v11" />
      {[120, 124, 128, 132, 136].map((x) => <path key={x} d={`M${x},91.5v11`} strokeOpacity=".75" />)}
    </g>
    {Array.from({ length: 16 }, (_, i) => {
      const r = Math.floor(i / 4), c = i % 4
      return r === c
        ? <rect key={i} x={146 + c * 8} y={24 + r * 8} width="8" height="8" fill="currentColor" stroke="none" opacity=".75" />
        : <rect key={i} x={146 + c * 8} y={24 + r * 8} width="8" height="8" strokeOpacity=".35" />
    })}
  </Svg>
)

const Grape = () => (
  <Svg>
    <path d="M70,120L52,116L36,124L38,104L20,96L34,86L22,66L44,68L44,46L60,58L70,32L80,58L96,46L96,68L118,66L106,86L120,96L102,104L104,124L88,116Z" strokeLinejoin="round" />
    <path d="M70,120L68,136" />
    {['M70,120L70,40', 'M70,112L46,56', 'M70,112L94,56', 'M70,116L28,94', 'M70,116L112,94'].map((d) => <path key={d} d={d} strokeOpacity=".5" />)}
    <Grain d="M56,80a5,5 0 1,0 10,0a5,5 0 1,0 -10,0M84,70a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M78,96a3,3 0 1,0 6,0a3,3 0 1,0 -6,0" o={0.9} />
    <g className="float">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="138" y={36 + i * 20} width="10" height="10" fill={i === 1 ? 'currentColor' : 'none'} />
          <path d={`M154,${41 + i * 20}h${i === 1 ? 30 : 16}`} strokeOpacity={i === 1 ? 1 : 0.4} strokeWidth={i === 1 ? 1.4 : 1} />
        </g>
      ))}
    </g>
    <path d="M126,30V122" strokeOpacity=".3" strokeDasharray="2 3" />
  </Svg>
)

const KeySync = () => (
  <Svg>
    <circle cx="72" cy="75" r="52" />
    <circle cx="72" cy="75" r="36" strokeOpacity=".6" />
    <circle cx="72" cy="75" r="18" strokeOpacity=".4" />
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${pt(72, 75, 36, i * 30 - 75)}L${pt(72, 75, 52, i * 30 - 75)}`} strokeOpacity=".6" />)}
    <Grain d={sector(72, 75, 36, 52, -75, -15)} o={0.8} />
    <path className="float" d={sector(72, 75, 36, 52, -45, -15)} strokeWidth="1.4" />
    <circle cx="72" cy="75" r="2" fill="currentColor" />
    <Label x={96} y={20}>8A → 9A</Label>
    {[6, 14, 9, 22, 30, 18, 26, 12, 20, 8, 15, 5].map((h, i) => (
      <path key={i} d={`M${140 + i * 4},${75 - h / 2}v${h}`} strokeWidth="1.4" strokeOpacity={i > 2 && i < 8 ? 1 : 0.45} />
    ))}
    <path d="M136,100H190" strokeOpacity=".3" strokeDasharray="2 3" />
  </Svg>
)

const Gamma = () => (
  <Svg>
    <ellipse cx="52" cy="70" rx="30" ry="12" transform="rotate(-38 52 70)" />
    <Grain d="M33,85A30,12 -38 0 0 71,55L52,70Z" o={0.5} />
    <path d="M52,70L74,48M40,92L30,126M64,82L74,126M36,112L68,112" strokeOpacity=".8" />
    <rect x="26" y="126" width="60" height="6" />
    <path className="dash" d="M74,48C100,38 108,58 128,50" strokeDasharray="3 3" />
    <g className="float">
      {[-24, -14, -6, 2, 10, 18].map((a) => <path key={a} d={`M128,50L${pt(128, 50, 50, a)}`} strokeOpacity=".7" />)}
      {[-18, -8, 6, 14].map((a) => <path key={a} d={`M${pt(128, 50, 30, a)}L${pt(128, 50, 44, a + 6)}`} strokeOpacity=".5" />)}
    </g>
    {Array.from({ length: 26 }, (_, i) => {
      const [cx, cy] = xy(156, 112, 4 + (i % 7) * 3.2, i * 137.5)
      return <circle key={i} cx={cx} cy={cy} r={i % 3 ? 0.9 : 1.5} fill="currentColor" stroke="none" />
    })}
  </Svg>
)

const Bike = () => (
  <Svg>
    <path d="M24,18V126H186" />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M24,${30 + i * 22}H186`} strokeOpacity=".15" />)}
    {[22, 34, 30, 52, 70, 64, 84, 92].map((h, i) => (
      <g key={i}>
        <Grain d={`M${36 + i * 18},${126 - h}h10v${h}h-10Z`} o={0.35 + i * 0.05} />
        <rect x={36 + i * 18} y={126 - h} width="10" height={h} strokeOpacity=".6" />
      </g>
    ))}
    <g className="float">
      <path d="M41,96L59,84L77,92L95,62L113,44L131,54L149,34L167,26" strokeWidth="1.4" />
      {[[41, 96], [59, 84], [77, 92], [95, 62], [113, 44], [131, 54], [149, 34], [167, 26]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.2" fill="var(--color-paper)" />
      ))}
    </g>
    <Label x={110} y={14}>RMSE 1.86 → 0.42</Label>
  </Svg>
)

const Hotel = () => (
  <Svg>
    <path d={brackets(16, 14, 168, 124, 10)} />
    <rect x="34" y="30" width="132" height="94" />
    <Grain d="M34,30h132v14h-132Z" o={0.6} />
    {Array.from({ length: 28 }, (_, i) => {
      const r = Math.floor(i / 7), c = i % 7, x = 34 + c * (132 / 7), y = 44 + r * 20
      return (
        <g key={i}>
          <rect x={x} y={y} width={132 / 7} height="20" strokeOpacity=".3" />
          {[3, 9, 16, 24].includes(i) && <path className="float" d={`M${x + 6},${y + 6}l7,8m0,-8l-7,8`} strokeWidth="1.3" />}
          {i === 12 && <circle cx={x + 9.4} cy={y + 10} r="6" strokeWidth="1.3" />}
        </g>
      )
    })}
    <Label x={34} y={26}>accuracy 0.89</Label>
  </Svg>
)

const Movie = () => (
  <Svg>
    <g transform="rotate(-8 90 76)">
      <rect x="14" y="50" width="134" height="52" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <rect x={20 + i * 12} y="53" width="5" height="4" fill="currentColor" stroke="none" opacity=".75" />
          <rect x={20 + i * 12} y="95" width="5" height="4" fill="currentColor" stroke="none" opacity=".75" />
        </g>
      ))}
      {[0, 1, 2].map((i) => <rect key={i} x={20 + i * 42} y="61" width="36" height="30" strokeOpacity=".7" />)}
      <Grain d="M62,61h36v30h-36Z" o={0.45} />
    </g>
    <g className="float">
      <circle cx="168" cy="40" r="15" />
      <path d="M161,40h14M168,33v14" strokeWidth="1.3" />
      <circle cx="168" cy="112" r="15" strokeOpacity=".5" />
      <path d="M161,112h14" strokeOpacity=".5" />
      <path d="M148,76H160M160,76L168,56M160,76L168,96" strokeOpacity=".5" strokeDasharray="2 2" />
    </g>
  </Svg>
)

const Serverless = () => (
  <Svg>
    <rect x="12" y="56" width="34" height="30" rx="4" />
    <path d="M20,76a6,6 0 0 1 2,-11a8,8 0 0 1 14,2a5,5 0 0 1 1,9Z" strokeOpacity=".8" />
    <rect x="62" y="56" width="34" height="30" rx="4" />
    <circle cx="79" cy="71" r="6" strokeOpacity=".8" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d={`M${pt(79, 71, 7.5, a)}L${pt(79, 71, 10, a)}`} strokeOpacity=".8" />)}
    <rect x="112" y="56" width="34" height="30" rx="4" />
    <Grain d="M112,60a4,4 0 0 1 4,-4h26a4,4 0 0 1 4,4v22a4,4 0 0 1 -4,4h-26a4,4 0 0 1 -4,-4Z" o={0.35} />
    <Label x={120} y={74}>λ fn</Label>
    <path d="M46,71H58M54,68l4,3l-4,3M96,71H108M104,68l4,3l-4,3M146,71H156M152,68l4,3l-4,3" />
    <g className="float">
      <path d={diamond(174, 71, 16, 16)} strokeWidth="1.3" />
      <path d="M168,71l4,4l8,-8" strokeWidth="1.3" />
    </g>
    <path className="dash" d="M29,86V108H174V87" strokeDasharray="3 3" strokeOpacity=".6" />
    <path d="M29,56V36H174V55" strokeOpacity=".25" />
    <Label x={52} y={124}>step functions · conf ≥ 0.67</Label>
  </Svg>
)

const Dog = () => (
  <Svg>
    {[[46, 44, 0.6], [94, 30, 0.45], [128, 18, 0.3]].map(([x, a, o], i) => (
      <g key={i} className={i ? 'float' : undefined}>
        {[10, 0, -10].map((dy) => <path key={dy} d={diamond(x, 75 + dy, a, a / 2)} fill="var(--color-paper)" strokeOpacity={dy === -10 ? 1 : 0.4} />)}
        <Grain d={diamond(x, 65, a, a / 2)} o={o} />
      </g>
    ))}
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M146,65L157,${45 + i * 20}M163,${45 + i * 20}L180,75`} strokeOpacity=".35" />)}
    {[0, 1, 2, 3].map((i) => <circle key={i} cx="160" cy={45 + i * 20} r="3.2" fill="var(--color-paper)" />)}
    <circle cx="184" cy="75" r="4" fill="currentColor" />
    <Label x={22} y={132}>resnet-18 → breed</Label>
  </Svg>
)

const Cars = () => (
  <Svg>
    <path d="M22,16V126H188" />
    {[[34, 104], [42, 96], [50, 108], [58, 88], [66, 94], [74, 80], [82, 86], [90, 70], [98, 78], [106, 62], [114, 68], [122, 52], [130, 60], [138, 46], [146, 50], [154, 36], [162, 44], [170, 30]].map(([x, y]) => (
      <circle key={x} cx={x} cy={y} r="1.6" fill="currentColor" stroke="none" />
    ))}
    <path className="float" d="M28,112L178,28" strokeWidth="1.3" />
    <path className="dash" d="M28,118L178,40" strokeDasharray="3 3" strokeOpacity=".5" />
    <Label x={160} y={52}>MMR</Label>
    <Grain d="M150,126v-22h8v22ZM162,126v-34h8v34ZM174,126v-46h8v46Z" o={0.5} />
    <Label x={30} y={22}>n = 558,837</Label>
  </Svg>
)

export const illustrations: Record<string, () => ReactNode> = {
  '01-tomato-leaf-detection': Tomato,
  '02-serengeti-camera-trap': Serengeti,
  '03-grape-leaf-classification': Grape,
  '04-keysync': KeySync,
  '05-gamma-ray-classification': Gamma,
  '06-bike-sharing-demand': Bike,
  '07-hotel-cancellation': Hotel,
  '08-movie-review-sentiment': Movie,
  '09-serverless-ml-workflow': Serverless,
  '10-dog-breed-classifier': Dog,
  '11-car-dealership-eda': Cars,
}
