import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Img from './Img'
import Reveal from './Reveal'

/** Compact photographic header used by every page except the homepage. */
export default function PageHero({ image, eyebrow, title, lead, children, tall = false, back }) {
  return (
    <header className={`relative flex items-end overflow-hidden ${tall ? 'min-h-[74svh]' : 'min-h-[58svh]'}`}>
      <Img name={image} priority sizes="100vw" className="absolute inset-0 h-full w-full" imgClassName="animate-ken-burns" />
      <div className="absolute inset-0 scrim" />

      <div className="wrap relative w-full pb-14 pt-32 sm:pb-20">
        <div className="max-w-3xl">
          {/* A page reached straight from search has no history to go back
              through, so this points at the list rather than calling back(). */}
          {back && (
            <Reveal>
              <Link
                to={back.to}
                className="-mt-2 mb-4 inline-flex min-h-[44px] items-center gap-2 text-[0.92rem]
                           text-white/70 transition-colors duration-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                {back.label}
              </Link>
            </Reveal>
          )}
          {eyebrow && (
            <Reveal>
              <span className="pill-light"><span className="pill-dot" />{eyebrow}</span>
            </Reveal>
          )}
          <Reveal as="h1" delay={90} className="mt-5 text-[2.4rem] leading-[1.06] !text-white sm:text-[3.4rem] lg:text-[4rem]">
            {title}
          </Reveal>
          {lead && (
            <Reveal as="p" delay={180} className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/75">
              {lead}
            </Reveal>
          )}
          {children && <Reveal delay={260} className="mt-9">{children}</Reveal>}
        </div>
      </div>
    </header>
  )
}
