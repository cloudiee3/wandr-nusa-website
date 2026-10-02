import { useState } from 'react'
import { Play, Quote, Star } from 'lucide-react'
import Img from './Img'
import Reveal from './Reveal'
import { featured, testimonials } from '../data/testimonials'

export default function Testimonials() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="wrap">
        {/* The reference runs this section without an eyebrow. The heading
            carries it, with the lead directly underneath. */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal as="h2" className="text-[2rem] leading-[1.12] sm:text-[2.7rem]">
            What our travellers <span className="flourish">say</span>
          </Reveal>
          <Reveal as="p" delay={90} className="mt-5 text-[1.02rem] leading-relaxed text-ink-500">
            Trusted by travellers from all over. Here are their stories.
          </Reveal>
        </div>

        {/* Not an even split: the reference gives the written reviews about a
            third more width than the photograph beside them. */}
        <div className="mt-12 grid gap-7 lg:grid-cols-[0.74fr_minmax(0,1fr)] lg:gap-9">
          {/* featured story */}
          <Reveal>
            <figure className="relative m-0 h-full min-h-[26rem] overflow-hidden rounded-3xl lg:min-h-[34rem]">
              {playing && featured.video ? (
                <video
                  src={featured.video}
                  controls
                  autoPlay
                  className="absolute inset-0 h-full w-full bg-ink-900 object-cover"
                />
              ) : (
                <>
                  <Img name={featured.image} sizes="(min-width:1024px) 38vw, 100vw" className="absolute inset-0 h-full w-full" />
                  <div className="absolute inset-0 scrim-soft" />

                  {/* Only when there is something to play. A play control over a
                      still that does nothing is worse than no control at all. */}
                  {featured.video && (
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label={`Play ${featured.name}'s story`}
                      className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2
                                 items-center justify-center rounded-full border border-white/40 bg-white/20
                                 text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
                    >
                      <Play className="ml-1 h-7 w-7 fill-current" strokeWidth={0} />
                    </button>
                  )}

                  <figcaption className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                    <blockquote className="max-w-md font-sans text-[1.2rem] font-semibold leading-snug !text-white sm:text-[1.4rem]">
                      {featured.quote}
                    </blockquote>
                    <p className="mt-6 text-[0.95rem] font-semibold text-white">{featured.name}</p>
                    <p className="mt-0.5 text-[0.84rem] text-white/60">{featured.role}</p>
                  </figcaption>
                </>
              )}
            </figure>
          </Reveal>

          {/* written reviews */}
          <div className="grid min-w-0 gap-7 lg:gap-9">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i + 1) * 110}>
                <figure className="m-0 flex h-full flex-col rounded-3xl border border-ink/[0.08] bg-white p-7 sm:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-sans text-[1.15rem] font-bold leading-snug">{t.title}</h3>
                    <Quote className="h-7 w-7 shrink-0 fill-ink-100 text-ink-100" strokeWidth={0} />
                  </div>

                  <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-500">
                    {t.quote}
                  </blockquote>

                  <figcaption className="mt-7 flex flex-wrap items-center gap-x-3.5 gap-y-3 border-t border-ink/[0.07] pt-6">
                    {/* A photograph when there is one, initials when there is
                        not, so taking a face off is a one-line data change. */}
                    {t.avatar ? (
                      <Img
                        name={t.avatar}
                        sizes="48px"
                        className="h-12 w-12 shrink-0 overflow-hidden rounded-full"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sea-100
                                   font-display text-[0.95rem] font-semibold text-sea-700"
                      >
                        {t.name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-[0.95rem] font-semibold text-ink">{t.name}</span>
                      <span className="block text-[0.82rem] text-ink-400">{t.role}</span>
                    </span>
                    <span className="ml-auto flex shrink-0 gap-0.5" aria-label={`${t.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, n) => (
                        <Star
                          key={n}
                          className={`h-[18px] w-[18px] ${n < t.rating ? 'fill-ember text-ember' : 'fill-ink-100 text-ink-100'}`}
                          strokeWidth={0}
                        />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
