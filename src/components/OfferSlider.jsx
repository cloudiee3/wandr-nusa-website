import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Img from './Img'
import { offerSlides } from '../data/deals'

const INTERVAL = 6500

export default function OfferSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || reduced.current) return
    const t = setTimeout(() => setI((n) => (n + 1) % offerSlides.length), INTERVAL)
    return () => clearTimeout(t)
  }, [i, paused])

  const next = () => setI((n) => (n + 1) % offerSlides.length)
  const slide = offerSlides[i]

  return (
    <section
      className="relative min-h-[32rem] overflow-hidden lg:min-h-[40rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Special offers"
    >
      {offerSlides.map((s, n) => (
        <Img
          key={s.id}
          name={s.image}
          sizes="100vw"
          priority={n === 0}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            n === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/55 to-ink-900/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />

      <div className="wrap relative flex min-h-[32rem] flex-col justify-end py-14 lg:min-h-[40rem]">
        <div key={slide.id} className="max-w-2xl animate-fade-up">
          <h2 className="font-sans text-[2.1rem] font-semibold leading-[1.08] !text-white sm:text-[3rem]">
            {slide.headline}
          </h2>
          <p className="mt-7 text-[0.95rem] text-white/80">{slide.kicker}</p>
          <p className="mt-1 font-sans text-[1.7rem] font-semibold text-ember sm:text-[2rem]">
            {slide.amount}
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2" role="tablist" aria-label="Offer">
            {offerSlides.map((s, n) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={s.kicker}
                onClick={() => setI(n)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  n === i ? 'w-8 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={slide.to}
              className="hidden rounded-full border border-white/30 bg-white/10 px-6 py-3 text-[0.88rem]
                         text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:inline-flex"
            >
              See the trip
            </Link>
            <button
              type="button"
              onClick={next}
              aria-label="Next offer"
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sea-500 text-white
                         shadow-lift transition-all duration-300 hover:bg-sea-600 hover:scale-105"
            >
              <ArrowUpRight className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
