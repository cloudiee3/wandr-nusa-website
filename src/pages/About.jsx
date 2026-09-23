import { Link } from 'react-router-dom'
import { ArrowRight, Compass, HeartHandshake, Leaf, ShieldCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import SectionHead from '../components/SectionHead'
import { site, stats, trustSignals } from '../data/site'

const values = [
  {
    icon: Compass,
    title: 'We walk it first',
    body: 'No itinerary goes on this site until one of us has done it end to end, in the season we sell it in.',
  },
  {
    icon: HeartHandshake,
    title: 'Direct, fair pay',
    body: 'Guides, drivers and porters are hired directly and paid above the regional standard — no agency taking a cut in the middle.',
  },
  {
    icon: Leaf,
    title: 'Small groups only',
    body: 'Eight on the mountain, twelve on a day trip. Big enough to share the cost, small enough not to be a nuisance.',
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
        image="sasak-house"
        eyebrow="About us"
        title={<>A small outfit, <span className="flourish-light">from here</span></>}
        lead={`${site.name} is a Lombok-based travel bureau. Twelve years, one island group, and a short list of trips we are willing to put our name on.`}
      />

      <section className="wrap grid gap-14 py-16 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-24">
        <div>
          <Reveal as="p" className="font-serif text-[1.4rem] italic leading-relaxed text-ink-600">
            We started because visitors kept being sold the same four photographs, and going home having
            seen only those four.
          </Reveal>
          <Reveal as="p" delay={90} className="mt-6 text-[1.02rem] leading-relaxed text-ink-500">
            Lombok and the Nusa islands get compared to Bali constantly, usually by people trying to sell
            you a day trip. We think that misses the point. These are quieter islands with harder mountains,
            better reef, and a Sasak culture that is still lived rather than performed. What they do not have
            is much infrastructure for showing it to you properly.
          </Reveal>
          <Reveal as="p" delay={150} className="mt-5 text-[1.02rem] leading-relaxed text-ink-500">
            So we built it. A permanent crew of guides and drivers, a fleet we maintain ourselves, and routes
            that were walked before they were written down. We keep the map small on purpose — everything we
            run is within a few hours of the office in Senggigi, which is why we can answer a question about
            the trail conditions on Rinjani with something other than a guess.
          </Reveal>

          {/* Three columns crush these labels on a phone, and an odd count leaves
              the divider grid showing an empty cell — so the last stat stretches
              across whatever is left of its row. With five, that fills both. */}
          <Reveal delay={210} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/[0.08] bg-ink/[0.06] sm:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-white px-4 py-6 text-center ${
                  i === stats.length - 1 && stats.length % 3 !== 0 ? 'col-span-2' : ''
                }`}
              >
                <span className="block font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {s.text ?? <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />}
                </span>
                <span className="mt-1 block font-sans text-[12px] sm:text-[10px] uppercase tracking-label text-ink-300">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={120} className="space-y-4">
          <Img name="rice-field-huts" sizes="(min-width:1024px) 34vw, 100vw" className="aspect-[4/5] w-full overflow-hidden rounded-2xl" />
          <div className="grid grid-cols-2 gap-4">
            <Img name="monkey-forest" sizes="17vw" className="aspect-square w-full overflow-hidden rounded-2xl" />
            <Img name="durian-indah" sizes="17vw" className="aspect-square w-full overflow-hidden rounded-2xl" />
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-ink-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
        <div className="wrap relative">
          <SectionHead
            light
            eyebrow="How we work"
            title={<>Four things we <span className="flourish-light">won't bend on</span></>}
          />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="flex gap-5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sea-400/30 bg-sea-500/10 text-sea-300">
                  <v.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-[1.15rem] !text-white">{v.title}</h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-white/60">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 lg:py-24">
        <SectionHead
          align="center"
          eyebrow="Credentials"
          title={<>The boring, <span className="flourish">important part</span></>}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {trustSignals.map((t, i) => (
            <Reveal key={t.title} delay={i * 100}>
              <div className="card h-full p-7">
                <h3 className="text-[1.08rem]">{t.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-500">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14 text-center">
          <Link to="/contact" className="btn-primary">
            Talk to us <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
