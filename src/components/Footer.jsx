import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Ticket } from 'lucide-react'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'
import { InstagramIcon, FacebookIcon } from './SocialIcons'
import { site } from '../data/site'
import { journeys } from '../data/journeys'
import { destinations } from '../data/destinations'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />

      <div className="wrap relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo variant="white" wordmarkOnly height="h-8" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-white/60">{site.blurb}</p>
          </div>

          <FooterCol title="Escapes">
            {destinations.slice(0, 6).map((d) => (
              <FooterLink key={d.slug} to={`/destinations/${d.slug}`}>{d.name}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Discover">
            {journeys.slice(0, 6).map((j) => (
              <FooterLink key={j.slug} to={`/journeys/${j.slug}`}>{j.kicker === 'Bespoke' ? 'Custom trips' : j.title.split(':')[0]}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Get in touch">
            <li>
              <a href={site.phoneHref} className="group -my-2 inline-flex items-start gap-2.5 py-3 text-white/60 transition-colors hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sea-400" strokeWidth={1.6} />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="-my-2 inline-flex items-start gap-2.5 py-3 text-white/60 transition-colors hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sea-400" strokeWidth={1.6} />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-white/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sea-400" strokeWidth={1.6} />
              <span>
                {site.address.line1}<br />
                {site.address.city}<br />
                {site.address.region}, {site.address.country}
              </span>
            </li>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <p className="font-sans text-[12px] text-white/40 sm:text-[11px]">
              © {year} {site.legalName}. Registered in Nusa Tenggara Barat, Indonesia.
            </p>
            <Link to="/privacy" className="link-underline -my-2 inline-block py-3 font-sans text-[12px] text-white/45 hover:text-white sm:text-[11px]">Privacy</Link>
            <Link to="/terms" className="link-underline -my-2 inline-block py-3 font-sans text-[12px] text-white/45 hover:text-white sm:text-[11px]">Terms</Link>
          </div>
          <div className="flex items-center gap-2.5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12
                           bg-white/[0.04] text-white/65 transition-all duration-300
                           hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <SocialMark name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/** GetYourGuide has no mark in the icon set and theirs is a trademark, so a
 *  ticket stands in until their own artwork is dropped into the project. */
const SocialMark = ({ name }) => {
  const cls = 'h-[18px] w-[18px]'
  if (name === 'instagram') return <InstagramIcon className={cls} />
  if (name === 'facebook') return <FacebookIcon className={cls} />
  if (name === 'whatsapp') return <WhatsAppIcon className={cls} />
  return <Ticket className={cls} strokeWidth={1.7} />
}

const FooterCol = ({ title, children }) => (
  <div>
    <h4 className="label-light mb-4">{title}</h4>
    <ul className="space-y-2.5 text-[0.93rem]">{children}</ul>
  </div>
)

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="link-underline -my-2 inline-block py-3 text-white/60 transition-colors hover:text-white">
      {children}
    </Link>
  </li>
)
