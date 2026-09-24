import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft, Check, Clock, Gauge, MapPin, Minus, Sun, Users,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import JourneyCard from '../components/JourneyCard'
import EnquiryForm from '../components/EnquiryForm'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { bySlug, formatPrice, fromPrice, journeys, tierLabel } from '../data/journeys'
import { whatsappLink } from '../data/site'

export default function JourneyDetail() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const j = bySlug(slug)
  if (!j) return <Navigate to="/journeys" replace />

  // Arriving from the hero search with a place we don't run a fixed trip to.
  const place = params.get('place')
  const adults = params.get('adults')
  const children = params.get('children')

  const others = journeys.filter((x) => x.slug !== j.slug).slice(0, 3)

  const facts = [
    { icon: Clock, label: 'Duration', value: j.duration },
    { icon: Users, label: 'Group size', value: j.group },
    { icon: Gauge, label: 'Effort', value: j.difficulty },
    { icon: Sun, label: 'Best season', value: j.season },
    { icon: MapPin, label: 'Region', value: j.region },
  ]

  return (
    <>
      <PageHero
        back={{ to: '/journeys', label: 'All journeys' }}
        tall
        image={j.image}
        eyebrow={`${j.kicker} · ${j.region}`}
        title={j.title}
        lead={j.summary}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a href="#enquire" className="btn-accent">Check availability</a>
          <a href={whatsappLink(`Hi! I'd like to ask about "${j.title}".`)} target="_blank" rel="noreferrer" className="btn-ghost-light">
            <WhatsAppIcon className="h-[17px] w-[17px]" /> Ask a question
          </a>
        </div>
      </PageHero>

      {/* fact bar */}
      <section className="border-b border-ink/[0.07] bg-white">
        <div className="wrap grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="py-6 pr-6">
              <span className="inline-flex items-center gap-2 font-sans text-[12px] sm:text-[10px] uppercase tracking-label text-ink-300">
                <Icon className="h-3.5 w-3.5 text-sea-500" strokeWidth={1.75} />
                {label}
              </span>
              <span className="mt-1.5 block font-display text-[0.98rem] font-medium text-ink">{value}</span>
            </div>
          ))}
          <div className="py-6">
            <span className="font-sans text-[12px] sm:text-[10px] uppercase tracking-label text-ink-300">
              {fromPrice(j) ? 'From (per person)' : 'Pricing'}
            </span>
            <span className="mt-1.5 block font-display text-[1.15rem] font-semibold text-sea-600">
              {formatPrice(fromPrice(j))}
            </span>
          </div>
        </div>
      </section>

      {j.pricing && (
        <section className="wrap pt-12 lg:pt-16">
          <Reveal className="max-w-2xl">
            <h2 className="text-[1.5rem] leading-tight">What it costs</h2>
            <p className="mt-2 text-[0.95rem] text-ink-500">{j.pricing.note}</p>
            {/* One route or several — a trip that runs two ways prices each
                of them, rather than pretending they cost the same. */}
            {(j.pricing.variants ?? [{ tiers: j.pricing.tiers }]).map((v) => (
              <div key={v.name ?? 'only'} className="mt-5 overflow-hidden rounded-2xl border border-ink/[0.09]">
                {v.name && (
                  <div className="border-b border-ink/[0.07] bg-ink/[0.02] px-5 py-3">
                    <span className="font-sans text-[0.9rem] font-bold text-ink">{v.name}</span>
                  </div>
                )}
                {v.tiers.map((t, i) => (
                  <div
                    key={tierLabel(t)}
                    className={`flex items-baseline justify-between gap-6 px-5 py-4 ${
                      i ? 'border-t border-ink/[0.07]' : ''
                    }`}
                  >
                    <span className="text-[0.95rem] text-ink-600">
                      {tierLabel(t)} {t.to === 1 ? 'traveller' : 'travellers'}
                    </span>
                    <span className="font-sans text-[1.05rem] font-bold tnum text-ink">
                      {formatPrice(t.price)}
                      <span className="font-normal text-[0.82rem] text-ink-400"> {j.pricing.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
            <p className="mt-3 text-[0.82rem] text-ink-300">*{j.priceNote}</p>
          </Reveal>
        </section>
      )}

      <section className="wrap grid gap-14 py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:py-24">
        <div>
          <Reveal as="h2" className="text-[1.9rem] leading-tight">What you'll do</Reveal>
          <ul className="mt-6 space-y-3.5">
            {j.highlights.map((h, i) => (
              <Reveal as="li" key={h} delay={i * 70} className="flex gap-3.5 text-[1rem] leading-relaxed text-ink-600">
                <Check className="mt-1 h-4 w-4 shrink-0 text-sea-500" strokeWidth={2.2} />
                <span>{h}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal as="h2" className="mt-16 text-[1.9rem] leading-tight">Day by day</Reveal>
          <ol className="mt-8 space-y-0">
            {j.itinerary.map((d, i) => (
              <Reveal as="li" key={d.day} delay={i * 90} className="relative flex gap-6 pb-10 last:pb-0">
                {i < j.itinerary.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[19px] top-11 h-[calc(100%-1.5rem)] w-px bg-ink/10" />
                )}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sea-500/25 bg-sea-100 font-sans text-[12px] sm:text-[11px] text-sea-700">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <span className="font-sans text-[12px] sm:text-[10px] uppercase tracking-label text-ink-300">{d.day}</span>
                  <h3 className="mt-1 text-[1.2rem]">{d.title}</h3>
                  <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-500">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <Reveal>
              <h3 className="label">What's included</h3>
              <ul className="mt-4 space-y-2.5">
                {j.includes.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.94rem] text-ink-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sea-500" strokeWidth={2.2} />{x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="label">Not included</h3>
              <ul className="mt-4 space-y-2.5">
                {j.excludes.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.94rem] text-ink-400">
                    <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ink-200" strokeWidth={2} />{x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* gallery rail */}
        <Reveal delay={140}>
          <div className="sticky top-28 space-y-4">
            {j.gallery.map((g, i) => (
              <Img
                key={g + i}
                name={g}
                sizes="(min-width:1024px) 32vw, 100vw"
                className={`w-full overflow-hidden rounded-2xl ${i === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* enquiry */}
      <section id="enquire" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <span className="pill"><span className="pill-dot" />Enquire</span>
            <h2 className="mt-4 text-[2rem] leading-[1.14] sm:text-[2.5rem]">
              Ask about <span className="flourish">{j.title.split(':')[0]}</span>
            </h2>
            <p className="mt-5 text-ink-500">
              Tell us when you're thinking of coming and we'll confirm availability, the exact price for your
              group size, and anything you'd want to know before booking.
            </p>
            <Link to="/journeys" className="btn-ghost mt-8">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> All journeys
            </Link>
          </div>
          <EnquiryForm
            defaultTrip={j.title}
            defaultMessage={place ? `I'd like to go to ${place}.` : ''}
            defaultTravellers={
              adults
                ? `${adults} ${adults === '1' ? 'adult' : 'adults'}, ${children ?? 0} ${children === '1' ? 'child' : 'children'}`
                : ''
            }
          />
        </div>
      </section>

      <section className="wrap py-16 lg:py-24">
        <h2 className="text-[1.7rem]">You might also like</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 90}><JourneyCard journey={o} /></Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
