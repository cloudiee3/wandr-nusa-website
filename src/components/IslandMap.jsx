import islands from '../data/islands.json'

// Real coordinates; the projection below matches the one in scripts/build-map.mjs.
// `lead` is the leader-line length and `anchor` the text alignment — both are
// tuned so the labels in the tight Lombok cluster don't collide.
const PLACES = [
  { name: 'Gili Islands', lon: 116.04, lat: -8.35, place: 'above', lead: 30, anchor: 'end',    dx: 8 },
  { name: 'Mt Rinjani',   lon: 116.46, lat: -8.41, place: 'above', lead: 14, anchor: 'start',  dx: -6 },
  { name: 'Komodo',       lon: 119.49, lat: -8.58, place: 'below', lead: 14, anchor: 'middle', dx: 0 },
]

// Where we're based — gets the pulse.
const BASE = { lon: 116.04, lat: -8.49 }

// The drawn route. Between Lombok and Komodo it carries two waypoints in the
// Flores Sea so the line rounds Sumbawa's north coast instead of crossing it.
const ROUTE = [
  { lon: 116.04, lat: -8.35 },
  { lon: 116.46, lat: -8.41 },
  { lon: 117.20, lat: -8.05 },
  { lon: 118.75, lat: -8.05 },
  { lon: 119.49, lat: -8.58 },
]

const ISLAND_LABELS = [
  { name: 'Java',    lon: 114.38, lat: -8.30 },
  { name: 'Sumbawa', lon: 117.80, lat: -8.72 },
  { name: 'Flores',  lon: 122.00, lat: -8.65 },
  { name: 'Sumba',   lon: 119.85, lat: -9.78 },
]

const { lonMin, lonMax, latMax } = islands.bbox
const SCALE = islands.width / (lonMax - lonMin)
const px = (lon) => (lon - lonMin) * SCALE
const py = (lat) => (latMax - lat) * SCALE

const pt = (p) => `${px(p.lon).toFixed(1)},${py(p.lat).toFixed(1)}`
const ROUTE_D = `M${ROUTE.map(pt).join('L')}`

export default function IslandMap({ className = '' }) {
  return (
    <figure className={`m-0 ${className}`}>
      {/* A map is wide by nature; on a phone it scrolls rather than shrinking
          the labels into illegibility. */}
      <div className="no-scrollbar relative -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <svg
          viewBox={islands.viewBox}
          className="h-auto w-[860px] min-w-[860px] sm:w-full sm:min-w-0"
          role="img"
          aria-label="Map of the Lesser Sunda islands from Lombok east through Sumbawa and Flores, with the places Wandr Nusa runs trips to marked."
        >
          <defs>
            <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14416E" />
              <stop offset="100%" stopColor="#0A2E52" />
            </linearGradient>
          </defs>

          {/* sea grid */}
          <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
            {Array.from({ length: 13 }, (_, i) => (
              <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2={islands.height} />
            ))}
            {Array.from({ length: 4 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 100} x2={islands.width} y2={i * 100} />
            ))}
          </g>

          {/* land */}
          <g fill="url(#landFill)" stroke="rgba(127,214,217,0.45)" strokeWidth="0.9" strokeLinejoin="round">
            {islands.paths.map((d, i) => <path key={i} d={d} />)}
          </g>

          {ISLAND_LABELS.map((l) => (
            <text
              key={l.name}
              x={px(l.lon)}
              y={py(l.lat)}
              textAnchor="middle"
              className="fill-white/35"
              style={{ font: '600 11px Figtree, system-ui, sans-serif', letterSpacing: '0.16em', textTransform: 'uppercase' }}
            >
              {l.name.toUpperCase()}
            </text>
          ))}

          {/* the route we actually run */}
          <path
            d={ROUTE_D}
            fill="none"
            stroke="rgba(56,188,194,0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="7 7"
            style={{ strokeDashoffset: 700, animation: 'trail-draw 3.4s ease-out 0.3s forwards' }}
          />

          {/* a boat working its way east along it */}
          <circle
            r="4.5"
            className="fill-white"
            style={{
              offsetPath: `path("${ROUTE_D}")`,
              offsetRotate: '0deg',
              animation: 'run-route 9s ease-in-out 1.2s infinite',
            }}
          />

          {/* home base */}
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <circle
              cx={px(BASE.lon)} cy={py(BASE.lat)} r="9"
              fill="none" stroke="rgba(56,188,194,0.55)" strokeWidth="1.5"
              style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'sonar 3.6s ease-out infinite' }}
            />
          </g>

          {PLACES.map((p) => {
            const x = px(p.lon)
            const y = py(p.lat)
            const above = p.place === 'above'
            const tip = above ? y - p.lead : y + p.lead
            const ty = above ? tip - 6 : tip + 13
            return (
              <g key={p.name}>
                <line
                  x1={x} y1={above ? y - 6 : y + 6} x2={x} y2={tip}
                  stroke="rgba(127,214,217,0.6)" strokeWidth="1"
                />
                <circle cx={x} cy={y} r="4.5" className="fill-sea-300" stroke="#011D39" strokeWidth="1.5" />
                {/* dark halo so the label stays readable where it crosses land */}
                <text
                  x={x + p.dx} y={ty} textAnchor={p.anchor}
                  stroke="#011426" strokeWidth="3.5" strokeLinejoin="round"
                  style={{ font: '600 12.5px Figtree, system-ui, sans-serif', letterSpacing: '0.03em' }}
                >
                  {p.name}
                </text>
                <text
                  x={x + p.dx} y={ty} textAnchor={p.anchor} className="fill-white"
                  style={{ font: '600 12.5px Figtree, system-ui, sans-serif', letterSpacing: '0.03em' }}
                >
                  {p.name}
                </text>
              </g>
            )
          })}
        </svg>

        {/* scroll hint on narrow screens */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink-900 to-transparent sm:hidden"
        />
      </div>

      <figcaption className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] sm:text-[11px] font-semibold uppercase tracking-label text-white/40">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sea-300" /> Where we run trips
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-6 bg-sea-400" /> Lombok to Komodo
        </span>
        <span className="sm:hidden">Swipe the map →</span>
      </figcaption>
    </figure>
  )
}
