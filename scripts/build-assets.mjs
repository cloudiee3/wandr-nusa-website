// Turns the originals in source-assets/ into web-ready files in public/.
// Re-run with `npm run assets` whenever a photo or logo is added.
import sharp from 'sharp'
import { mkdir, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const PHOTOS = 'source-assets/photos'
const BRAND = 'source-assets/brand'
const OUT_IMG = 'public/img'
const OUT_BRAND = 'public/brand'
const WIDTHS = [480, 800, 1280, 1920, 2560]

// slug -> { file, alt } . Slugs are what the site references.
const PHOTO_MAP = {
  'sasak-house':         ['1755652-indonesia-lombok-rooster-house-wallpaper-traditional.jpg', 'Traditional Sasak lumbung rice barn in a Lombok village'],
  'segara-anak':         ['1952517.jpg', 'Segara Anak crater lake inside Mount Rinjani'],
  'sarang-walet':        ['Sarang Walet Waterfall.avif', 'Sarang Walet waterfall dropping through the forest above Tetebatu'],
  'monkey-forest':       ['Monkey Forest .avif', 'Monkey forest canopy in central Lombok'],
  'tetebatu-field':      ['Tetebatu Rice Field.jpg', 'Rice fields at Tetebatu with Mount Rinjani behind'],
  'tetebatu-walk':       ['Tetebatu Rice Walk.jpg', 'A farmer on a path between the rice terraces at Tetebatu'],
  'tetebatu-plant':      ['Tetebatu Rice Plant.avif', 'Close view of rice terraces around Tetebatu'],
  'rice-terraces':       ['pexels-ari-setiawan-2156420701-35432028.jpg', 'Layered green rice terraces in the Lombok highlands'],
  // The first frame in the library with people in it.
  'travellers-viewpoint':['Travellers Viewpoint.jpg', 'Three travellers at the edge of a lake, one pointing out across the water towards the hills'],
  'kenawa-island':       ['Kenawa Island.webp', 'Kenawa island from the air — one green hill, a white beach and a wooden jetty, with the Sumbawa mountains behind'],
  'lombok-beach-stay':   ['Lombok Beach Stay.jpg', 'Beachfront villas and a pool above white sand and clear water on the Lombok coast'],
  'selong-belanak':      ['Selong Belanak Bay.jpg', 'The long white curve of Selong Belanak, a fishing fleet moored off it and green hills behind'],
  'bukit-merese':        ['Bukit Merese.jpg', 'The green headland of Bukit Merese running out into the sea, with surf breaking along the rocks'],
  'mandalika-circuit':   ['Mandalika Circuit.jpg', 'The Mandalika circuit laid out on its headland above the south coast, with the bay beyond'],
  'sade-village':        ['Sade Village Gate.jpg', 'The welcome gate at Sade, thatched roofs and woven bamboo walls on either side'],
  'coastline-aerial':    ['pexels-bongvideos-production-1310991-2524370.jpg', 'Aerial view of a turquoise reef and empty sand beach'],
  'pink-beach-wide':     ['Pink Beach Wide.jpg', 'The long pink sweep of Pink Beach, with the hills of the southeast coast behind it'],
  'pink-beach-boat':     ['Pink Beach Boat.jpg', 'A wooden boat drawn up on the pink sand at Pink Beach, green hills rising behind'],
  'pink-beach-bay':      ['Reef Bay Aerial.jpg', 'The bay at Pink Beach from the air, fishing boats moored over the reef'],
  'pink-beach-outrigger':['Outrigger Aerial.jpg', 'An outrigger moored off Pink Beach, seen from directly above on the edge of the reef'],
  'gili-kondo-island':   ['Gili Kondo Island.jpg', 'A wooded island ringed with white sand and moored boats, off the northeast coast of Lombok'],
  'gili-kondo-sandbar':  ['Gili Kondo Sandbar.jpg', 'A bare sandbar standing alone in shallow turquoise water'],
  'gili-kondo-snorkel':  ['Gili Kondo Snorkel.jpg', 'A snorkeller swimming over coral among a shoal of fish'],
  'gili-kondo-spit':     ['Gili Kondo Spit.jpg', 'A curving sand spit from the air, with boats drawn up alongside it'],
  'gili-kondo-boats':    ['Gili Kondo Boats.jpg', 'Fishing boats moored along a white sand beach, seen from directly above'],
  'benang-kelambu':      ['Benang Kelambu.webp', 'Benang Kelambu falling in many strands through the vegetation into a shallow pool'],
  'benang-kelambu-curtain':['Benang Kelambu Curtain.jpg', 'A curtain of water dropping through dense green over a mossy wall at Benang Kelambu'],
  'benang-stokel':       ['Benang Stokel.jpg', 'Benang Stokel dropping in a single column into the forest below'],
  // Registered but unused: river tubing at Aik Berik is priced separately and
  // is not part of the waterfall day, so it stays off that card.
  'aik-berik-tubing':    ['Aik Berik Tubing.jpg', 'A raft running the whitewater on the river at Aik Berik'],
  'underwater-statues':  ['pexels-ericjo-31973396.jpg', 'A ring of underwater statues standing on the sand, a snorkeller above them'],
  // Which gili is which in these two is still open — see CONTENT-REVIEW.md.
  // The alt text says what is in the frame rather than guessing a name.
  'gili-islands-aerial': ['Gili Islands Aerial.webp', 'Two of the Gili islands from the air, reef and moored boats below and Lombok on the horizon'],
  'gili-salt-lake':      ['Gili Salt Lake.webp', 'A Gili island from above, its salt lake inland and the reef flat running all the way round it'],
  // Registered but unused: a small wooded gili that is not one of the three
  // this trip visits, waiting on an identification before it goes anywhere.
  'gili-beacon-islet':   ['Gili Beacon Islet.jpg', 'A small wooded islet ringed with white sand, a navigation beacon at one end'],
  'jungle-waterfall':    ['pexels-firman-fatthul-154779494-27572318.jpg', 'Twin waterfalls in dense rainforest'],
  'volcanic-plain':      ['pexels-ilham-zovanka-2158121497-37550278.jpg', 'Volcanic sand plain below the Rinjani ridgeline'],
  'rice-road-aerial':    ['pexels-johan-armang-83912829-11175507.jpg', 'Aerial view of a road cutting through golden rice paddies'],
  'rice-field-huts':     ['pexels-line-knipst-574109081-19643773.jpg', 'Bamboo huts and palms among green rice fields'],
  'rinjani-crater':      ['pexels-roman-odintsov-4552425.jpg', 'Mount Rinjani crater rim above the lake'],
  'rinjani-rim':         ['Rinjani Crater Rim.jpg', 'Trekkers on the Rinjani crater rim above Segara Anak lake'],
  'rinjani-sunrise':     ['Rinjani Summit Sunrise.jpg', 'Trekkers watching sunrise from a ridge above the clouds on Mount Rinjani'],
  'rinjani-peak':        ['Rinjani Peak Clouds.jpg', 'The summit cone of Mount Rinjani catching first light through cloud'],
  'rinjani-lake-view':   ['Rinjani Rim Lake View.jpg', 'Segara Anak and the Barujari cone seen from the Rinjani summit ridge'],
  'rinjani-barujari':    ['Rinjani Barujari Cone.jpg', 'The Barujari cone rising from Segara Anak inside the Rinjani caldera'],
  'rinjani-caldera':     ['Rinjani Caldera Aerial.jpg', 'The Barujari cone and Segara Anak from the air inside the Rinjani caldera'],
  'sembalun-valley':     ['Sembalun Valley Fields.webp', 'A walker above the Sembalun valley with the hills rising behind the fields'],
  'sembalun-ridge':      ['Sembalun Ridge Trail.jpg', 'A walker on a ridge path above the green hills of Sembalun'],
  'sembalun-fields':     ['Sembalun Fields Aerial.webp', 'The patchwork fields of the Sembalun valley from above'],
  'sembalun-sign':       ['Sembalun Summit Sign.jpg', 'A weathered summit marker on a hill above Sembalun'],
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
  // A source between two steps would otherwise be served at the step below
  // it, throwing away detail we already hold. Emit its own width as well.
  if (width > (sizes.at(-1) ?? 0) && width < WIDTHS.at(-1)) {
    await sharp(src, { failOn: 'none' }).webp({ quality: 78, effort: 5 })
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

// The brand pack only ships a white wordmark; tint a navy one from its alpha
// so the mark works on light backgrounds too.
try {
  const white = await sharp(path.join('.asset-cache', 'wordmark-white.png'))
    .trim({ threshold: 10 }).resize({ width: 480, withoutEnlargement: true }).toBuffer()
  const { width, height } = await sharp(white).metadata()
  const alpha = await sharp(white).extractChannel('alpha').toBuffer()
  const navy = await sharp({ create: { width, height, channels: 3, background: '#011D39' } }).png().toBuffer()
  const tinted = await sharp(navy).joinChannel(alpha).png().toBuffer()
  await sharp(tinted).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(OUT_BRAND, 'wordmark-navy.webp'))
  await sharp(tinted).png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT_BRAND, 'wordmark-navy.png'))
  console.log('logo   wordmark-navy (tinted)')
} catch (e) { console.warn('wordmark-navy skipped:', e.message) }

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
