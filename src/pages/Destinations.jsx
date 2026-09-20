import { Link } from 'react-router-dom'
import { ArrowUpRight, Mountain, CalendarDays } from 'lucide-react'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import { destinations } from '../data/destinations'

export default function Destinations() {
  return (
    <>
      <PageHero
        image="kelingking-beach"
        eyebrow="Where we go"
        title={<>A small map, <span className="flourish-light">known well</span></>}
        lead="We stay inside a few hours of home. It is the only way to promise the guide, the weather call and the back-up plan."
      />

      <section className="wrap py-16 lg:py-24">
        <div className="space-y-6 lg:space-y-8">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={60}>
              <Link
                to={`/destinations/${d.slug}`}
                className="card group grid overflow-hidden hover:-translate-y-1 hover:shadow-lift lg:grid-cols-2"
              >
                <Img
                  name={d.image}
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className={`aspect-[16/10] w-full lg:aspect-auto lg:min-h-[21rem] ${i % 2 ? 'lg:order-2' : ''}`}
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="label">{d.island}</span>
                  <h2 className="mt-3 text-[1.8rem] leading-tight transition-colors duration-300 group-hover:text-sea-600 sm:text-[2.1rem]">
                    {d.name}
                  </h2>
                  <p className="mt-4 text-[1rem] leading-relaxed text-ink-500">{d.blurb}</p>

                  <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11px] text-ink-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Mountain className="h-3.5 w-3.5 text-sea-500" strokeWidth={1.75} />{d.elevation}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-sea-500" strokeWidth={1.75} />{d.bestTime}
                    </span>
                  </div>

                  <span className="mt-7 inline-flex items-center gap-2 font-display text-sm font-medium text-ink">
                    Explore {d.name}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
