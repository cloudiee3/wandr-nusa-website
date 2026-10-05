import { useLocation } from 'react-router-dom'
import { bySlug } from '../data/journeys'
import { whatsappLink, whatsappMessage } from '../data/site'
import { track } from '../lib/analytics'

/**
 * Where on the site a button was, derived from the path.
 *
 * Journey pages get their slug so the number can be read per trip, which is
 * the whole point of tracking this: it answers which trips people ask about
 * rather than how many asked about something.
 */
export function pageSource(pathname) {
  if (pathname === '/') return 'home'
  const m = pathname.match(/^\/journeys\/([^/]+)/)
  if (m) return `journey-${m[1]}`
  const d = pathname.match(/^\/destinations\/([^/]+)/)
  if (d) return `destination-${d[1]}`
  return pathname.replace(/^\/|\/$/g, '') || 'home'
}

/** The trip a page is about, when it is about one. */
export function pageSubject(pathname) {
  const m = pathname.match(/^\/journeys\/([^/]+)/)
  return m ? bySlug(m[1])?.title : undefined
}

/**
 * Every WhatsApp button on the site.
 *
 * It was nine hand-written anchors, each building its own href, which is why
 * some carried a message and some did not. One component means the message,
 * the source and the click event cannot drift apart again.
 *
 * `subject` names a trip explicitly; left out, the page decides. `placement`
 * separates the floating button from the one in the footer on an otherwise
 * identical page. `message` overrides the sentence entirely, which only the
 * enquiry form does: by then it can send the whole enquiry rather than an
 * opening line.
 */
export default function WhatsAppLink({ subject, placement, message, children, ...rest }) {
  const { pathname } = useLocation()
  const src = pageSource(pathname)
  const topic = subject ?? pageSubject(pathname)

  return (
    <a
      href={whatsappLink(message || whatsappMessage(topic), src)}
      target="_blank"
      rel="noreferrer"
      onClick={() => track('WhatsApp click', { src, placement: placement ?? 'page', trip: topic ?? 'none' })}
      {...rest}
    >
      {children}
    </a>
  )
}
