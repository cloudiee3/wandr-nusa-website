import { useState, useMemo } from 'react'
import PageHero from '../components/PageHero'
import JourneyCard from '../components/JourneyCard'
import Reveal from '../components/Reveal'
import { journeys, categories } from '../data/journeys'

export default function Journeys() {
  const [active, setActive] = useState('All')

  const shown = useMemo(
    () => (active === 'All' ? journeys : journeys.filter((j) => j.category === active)),
    [active],
  )

  return (
    <>
      <PageHero
        image="rinjani-crater"
        eyebrow="Our journeys"
        title={<>Trips with a <span className="flourish-light">point to them</span></>}
        lead="Seven routes we know street by street and ridge by ridge — plus a blank page if none of them is quite it."
      />

      <section className="wrap py-14 lg:py-20">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`shrink-0 rounded-full border px-4 py-2 font-display text-sm transition-all duration-300 ${
                active === c
                  ? 'border-ink bg-ink text-white'
                  : 'border-ink/12 text-ink-500 hover:border-ink/40 hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-label text-ink-300">
          {shown.length} {shown.length === 1 ? 'journey' : 'journeys'}
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((j, i) => (
            <Reveal key={j.slug} delay={(i % 3) * 90}>
              <JourneyCard journey={j} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
