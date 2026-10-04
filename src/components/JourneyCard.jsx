import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Heart, MapPin, Star } from 'lucide-react'
import Img from './Img'
import { formatPrice, fromPrice } from '../data/journeys'
import { readFavourites, toggleFavourite, subscribeFavourites } from '../lib/favourites'


export default function JourneyCard({ journey, sizes = '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw' }) {
  const shots = [...new Set([journey.image, ...journey.gallery])].slice(0, 4)
  const [i, setI] = useState(0)
  const [saved, setSaved] = useState(() => readFavourites().has(journey.slug))

  // The same trip can be on screen twice (the grid and "you might also like"),
  // so each card follows the store rather than only its own click.
  useEffect(() => subscribeFavourites(() => setSaved(readFavourites().has(journey.slug))), [journey.slug])

  function toggleSave(e) {
    e.preventDefault()
    e.stopPropagation()
    setSaved(toggleFavourite(journey.slug))
  }

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-2xl">
        <Link to={`/journeys/${journey.slug}`} className="block" tabIndex={-1} aria-hidden="true">
          <div className="relative aspect-[4/3]">
            {shots.map((s, n) => (
              <Img
                key={s}
                name={s}
                sizes={sizes}
                priority={n === 0 && i === 0}
                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                  n === i ? 'opacity-100' : 'opacity-0'
                }`}
                imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
            ))}
          </div>
        </Link>

        <button
          type="button"
          onClick={toggleSave}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${journey.title} from saved` : `Save ${journey.title}`}
          className="absolute right-2.5 top-2.5 inline-flex h-11 w-11 items-center justify-center rounded-full
                     border border-white/25 bg-ink-900/30 text-white backdrop-blur-md
                     transition-colors duration-300 hover:bg-ink-900/45 active:scale-95"
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-white' : ''}`} strokeWidth={1.75} />
        </button>

        {/* The dot is 6px; the thing you tap is 44. */}
        {shots.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-center gap-0.5">
            {shots.map((s, n) => (
              <button
                key={s}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Photo ${n + 1} of ${shots.length}`}
                aria-current={n === i}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    n === i ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <h3 className="mt-4 font-sans text-[1.06rem] font-bold leading-snug">
        <Link to={`/journeys/${journey.slug}`} className="-my-3 inline-block py-3 transition-colors duration-300 hover:text-sea-600">
          {journey.title}
        </Link>
      </h3>

      {/* No bars between these three. This row wraps to two lines on every card
          at 1024px and on most of them at 360px and below, and a bar is a wrap
          point of its own: whichever way they were grouped, one ended up alone
          at the end of a line or alone at the start of the next. The icons
          already tell the three facts apart, which is what the bars were for,
          so the gap does the separating and nothing can be left stranded. */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-ink-400">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />{journey.region}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />{journey.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 shrink-0 fill-ember text-ember" strokeWidth={1.75} />
          <span className="tnum">{journey.rating.toFixed(1)}</span>
          <span className="text-ink-300">({journey.reviews})</span>
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-5">
        <span className="leading-tight">
          <span className="font-sans text-[1.28rem] font-bold tnum text-ink">
            {formatPrice(fromPrice(journey))}
          </span>
          {fromPrice(journey) && <span className="text-[0.85rem] text-ink-400"> / person</span>}
        </span>
        <Link
          to={`/journeys/${journey.slug}`}
          className="inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-ink/10
                     bg-white px-5 text-[0.88rem] text-ink shadow-[0_1px_3px_rgba(1,29,57,0.08)]
                     transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white active:scale-[0.97]"
        >
          View Details
        </Link>
      </div>

      {/* Two lines of room whatever the note says: the price row above it is
          pushed down by mt-auto, so a one-line note on one card and a two-line
          note on the next left their prices 18px out of line. */}
      <p className="mt-2 min-h-[2.25rem] text-[0.76rem] text-ink-300">*{journey.priceNote}</p>
    </article>
  )
}
