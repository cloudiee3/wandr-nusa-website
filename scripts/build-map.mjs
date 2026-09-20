// Turns Natural Earth 10m land data into the SVG paths for the Lesser Sunda
// chain — east Java through Bali, Lombok, Sumbawa, Flores, Sumba and Timor.
// Output: src/data/islands.json. Re-run with `npm run map`.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'

const SRC = '.asset-cache/ne_10m_land.json'
const URL = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/10m/physical/ne_10m_land.json'

// The stretch of Indonesia we actually sell trips in.
const BBOX = { lonMin: 114.0, lonMax: 122.6, latMin: -10.45, latMax: -7.9 }
const WIDTH = 1200
const MIN_AREA = 3.5   // px², drops specks that would render as dirt
const MIN_STEP = 0.55  // px, decimates points finer than the eye can see

if (!existsSync(SRC)) {
  mkdirSync('.asset-cache', { recursive: true })
  console.log('downloading Natural Earth land data…')
  const res = await fetch(URL)
  if (!res.ok) throw new Error(`download failed: ${res.status}`)
  writeFileSync(SRC, Buffer.from(await res.arrayBuffer()))
}

const scale = WIDTH / (BBOX.lonMax - BBOX.lonMin)
const HEIGHT = +((BBOX.latMax - BBOX.latMin) * scale).toFixed(2)
const project = ([lon, lat]) => [(lon - BBOX.lonMin) * scale, (BBOX.latMax - lat) * scale]

// Sutherland–Hodgman, one bbox edge at a time, in lon/lat space.
const clip = (ring) => {
  const edges = [
    [(p) => p[0] >= BBOX.lonMin, (a, b) => lerpX(a, b, BBOX.lonMin)],
    [(p) => p[0] <= BBOX.lonMax, (a, b) => lerpX(a, b, BBOX.lonMax)],
    [(p) => p[1] >= BBOX.latMin, (a, b) => lerpY(a, b, BBOX.latMin)],
    [(p) => p[1] <= BBOX.latMax, (a, b) => lerpY(a, b, BBOX.latMax)],
  ]
  let out = ring
  for (const [inside, intersect] of edges) {
    const input = out
    out = []
    for (let i = 0; i < input.length; i++) {
      const cur = input[i]
      const prev = input[(i + input.length - 1) % input.length]
      const curIn = inside(cur)
      const prevIn = inside(prev)
      if (curIn) {
        if (!prevIn) out.push(intersect(prev, cur))
        out.push(cur)
      } else if (prevIn) {
        out.push(intersect(prev, cur))
      }
    }
    if (!out.length) return []
  }
  return out
}
const lerpX = (a, b, x) => [x, a[1] + ((x - a[0]) / (b[0] - a[0])) * (b[1] - a[1])]
const lerpY = (a, b, y) => [a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]), y]

const area = (pts) => {
  let s = 0
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[(i + 1) % pts.length]
    s += x1 * y2 - x2 * y1
  }
  return Math.abs(s) / 2
}

const thin = (pts) => {
  const out = [pts[0]]
  for (const p of pts.slice(1)) {
    const q = out[out.length - 1]
    if (Math.hypot(p[0] - q[0], p[1] - q[1]) >= MIN_STEP) out.push(p)
  }
  return out
}

const geo = JSON.parse(readFileSync(SRC, 'utf8'))
const rings = []
for (const f of geo.features) {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates
  for (const poly of polys) {
    for (const ring of poly) {
      // cheap reject before the real clip
      const lons = ring.map((p) => p[0])
      const lats = ring.map((p) => p[1])
      if (Math.max(...lons) < BBOX.lonMin || Math.min(...lons) > BBOX.lonMax) continue
      if (Math.max(...lats) < BBOX.latMin || Math.min(...lats) > BBOX.latMax) continue

      const clipped = clip(ring)
      if (clipped.length < 4) continue
      const pts = thin(clipped.map(project))
      if (pts.length < 4) continue
      const a = area(pts)
      if (a < MIN_AREA) continue
      rings.push({ a, d: 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z' })
    }
  }
}

rings.sort((x, y) => y.a - x.a)
const out = {
  viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
  width: WIDTH,
  height: HEIGHT,
  bbox: BBOX,
  paths: rings.map((r) => r.d),
}
writeFileSync('src/data/islands.json', JSON.stringify(out))

console.log(`${rings.length} island shapes, viewBox ${out.viewBox}`)
console.log(`largest areas: ${rings.slice(0, 8).map((r) => Math.round(r.a)).join(', ')} px²`)
console.log(`src/data/islands.json — ${(JSON.stringify(out).length / 1024).toFixed(1)} kB`)
