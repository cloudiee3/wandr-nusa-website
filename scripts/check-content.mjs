// Catches the content mistakes that are invisible in a diff: a photo used
// twice in one card, two cards sharing a cover, a link to a trip that no
// longer exists, a filter chip with nothing behind it.
//   npm run check
import { journeys, categories } from '../src/data/journeys.js'
import { destinations } from '../src/data/destinations.js'
import images from '../src/data/images.json' with { type: 'json' }
import { readFileSync } from 'node:fs'

const problems = []
const note = (s) => console.log('  ' + s)

// ── Every photo referenced has to exist ───────────────────────────────
const slots = []
for (const j of journeys) {
  slots.push([j.image, `${j.slug} cover`], ...(j.gallery ?? []).map((g) => [g, `${j.slug} gallery`]))
}
for (const d of destinations) {
  slots.push([d.image, `${d.slug} cover`], ...(d.gallery ?? []).map((g) => [g, `${d.slug} gallery`]))
}
for (const [name, where] of slots) {
  if (!images[name]) problems.push(`missing photo "${name}" (${where})`)
}

// ── No photo twice inside one card ────────────────────────────────────
const withinItem = (items, kind) => {
  for (const it of items) {
    const all = [it.image, ...(it.gallery ?? [])]
    const seen = new Set()
    for (const img of all) {
      if (seen.has(img)) problems.push(`${kind} "${it.slug}" uses ${img} twice`)
      seen.add(img)
    }
  }
}
withinItem(journeys, 'journey')
withinItem(destinations, 'destination')

// ── No two covers the same ────────────────────────────────────────────
// A trip that says `needsPhoto` is borrowing one on purpose until its own
// arrives. That is a gap we are tracking, not a regression, so it is listed
// rather than failed — but it is listed every single run.
const awaiting = journeys.filter((j) => j.needsPhoto).map((j) => j.slug)
const covers = new Map()
for (const it of [...journeys, ...destinations]) {
  covers.set(it.image, [...(covers.get(it.image) ?? []), it.slug])
}
for (const [img, who] of covers) {
  if (who.length < 2) continue
  if (who.some((w) => awaiting.includes(w))) continue
  problems.push(`cover ${img} shared by ${who.join(' + ')}`)
}
if (awaiting.length) {
  console.log('\nawaiting their own photographs')
  for (const slug of awaiting) {
    const j = journeys.find((x) => x.slug === slug)
    note(`\u2691 ${slug.padEnd(28)} borrowing ${j.image}`)
  }
}

// ── Destinations must link to trips that exist ────────────────────────
const slugs = new Set(journeys.map((j) => j.slug))
for (const d of destinations) {
  for (const s of d.journeys ?? []) {
    if (!slugs.has(s)) problems.push(`destination "${d.slug}" links to missing journey "${s}"`)
  }
}

// ── Anything else that names a trip by slug ───────────────────────────
// A rename used to break these silently: the homepage threw on a deal
// pointing at a journey that no longer existed.
const source = [
  'src/data/deals.js',
  'src/components/AboutStrip.jsx',
  'src/components/Deals.jsx',
  'src/components/OfferSlider.jsx',
  'src/pages/Home.jsx',
]
for (const file of source) {
  let text
  try { text = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8') } catch { continue }
  for (const m of text.matchAll(/(?:journeys\/|bySlug\(')([a-z0-9-]+)/g)) {
    if (!slugs.has(m[1]) && m[1] !== 'custom-private-journey') {
      problems.push(`${file} names missing journey "${m[1]}"`)
    }
  }
}

// ── Every filter chip needs at least one trip ─────────────────────────
console.log('\nfilters')
for (const c of categories) {
  const n = c === 'All' ? journeys.length : journeys.filter((j) => j.tags.includes(c)).length
  note(`${n ? '✓' : '✗'} ${c.padEnd(24)} ${n}`)
  if (!n) problems.push(`filter "${c}" returns no journeys`)
}

// ── Every tag used must be a real chip ────────────────────────────────
const known = new Set(categories)
for (const j of journeys) {
  for (const t of j.tags ?? []) {
    if (!known.has(t)) problems.push(`journey "${j.slug}" carries unknown tag "${t}"`)
  }
}

// ── How much of the library is doing double duty ──────────────────────
const count = new Map()
for (const [name] of slots) count.set(name, (count.get(name) ?? 0) + 1)
const reused = [...count.entries()].filter(([, n]) => n > 1)
console.log(`\nphotos: ${Object.keys(images).length} in the library, ${count.size} used, ${reused.length} in more than one card`)
for (const [img, n] of reused.sort((a, b) => b[1] - a[1])) note(`${img.padEnd(20)} ${n} cards`)
const unused = Object.keys(images).filter((k) => !count.has(k))
if (unused.length) console.log(`\nunused: ${unused.join(', ')}`)

console.log(problems.length ? `\n${problems.length} PROBLEM(S):\n  ` + problems.join('\n  ') : '\nno problems')
process.exit(problems.length ? 1 : 0)
