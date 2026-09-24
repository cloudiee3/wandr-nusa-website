import { Fragment } from 'react'

/**
 * Display text with its ampersands set properly.
 *
 * Playfair's roman ampersand sits heavy and low — the shape the brand called
 * saggy. Its italic cut is the one the typeface is known for, so any "&" is
 * swapped for that and picked out in the accent. A long title gets a second
 * colour out of it, which breaks up the line without needing a flourish.
 *
 * Anything that is not a plain string passes straight through, so callers can
 * still hand a heading its own markup.
 */
export default function Display({ children, light = false }) {
  if (typeof children !== 'string' || !children.includes('&')) return children

  const accent = light ? 'text-mist' : 'text-mist-600'
  return children.split('&').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className={`font-serif font-normal italic ${accent}`}>&amp;</span>}
      {part}
    </Fragment>
  ))
}
