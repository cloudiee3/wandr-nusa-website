import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import SectionHead from '../components/SectionHead'
import JourneyCard from '../components/JourneyCard'
import SearchWidget from '../components/SearchWidget'
import Deals from '../components/Deals'
import DestinationSlider from '../components/DestinationSlider'
import WhatsAppIcon from '../components/WhatsAppIcon'
import AboutStrip from '../components/AboutStrip'
import Testimonials from '../components/Testimonials'
import { categories, journeys } from '../data/journeys'
import { hero, site, stats, whatsappLink } from '../data/site'

// The home grid carries the whole catalogue while it still fits inside a
// reasonable scroll. Past this the remainder goes behind one button that
// opens it in place, rather than making people leave the page to see it.
const FEATURED_COUNT = 12

// Alternating emphasis, the way the reference sets its opening statement:
// the dark phrases carry the claim, the light ones carry the connective tissue.
const MANIFESTO = [
  ['We’re a Lombok travel company —', true],
  ['planners, guides and experience designers who never stopped wandering our own islands,', false],
  ['working together to create journeys across Lombok and further east.', true],
  ['From the first search to the last goodbye,', false],
  ['we take care of the details', true],
  ['so your trip feels effortless and personal.', false],
]


const process = [
  { n: '01', title: 'Tell us the shape of it', body: 'Dates, how many of you, how hard you want to walk, what you cannot miss. A two-line WhatsApp message is a perfectly good start.' },
  { n: '02', title: 'We draft the route', body: 'Within two working days you get a day-by-day itinerary with costs broken out line by line, plus alternatives where we think you have a better option.' },
  { n: '03', title: 'We guide it ourselves', body: 'Permits, boats, drivers and guides are all ours. One planner stays with you throughout, and there is a real phone number while you travel.' },
]

/** Drifts the hero photograph as you scroll, so there is movement behind the
 *  navbar glass rather than a static image. */
function useParallax() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = Math.min(window.scrollY, window.innerHeight)
        el.style.transform = `translate3d(0, ${y * 0.18}px, 0)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return ref
}

export default function Home() {
  const [kind, setKind] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const matching = useMemo(
    () => journeys.filter((j) => kind === 'All' || j.tags.includes(kind)),
    [kind],
  )
  const shown = showAll ? matching : matching.slice(0, FEATURED_COUNT)
  const hidden = matching.length - shown.length

  // A new filter starts closed again, so picking one never dumps a long list.
  const pick = (c) => {
    setKind(c)
    setShowAll(false)
  }

  const heroPhoto = useParallax()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
        <div ref={heroPhoto} className="absolute inset-0 will-change-transform">
          <Img name="segara-anak" priority sizes="100vw" className="h-full w-full" imgClassName="animate-ken-burns" />
        </div>
        <div className="absolute inset-0 scrim" />

        <div className="wrap relative w-full pb-8 pt-24 sm:pb-14 sm:pt-32">
          <div className="grid items-end gap-7 sm:gap-10 lg:grid-cols-[1.15fr_minmax(0,26.5rem)] lg:gap-12">
            <div>
              <Reveal>
                <span className="pill-light">
                  <span className="pill-dot" />
                  {hero.badge}
                </span>
              </Reveal>

              <Reveal
                as="h1"
                delay={100}
                /* balance is on h1 globally; here the line break is deliberate */
                className="mt-7 font-normal text-[2.05rem] leading-[1.1] !text-white [text-wrap:initial] sm:text-[3.1rem] lg:text-[3.65rem]"
              >
                {hero.headline[0]}
                <br />
                {hero.headline[1]}{' '}
                {/* The accent word keeps the heavier weight it had, so the
                    lighter line throws it forward instead of matching it. */}
                <span className="font-semibold text-mist">{hero.headlineAccent}</span>
              </Reveal>

              <Reveal as="p" delay={200} className="mt-5 max-w-xl text-[0.92rem] leading-relaxed text-white/80 sm:mt-6 sm:text-[1.02rem]">
                {hero.subhead}
              </Reveal>
            </div>

            <Reveal delay={180}>
              <SearchWidget />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Who we are ───────────────────────────────────────── */}
      <section id="about" className="bg-white py-16 lg:py-24">
        <div className="wrap">
          <div className="text-center">
            <Reveal>
              <span className="pill"><span className="pill-dot" />Who we are</span>
            </Reveal>
          </div>

          <Reveal as="p" delay={90} className="mx-auto mt-9 max-w-4xl text-center font-display text-[1.5rem] leading-[1.45] sm:text-[2.05rem]">
            {MANIFESTO.map(([text, strong], i) => (
              <span key={i} className={strong ? 'text-ink' : 'text-mist'}>{text}{' '}</span>
            ))}
          </Reveal>

          <div className="mt-14 text-center">
            <Reveal>
              <span className="pill"><span className="pill-dot" />By the numbers</span>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {/* An odd count leaves the last card alone on the two-column phone
                grid, so it takes the whole row instead. */}
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 70}
                className={i === stats.length - 1 && stats.length % 2 ? 'col-span-2 sm:col-span-1' : ''}
              >
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-ink/[0.09] bg-white px-4 py-9 text-center">
                  <span className="font-display text-[2.1rem] font-semibold leading-none tnum text-ink sm:text-[2.5rem]">
                    {s.text ?? <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />}
                  </span>
                  <span className="mt-3 text-[0.82rem] text-ink-400">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offers ───────────────────────────────────────────── */}
      <Deals />

      {/* ── Featured journeys ────────────────────────────────── */}
      <section id="discover" className="bg-white py-16 lg:py-24">
        <div className="wrap">
          {/* The reference sets the heading against its lead rather than above
              it, then runs the categories underneath as a filter. */}
          <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
            <Reveal as="h2" className="text-[2rem] leading-[1.12] sm:text-[2.7rem]">
              Best travel destinations <span className="flourish">in Nusa Tenggara</span>
            </Reveal>
            <Reveal as="p" delay={80} className="text-[1.02rem] leading-relaxed text-ink-500 lg:pb-2">
              Explore the best of Lombok, Sumbawa and Nusa Tenggara Timur, and take the next step
              towards the journey you have been putting off.
            </Reveal>
          </div>

          <Reveal delay={120} className="no-scrollbar -mx-5 mt-9 flex gap-2.5 overflow-x-auto scroll-smooth px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => pick(c)}
                aria-pressed={kind === c}
                className={`chip ${kind === c ? 'chip-on' : ''}`}
              >
                {c}
              </button>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((j, i) => (
              <Reveal key={j.slug} delay={(i % 3) * 90}>
                <JourneyCard journey={j} />
              </Reveal>
            ))}
          </div>

          {shown.length === 0 && (
            <div className="mt-10 rounded-2xl border border-ink/[0.09] bg-white p-10 text-center">
              <h3 className="text-[1.3rem]">No fixed departure for {kind} — yet</h3>
              <p className="mx-auto mt-3 max-w-md text-ink-500">
                We run this as a private trip rather than a scheduled one. Tell us your dates and
                we will come back with a routed plan and the real cost.
              </p>
              <Link to="/journeys/custom-private-journey" className="btn-primary mt-7">
                Plan it with us <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
          )}

          <Reveal delay={120} className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {hidden > 0 && (
              <button type="button" onClick={() => setShowAll(true)} className="btn-ghost">
                Show {hidden} more <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
              </button>
            )}
            <Link to="/journeys" className="btn-ghost">
              All journeys <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── About us ─────────────────────────────────────────── */}
      <AboutStrip />

      {/* ── Testimonials ─────────────────────────────────────── */}
      <Testimonials />

      {/* ── Destinations ─────────────────────────────────────── */}
      <DestinationSlider />

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
              <article className="h-full rounded-2xl border border-ink/[0.09] bg-white p-7 transition-shadow duration-500 hover:shadow-card">
                <span className="font-display text-[1.6rem] font-semibold text-sea-500">{p.n}</span>
                <h3 className="mt-3 text-[1.22rem]">{p.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

      </section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section id="contact" className="relative overflow-hidden">
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
              <WhatsAppIcon className="h-[17px] w-[17px]" /> WhatsApp us
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
