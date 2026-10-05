import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import PageHero from '../components/PageHero'
import JourneyCard from '../components/JourneyCard'
import { spell } from '../lib/spell'
import { readSearch } from '../lib/search'
import { readFavourites, subscribeFavourites } from '../lib/favourites'
import Reveal from '../components/Reveal'
import { journeys, categories } from '../data/journeys'
import { destBySlug } from '../data/destinations'


export default function Journeys() {
  const [params, setParams] = useSearchParams()

  // The chosen filter lives in the URL, not in component state. Held in state
  // it was lost the moment you opened a trip and came back: the chip reset to
  // All while the browser restored your scroll position, so you landed half
  // way down a list you were no longer looking at. In the URL, Back restores
  // it, and a filtered view can be sent to someone.
  const active = params.get('tag') || 'All'
  const setActive = (tag) => {
    const next = new URLSearchParams(params)
    if (tag === 'All') next.delete('tag')
    else next.set('tag', tag)
    setParams(next)
  }

  // Set by the hero search widget.
  const { dest, place, kind, from, to, travellers } = readSearch(params)
  const destination = dest ? destBySlug(dest) : null

  // Saving a trip used to lead nowhere: the heart stored a slug and nothing
  // ever read it back. This chip appears once there is something in there.
  const [saved, setSaved] = useState(() => readFavourites())
  useEffect(() => subscribeFavourites(() => setSaved(readFavourites())), [])
  const savedOn = active === 'Saved'
  // Leave the saved view as soon as the last one is unsaved, so the page is
  // never an empty list with no way back.
  // replace, not push: otherwise Back walks you through every moment the
  // saved list happened to empty.
  useEffect(() => {
    if (!savedOn || saved.size > 0) return
    const next = new URLSearchParams(params)
    next.delete('tag')
    setParams(next, { replace: true })
  }, [savedOn, saved.size]) // eslint-disable-line react-hooks/exhaustive-deps

  const shown = useMemo(() => {
    // A "place" is somewhere we don’t run a fixed departure yet.
    if (place) return []
    let list = journeys
    if (destination) list = list.filter((j) => destination.journeys.includes(j.slug))
    // Read the tag, not the duration string. Sniffing for "day" matched
    // "2 or 3 days" and "From 4 days", so asking the hero widget for day
    // trips returned the Rinjani summit trek and the open-ended custom one.
    if (kind === 'day') list = list.filter((j) => j.tags.includes('Day Trips'))
    if (active === 'Saved') return list.filter((j) => saved.has(j.slug))
    if (active !== 'All') list = list.filter((j) => j.tags.includes(active))
    return list
  }, [destination, place, kind, active, saved])

  const searched = destination || place || kind || from || travellers
  const clearSearch = () => setParams({}, { replace: true })

  return (
    <>
      <PageHero
        image="forest-road-aerial"
        eyebrow="Our journeys"
        title={<>The long way, <span className="flourish-light">on purpose</span></>}
        lead={`${spell(journeys.filter((j) => j.slug !== 'custom-private-journey').length)} routes we know by the season, the surface and where to stop. And a blank page, for the one that is not here yet.`.replace(/^./, (c) => c.toUpperCase())}
      />

      <section className="wrap py-12 lg:py-16">
        {searched && (
          <Reveal className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-ink/[0.09] bg-white p-4">
            <span className="text-[12px] sm:text-[11px] font-semibold uppercase tracking-label text-ink-300">Your search</span>
            <div className="flex flex-wrap items-center gap-2">
              {destination && <span className="chip chip-on">{destination.name}</span>}
              {place && <span className="chip chip-on">{place}</span>}
              {kind === 'day' && <span className="chip chip-on">Day trips</span>}
              {from && to && <span className="chip">{from} – {to}</span>}
              {travellers && <span className="chip">{travellers}</span>}
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
          {saved.size > 0 && (
            <button
              type="button"
              onClick={() => setActive(savedOn ? 'All' : 'Saved')}
              aria-pressed={savedOn}
              className={`chip shrink-0 gap-1.5 ${savedOn ? 'chip-on' : ''}`}
            >
              <Heart className={`h-3.5 w-3.5 ${savedOn ? 'fill-current' : 'fill-ember text-ember'}`} strokeWidth={2} />
              Saved {saved.size}
            </button>
          )}
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

        {/* The cards are h3. Without this the page goes straight from the
            hero's h1 to them, which reads as a missing level. */}
        <h2 className="sr-only">Journeys</h2>

        {shown.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-ink/[0.09] bg-white p-10 text-center">
            <h2 className="text-[1.4rem]">
              {place ? <>No fixed departure for {place} yet</> : savedOn ? 'Nothing saved yet' : 'Nothing matches that combination'}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-500">
              {place
                ? `We run ${place} as a private trip rather than a scheduled one. Tell us your dates and we’ll come back with a routed plan and the real cost.`
                : 'Widen the filters, or let us build something around your dates instead. Most of what we run started as a request rather than a listing.'}
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
