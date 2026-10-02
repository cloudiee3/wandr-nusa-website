import { Link } from 'react-router-dom'
import { Ticket } from 'lucide-react'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'
import { InstagramIcon, FacebookIcon } from './SocialIcons'
import { nav, site } from '../data/site'

const links = [...nav, { label: 'Privacy', to: '/privacy' }, { label: 'Terms', to: '/terms' }]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      <div className="wrap relative pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* The statement leads, the way the reference builds it: wordmark
              small above it, everything else to the right. */}
          <div>
            <Logo variant="white" wordmarkOnly height="h-7" />

            <p className="mt-7 font-sans text-[1.55rem] font-medium leading-[1.28] sm:text-[1.95rem]">
              {site.blurb.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>

            {/* Two lines rather than a stacked list, so this column finishes
                at roughly the height of the one beside it. */}
            <div className="mt-7 text-[0.93rem] text-white/55">
              <p className="-my-2 flex flex-wrap items-center gap-x-3">
                <a href={site.phoneHref} className="link-underline py-2 transition-colors hover:text-white">
                  {site.phone}
                </a>
                <span aria-hidden="true" className="text-white/25">·</span>
                <a href={`mailto:${site.email}`} className="link-underline py-2 transition-colors hover:text-white">
                  {site.email}
                </a>
              </p>
              <p className="mt-2.5">
                {site.address.line1}, {site.address.city}, {site.address.region}, {site.address.country}
              </p>
            </div>
          </div>

          <div className="lg:text-right">
            <nav className="-my-2 flex flex-wrap gap-x-7 gap-y-0 lg:justify-end">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="link-underline py-2 text-[0.93rem] font-medium text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Discs rather than bare glyphs, so four marks in four different
                brand colours still read as one row. */}
            <div className="-mx-1.5 mt-8 flex flex-wrap items-center gap-1 lg:justify-end">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.07]
                             transition-all duration-300 hover:scale-105 hover:bg-white/[0.14]"
                >
                  <SocialMark name={s.icon} />
                </a>
              ))}
            </div>

            <p className="mt-7 font-sans text-[12px] leading-relaxed text-white/40 sm:text-[11px]">
              © {year} {site.legalName}. Registered in Nusa Tenggara Barat, Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* The name at the foot of the page, fading as it goes and cut off by the
          bottom edge. Decoration only, so it is hidden from assistive tech and
          cannot be selected or clicked through. */}
      <div aria-hidden="true" className="pointer-events-none mt-10 select-none overflow-hidden lg:mt-12">
        <span
          className="block whitespace-nowrap bg-gradient-to-b from-white/[0.18] via-white/[0.09] to-white/[0.02]
                     bg-clip-text text-center font-sans font-bold leading-[0.74] tracking-[-0.045em]
                     text-[20.4vw] text-transparent"
          style={{ marginBottom: '-0.12em' }}
        >
          {site.name.replace(/\s+/g, '').toLowerCase()}
        </span>
      </div>
    </footer>
  )
}

/** GetYourGuide has no mark in the icon set and theirs is a trademark, so a
 *  ticket stands in until their own artwork is dropped into the project. */
const SocialMark = ({ name }) => {
  const cls = 'h-[21px] w-[21px]'
  if (name === 'instagram') return <InstagramIcon className={cls} />
  if (name === 'facebook') return <FacebookIcon className={cls} />
  if (name === 'whatsapp') return <WhatsAppIcon className={`${cls} text-[#25D366]`} />
  // The GetYourGuide stand-in stays in our own accent rather than borrowing a
  // brand colour it has no right to.
  return <Ticket className={`${cls} text-sea-400`} strokeWidth={1.7} />
}
