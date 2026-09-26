import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Img from './Img'
import { destinations } from '../data/destinations'
import { spell } from '../lib/spell'

const INTERVAL = 6500

/** The places we go, one at a time and full-bleed: the section heading rides
 *  at the top of the frame, the destination itself at the bottom. */
export default function DestinationSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || reduced.current) return
    const t = setTimeout(() => setI((n) => (n + 1) % destinations.length), INTERVAL)
    return () => clearTimeout(t)
  }, [i, paused])

  const next = () => setI((n) => (n + 1) % destinations.length)
  const d = destinations[i]

  return (
    <section
      id="escapes"
      className="relative min-h-[36rem] overflow-hidden lg:min-h-[44rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Where we go"
    >
      {destinations.map((s, n) => (
        <Img
          key={s.slug}
          name={s.image}
          sizes="100vw"
          priority={n === 0}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            n === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/55 to-ink-900/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/75 via-transparent to-ink-900/40" />

      <div className="wrap relative flex min-h-[36rem] flex-col py-14 lg:min-h-[44rem]">
        <div>
          <span className="pill-light">
            <span className="pill-dot" />
            Where we go
          </span>
          <h2 className="mt-5 max-w-xl text-[1.6rem] leading-[1.15] !text-white sm:text-[2rem]">
            {spell(destinations.length).replace(/^./, (c) => c.toUpperCase())} places worth{' '}
            <span className="flourish-light">the flight</span>
          </h2>
        </div>

        {/* The slide itself sits at the foot of the frame, where the gradient
            is heaviest and the text always has something dark behind it. */}
        <div key={d.slug} className="mt-auto max-w-2xl animate-fade-up pt-14">
          <span className="text-[12px] font-semibold uppercase tracking-label text-sea-300 sm:text-[11px]">
            {d.island}
          </span>
          <h3 className="mt-2 font-sans text-[2.1rem] font-semibold leading-[1.08] !text-white sm:text-[3rem]">
            {d.name}
          </h3>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-white/80">{d.blurb}</p>
        </div>

        {/* Five dots plus three controls is wider than a phone, so the
            controls drop to their own line rather than off the edge. */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
          <div className="-ml-2 flex items-center" role="tablist" aria-label="Destination">
            {destinations.map((s, n) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={s.name}
                onClick={() => setI(n)}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    n === i ? 'w-8 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/destinations"
              className="hidden items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3
                         text-[0.88rem] text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:inline-flex"
            >
              All destinations <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <Link
              to={`/destinations/${d.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3
                         text-[0.88rem] text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Explore
            </Link>
            <button
              type="button"
              onClick={next}
              aria-label="Next destination"
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sea-500 text-white
                         shadow-lift transition-all duration-300 hover:scale-105 hover:bg-sea-600"
            >
              <ArrowUpRight className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
