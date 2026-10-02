/**
 * Saved trips, kept in this browser.
 *
 * It lived inside JourneyCard, which was fine while the heart was the only
 * thing that cared. Anything else showing a count needs to hear about a change
 * the moment it happens, so the writes go out on an event and components
 * subscribe rather than re-reading storage on a timer.
 *
 * Storage is per-browser and can throw (private windows, blocked site data), so
 * every access is guarded and an empty set is always a valid answer.
 */

const KEY = 'wandrnusa:saved'
const EVENT = 'wandrnusa:saved-changed'

export function readFavourites() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return new Set(Array.isArray(raw) ? raw : [])
  } catch {
    return new Set()
  }
}

function write(set) {
  try { localStorage.setItem(KEY, JSON.stringify([...set])) } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent(EVENT))
}

export function toggleFavourite(slug) {
  const favs = readFavourites()
  favs.has(slug) ? favs.delete(slug) : favs.add(slug)
  write(favs)
  return favs.has(slug)
}

/** Calls back on every change, including ones made in another tab. */
export function subscribeFavourites(fn) {
  const onStorage = (e) => { if (!e.key || e.key === KEY) fn() }
  window.addEventListener(EVENT, fn)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(EVENT, fn)
    window.removeEventListener('storage', onStorage)
  }
}
