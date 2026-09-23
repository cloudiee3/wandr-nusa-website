import { Link } from 'react-router-dom'
import { ShieldCheck, Sparkles, Star, Users } from 'lucide-react'
import Img from './Img'
import Reveal from './Reveal'
import { trustSignals } from '../data/site'
import { bySlug, formatPrice, journeys } from '../data/journeys'

const ICONS = [ShieldCheck, Users]

// Computed from the journey data rather than written in, so it can't drift.
const rated = journeys.filter((j) => j.rating)
const avgRating = (rated.reduce((n, j) => n + j.rating, 0) / rated.length).toFixed(1)
const totalReviews = rated.reduce((n, j) => n + j.reviews, 0)

export default function AboutStrip() {
  const pick = bySlug('rinjani-summit-trek')

  return (
    <section className="wrap py-16 lg:py-24">
      <Reveal>
        <span className="pill"><span className="pill-dot" />About us</span>
      </Reveal>

      <Reveal as="h2" delay={80} className="mt-5 max-w-2xl font-normal text-[2rem] leading-[1.12] sm:text-[2.7rem]">
        Handpicked routes, honest prices
      </Reveal>
      <Reveal as="p" delay={150} className="mt-4 max-w-xl text-[1.02rem] text-ink-500">
        Itineraries we have walked ourselves, costed line by line, with nothing buried in the margin.
      </Reveal>

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          {trustSignals.map((t, i) => {
            const Icon = ICONS[i] ?? Sparkles
            return (
              <Reveal key={t.title} delay={i * 90}>
                <article className="rounded-2xl border border-ink/[0.08] bg-white p-6 transition-shadow duration-500 hover:shadow-card sm:p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sand-200 text-ink">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-sans text-[1.05rem] font-bold">{t.title}</h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-500">{t.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={140} className="relative">
          <Img
            name="tetebatu-field"
            sizes="(min-width:1024px) 46vw, 100vw"
            className="aspect-[4/5] w-full overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]"
          />

          {/* Floating cards — the reference's device, with travel content in it. */}
          <div className="absolute left-4 right-4 top-6 rounded-2xl bg-white/95 p-5 shadow-lift backdrop-blur-sm sm:left-6 sm:right-auto sm:w-[21rem]">
            <span className="text-[0.82rem] font-semibold text-ink">Traveller ratings</span>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sea-100 text-sea-600">
                <Star className="h-5 w-5 fill-current" strokeWidth={0} />
              </span>
              <div>
                <span className="block font-display text-[1.6rem] font-semibold leading-none tnum text-ink">
                  {avgRating}
                </span>
                <span className="mt-1 block whitespace-nowrap text-[0.76rem] text-ink-400">
                  {totalReviews.toLocaleString('en-US')} reviews
                </span>
              </div>
              <span className="ml-auto flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-ember text-ember" strokeWidth={0} />
                ))}
              </span>
            </div>
          </div>

          <Link
            to={`/journeys/${pick.slug}`}
            className="group absolute bottom-6 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur-sm sm:left-auto sm:right-6 sm:w-[21rem]"
          >
            <span className="text-[0.82rem] font-semibold text-ink">Most booked this season</span>
            <div className="mt-3 flex items-center gap-3">
              <Img name={pick.image} sizes="64px" className="h-14 w-14 shrink-0 overflow-hidden rounded-xl" />
              <div className="min-w-0">
                <span className="block text-[0.9rem] font-medium leading-snug text-ink transition-colors group-hover:text-sea-600">
                  {pick.title}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.75rem] text-ink-400">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" strokeWidth={1.75} />{pick.group}
                  </span>
                  <span className="text-ink-200">|</span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 fill-ember text-ember" strokeWidth={0} />{pick.rating}
                  </span>
                </span>
              </div>
              <span className="ml-auto shrink-0 font-display text-[0.98rem] font-semibold tnum text-ink">
                {formatPrice(pick.priceFrom)}
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
