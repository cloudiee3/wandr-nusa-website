import { useState } from 'react'
import { Play, Quote, Star } from 'lucide-react'
import Img from './Img'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { featured, testimonials } from '../data/testimonials'

export default function Testimonials() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="wrap">
        <SectionHead
          align="center"
          eyebrow="Testimonials"
          title={<>What travellers say <span className="flourish">afterwards</span></>}
          lead="Every quote here is from someone we guided. Names shortened, nothing else changed."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* featured story */}
          <Reveal>
            <figure className="relative m-0 h-full min-h-[24rem] overflow-hidden rounded-3xl lg:min-h-[32rem]">
              {playing && featured.video ? (
                <video
                  src={featured.video}
                  controls
                  autoPlay
                  className="absolute inset-0 h-full w-full bg-ink-900 object-cover"
                />
              ) : (
                <>
                  <Img name={featured.image} sizes="(min-width:1024px) 46vw, 100vw" className="absolute inset-0 h-full w-full" />
                  <div className="absolute inset-0 scrim-soft" />

                  {featured.video && (
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label={`Play ${featured.name}'s story`}
                      className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2
                                 items-center justify-center rounded-full border border-white/40 bg-white/20
                                 text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
                    >
                      <Play className="ml-0.5 h-6 w-6 fill-current" strokeWidth={0} />
                    </button>
                  )}

                  <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <blockquote className="max-w-md text-[1.25rem] leading-snug !text-white font-display font-semibold sm:text-[1.5rem]">
                      “{featured.quote}”
                    </blockquote>
                    <p className="mt-5 text-[0.95rem] font-medium text-white">{featured.name}</p>
                    <p className="text-[0.82rem] text-white/60">{featured.role}</p>
                  </figcaption>
                </>
              )}
            </figure>
          </Reveal>

          {/* written reviews */}
          <div className="grid gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i + 1) * 110}>
                <figure className="m-0 flex h-full flex-col rounded-3xl border border-ink/[0.08] bg-white p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[1.15rem]">{t.title}</h3>
                    <Quote className="h-6 w-6 shrink-0 text-ink-200" strokeWidth={1.5} />
                  </div>

                  <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-500">
                    {t.quote}
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sea-100
                                 font-display text-sm font-semibold text-sea-700"
                    >
                      {t.name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[0.92rem] font-medium text-ink">{t.name}</span>
                      <span className="block text-[0.8rem] text-ink-400">{t.role}</span>
                    </span>
                    <span className="ml-auto flex shrink-0 gap-0.5" aria-label={`${t.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, n) => (
                        <Star
                          key={n}
                          className={`h-4 w-4 ${n < t.rating ? 'fill-ember text-ember' : 'fill-ink-100 text-ink-100'}`}
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
