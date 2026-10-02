/**
 * One place that owns what the hero search widget puts in the query string and
 * how the pages read it back.
 *
 * It used to be three hand-rolled copies, one per page, and they drifted: the
 * journeys page looked for a "people" key nobody wrote, so its traveller chip
 * could never appear, and the custom-journey page never read the dates at all,
 * so a traveller who picked them in the hero was asked for them again. Both
 * were invisible in a diff because each page looked correct on its own.
 */

/** 2027-03-04 -> "4 Mar 2027". Returns null for anything unparseable. */
export const fmtDate = (s) => {
  if (!s) return null
  const d = new Date(s)
  return Number.isNaN(+d) ? null : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** "3 adults, 1 child". Counts arrive from the URL, so they are strings. */
export function describeTravellers(adults, children) {
  const a = Number(adults ?? 0)
  const c = Number(children ?? 0)
  if (!a && !c) return ''
  const parts = [`${a} ${a === 1 ? 'adult' : 'adults'}`]
  if (c) parts.push(`${c} ${c === 1 ? 'child' : 'children'}`)
  return parts.join(', ')
}

/** "4 Mar 2027 – 11 Mar 2027", or the single date, or ''. */
export function describeDates(from, to) {
  const a = fmtDate(from)
  const b = fmtDate(to)
  if (a && b) return a === b ? a : `${a} – ${b}`
  return a || b || ''
}

/** The keys the widget writes. Everything reading them goes through readSearch. */
export const KEYS = ['type', 'dest', 'place', 'kind', 'from', 'to', 'date', 'adults', 'children', 'pickup', 'dropoff', 'area']

/** Turns the widget's answers into a query string. */
export const buildSearch = (fields) =>
  new URLSearchParams(
    Object.entries(fields).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ).toString()

/** Reads them back, already formatted for display. */
export function readSearch(params) {
  const get = (k) => params.get(k) || ''
  const from = get('from')
  const to = get('to')
  // Transport sends one date under `date`; journeys and stays send a range.
  const single = get('date')
  return {
    type: get('type') || null,
    dest: get('dest') || null,
    place: get('place') || null,
    kind: get('kind') || null,
    pickup: get('pickup'),
    dropoff: get('dropoff'),
    area: get('area'),
    fromISO: from,
    toISO: to,
    dateISO: single,
    from: fmtDate(from),
    to: fmtDate(to),
    date: fmtDate(single),
    adults: get('adults'),
    children: get('children'),
    travellers: describeTravellers(get('adults'), get('children')),
    dates: single ? describeDates(single, '') : describeDates(from, to),
  }
}
