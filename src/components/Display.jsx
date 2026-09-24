import { Fragment } from 'react'

/**
 * Display text with its ampersands set properly.
 *
 * Playfair's roman ampersand sits heavy and low, and its italic cut — the
 * decorative one — turned out to be too loud to read past. The sans has a
 * plain, upright ampersand, so headings borrow that one instead: same colour,
 * a touch smaller, no ornament. It stops being a thing you notice.
 *
 * Anything that is not a plain string passes straight through, so callers can
 * still hand a heading its own markup.
 */
export default function Display({ children }) {
  if (typeof children !== 'string' || !children.includes('&')) return children

  return children.split('&').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className="font-sans text-[0.86em] font-normal">&amp;</span>}
      {part}
    </Fragment>
  ))
}
