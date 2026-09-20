import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { nav, site, whatsappLink } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const solid = scrolled || open

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'border-b border-ink/[0.08] bg-sand-100/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
            <Logo variant={solid ? 'navy' : 'white'} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 font-display text-[0.9rem] transition-colors duration-300 ${
                    solid
                      ? isActive
                        ? 'bg-ink/[0.06] text-ink'
                        : 'text-ink-500 hover:text-ink'
                      : isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/75 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:inline-flex ${solid ? 'btn-primary' : 'btn-ghost-light'} !px-5 !py-2.5 !text-[0.85rem]`}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Plan a trip
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
                solid ? 'border-ink/15 text-ink' : 'border-white/30 text-white'
              }`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink-900/40 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-x-0 top-[72px] origin-top bg-sand-100 px-5 pb-8 pt-4 shadow-lift transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <nav className="flex flex-col">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b border-ink/[0.07] py-4 font-display text-lg transition-colors ${
                    isActive ? 'text-sea-600' : 'text-ink'
                  }`
                }
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="btn-accent mt-6 w-full"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            Message us on WhatsApp
          </a>
          <p className="mt-4 text-center font-mono text-[11px] text-ink-300">{site.phone}</p>
        </div>
      </div>
    </>
  )
}
