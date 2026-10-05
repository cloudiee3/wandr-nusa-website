// Catches the content mistakes that are invisible in a diff: a photo used
// twice in one card, two cards sharing a cover, a link to a trip that no
// longer exists, a filter chip with nothing behind it.
//   npm run check
import { journeys, categories, formatPrice } from '../src/data/journeys.js'
import { destinations, searchGroups } from '../src/data/destinations.js'
import { featured, testimonials } from '../src/data/testimonials.js'
import { stats } from '../src/data/site.js'
import images from '../src/data/images.json' with { type: 'json' }
import { readFileSync, readdirSync } from 'node:fs'

const problems = []
const note = (s) => console.log('  ' + s)

// ── Every photo referenced has to exist ───────────────────────────────
const slots = []
for (const j of journeys) {
  slots.push([j.image, `${j.slug} cover`], ...(j.gallery ?? []).map((g) => [g, `${j.slug} gallery`]))
  // Add-ons carry a photo of their own. Without this they read as unused and
  // the file looks safe to delete, which is the third time a new slot has
  // gone missing from this list.
  slots.push(...(j.addOns ?? []).filter((a) => a.image).map((a) => [a.image, `${j.slug} add-on`]))
}
for (const d of destinations) {
  slots.push([d.image, `${d.slug} cover`], ...(d.gallery ?? []).map((g) => [g, `${d.slug} gallery`]))
}
// Slots outside the two catalogues: the testimonial card, and the hero at the
// top of each page. Without these the linter calls a page hero "unused", which
// is how a real orphan gets lost among false ones.
slots.push([featured.image, 'testimonials featured'])
for (const file of readdirSync('src/pages').filter((f) => f.endsWith('.jsx'))) {
  const src = readFileSync(`src/pages/${file}`, 'utf8')
  // PageHero takes `image`; an <Img> dropped straight into a page takes `name`.
  // Matching bare name="…" would also catch every form field, so the second
  // pattern is anchored to the tag.
  for (const m of src.matchAll(/image="([a-z0-9-]+)"/g)) slots.push([m[1], `${file} hero`])
  for (const m of src.matchAll(/<Img[\s\S]{0,240}?name="([a-z0-9-]+)"/g)) slots.push([m[1], `${file} image`])
}
for (const t of testimonials) {
  if (t.avatar) slots.push([t.avatar, `testimonial avatar (${t.name})`])
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
// rather than failed, but it is listed every single run.
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

// ── No ampersands in running copy ─────────────────────────────────────
// The display serif's ampersand sits heavy, its italic is too ornamental for
// a heading, and the sans one looks borrowed. The brand's answer after all
// three was to spell the word, so a stray "&" mid-sentence is a mistake
// rather than a style choice. Chip labels keep theirs, being set in the sans
// already, and journey titles are off this list because the owner asked for
// one: "Tiu Kelep & Bukit Selong". A title is a name and theirs to set.
for (const [kind, items, fields] of [
  ['journey', journeys, ['priceNote', 'summary', 'kicker']],
  ['destination', destinations, ['name', 'blurb']],
]) {
  for (const it of items) {
    for (const f of fields) {
      if (typeof it[f] === 'string' && it[f].includes('&')) {
        problems.push(`${kind} "${it.slug}" has an ampersand in its ${f}: spell it "and"`)
      }
    }
  }
}

// ── The price formatter, pinned by example ───────────────────────────
// A round ten million used to publish as "IDR 1m", because the old trailing
// zero strip was not guarded on the decimal point. These cases cover that,
// the truncation that keeps 4,999,999 off 5M, and the capital M and K.
for (const [value, want] of [
  [0, 'On request'],
  [400_000, 'IDR 400K'],
  [999_999, 'IDR 999K'],
  [2_750_000, 'IDR 2.75M'],
  [4_999_999, 'IDR 4.99M'],
  [5_500_000, 'IDR 5.5M'],
  [10_000_000, 'IDR 10M'],
  [100_000_000, 'IDR 100M'],
]) {
  const got = formatPrice(value)
  if (got !== want) problems.push(`formatPrice(${value}) is "${got}", expected "${want}"`)
}

// ── The hero search points at pages that exist ───────────────────────
// A typo in one of these is invisible: the widget still submits, and the
// traveller lands on a redirect instead of the package they picked.
const destSlugs = new Set(destinations.map((d) => d.slug))
const tripSlugs = new Set(journeys.map((j) => j.slug))
for (const g of searchGroups) {
  for (const o of g.options) {
    if (o.dest && !destSlugs.has(o.dest)) {
      problems.push(`search option "${o.label}" points at destination "${o.dest}", which does not exist`)
    }
    if (o.trip && !tripSlugs.has(o.trip)) {
      problems.push(`search option "${o.label}" points at journey "${o.trip}", which does not exist`)
    }
  }
}

// ── No em dashes anywhere a visitor can read ──────────────────────────
// They read as machine-written rather than spoken, so the house style is a
// comma, a colon or a full stop. Two places hide one from a plain grep: a
// \u2014 escape in a string, and a dash inside a block comment that a
// line-by-line scan would wrongly flag. Comments are stripped first, then
// the remaining source is searched for both spellings.
const stripComments = (src) => {
  let out = '', i = 0
  while (i < src.length) {
    if (src.startsWith('/*', i)) { const e = src.indexOf('*/', i + 2); i = e < 0 ? src.length : e + 2; continue }
    if (src.startsWith('//', i)) { const e = src.indexOf('\n', i); i = e < 0 ? src.length : e; continue }
    out += src[i++]
  }
  return out
}
for (const file of readdirSync('src/data').map((f) => `src/data/${f}`)
  .concat(readdirSync('src/pages').map((f) => `src/pages/${f}`))
  .concat(readdirSync('src/components').map((f) => `src/components/${f}`))) {
  if (!/\.(jsx?|json)$/.test(file)) continue
  const body = stripComments(readFileSync(file, 'utf8'))
  for (const form of ['\u2014', '\\u2014']) {
    const n = body.split(form).length - 1
    if (n) problems.push(`${file} has ${n} em dash${n > 1 ? 'es' : ''} in copy: use a comma, a colon or a full stop`)
  }
}

// ── The group-size stat has to match the trips ───────────────────────
// The About page advertised 12 while every trip said 10 and its own values
// card said "ten everywhere else", so the page contradicted itself twice over.
{
  const claimed = stats.find((s) => /travellers per group/i.test(s.label))?.value
  const biggest = Math.max(...journeys.map((j) => Number(j.group.match(/\d+/)?.[0] ?? 0)))
  if (claimed && claimed !== biggest) {
    problems.push(`About says at most ${claimed} per group, but the largest group on any trip is ${biggest}`)
  }
}

// ── Every filter chip needs at least one trip ─────────────────────────
console.log('\nfilters')
for (const c of categories) {
  const n = c === 'All' ? journeys.length : journeys.filter((j) => j.tags.includes(c)).length
  note(`${n ? '✓' : '✗'} ${c.padEnd(24)} ${n}`)
  if (!n) problems.push(`filter "${c}" returns no journeys`)
}

// ── The Day Trips tag has to agree with the duration ─────────────────
// The hero widget's "day trips" answer filters on this tag. It used to sniff
// the duration string for "day", which matched "2 or 3 days" and "From 4
// days", so a search for day trips returned the Rinjani summit trek and the
// open-ended custom journey. The tag is now the only signal, so it has to
// stay true.
for (const j of journeys) {
  const tagged = j.tags?.includes('Day Trips')
  const overnight = /night/i.test(j.duration) || /\b([2-9]|\d\d)\s*days?\b/i.test(j.duration)
  if (tagged && overnight) problems.push(`journey "${j.slug}" is tagged Day Trips but runs "${j.duration}"`)
  if (!tagged && !overnight) problems.push(`journey "${j.slug}" runs "${j.duration}" but is not tagged Day Trips`)
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
