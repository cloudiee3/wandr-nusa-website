import { useState } from 'react'
import images from '../data/images.json'
import { asset } from '../lib/asset'

/**
 * Responsive photo backed by the generated WebP set in /public/img.
 * Renders the blurred placeholder from the manifest until the real file decodes.
 */
export default function Img({
  name,
  alt,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
  style,
}) {
  const meta = images[name]
  const [loaded, setLoaded] = useState(false)

  if (!meta) {
    if (import.meta.env.DEV) console.warn(`<Img> unknown image: "${name}"`)
    return <div className={`bg-ink-100 ${className}`} />
  }

  const widths = meta.sizes
  const srcSet = widths.map((w) => `${asset(`img/${name}-${w}.webp`)} ${w}w`).join(', ')

  return (
    // No position utility here on purpose: callers pass `absolute inset-0`, and
    // Tailwind emits `relative` after `absolute`, so a hardcoded one would win.
    <div
      className={`overflow-hidden bg-ink-100 ${className}`}
      style={{
        backgroundImage: loaded ? undefined : `url("${meta.lqip}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    >
      <img
        src={asset(`img/${name}-${widths[widths.length - 1]}.webp`)}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt ?? meta.alt}
        width={1600}
        height={Math.round(1600 / meta.ratio)}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
