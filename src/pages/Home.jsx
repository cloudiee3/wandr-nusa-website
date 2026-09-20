import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Compass, MessageCircle, Quote, ShieldCheck, Sparkles } from 'lucide-react'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import SectionHead from '../components/SectionHead'
import JourneyCard from '../components/JourneyCard'
import IslandMap from '../components/IslandMap'
import { journeys } from '../data/journeys'
import { destinations } from '../data/destinations'
import { site, stats, trustSignals, whatsappLink } from '../data/site'

const featured = ['rinjani-summit-trek', 'nusa-penida-island-hop', 'tetebatu-highlands']

const testimonials = [
  {
    quote:
      'We had four days and no plan. Wandr Nusa built us a route that took in the rice terraces, two waterfalls and a night on Gili Air — and every driver and guide turned up early.',
    name: 'Hannah & Tom R.',
    from: 'Bristol, UK',
  },
  {
    quote:
      'The Rinjani trek was the hardest thing I have ever done and I would do it again tomorrow. Our guide read the weather perfectly and turned us around on the ridge at exactly the right moment.',
    name: 'Mikkel A.',
    from: 'Copenhagen, DK',
  },
  {
    quote:
      'Travelling with a six-year-old, I expected compromises. Instead they rerouted the whole Penida day so we hit the cliffs before the buses. She still talks about the turtles.',
    name: 'Priya S.',
    from: 'Singapore',
  },
]

const process = [
  {
    n: '01',
    title: 'Tell us the shape of it',
    body: 'Dates, how many of you, how hard you want to walk, what you cannot miss. A two-line WhatsApp message is a perfectly good start.',
    image: 'tetebatu-plant',
  },
  {
    n: '02',
    title: 'We draft the route',
    body: 'Within two working days you get a day-by-day itinerary with costs broken out line by line, plus a couple of alternatives where we think you have a better option.',
    image: 'rice-road-aerial',
  },
  {
    n: '03',
    title: 'We guide it ourselves',
    body: 'Permits, boats, drivers and guides are all ours. One planner stays with you from first message to last transfer, and there is a real phone number while you travel.',
    image: 'volcanic-plain',
  },
]

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Img name="segara-anak" priority sizes="100vw" className="absolute inset-0 h-full w-full" imgClassName="animate-ken-burns" />
        <div className="absolute inset-0 scrim" />

        <div className="wrap relative w-full pb-12 pt-32 sm:pb-16">
          <div className="max-w-3xl">
            <Reveal as="p" className="label-light">Lombok · Rinjani · Nusa Penida · The Gilis</Reveal>

            <Reveal as="h1" delay={100} className="mt-5 text-[2.7rem] leading-[1.02] !text-white sm:text-[4rem] lg:text-[4.9rem]">
              The islands past <span className="flourish-light">the postcard</span>
            </Reveal>

            <Reveal as="p" delay={200} className="mt-7 max-w-xl text-[1.06rem] leading-relaxed text-white/75">
              {site.blurb}
            </Reveal>

            <Reveal delay={300} className="mt-9 flex flex-wrap gap-3">
              <Link to="/journeys" className="btn-accent">
                See our journeys <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-ghost-light">
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} /> Plan something custom
              </a>
            </Reveal>
          </div>

          {/* stat rail */}
          <Reveal delay={420} className="mt-14 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 backdrop-blur-md">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink-900/35 px-4 py-5 text-center sm:px-6">
                <span className="block font-display text-2xl font-semibold text-white sm:text-3xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-1 block font-sans text-[10px] uppercase tracking-label text-white/50">
                  {s.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 right-6 hidden h-16 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent lg:block"
        />
      </section>

      {/* ── Who we are ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
        <div className="wrap relative">
          <SectionHead
            light
            eyebrow="Who takes you"
            title={<>Guides who grew up <span className="flourish-light">on these islands</span></>}
            lead="Wandr Nusa is a small Lombok-based operator. We are not a booking platform reselling somebody else's day tour — the guides on our trips are our colleagues, the drivers are on our payroll, and the itineraries were walked before they were written."
          />

          <Reveal delay={160} className="mt-12">
            <IslandMap />
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {trustSignals.map((t, i) => (
              <Reveal key={t.title} delay={i * 90}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sea-400/30 bg-sea-500/10 text-sea-300">
                  {[<ShieldCheck key="a" className="h-5 w-5" strokeWidth={1.6} />,
                    <Compass key="b" className="h-5 w-5" strokeWidth={1.6} />,
                    <Sparkles key="c" className="h-5 w-5" strokeWidth={1.6} />][i]}
                </span>
                <h3 className="mt-4 text-[1.02rem] !text-white">{t.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/55">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinations ─────────────────────────────────────── */}
      <section className="wrap py-20 lg:py-28">
        <SectionHead
          eyebrow="Where we go"
          title={<>Six places worth <span className="flourish">the flight</span></>}
          lead="Everything we run is within a few hours of home — which is why we can promise the guide, the weather call and the back-up plan."
          action={
            <Link to="/destinations" className="btn-ghost">
              All destinations <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 90} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
              <Link
                to={`/destinations/${d.slug}`}
                className={`group relative block h-full overflow-hidden rounded-2xl ${i === 0 ? 'min-h-[22rem] lg:min-h-[34rem]' : 'min-h-[16rem]'}`}
              >
                <Img
                  name={d.image}
                  sizes={i === 0 ? '(min-width:1024px) 40vw, 100vw' : '(min-width:1024px) 27vw, 50vw'}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 scrim-soft" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <span className="label-light">{d.island}</span>
                  <h3 className={`mt-2 !text-white ${i === 0 ? 'text-3xl' : 'text-xl'}`}>{d.name}</h3>
                  <p className={`mt-2 max-w-sm text-[0.9rem] leading-relaxed text-white/70 ${i === 0 ? '' : 'line-clamp-2'}`}>
                    {d.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-label text-sea-300">
                    Explore <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured journeys ────────────────────────────────── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="Journeys"
            title={<>Routes we run <span className="flourish">again and again</span></>}
            lead="Fixed departures for the classics, and a blank page for everything else."
            action={
              <Link to="/journeys" className="btn-ghost">
                All journeys <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            }
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((slug, i) => {
              const j = journeys.find((x) => x.slug === slug)
              return (
                <Reveal key={slug} delay={i * 110}>
                  <JourneyCard journey={j} />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="wrap py-20 lg:py-28">
        <SectionHead
          eyebrow="How it works"
          title={<>Three steps, <span className="flourish">one person</span></>}
          lead="The same planner takes you from the first message to the last transfer. No hand-offs, no call centre."
        />

        <div className="mt-12 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-6 lg:space-y-8">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 100}>
                <article className="card flex gap-5 p-6 hover:border-sea-500/30 hover:shadow-lift sm:p-7">
                  <span className="font-sans text-sm text-sea-500">{p.n}</span>
                  <div>
                    <h3 className="text-[1.25rem]">{p.title}</h3>
                    <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-10 lg:mt-0">
            <div className="sticky top-28 overflow-hidden rounded-2xl">
              <Img name="rice-terraces" sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/5] w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
        <div className="wrap relative">
          <SectionHead
            light
            align="center"
            eyebrow="From travellers"
            title={<>What people say <span className="flourish-light">afterwards</span></>}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 110}>
                <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-sea-400/30">
                  <Quote className="h-7 w-7 shrink-0 text-sea-400/70" strokeWidth={1.4} />
                  <blockquote className="mt-5 flex-1 text-[0.97rem] leading-relaxed text-white/75">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                                 border border-sea-400/25 bg-sea-500/10 font-display text-sm
                                 font-medium text-sea-300"
                    >
                      {t.name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}
                    </span>
                    <span>
                      <span className="block font-display text-sm font-medium text-white">{t.name}</span>
                      <span className="block font-sans text-[10px] uppercase tracking-label text-white/40">{t.from}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Img name="coastline-aerial" sizes="100vw" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-ink-900/70" />
        <div className="wrap relative py-20 text-center lg:py-28">
          <Reveal as="p" className="label-light">Ready when you are</Reveal>
          <Reveal as="h2" delay={90} className="mx-auto mt-4 max-w-2xl text-[2rem] leading-[1.12] !text-white sm:text-[2.9rem]">
            Tell us roughly what you want. <span className="flourish-light">We'll do the rest.</span>
          </Reveal>
          <Reveal as="p" delay={170} className="mx-auto mt-5 max-w-lg text-white/65">
            Every enquiry is answered by a person, usually within one working day.
          </Reveal>
          <Reveal delay={250} className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-accent">
              Start an enquiry <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-ghost-light">
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} /> WhatsApp us
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
