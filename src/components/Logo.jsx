import { asset } from '../lib/asset'
import { site } from '../data/site'

/**
 * The brand artwork itself, not a font approximation of it.
 *
 * `wordmarkOnly` drops the four-tile mark and shows just "wandrnusa TRAVEL" —
 * that's the treatment used over the hero, where the photograph is already
 * carrying the visual weight.
 */
export default function Logo({
  variant = 'navy',
  wordmarkOnly = false,
  markOnly = false,
  className = '',
  height = 'h-8',
}) {
  const tone = variant === 'navy' ? 'navy' : 'white'
  const wordmark = asset(`brand/wordmark-${tone}.webp`)
  const mark = asset(`brand/icon-${tone}.webp`)

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {!wordmarkOnly && (
        <img
          src={mark}
          alt=""
          aria-hidden="true"
          className={`${height} w-auto object-contain`}
        />
      )}
      {!markOnly && (
        <img
          src={wordmark}
          alt={`${site.name} Travel`}
          className={`${height} w-auto object-contain`}
        />
      )}
    </span>
  )
}
