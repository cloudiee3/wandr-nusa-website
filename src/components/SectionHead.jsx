import Reveal from './Reveal'

/** Eyebrow + heading + optional lead, used at the top of most sections. */
export default function SectionHead({ eyebrow, title, lead, align = 'left', light = false, className = '', action }) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal as="p" className={light ? 'label-light' : 'label'}>{eyebrow}</Reveal>
      )}
      <Reveal as="h2" delay={80} className={`mt-4 text-[2rem] leading-[1.12] sm:text-[2.6rem] ${light ? '!text-white' : ''}`}>
        {title}
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
