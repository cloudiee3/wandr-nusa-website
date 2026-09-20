import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Compass, MessageCircle, Quote, ShieldCheck, Sparkles } from 'lucide-react'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import SectionHead from '../components/SectionHead'
import JourneyCard from '../components/JourneyCard'
import IslandMap from '../components/IslandMap'
import SearchWidget from '../components/SearchWidget'
import Deals from '../components/Deals'
import { journeys } from '../data/journeys'
import { destinations } from '../data/destinations'
import { site, stats, trustSignals, whatsappLink } from '../data/site'

const featured = ['rinjani-summit-trek', 'nusa-penida-island-hop', 'tetebatu-highlands']

// Alternating emphasis, the way the reference sets its opening statement:
// the dark phrases carry the claim, the light ones carry the connective tissue.
const MANIFESTO = [
  ["We're a Lombok company —", true],
  ['guides, drivers and planners who live on the islands they show you.', false],
  ['Not a booking platform reselling somebody else’s day tour.', true],
  ['Every route here was walked before it was written down,', false],
  ['and the person who answers your first message', true],
  ['is still with you on the last transfer.', false],
]

const testimonials = [
  {
    quote:
      'We had four days and no plan. Wandr Nusa built us a route that took in the rice terraces, two waterfalls and a night on Gili Air — and every driver and guide turned up early.',
    name: 'Hannah & Tom R.', from: 'Bristol, UK',
  },
  {
    quote:
      'The Rinjani trek was the hardest thing I have ever done and I would do it again tomorrow. Our guide read the weather perfectly and turned us around on the ridge at exactly the right moment.',
    name: 'Mikkel A.', from: 'Copenhagen, DK',
  },
  {
    quote:
      'Travelling with a six-year-old, I expected compromises. Instead they rerouted the whole Penida day so we hit the cliffs before the buses. She still talks about the turtles.',
    name: 'Priya S.', from: 'Singapore',
  },
]

const process = [
  { n: '01', title: 'Tell us the shape of it', body: 'Dates, how many of you, how hard you want to walk, what you cannot miss. A two-line WhatsApp message is a perfectly good start.' },
  { n: '02', title: 'We draft the route', body: 'Within two working days you get a day-by-day itinerary with costs broken out line by line, plus alternatives where we think you have a better option.' },
  { n: '03', title: 'We guide it ourselves', body: 'Permits, boats, drivers and guides are all ours. One planner stays with you throughout, and there is a real phone number while you travel.' },
]

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Img name="segara-anak" priority sizes="100vw" className="absolute inset-0 h-full w-full" imgClassName="animate-ken-burns" />
        <div className="absolute inset-0 scrim" />

        <div className="wrap relative w-full pb-10 pt-28 sm:pb-14 sm:pt-32">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_minmax(0,26rem)] lg:gap-14">
            <div>
              <Reveal>
                <span className="pill-light">
                  <span className="pill-dot" />
                  Lombok · Nusa Islands · Indonesia
                </span>
              </Reveal>

              <Reveal as="h1" delay={100} className="mt-6 text-[2.6rem] leading-[1.02] !text-white sm:text-[3.6rem] lg:text-[4.3rem]">
                Discover the islands,<br />
                <span className="flourish-light">not the postcard</span>
              </Reveal>

              <Reveal as="p" delay={200} className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-white/75">
                {site.blurb}
              </Reveal>

              <Reveal delay={300} className="mt-8 flex flex-wrap gap-3">
                <Link to="/journeys" className="btn-accent">
                  Browse journeys <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-ghost-light">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} /> Ask us anything
                </a>
              </Reveal>
            </div>

            <Reveal delay={180}>
              <SearchWidget />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Offers ───────────────────────────────────────────── */}
      <Deals />

      {/* ── Who we are ───────────────────────────────────────── */}
      <section className="bg-sand py-16 lg:py-24">
        <div className="wrap">
          <div className="text-center">
            <Reveal>
              <span className="pill"><span className="pill-dot" />Who we are</span>
            </Reveal>
          </div>

          <Reveal as="p" delay={90} className="mx-auto mt-9 max-w-4xl text-center font-display text-[1.5rem] leading-[1.45] sm:text-[2.05rem]">
            {MANIFESTO.map(([text, strong], i) => (
              <span key={i} className={strong ? 'text-ink' : 'text-ink-300'}>{text}{' '}</span>
            ))}
          </Reveal>

          <div className="mt-14 text-center">
            <Reveal>
              <span className="pill"><span className="pill-dot" />By the numbers</span>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white px-4 py-9 text-center shadow-[0_1px_3px_rgba(1,29,57,0.06)]">
                  <span className="font-display text-[2.1rem] font-semibold leading-none tnum text-ink sm:text-[2.5rem]">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-3 text-[0.82rem] text-ink-400">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where we go: the map ─────────────────────────────── */}
      <section className="wrap py-16 lg:py-24">
        <Reveal className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
          <div className="relative">
            <span className="pill-light"><span className="pill-dot" />Our patch</span>
            <h2 className="mt-5 max-w-xl text-[1.9rem] leading-[1.14] !text-white sm:text-[2.5rem]">
              A small map, <span className="flourish-light">known well</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/60">
              Everything we run sits within a few hours of the office in Senggigi. That is why we can answer a
              question about trail conditions with something other than a guess.
            </p>

            <div className="mt-10">
              <IslandMap />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Destinations ─────────────────────────────────────── */}
      <section className="wrap pb-16 lg:pb-24">
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
                  <span className="text-[11px] font-semibold uppercase tracking-label text-sea-300">{d.island}</span>
                  <h3 className={`mt-2 !text-white ${i === 0 ? 'text-3xl' : 'text-xl'}`}>{d.name}</h3>
                  <p className={`mt-2 max-w-sm text-[0.9rem] leading-relaxed text-white/70 ${i === 0 ? '' : 'line-clamp-2'}`}>
                    {d.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-label text-sea-300">
                    Explore <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured journeys ────────────────────────────────── */}
      <section className="bg-sand py-16 lg:py-24">
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

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((slug, i) => (
              <Reveal key={slug} delay={i * 110}>
                <JourneyCard journey={journeys.find((x) => x.slug === slug)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="wrap py-16 lg:py-24">
        <SectionHead
          eyebrow="How it works"
          title={<>Three steps, <span className="flourish">one person</span></>}
          lead="The same planner takes you from the first message to the last transfer. No hand-offs, no call centre."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <article className="h-full rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(1,29,57,0.06)] transition-shadow duration-500 hover:shadow-card">
                <span className="font-display text-[1.6rem] font-semibold text-sea-500">{p.n}</span>
                <h3 className="mt-3 text-[1.22rem]">{p.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-ink/[0.07] pt-10 sm:grid-cols-3">
          {trustSignals.map((t, i) => (
            <Reveal key={t.title} delay={i * 90} className="flex gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sea-100 text-sea-600">
                {[<ShieldCheck key="a" className="h-5 w-5" strokeWidth={1.6} />,
                  <Compass key="b" className="h-5 w-5" strokeWidth={1.6} />,
                  <Sparkles key="c" className="h-5 w-5" strokeWidth={1.6} />][i]}
              </span>
              <div>
                <h3 className="text-[1rem]">{t.title}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-400">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="bg-sand py-16 lg:py-24">
        <div className="wrap">
          <SectionHead
            align="center"
            eyebrow="From travellers"
            title={<>What people say <span className="flourish">afterwards</span></>}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 110}>
                <figure className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(1,29,57,0.06)]">
                  <Quote className="h-7 w-7 shrink-0 text-sea-400" strokeWidth={1.4} />
                  <blockquote className="mt-5 flex-1 text-[0.97rem] leading-relaxed text-ink-600">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sea-100 font-display text-sm font-semibold text-sea-700"
                    >
                      {t.name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink">{t.name}</span>
                      <span className="block text-[11px] font-semibold uppercase tracking-label text-ink-300">{t.from}</span>
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
          <Reveal>
            <span className="pill-light"><span className="pill-dot" />Ready when you are</span>
          </Reveal>
          <Reveal as="h2" delay={90} className="mx-auto mt-5 max-w-2xl text-[2rem] leading-[1.12] !text-white sm:text-[2.9rem]">
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
