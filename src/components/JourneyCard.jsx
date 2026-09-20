import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, Users, MapPin } from 'lucide-react'
import Img from './Img'
import { formatPrice } from '../data/journeys'

export default function JourneyCard({ journey, sizes = '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw' }) {
  return (
    <Link
      to={`/journeys/${journey.slug}`}
      className="card group flex flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Img
          name={journey.image}
          sizes={sizes}
          className="h-full w-full"
          imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 scrim-soft opacity-70" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-label text-ink backdrop-blur">
          {journey.category}
        </span>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/85">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            {journey.region}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.3rem] leading-snug transition-colors duration-300 group-hover:text-sea-600">
          {journey.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 text-[0.93rem] leading-relaxed text-ink-500">
          {journey.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
            {journey.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
            {journey.group}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-ink/[0.07] pt-4">
          <span className="leading-tight">
            <span className="block font-mono text-[10px] uppercase tracking-label text-ink-300">
              {journey.priceFrom ? 'From' : 'Pricing'}
            </span>
            <span className="font-display text-lg font-semibold text-ink">
              {formatPrice(journey.priceFrom)}
            </span>
          </span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-ink transition-all duration-300 group-hover:border-sea-500 group-hover:bg-sea-500 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </Link>
  )
}
