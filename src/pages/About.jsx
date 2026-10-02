import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Compass, HeartHandshake, Leaf, ShieldCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import SectionHead from '../components/SectionHead'
import { destinations } from '../data/destinations'
import { site, stats } from '../data/site'

const values = [
  {
    icon: Compass,
    title: 'We walk it first',
    body: 'No itinerary goes on this site until one of us has done it end to end, in the season we sell it in.',
  },
  {
    icon: HeartHandshake,
    title: 'Direct, fair pay',
    body: 'Guides, drivers and porters are hired directly and paid above the regional standard, with no agency taking a cut in the middle.',
  },
  {
    icon: Leaf,
    title: 'Small groups only',
    body: 'Eight on the mountain, ten on everything else. Big enough to share the cost, small enough not to be a nuisance.',
  },
  {
    icon: ShieldCheck,
    title: 'We turn back',
    body: 'Weather calls are the guide’s to make and we back them every time. A summit is never worth the alternative.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        image="cliff-coast-aerial"
        eyebrow="About us"
        title={<>A small outfit, <span className="flourish-light">from here</span></>}
        lead={`${site.name} is a Lombok-based travel bureau. One island group, a short list of trips, and nothing on that list we have not done ourselves.`}
      />

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal as="p" className="font-serif text-[1.5rem] leading-[1.45] text-ink-600 sm:text-[1.7rem]">
            Most people leave Lombok having seen the same four photographs.
          </Reveal>
          <Reveal as="p" delay={90} className="mt-6 text-[1.02rem] leading-relaxed text-ink-500">
            They land, they are sold a day trip, and they go home with the waterfall, the pink beach, the
            viewpoint and the Gilis. All four are worth seeing. All four are also the easy part.
          </Reveal>
          <Reveal as="p" delay={150} className="mt-5 text-[1.02rem] leading-relaxed text-ink-500">
            We live at this end of it. Every route on this site was walked before it was written down, by the
            people who will walk it with you, in the season we sell it in. We keep the map small on purpose,
            so that when you ask about the trail on Rinjani you get an answer rather than a guess.
          </Reveal>

          {/* Five across on a wide screen, three then two below it, two on a
              phone where the last one takes the empty half. The span is pinned
              to the two-column breakpoint on purpose: it used to apply at every
              width, which left one stat sprawling across two thirds of its row. */}
          <Reveal delay={210} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/[0.08] bg-ink/[0.06] sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group bg-white px-4 py-6 text-center transition-colors duration-300
                           hover:bg-sea-100/40 max-sm:last:col-span-2"
              >
                <span className="block font-display text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-sea-700 sm:text-3xl">
                  {s.text ?? <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />}
                </span>
                <span className="mt-1 block font-sans text-[12px] uppercase tracking-label text-ink-300 sm:text-[10px]">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* One photograph that takes the height of the column beside it, rather
            than a stack with its own fixed height. The stack ran 925px against
            530px of text and left 396px of white underneath it; this cannot,
            whatever the copy grows or shrinks to. */}
        <Reveal delay={120} className="group lg:h-full">
          <Img
            name="rice-field-huts"
            sizes="(min-width:1024px) 38vw, 100vw"
            className="aspect-[4/5] w-full overflow-hidden rounded-3xl lg:aspect-auto lg:h-full"
            imgClassName="transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
          />
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-ink-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
        <div className="wrap relative">
          <SectionHead
            light
            eyebrow="How we work"
            title={<>Four things we <span className="flourish-light">won’t bend on</span></>}
          />
          {/* Cards rather than loose rows: four promises floating in a dark field
              read as filler, and the border gives the eye somewhere to stop. */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all
                                duration-500 hover:-translate-y-1 hover:border-sea-400/40 hover:bg-white/[0.06]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-sea-400/30
                                   bg-sea-500/10 text-sea-300 transition-all duration-500
                                   group-hover:scale-110 group-hover:bg-sea-500/20 group-hover:text-sea-200">
                    <v.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-[1.15rem] !text-white">{v.title}</h3>
                  <p className="mt-2.5 text-[0.94rem] leading-relaxed text-white/60">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* This used to be two marketing cards in a three-column grid, so it had a
          hole in it, and both cards repeated what the story above already says
          and the home page already shows. The small map is the thing the story
          actually claims, so the page now shows it. */}
      <section className="wrap py-16 lg:py-24">
        <SectionHead
          align="center"
          eyebrow="Where we go"
          title={<>The map we keep <span className="flourish">deliberately small</span></>}
          lead={`${destinations.length} places, all within a few hours of each other. We would rather know these properly than sell you somewhere we have never been.`}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 90}>
              <Link
                to={`/destinations/${d.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl"
              >
                <Img
                  name={d.image}
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 100vw"
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent
                                transition-opacity duration-500 group-hover:from-ink-900/90" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[12px] font-semibold uppercase tracking-label text-sea-300 sm:text-[11px]">
                    {d.island}
                  </span>
                  <h3 className="mt-1.5 flex items-center gap-2 font-sans text-[1.2rem] font-bold !text-white">
                    {d.name}
                    <ArrowUpRight
                      className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-500
                                 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={2.2}
                    />
                  </h3>
                  {/* Held back until hover so the grid reads as names first. */}
                  <p className="mt-2 max-h-0 overflow-hidden text-[0.9rem] leading-relaxed text-white/75
                                opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {d.blurb}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Six tiles sit square at one, two and three columns; five left a
              gap at three, which is what made the section it replaced look
              unfinished in the first place. */}
          <Reveal delay={(destinations.length % 3) * 90}>
            <Link
              to="/destinations"
              className="group relative flex h-full min-h-[14rem] flex-col justify-end overflow-hidden rounded-2xl
                         border border-ink/[0.09] bg-sand p-6 transition-all duration-500
                         hover:-translate-y-1 hover:border-ink/20 hover:shadow-card"
            >
              {/* Something to look at where the other five have a photograph. */}
              <Compass
                aria-hidden="true"
                strokeWidth={0.8}
                className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-ink/[0.07]
                           transition-transform duration-[1200ms] ease-out group-hover:rotate-45"
              />
              <span className="relative text-[12px] font-semibold uppercase tracking-label text-sea-700 sm:text-[11px]">
                Everywhere else
              </span>
              <span className="relative mt-1.5 flex items-center gap-2 font-sans text-[1.2rem] font-bold text-ink">
                All Destinations
                <ArrowUpRight
                  className="h-4 w-4 -translate-x-1 opacity-50 transition-all duration-500
                             group-hover:translate-x-0 group-hover:opacity-100"
                  strokeWidth={2.2}
                />
              </span>
              <span className="relative mt-2 text-[0.9rem] leading-relaxed text-ink-500">
                Each one with the trips that reach it, what it costs and when to come.
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-14 text-center">
          <Link to="/contact" className="btn-primary">
            Talk to Us <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
