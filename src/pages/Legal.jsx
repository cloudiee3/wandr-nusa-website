import PageHero from '../components/PageHero'
import { site } from '../data/site'

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    lead: 'What we collect when you enquire, why, and how long we keep it.',
    sections: [
      ['What we collect', `When you send an enquiry we receive the name, email, phone number, travel dates and message you type into the form. If you contact us on WhatsApp we hold that conversation in the same way any WhatsApp user would.`],
      ['Why we hold it', `Solely to answer your enquiry, quote your trip, and run it if you book. We do not sell or rent your details to anyone, and we do not add you to a mailing list unless you ask.`],
      ['Who else sees it', `Only the people needed to deliver your trip — typically your guide, driver, and any accommodation we book on your behalf. Payment details, where taken, are handled by the payment provider and never stored by us.`],
      ['How long we keep it', `Enquiries that do not become bookings are deleted after 24 months. Booking records are kept for seven years, as Indonesian tax law requires.`],
      ['Your rights', `Write to ${site.email} at any time to see what we hold about you, correct it, or have it deleted.`],
      ['Cookies', `This site sets no advertising or tracking cookies.`],
    ],
  },
  terms: {
    title: 'Booking Terms',
    lead: 'The conditions that apply when you book a trip with us.',
    sections: [
      ['Booking and deposit', `A booking is confirmed when we have received a 30% deposit and sent you a written confirmation. The balance is due 14 days before departure, or on arrival for trips booked inside that window.`],
      ['Cancellation by you', `More than 30 days before departure: deposit refunded less any non-recoverable costs. 14–30 days: deposit retained. Under 14 days: full price retained. We will always try to move a date rather than cancel.`],
      ['Cancellation by us', `If we cancel for any reason other than force majeure you receive a full refund. Where weather, volcanic activity or park closures make a trip unsafe, we will offer an alternative date or route, or refund the unused portion.`],
      ['Safety and guide authority', `On any trek, the guide has final authority on route, timing and turning back. Decisions made on safety grounds do not entitle you to a refund, though we will offer what alternative we can.`],
      ['Insurance', `Travel insurance is a condition of booking on all trekking itineraries, and must cover trekking to at least 4,000 m and emergency evacuation.`],
      ['Fitness and disclosure', `You must tell us about any medical condition that could affect your trip at the time of booking. We will tell you honestly whether an itinerary is realistic for you.`],
      ['Liability', `${site.legalName} holds public liability insurance as required of a licensed Indonesian travel bureau. Nothing in these terms limits liability for death or personal injury caused by our negligence.`],
    ],
  },
}

export default function Legal({ kind }) {
  const c = CONTENT[kind]

  return (
    <>
      <PageHero image="volcanic-plain" eyebrow="Legal" title={c.title} lead={c.lead} />

      <section className="wrap max-w-3xl py-16 lg:py-24">
        <p className="font-sans text-[11px] uppercase tracking-label text-ink-300">
          Last updated {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>

        <div className="mt-10 space-y-10">
          {c.sections.map(([heading, body]) => (
            <div key={heading}>
              <h2 className="text-[1.3rem]">{heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-500">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 border-t border-ink/[0.07] pt-8 text-ink-500">
          Questions about any of this? Email{' '}
          <a href={`mailto:${site.email}`} className="link-underline text-sea-600">{site.email}</a>.
        </p>
      </section>
    </>
  )
}
