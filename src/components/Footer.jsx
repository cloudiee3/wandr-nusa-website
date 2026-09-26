import { Link } from 'react-router-dom'
import { Ticket } from 'lucide-react'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'
import { InstagramIcon, FacebookIcon } from './SocialIcons'
import { site } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      <div className="wrap relative py-16 lg:py-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between sm:gap-16">
          <div>
            <Logo variant="white" wordmarkOnly height="h-9" />
            <p className="mt-5 text-[1.05rem] leading-[1.45] text-white/70">
              {site.blurb.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>

          <FooterCol title="Get in touch">
            <li>
              <a href={site.phoneHref} className="link-underline -my-2 inline-block py-3 text-white/60 transition-colors hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline -my-2 inline-block py-3 text-white/60 transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="pt-1 text-white/60">
              {site.address.line1}, {site.address.city}
              <br />
              {site.address.region}, {site.address.country}
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
          <div className="-mx-2 flex items-center">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="inline-flex h-11 w-11 items-center justify-center opacity-90 transition-all
                           duration-300 hover:scale-110 hover:opacity-100"
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
  const cls = 'h-[22px] w-[22px]'
  if (name === 'instagram') return <InstagramIcon className={cls} />
  if (name === 'facebook') return <FacebookIcon className={cls} />
  if (name === 'whatsapp') return <WhatsAppIcon className={`${cls} text-[#25D366]`} />
  // The GetYourGuide stand-in stays in our own accent rather than borrowing a
  // brand colour it has no right to.
  return <Ticket className={`${cls} text-sea-400`} strokeWidth={1.7} />
}

const FooterCol = ({ title, children }) => (
  <div>
    <h4 className="label-light mb-4">{title}</h4>
    <ul className="space-y-2.5 text-[0.93rem]">{children}</ul>
  </div>
)
