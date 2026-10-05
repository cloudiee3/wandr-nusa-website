import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { site } from '../data/site'

/**
 * The address, as a mailto link that also copies itself.
 *
 * A bare mailto does nothing at all unless the visitor's device has a mail
 * app registered as the handler, which on a desktop using webmail it usually
 * does not, and nothing at all inside a sandboxed iframe. Either way the click
 * is silent and the page looks broken.
 *
 * So the link still navigates for anyone who has a handler, and every visitor
 * gets the address on their clipboard with something on screen saying so.
 */
export default function EmailLink({ className = '', children }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      // Older browsers, and any context where the clipboard is not permitted.
      const el = document.createElement('textarea')
      el.value = site.email
      el.setAttribute('readonly', '')
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      try { document.execCommand('copy') } catch { /* nothing left to try */ }
      el.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2200)
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
      <a href={`mailto:${site.email}`} onClick={copy} className={className}>
        {children ?? site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${site.email} to the clipboard`}
        className="-my-2 inline-flex min-h-[44px] items-center gap-1.5 px-1 text-[0.8rem] opacity-70
                   transition-opacity hover:opacity-100"
      >
        {copied
          ? <><Check className="h-3.5 w-3.5" strokeWidth={2.2} /> Copied</>
          : <><Copy className="h-3.5 w-3.5" strokeWidth={1.9} /> Copy</>}
      </button>
      {/* Announced to a screen reader, which would otherwise get no feedback. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${site.email} copied to the clipboard` : ''}
      </span>
    </span>
  )
}
