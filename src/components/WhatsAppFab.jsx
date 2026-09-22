import { useEffect, useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../data/site'

/** Floating WhatsApp button — appears once the hero is behind you. */
export default function WhatsAppFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Wandr Nusa on WhatsApp"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
      className={`fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full
                  bg-[#25D366] text-white shadow-lift transition-all duration-500
                  active:scale-95 hover:bg-[#1FBE59] ${
                    show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                  }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
