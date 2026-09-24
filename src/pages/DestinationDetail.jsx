import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Mountain } from 'lucide-react'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import JourneyCard from '../components/JourneyCard'
import { destBySlug, destinations } from '../data/destinations'
import { bySlug } from '../data/journeys'

export default function DestinationDetail() {
  const { slug } = useParams()
  const d = destBySlug(slug)
  if (!d) return <Navigate to="/destinations" replace />

  const trips = d.journeys.map(bySlug).filter(Boolean)
  const others = destinations.filter((x) => x.slug !== d.slug).slice(0, 3)

  return (
    <>
      <PageHero
        back={{ to: '/destinations', label: 'All destinations' }}
        image={d.image}
        eyebrow={d.island}
        title={d.name}
        lead={d.blurb}
      />

      <section className="wrap grid gap-14 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-24">
        <div>
          <Reveal as="p" className="font-serif text-[1.35rem] italic leading-relaxed text-ink-600">
            {d.body.split('. ')[0]}.
          </Reveal>
          <Reveal as="p" delay={90} className="mt-6 text-[1.02rem] leading-relaxed text-ink-500">
            {d.body.split('. ').slice(1).join('. ')}
          </Reveal>

          <Reveal delay={160} className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/[0.07] pt-7">
            <span>
              <span className="label flex items-center gap-1.5">
                <Mountain className="h-3.5 w-3.5" strokeWidth={1.75} /> Elevation
              </span>
              <span className="mt-1.5 block font-display text-lg font-medium">{d.elevation}</span>
            </span>
            <span>
              <span className="label flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} /> Best time
              </span>
              <span className="mt-1.5 block font-display text-lg font-medium">{d.bestTime}</span>
            </span>
          </Reveal>
        </div>

        <Reveal delay={120} className="grid grid-cols-2 gap-4">
          {d.gallery.map((g, i) => (
            <Img
              key={g + i}
              name={g}
              sizes="(min-width:1024px) 20vw, 45vw"
              className={`w-full overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-[3/4]'}`}
            />
          ))}
        </Reveal>
      </section>

      {trips.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="wrap">
            <span className="pill"><span className="pill-dot" />Journeys here</span>
            <h2 className="mt-4 text-[1.9rem] sm:text-[2.3rem]">
              How to see <span className="flourish">{d.name}</span>
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((t, i) => (
                <Reveal key={t.slug} delay={i * 90}><JourneyCard journey={t} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="wrap py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[1.7rem]">Nearby</h2>
          <Link to="/destinations" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> All destinations
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 90}>
              <Link to={`/destinations/${o.slug}`} className="group relative block min-h-[14rem] overflow-hidden rounded-2xl">
                <Img name={o.image} sizes="30vw" className="absolute inset-0 h-full w-full"
                     imgClassName="transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 scrim-soft" />
                <div className="relative flex h-full flex-col justify-end p-5">
                  <span className="label-light">{o.island}</span>
                  <h3 className="mt-1 text-xl !text-white">{o.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
