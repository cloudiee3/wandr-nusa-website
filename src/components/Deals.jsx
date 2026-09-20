import { Link } from 'react-router-dom'
import { ArrowRight, Percent } from 'lucide-react'
import Img from './Img'
import Reveal from './Reveal'
import { deals } from '../data/deals'

export default function Deals() {
  return (
    <section className="wrap py-16 lg:py-24">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Reveal as="h2" className="text-[2rem] leading-tight sm:text-[2.7rem]">
          Offers running <span className="flourish">right now</span>
        </Reveal>
        <Reveal delay={90}>
          <Link
            to="/journeys"
            className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white px-5 py-2.5
                       text-[0.88rem] text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
          >
            See all journeys <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {deals.map((d, i) => (
          <Reveal key={d.id} delay={i * 110}>
            <Link
              to={`/journeys/${d.journey}`}
              className="group relative block overflow-hidden rounded-3xl"
            >
              <Img
                name={d.image}
                sizes="(min-width:1024px) 45vw, 100vw"
                className="aspect-[16/9] w-full"
                imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/85 via-ink-900/45 to-transparent" />

              <span className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ember text-white">
                <Percent className="h-5 w-5" strokeWidth={2} />
              </span>

              <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[11.5px] text-white backdrop-blur-md">
                {d.valid}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="text-[11px] font-semibold uppercase tracking-label text-white/75">
                  {d.kicker}
                </span>
                <p className="mt-2 flex items-baseline gap-3">
                  <span className="font-display text-[3.2rem] font-semibold leading-none text-ember">
                    {d.amount}
                  </span>
                  <span className="text-[1.05rem] text-white">{d.headline}</span>
                </p>
                <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-white/65">{d.body}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
