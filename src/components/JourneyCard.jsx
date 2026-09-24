import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Heart, MapPin, Star } from 'lucide-react'
import Display from './Display'
import Img from './Img'
import { formatPrice, fromPrice } from '../data/journeys'

const FAV_KEY = 'wandrnusa:saved'

// Browser storage is per-viewer and can throw, so every access is guarded and
// the card renders correctly when it comes back empty.
const readFavs = () => {
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]')) }
  catch { return new Set() }
}
const writeFavs = (set) => {
  try { localStorage.setItem(FAV_KEY, JSON.stringify([...set])) } catch { /* ignore */ }
}

export default function JourneyCard({ journey, sizes = '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw' }) {
  const shots = [...new Set([journey.image, ...journey.gallery])].slice(0, 4)
  const [i, setI] = useState(0)
  const [saved, setSaved] = useState(() => readFavs().has(journey.slug))

  function toggleSave(e) {
    e.preventDefault()
    e.stopPropagation()
    const favs = readFavs()
    favs.has(journey.slug) ? favs.delete(journey.slug) : favs.add(journey.slug)
    writeFavs(favs)
    setSaved(favs.has(journey.slug))
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
          <Display>{journey.title}</Display>
        </Link>
      </h3>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8rem] text-ink-400">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />{journey.region}
        </span>
        <span className="text-ink-200">|</span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} />{journey.duration}
        </span>
        <span className="text-ink-200">|</span>
        <span className="inline-flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-ember text-ember" strokeWidth={1.75} />
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
          View details
        </Link>
      </div>

      <p className="mt-2 text-[0.76rem] text-ink-300">*{journey.priceNote}</p>
    </article>
  )
}
