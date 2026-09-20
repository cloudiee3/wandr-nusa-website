/**
 * Horizontal lockup: the four-tile mark beside the wordmark.
 * `variant` picks the navy artwork (light backgrounds) or the white (dark).
 */
import { asset } from '../lib/asset'

export default function Logo({ variant = 'navy', className = '', markOnly = false }) {
  const isNavy = variant === 'navy'
  const mark = asset(isNavy ? 'brand/icon-navy.webp' : 'brand/icon-white.webp')

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={mark}
        alt=""
        aria-hidden="true"
        className={isNavy ? 'h-9 w-9 object-contain' : 'h-7 w-auto object-contain'}
      />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.06rem] font-semibold lowercase tracking-[-0.01em] ${
              isNavy ? 'text-ink' : 'text-white'
            }`}
          >
            wandrnusa
          </span>
          <span
            className={`mt-[3px] font-mono text-[8px] uppercase tracking-[0.42em] ${
              isNavy ? 'text-ink-300' : 'text-white/55'
            }`}
          >
            Travel
          </span>
        </span>
      )}
    </span>
  )
}
