/**
 * Privacy-friendly analytics, loaded only if the site is configured for it.
 *
 * Two environment variables, both optional:
 *
 *   VITE_ANALYTICS_SRC   the script URL, e.g. https://plausible.io/js/script.js
 *                        or https://your-umami-host/script.js
 *   VITE_ANALYTICS_SITE  the domain Plausible knows the site by, or the Umami
 *                        website id
 *
 * The tag carries both providers' attributes. Each ignores the other's, so one
 * tag serves either, and swapping provider is a change of two values in the
 * Netlify dashboard rather than a change of code.
 *
 * With either variable empty nothing is injected and nothing is sent. Every
 * call below is a no-op in that case, so a build with no analytics configured
 * is a normal build, not a broken one.
 */

const SRC = import.meta.env.VITE_ANALYTICS_SRC?.trim()
const SITE = import.meta.env.VITE_ANALYTICS_SITE?.trim()

export const analyticsEnabled = Boolean(SRC && SITE)

export function initAnalytics() {
  if (!analyticsEnabled || typeof document === 'undefined') return
  if (document.querySelector('script[data-wandr-analytics]')) return
  const s = document.createElement('script')
  s.defer = true
  s.src = SRC
  s.setAttribute('data-wandr-analytics', '')
  s.setAttribute('data-domain', SITE)       // Plausible
  s.setAttribute('data-website-id', SITE)   // Umami
  document.head.appendChild(s)
}

/**
 * Record something a visitor did. Safe to call before the script has loaded,
 * before it has been configured, and in a browser where it was blocked: each
 * provider is called only if it is actually there.
 */
export function track(event, props = {}) {
  if (!analyticsEnabled || typeof window === 'undefined') return
  try {
    window.plausible?.(event, { props })
    window.umami?.track?.(event, props)
  } catch {
    // Analytics must never be the reason a click does not work.
  }
}
