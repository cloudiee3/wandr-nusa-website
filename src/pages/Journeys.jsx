import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { X } from 'lucide-react'
import PageHero from '../components/PageHero'
import JourneyCard from '../components/JourneyCard'
import Reveal from '../components/Reveal'
import { journeys, categories } from '../data/journeys'
import { destinations, destBySlug } from '../data/destinations'

const fmtDate = (s) => {
  if (!s) return null
  const d = new Date(s)
  return Number.isNaN(+d) ? null : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Journeys() {
  const [params, setParams] = useSearchParams()
  const [active, setActive] = useState('All')

  // Set by the hero search widget.
  const dest = params.get('dest')
  const place = params.get('place')
  const kind = params.get('kind')
  const from = fmtDate(params.get('from'))
  const to = fmtDate(params.get('to'))
  const people = params.get('people')
  const destination = dest ? destBySlug(dest) : null

  const shown = useMemo(() => {
    // A "place" is somewhere we don't run a fixed departure yet.
    if (place) return []
    let list = journeys
    if (destination) list = list.filter((j) => destination.journeys.includes(j.slug))
    if (kind === 'day') list = list.filter((j) => j.duration.toLowerCase().includes('day') && !j.duration.includes('·'))
    if (active !== 'All') list = list.filter((j) => j.tags.includes(active))
    return list
  }, [destination, place, kind, active])

  const searched = destination || place || kind || from || people
  const clearSearch = () => setParams({}, { replace: true })

  return (
    <>
      <PageHero
        image="rinjani-crater"
        eyebrow="Our journeys"
        title={<>Trips with a <span className="flourish-light">point to them</span></>}
        lead="Seven routes we know street by street and ridge by ridge — plus a blank page if none of them is quite it."
      />

      <section className="wrap py-12 lg:py-16">
        {searched && (
          <Reveal className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(1,29,57,0.06)]">
            <span className="text-[12px] sm:text-[11px] font-semibold uppercase tracking-label text-ink-300">Your search</span>
            <div className="flex flex-wrap items-center gap-2">
              {destination && <span className="chip chip-on">{destination.name}</span>}
              {place && <span className="chip chip-on">{place}</span>}
              {kind === 'day' && <span className="chip chip-on">Day trips</span>}
              {from && to && <span className="chip">{from} – {to}</span>}
              {people && <span className="chip">{people} {people === '1' ? 'traveller' : 'travellers'}</span>}
            </div>
            <button
              type="button"
              onClick={clearSearch}
              className="ml-auto inline-flex items-center gap-1.5 text-[0.84rem] text-ink-400 transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} /> Clear
            </button>
          </Reveal>
        )}

        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`chip ${active === c ? 'chip-on' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 text-[0.86rem] text-ink-400">
          {shown.length} {shown.length === 1 ? 'journey' : 'journeys'}
          {destination && <> in {destination.name}</>}
        </p>

        {shown.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-[0_1px_3px_rgba(1,29,57,0.06)]">
            <h2 className="text-[1.4rem]">
              {place ? <>No fixed departure for {place} — yet</> : 'Nothing matches that combination'}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-500">
              {place
                ? `We run ${place} as a private trip rather than a scheduled one. Tell us your dates and we'll come back with a routed plan and the real cost.`
                : 'Widen the filters, or let us build something around your dates instead — most of what we run started as a request rather than a listing.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to={`/journeys/custom-private-journey${place ? `?place=${encodeURIComponent(place)}` : ''}`}
                className="btn-accent"
              >
                {place ? `Plan a ${place} trip` : 'Plan a custom trip'}
              </Link>
              <button type="button" onClick={() => { setActive('All'); clearSearch() }} className="btn-ghost">
                See everything
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((j, i) => (
              <Reveal key={j.slug} delay={(i % 3) * 90}>
                <JourneyCard journey={j} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
