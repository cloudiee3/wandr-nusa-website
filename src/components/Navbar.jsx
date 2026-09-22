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

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      {/* The bar floats over the page; the rounded container only appears once
          you've scrolled, so at the top the logo sits straight on the photo. */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="wrap pt-3 sm:pt-4">
          <div
            /* Frosted rather than opaque: over the hero you see the photograph
               blurred through it, and over the light sections the border and
               shadow still read it as a panel floating above the page. While
               the menu is open it goes dark to match the panel below. */
            className={`flex h-[60px] items-center justify-between gap-4 rounded-full border pl-5 pr-2.5
                        transition-all duration-500 sm:h-[68px] sm:pl-7 sm:pr-3 ${
              open
                ? 'border-white/20 bg-ink-900/25 shadow-[0_16px_50px_-14px_rgba(1,15,31,0.5)] backdrop-blur-2xl backdrop-saturate-150'
                : scrolled
                  ? 'border-white/60 bg-white/[0.62] shadow-[0_16px_50px_-14px_rgba(1,29,57,0.38)] backdrop-blur-lg backdrop-saturate-150 sm:backdrop-blur-2xl'
                  : 'border-transparent bg-transparent shadow-none'
            }`}
          >
            <Link to="/" aria-label={`${site.name} home`} className="-my-2 shrink-0 py-2">
              <Logo variant={scrolled && !open ? 'navy' : 'white'} wordmarkOnly height="h-8 sm:h-9" />
            </Link>

            <nav className="hidden items-center gap-1 rounded-full bg-white/80 p-1.5 shadow-[0_2px_10px_-2px_rgba(1,29,57,0.18)] backdrop-blur-md lg:flex">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-5 py-2 font-sans text-[0.9rem] transition-all duration-300 ${
                      isActive
                        ? 'bg-white font-medium text-ink shadow-[0_1px_4px_rgba(1,29,57,0.14)]'
                        : 'text-ink-500 hover:text-ink'
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
                className="btn-primary hidden !px-6 !py-2.5 !text-[0.85rem] sm:inline-flex"
              >
                Get started
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors active:scale-95 lg:hidden ${
                  open
                    ? 'border-white/30 bg-white/15 text-white backdrop-blur'
                    : scrolled
                      ? 'border-ink/15 bg-white text-ink'
                      : 'border-white/30 bg-white/10 text-white backdrop-blur'
                }`}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink-900/45 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          style={{ top: 'calc(5rem + env(safe-area-inset-top, 0px))' }}
          className={`absolute inset-x-5 origin-top rounded-3xl border border-white/20 bg-ink-900/20
                      px-6 pb-6 pt-2 shadow-[0_24px_60px_-18px_rgba(1,15,31,0.6)]
                      backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300
                      sm:inset-x-8 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <nav className="flex flex-col">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
                className={({ isActive }) =>
                  `border-b border-white/15 py-3.5 font-display text-[1.18rem] font-medium tracking-[-0.01em]
                   transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} ${
                    isActive ? 'text-sea-300' : 'text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-accent mt-6 w-full">
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
