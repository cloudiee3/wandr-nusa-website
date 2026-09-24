import Display from './Display'
import Reveal from './Reveal'

/** Pill eyebrow + heading + optional lead, used at the top of most sections. */
export default function SectionHead({ eyebrow, title, lead, align = 'left', light = false, className = '', action }) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={light ? 'pill-light' : 'pill'}>
            <span className="pill-dot" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal as="h2" delay={80} className={`mt-5 text-[2rem] leading-[1.12] sm:text-[2.7rem] ${light ? '!text-white' : ''}`}>
        <Display>{title}</Display>
      </Reveal>
      {lead && (
        <Reveal as="p" delay={160} className={`mt-5 text-[1.02rem] leading-relaxed ${light ? 'text-white/65' : 'text-ink-500'}`}>
          {lead}
        </Reveal>
      )}
      {action && <Reveal delay={220} className="mt-7">{action}</Reveal>}
    </div>
  )
}
