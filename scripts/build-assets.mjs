// Turns the originals in source-assets/ into web-ready files in public/.
// Re-run with `npm run assets` whenever a photo or logo is added.
import sharp from 'sharp'
import { mkdir, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const PHOTOS = 'source-assets/photos'
const BRAND = 'source-assets/brand'
const OUT_IMG = 'public/img'
const OUT_BRAND = 'public/brand'
const WIDTHS = [480, 800, 1280, 1920]

// slug -> { file, alt } . Slugs are what the site references.
const PHOTO_MAP = {
  'sasak-house':         ['1755652-indonesia-lombok-rooster-house-wallpaper-traditional.jpg', 'Traditional Sasak lumbung rice barn in a Lombok village'],
  'segara-anak':         ['1952517.jpg', 'Segara Anak crater lake inside Mount Rinjani'],
  'durian-indah':        ['Durian Indah Waterfall 2.avif', 'Durian Indah waterfall falling through jungle rock'],
  'monkey-forest':       ['Monkey Forest .avif', 'Monkey forest canopy in central Lombok'],
  'tetebatu-field':      ['Tetebatu Rice Field.jpg', 'Rice fields at Tetebatu with Mount Rinjani behind'],
  'tetebatu-plant':      ['Tetebatu Rice Plant.avif', 'Close view of rice terraces around Tetebatu'],
  'rice-terraces':       ['pexels-ari-setiawan-2156420701-35432028.jpg', 'Layered green rice terraces in the Lombok highlands'],
  'coastline-aerial':    ['pexels-bongvideos-production-1310991-2524370.jpg', 'Aerial view of a turquoise reef and empty sand beach'],
  'freediving':          ['pexels-ericjo-31973396.jpg', 'Freediver descending over a coral reef'],
  'jungle-waterfall':    ['pexels-firman-fatthul-154779494-27572318.jpg', 'Twin waterfalls in dense rainforest'],
  'volcanic-plain':      ['pexels-ilham-zovanka-2158121497-37550278.jpg', 'Volcanic sand plain below the Rinjani ridgeline'],
  'rice-road-aerial':    ['pexels-johan-armang-83912829-11175507.jpg', 'Aerial view of a road cutting through golden rice paddies'],
  'rice-field-huts':     ['pexels-line-knipst-574109081-19643773.jpg', 'Bamboo huts and palms among green rice fields'],
  'kelingking-beach':    ['pexels-mikhail-nilov-8332428.jpg', 'Kelingking Beach cliff and turquoise bay, Nusa Penida'],
  'rinjani-crater':      ['pexels-roman-odintsov-4552425.jpg', 'Mount Rinjani crater rim above the lake'],
  'sendang-gile':        ['pexels-vincent-ma-janssen-2823154.jpg', 'Sendang Gile waterfall spilling down a mossy cliff'],
  'tiu-kelep':           ['pexels-vladimir-konoplev-155326297-10740707.jpg', 'Tiu Kelep waterfall in the northern Lombok rainforest'],
}

const LOGOS = {
  'icon-navy':      'Navi Ver. Logo.svg',
  'lockup-navy':    'Navy Ver. Logo & WM.svg',
  'lockup-white':   'White Ver. Logo & WM.svg',
  'icon-white':     'White Ver. Logo Ver II (2).svg',
  'wordmark-white': 'White Ver. Word Mark.svg',
}

await mkdir(OUT_IMG, { recursive: true })
await mkdir(OUT_BRAND, { recursive: true })

const manifest = {}

for (const [slug, [file, alt]] of Object.entries(PHOTO_MAP)) {
  const src = path.join(PHOTOS, file)
  const img = sharp(src, { failOn: 'none' })
  const { width, height } = await img.metadata()
  const sizes = []
  for (const w of WIDTHS) {
    if (w > width) continue
    await sharp(src, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(OUT_IMG, `${slug}-${w}.webp`))
    sizes.push(w)
  }
  if (!sizes.length) {
    await sharp(src, { failOn: 'none' }).webp({ quality: 78 })
      .toFile(path.join(OUT_IMG, `${slug}-${width}.webp`))
    sizes.push(width)
  }
  // tiny blurred placeholder, inlined as a data URI
  const lqip = await sharp(src, { failOn: 'none' })
    .resize({ width: 20 }).blur(1).webp({ quality: 35 }).toBuffer()
  manifest[slug] = {
    alt,
    ratio: +(width / height).toFixed(4),
    sizes,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  }
  console.log(`photo  ${slug.padEnd(18)} ${width}x${height} -> ${sizes.join(',')}`)
}

for (const [name, file] of Object.entries(LOGOS)) {
  // Chromium already rasterised these; here we just trim whitespace and size them.
  const src = path.join('.asset-cache', `${name}.png`)
  try {
    // Displayed at ~36px; 480 wide covers 3x screens with room to spare.
    const base = sharp(src).trim({ threshold: 10 })
    await base.clone().resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT_BRAND, `${name}.webp`))
    await base.clone().resize({ width: 480, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT_BRAND, `${name}.png`))
    console.log(`logo   ${name}`)
  } catch (e) {
    console.warn(`logo   ${name} skipped: ${e.message}`)
  }
}

// favicon + apple touch icon from the navy mark on white
try {
  const mark = await sharp(path.join('.asset-cache', 'icon-navy.png')).trim({ threshold: 10 }).toBuffer()
  for (const size of [32, 180, 512]) {
    await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
      .composite([{ input: await sharp(mark).resize({ width: Math.round(size * 0.74), height: Math.round(size * 0.74), fit: 'contain', background: '#ffffff00' }).toBuffer() , gravity: 'center' }])
      .png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT_BRAND, `favicon-${size}.png`))
  }
  console.log('logo   favicons')
} catch (e) { console.warn('favicon skipped:', e.message) }

await writeFile('src/data/images.json', JSON.stringify(manifest, null, 2))
console.log(`\nwrote src/data/images.json (${Object.keys(manifest).length} photos)`)
