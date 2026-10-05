import { useSearchParams } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import WhatsAppIcon from '../components/WhatsAppIcon'
import PageHero from '../components/PageHero'
import EmailLink from '../components/EmailLink'
import WhatsAppLink from '../components/WhatsAppLink'
import Reveal from '../components/Reveal'
import EnquiryForm from '../components/EnquiryForm'
import { site } from '../data/site'
import { readSearch } from '../lib/search'

/** The hero widget sends Transport and Stays enquiries here with their answers
 *  in the query string; turn those into a message the traveller can edit. */
function prefillFrom(params) {
  const s = readSearch(params)

  if (s.type === 'transport') {
    return {
      trip: 'Transport / airport transfer',
      travellers: s.travellers,
      dates: s.dates,
      message:
        `Transfer request.\n` +
        `Pick-up: ${s.pickup}\n` +
        `Drop-off: ${s.dropoff}\n` +
        `Date: ${s.date ?? ''}`,
    }
  }
  if (s.type === 'stay') {
    return {
      trip: 'Accommodation',
      travellers: s.travellers,
      dates: s.dates,
      message:
        `Room request.\n` +
        `Area: ${s.area}\n` +
        `Check-in: ${s.from ?? ''}\n` +
        `Check-out: ${s.to ?? ''}`,
    }
  }
  return { trip: '', travellers: '', message: '', dates: '' }
}

export default function Contact() {
  const [params] = useSearchParams()
  const prefill = prefillFrom(params)

  return (
    <>
      <PageHero
        image="tiu-kelep"
        eyebrow="Contact"
        title={<>Start with a <span className="flourish-light">rough idea</span></>}
        lead="You don’t need dates or a plan. Tell us roughly what you want and we’ll come back with something routed, costed and honest."
      />

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal as="h2" className="text-[1.8rem] leading-tight">Reach us directly</Reveal>
          <Reveal as="p" delay={80} className="mt-4 text-ink-500">
            WhatsApp is fastest. It is on someone’s phone from 08:00 to 19:00 WITA, and messages sent
            overnight are answered first thing.
          </Reveal>

          <Reveal delay={140} className="mt-8 space-y-1">
            <WhatsAppLink placement="contact-panel" className="btn-whatsapp w-full sm:w-auto">
              <WhatsAppIcon className="h-[18px] w-[18px]" /> Message on WhatsApp
            </WhatsAppLink>
          </Reveal>

          <Reveal delay={200} className="mt-10 space-y-5 border-t border-ink/[0.07] pt-8">
            <ContactRow icon={Phone} label="Phone">
              <a href={site.phoneHref} className="link-underline -my-2.5 inline-block py-3">{site.phone}</a>
            </ContactRow>
            <ContactRow icon={Mail} label="Email">
              <EmailLink className="link-underline -my-2.5 inline-block py-3" />
            </ContactRow>
            <ContactRow icon={MapPin} label="Office">
              {site.address.city}<br />
              {site.address.region}, {site.address.country}
            </ContactRow>
          </Reveal>

          <Reveal delay={260} className="mt-10 border-t border-ink/[0.07] pt-8">
            <h3 className="label">Opening hours</h3>
            <dl className="mt-4 space-y-2">
              {site.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between gap-6 text-[0.94rem]">
                  <dt className="text-ink-400">{d}</dt>
                  <dd className="font-sans text-[12px] text-ink">{h}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} id="enquire" className="scroll-mt-24">
          <EnquiryForm
            defaultTrip={prefill.trip}
            defaultMessage={prefill.message}
            defaultTravellers={prefill.travellers}
            defaultDates={prefill.dates}
          />
        </Reveal>
      </section>
    </>
  )
}

const ContactRow = ({ icon: Icon, label, children }) => (
  <div className="flex gap-4">
    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sea-100 text-sea-600">
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </span>
    <div>
      <span className="font-sans text-[12px] sm:text-[10px] uppercase tracking-label text-ink-300">{label}</span>
      <div className="mt-1 text-[0.98rem] leading-relaxed text-ink-600">{children}</div>
    </div>
  </div>
)
