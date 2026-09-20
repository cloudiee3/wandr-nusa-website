/**
 * Signature motif: a compass rose whose needle sweeps and settles,
 * with sonar rings pushing out and a dotted route drawing itself in.
 * Pure SVG + CSS so it costs nothing and respects reduced-motion.
 */
export default function CompassSignature({ className = '' }) {
  const rings = [0, 1.6, 3.2]

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      {/* sonar */}
      {rings.map((delay, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2
                     rounded-full border border-sea-400/50"
          style={{ animation: `sonar 4.8s cubic-bezier(.2,.6,.3,1) ${delay}s infinite` }}
        />
      ))}

      <svg viewBox="0 0 200 200" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="needleN" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BCC2" />
            <stop offset="100%" stopColor="#12A0A8" />
          </linearGradient>
        </defs>

        {/* dial */}
        <circle cx="100" cy="100" r="76" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* tick marks every 15° */}
        {Array.from({ length: 24 }, (_, i) => {
          const major = i % 6 === 0
          const a = (i * 15 * Math.PI) / 180
          const r1 = major ? 66 : 71
          return (
            <line
              key={i}
              x1={100 + Math.sin(a) * r1}
              y1={100 - Math.cos(a) * r1}
              x2={100 + Math.sin(a) * 76}
              y2={100 - Math.cos(a) * 76}
              stroke={major ? 'rgba(127,214,217,0.8)' : 'rgba(255,255,255,0.22)'}
              strokeWidth={major ? 1.6 : 1}
            />
          )
        })}

        {/* cardinal letters */}
        {[['N', 100, 36], ['E', 164, 104], ['S', 100, 172], ['W', 36, 104]].map(([t, x, y]) => (
          <text
            key={t}
            x={x}
            y={y}
            textAnchor="middle"
            className="fill-white/50"
            style={{ font: '500 11px "JetBrains Mono", monospace', letterSpacing: '0.1em' }}
          >
            {t}
          </text>
        ))}

        {/* route trail between three islands */}
        <path
          d="M52 132 Q 84 96 108 112 T 156 72"
          fill="none"
          stroke="rgba(127,214,217,0.55)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
          style={{ strokeDashoffset: 220, animation: 'trail-draw 3.2s ease-out 0.4s forwards' }}
        />
        {[[52, 132], [108, 112], [156, 72]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" className="fill-sea-300" />
        ))}

        {/* needle */}
        <g style={{ transformOrigin: '100px 100px', animation: 'needle-sweep 7s cubic-bezier(.65,0,.35,1) infinite' }}>
          <polygon points="100,42 106,100 94,100" fill="url(#needleN)" />
          <polygon points="100,158 106,100 94,100" fill="rgba(255,255,255,0.32)" />
        </g>
        <circle cx="100" cy="100" r="5" className="fill-white" />
        <circle cx="100" cy="100" r="2" className="fill-ink" />
      </svg>
    </div>
  )
}
