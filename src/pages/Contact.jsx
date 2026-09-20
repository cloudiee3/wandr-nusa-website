import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import EnquiryForm from '../components/EnquiryForm'
import { site, whatsappLink } from '../data/site'

export default function Contact() {
  return (
    <>
      <PageHero
        image="tiu-kelep"
        eyebrow="Contact"
        title={<>Start with a <span className="flourish-light">rough idea</span></>}
        lead="You don't need dates or a plan. Tell us roughly what you want and we'll come back with something routed, costed and honest."
      />

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal as="h2" className="text-[1.8rem] leading-tight">Reach us directly</Reveal>
          <Reveal as="p" delay={80} className="mt-4 text-ink-500">
            WhatsApp is fastest — it is on someone's phone from 08:00 to 19:00 WITA, and messages sent
            overnight are answered first thing.
          </Reveal>

          <Reveal delay={140} className="mt-8 space-y-1">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-accent w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} /> Message on WhatsApp
            </a>
          </Reveal>

          <Reveal delay={200} className="mt-10 space-y-5 border-t border-ink/[0.07] pt-8">
            <ContactRow icon={Phone} label="Phone">
              <a href={site.phoneHref} className="link-underline">{site.phone}</a>
            </ContactRow>
            <ContactRow icon={Mail} label="Email">
              <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
            </ContactRow>
            <ContactRow icon={MapPin} label="Office">
              {site.address.line1}<br />
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
                  <dd className="font-mono text-[12px] text-ink">{h}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} id="enquire" className="scroll-mt-24">
          <EnquiryForm />
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
      <span className="font-mono text-[10px] uppercase tracking-label text-ink-300">{label}</span>
      <div className="mt-1 text-[0.98rem] leading-relaxed text-ink-600">{children}</div>
    </div>
  </div>
)
