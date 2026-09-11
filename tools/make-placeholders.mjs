/* ==========================================================================
   wandrnusa — placeholder artwork generator
   --------------------------------------------------------------------------
   Writes the brand-coloured SVG illustrations in assets/img/placeholders/.
   These stand in until real photographs are dropped into assets/img/, and a
   card falls back to one automatically when its photo file is missing.

   Run:  node tools/make-placeholders.mjs
   Add a destination: append a scene to SCENES at the bottom and re-run.
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'img', 'placeholders');

/* ---- Brand palette ------------------------------------------------------ */
const C = {
  navy: '#0B2E4A',
  mist: '#D8E5E2',
  paper: '#FFFDF8',
  sand: '#E7D7C1',
  ocean: '#4F9CC2',
  forest: '#5B7D69',
  terracotta: '#B86E52',
};

/* ---- Colour + noise utilities ------------------------------------------- */

const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
/** Blend two brand colours. t=0 → a, t=1 → b. */
const mix = (a, b, t) => rgb2hex(hex2rgb(a).map((v, i) => v + (hex2rgb(b)[i] - v) * t));

/** Deterministic RNG so re-running produces identical files. */
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

/** Smooth 1-D ridge profile: a few sine waves with seeded phases. */
function profile(seed, octaves = 4) {
  const r = rng(seed);
  const waves = Array.from({ length: octaves }, (_, i) => ({
    freq: (i + 1) * (0.9 + r() * 0.7),
    phase: r() * Math.PI * 2,
    amp: 1 / (i + 1.35),
  }));
  const norm = waves.reduce((sum, w) => sum + w.amp, 0);
  return (x) => waves.reduce((sum, w) => sum + Math.sin(x * Math.PI * 2 * w.freq + w.phase) * w.amp, 0) / norm;
}

/* ---- Shape generators ---------------------------------------------------- */

/** A mountain ridge spanning the full width, filled down to the base. */
function ridge({ w, h, y, amp, seed, fill, opacity = 1, octaves = 4, steps = 96 }) {
  const f = profile(seed, octaves);
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w;
    pts.push([x.toFixed(1), (y + f(i / steps) * amp).toFixed(1)]);
  }
  const d = `M0,${h} L${pts[0][0]},${pts[0][1]} ` +
    pts.slice(1).map(([x, yy]) => `L${x},${yy}`).join(' ') +
    ` L${w},${h} Z`;
  return `<path d="${d}" fill="${fill}"${opacity < 1 ? ` opacity="${opacity}"` : ''}/>`;
}

/** A ridge that fills only a band of `depth`, so layers can sit over artwork. */
function ridgeBand({ w, y, amp, depth, seed, fill, opacity = 1, octaves = 4, steps = 96 }) {
  const f = profile(seed, octaves);
  const top = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w;
    top.push(`${x.toFixed(1)},${(y + f(i / steps) * amp).toFixed(1)}`);
  }
  const d = `M${top[0]} ` + top.slice(1).map((pt) => `L${pt}`).join(' ') +
    ` L${w},${(y + depth).toFixed(1)} L0,${(y + depth).toFixed(1)} Z`;
  return `<path d="${d}" fill="${fill}"${opacity < 1 ? ` opacity="${opacity}"` : ''}/>`;
}

/** A cliff wall rising from one side, with a soft bezier edge. */
function cliff({ w, h, side, topY, edgeX, fill }) {
  const dir = side === 'left' ? 1 : -1;
  const x0 = side === 'left' ? 0 : w;
  const xe = side === 'left' ? edgeX : w - edgeX;
  const d = `M${x0},${(topY).toFixed(1)} ` +
    `C${(x0 + dir * edgeX * 0.7).toFixed(1)},${(topY + h * 0.02).toFixed(1)} ` +
    `${(xe - dir * edgeX * 0.18).toFixed(1)},${(topY + h * 0.26).toFixed(1)} ` +
    `${xe.toFixed(1)},${h} L${x0},${h} Z`;
  return `<path d="${d}" fill="${fill}"/>`;
}

/** A single volcano cone — Rinjani sits behind most of these scenes. */
function cone({ w, h, cx, baseY, height, halfWidth, fill, notch = 0.16 }) {
  const peakY = baseY - height;
  const l = cx - halfWidth, r = cx + halfWidth;
  const nw = halfWidth * notch;
  const d = `M${l.toFixed(1)},${baseY.toFixed(1)}
             C${(cx - halfWidth * 0.55).toFixed(1)},${(baseY - height * 0.42).toFixed(1)}
              ${(cx - halfWidth * 0.30).toFixed(1)},${(peakY + height * 0.12).toFixed(1)}
              ${(cx - nw).toFixed(1)},${peakY.toFixed(1)}
             L${(cx - nw * 0.25).toFixed(1)},${(peakY + height * 0.045).toFixed(1)}
             L${(cx + nw * 0.35).toFixed(1)},${(peakY + height * 0.02).toFixed(1)}
             L${(cx + nw).toFixed(1)},${(peakY + height * 0.055).toFixed(1)}
             C${(cx + halfWidth * 0.34).toFixed(1)},${(peakY + height * 0.2).toFixed(1)}
              ${(cx + halfWidth * 0.6).toFixed(1)},${(baseY - height * 0.4).toFixed(1)}
              ${r.toFixed(1)},${baseY.toFixed(1)} Z`;
  return `<path d="${d.replace(/\s+/g, ' ')}" fill="${fill}"/>`;
}

/** Stacked curved bands — reads as rice terraces stepping downhill. */
function terraces({ w, h, top, count, colorA, colorB, seed }) {
  const f = profile(seed, 3);
  const out = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const y = top + (h - top) * Math.pow(t, 1.35);
    const sag = 18 + t * 70;
    const off = f(t * 0.8) * (10 + t * 26);
    const d = `M${-w * 0.05},${(y + off).toFixed(1)} ` +
      `Q${(w * 0.5).toFixed(1)},${(y + sag + off).toFixed(1)} ${(w * 1.05).toFixed(1)},${(y - off * 0.6).toFixed(1)} ` +
      `L${(w * 1.05).toFixed(1)},${h} L${-w * 0.05},${h} Z`;
    out.push(`<path d="${d}" fill="${mix(colorA, colorB, t)}"/>`);
    // Hairline along the bund, the way water catches the edge of a terrace
    out.push(`<path d="M${-w * 0.05},${(y + off).toFixed(1)} Q${(w * 0.5).toFixed(1)},${(y + sag + off).toFixed(1)} ${(w * 1.05).toFixed(1)},${(y - off * 0.6).toFixed(1)}"
      fill="none" stroke="${C.paper}" stroke-width="${(1.2 + t * 1.6).toFixed(1)}" opacity="${(0.16 + t * 0.12).toFixed(2)}"/>`);
  }
  return out.join('');
}

/** A tapered stream of water falling from `top` to `bottom`. */
function waterfall({ cx, top, bottom, wTop, wBot, fill, opacity = 1 }) {
  const d = `M${(cx - wTop / 2).toFixed(1)},${top} ` +
    `C${(cx - wTop * 0.62).toFixed(1)},${(top + (bottom - top) * 0.5).toFixed(1)} ${(cx - wBot * 0.6).toFixed(1)},${(bottom - (bottom - top) * 0.16).toFixed(1)} ${(cx - wBot / 2).toFixed(1)},${bottom} ` +
    `L${(cx + wBot / 2).toFixed(1)},${bottom} ` +
    `C${(cx + wBot * 0.6).toFixed(1)},${(bottom - (bottom - top) * 0.16).toFixed(1)} ${(cx + wTop * 0.62).toFixed(1)},${(top + (bottom - top) * 0.5).toFixed(1)} ${(cx + wTop / 2).toFixed(1)},${top} Z`;
  return `<path d="${d}" fill="${fill}" opacity="${opacity}"/>`;
}

/** Perspective field plots — the patchwork you see from Bukit Selong. */
function fields({ w, h, top, rows, cols, colorA, colorB, seed }) {
  const r = rng(seed);
  const out = [];
  for (let row = 0; row < rows; row++) {
    const t0 = row / rows, t1 = (row + 1) / rows;
    const y0 = top + (h - top) * Math.pow(t0, 1.5);
    const y1 = top + (h - top) * Math.pow(t1, 1.5);
    const spread0 = 0.24 + t0 * 0.9, spread1 = 0.24 + t1 * 0.9;
    const n = Math.max(2, Math.round(cols * (0.55 + t0)));
    for (let col = 0; col < n; col++) {
      const a0 = (col / n - 0.5), a1 = ((col + 1) / n - 0.5);
      const x00 = w / 2 + a0 * w * spread0, x01 = w / 2 + a1 * w * spread0;
      const x10 = w / 2 + a0 * w * spread1, x11 = w / 2 + a1 * w * spread1;
      const shade = 0.18 + r() * 0.7;
      out.push(`<path d="M${x00.toFixed(1)},${y0.toFixed(1)} L${x01.toFixed(1)},${y0.toFixed(1)} L${x11.toFixed(1)},${y1.toFixed(1)} L${x10.toFixed(1)},${y1.toFixed(1)} Z"
        fill="${mix(colorA, colorB, shade)}" stroke="${C.paper}" stroke-width="0.8" stroke-opacity="0.14"/>`);
    }
  }
  return out.join('');
}

/** A road curving away toward the ridge line, with a faded centre line. */
function road({ w, h, top, fill, line }) {
  const vx = w * 0.545;                 // vanishing point
  const nearL = w * 0.30, nearR = w * 0.64;
  const bend = w * 0.06;                // how far the road swings on its way out
  const midY = top + (h - top) * 0.42;

  const left  = `M${nearL},${h} C${(nearL + bend * 1.6).toFixed(1)},${(h * 0.82).toFixed(1)} ${(vx - bend).toFixed(1)},${midY.toFixed(1)} ${(vx - w * 0.012).toFixed(1)},${top.toFixed(1)}`;
  const right = `L${(vx + w * 0.012).toFixed(1)},${top.toFixed(1)} C${(vx + bend * 1.1).toFixed(1)},${midY.toFixed(1)} ${(nearR - bend * 1.1).toFixed(1)},${(h * 0.82).toFixed(1)} ${nearR},${h} Z`;

  const centre = `M${((nearL + nearR) / 2).toFixed(1)},${h} C${((nearL + nearR) / 2 + bend * 1.2).toFixed(1)},${(h * 0.82).toFixed(1)} ${vx.toFixed(1)},${midY.toFixed(1)} ${vx.toFixed(1)},${top.toFixed(1)}`;

  return `<path d="${left} ${right}" fill="${fill}"/>` +
    `<path d="${centre}" fill="none" stroke="${line}" stroke-width="${(w * 0.006).toFixed(1)}"
       stroke-dasharray="${(h * 0.05).toFixed(0)} ${(h * 0.045).toFixed(0)}" stroke-linecap="round" opacity="0.5"/>`;
}

/* ---- Document assembly --------------------------------------------------- */

const grain = (id, opacity = 0.045) => `
  <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0"/>
  </filter>`;

function doc({ id, w, h, sky, body, sun, grainOpacity = 0.05 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${sky[0]}"/>
      <stop offset="55%" stop-color="${sky[1]}"/>
      <stop offset="100%" stop-color="${sky[2]}"/>
    </linearGradient>
    ${grain(id)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky-${id})"/>
  ${sun || ''}
  ${body}
  <rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="${grainOpacity}" style="mix-blend-mode:overlay"/>
</svg>`;
}

const sunDisc = (cx, cy, r, fill, opacity = 0.5) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}"/>`;

/* ---- Scenes -------------------------------------------------------------- */
/* One entry per image the site can fall back to. `accent` keeps each scene on
   a single accent colour, in line with the brand rules.                      */

const SCENES = {
  /* Hero: wide, dark enough for white type to sit on it. Accent: Ocean Blue */
  'hero': ({ w = 2400, h = 1350 } = {}) => doc({
    id: 'hero', w, h,
    sky: [mix(C.navy, C.ocean, 0.30), mix(C.ocean, C.sand, 0.42), mix(C.sand, C.paper, 0.45)],
    sun: sunDisc(w * 0.7, h * 0.34, h * 0.13, C.paper, 0.30),
    body: [
      ridge({ w, h, y: h * 0.56, amp: h * 0.055, seed: 11, fill: mix(C.navy, C.mist, 0.56), opacity: 0.85 }),
      cone({ w, h, cx: w * 0.31, baseY: h * 0.63, height: h * 0.34, halfWidth: w * 0.24, fill: mix(C.navy, C.mist, 0.42) }),
      ridge({ w, h, y: h * 0.66, amp: h * 0.05, seed: 23, fill: mix(C.navy, C.forest, 0.45) }),
      ridge({ w, h, y: h * 0.76, amp: h * 0.035, seed: 37, fill: mix(C.navy, C.forest, 0.26) }),
      terraces({ w, h, top: h * 0.80, count: 7, colorA: mix(C.navy, C.forest, 0.30), colorB: mix(C.navy, C.forest, 0.05), seed: 5 }),
    ].join(''),
  }),

  /* Tetebatu: rice terraces under Rinjani. Accent: Forest Green */
  'tetebatu': ({ w = 1600, h = 1067 } = {}) => doc({
    id: 'tetebatu', w, h,
    sky: [mix(C.mist, C.paper, 0.55), mix(C.mist, C.sand, 0.35), mix(C.sand, C.paper, 0.6)],
    sun: sunDisc(w * 0.74, h * 0.24, h * 0.11, C.paper, 0.55),
    body: [
      cone({ w, h, cx: w * 0.38, baseY: h * 0.52, height: h * 0.33, halfWidth: w * 0.33, fill: mix(C.mist, C.navy, 0.30) }),
      ridge({ w, h, y: h * 0.50, amp: h * 0.045, seed: 91, fill: mix(C.mist, C.navy, 0.22) }),
      ridge({ w, h, y: h * 0.58, amp: h * 0.04, seed: 17, fill: mix(C.forest, C.mist, 0.45) }),
      terraces({ w, h, top: h * 0.62, count: 9, colorA: mix(C.forest, C.mist, 0.30), colorB: mix(C.forest, C.navy, 0.30), seed: 3 }),
    ].join(''),
  }),

  /* Central Lombok: Benang Kelambu through the plants. Accent: Ocean Blue */
  'lombok-tengah': ({ w = 1600, h = 1067 } = {}) => doc({
    id: 'lt', w, h,
    sky: [mix(C.mist, C.paper, 0.5), mix(C.ocean, C.mist, 0.62), mix(C.forest, C.navy, 0.45)],
    body: [
      ridge({ w, h, y: h * 0.22, amp: h * 0.045, seed: 44, fill: mix(C.forest, C.mist, 0.5), octaves: 5 }),
      // the cliff the water comes over
      `<path d="M0,${h * 0.30} C${w * 0.3},${h * 0.26} ${w * 0.66},${h * 0.32} ${w},${h * 0.27} L${w},${h} L0,${h} Z" fill="${mix(C.forest, C.navy, 0.46)}"/>`,
      // three falls, bright against the cliff
      waterfall({ cx: w * 0.30, top: h * 0.30, bottom: h * 0.84, wTop: w * 0.055, wBot: w * 0.125, fill: C.paper, opacity: 0.88 }),
      waterfall({ cx: w * 0.47, top: h * 0.29, bottom: h * 0.88, wTop: w * 0.038, wBot: w * 0.10, fill: C.paper, opacity: 0.74 }),
      waterfall({ cx: w * 0.64, top: h * 0.31, bottom: h * 0.83, wTop: w * 0.05, wBot: w * 0.118, fill: C.paper, opacity: 0.82 }),
      // plants hanging over the lip — this is where "kelambu" (curtain) comes from
      ridgeBand({ w, y: h * 0.30, amp: h * 0.045, depth: h * 0.20, seed: 71, octaves: 6,
                  fill: mix(C.forest, C.navy, 0.34), opacity: 0.82 }),
      ridgeBand({ w, y: h * 0.36, amp: h * 0.03, depth: h * 0.10, seed: 73, octaves: 7,
                  fill: mix(C.forest, C.navy, 0.20), opacity: 0.5 }),
      // pool and foreground
      `<ellipse cx="${w * 0.47}" cy="${h * 0.88}" rx="${w * 0.4}" ry="${h * 0.055}" fill="${C.paper}" opacity="0.35"/>`,
      ridge({ w, h, y: h * 0.90, amp: h * 0.022, seed: 12, fill: mix(C.ocean, C.navy, 0.55) }),
      ridge({ w, h, y: h * 0.96, amp: h * 0.016, seed: 15, fill: mix(C.forest, C.navy, 0.24) }),
    ].join(''),
  }),

  /* Senaru: a tall fall between cliffs. Accent: Ocean Blue */
  'senaru': ({ w = 1600, h = 1067 } = {}) => doc({
    id: 'senaru', w, h,
    sky: [mix(C.mist, C.paper, 0.6), mix(C.ocean, C.mist, 0.5), mix(C.navy, C.forest, 0.55)],
    body: [
      ridge({ w, h, y: h * 0.16, amp: h * 0.045, seed: 61, fill: mix(C.forest, C.mist, 0.58) }),
      // the fall drops between two walls
      waterfall({ cx: w * 0.5, top: h * 0.14, bottom: h * 0.80, wTop: w * 0.06, wBot: w * 0.19, fill: C.paper, opacity: 0.88 }),
      cliff({ w, h, side: 'left',  topY: h * 0.15, edgeX: w * 0.40, fill: mix(C.navy, C.forest, 0.40) }),
      cliff({ w, h, side: 'right', topY: h * 0.11, edgeX: w * 0.38, fill: mix(C.navy, C.forest, 0.30) }),
      // canopy over the top of each wall
      ridgeBand({ w, y: h * 0.13, amp: h * 0.035, depth: h * 0.09, seed: 65, octaves: 6,
                  fill: mix(C.forest, C.navy, 0.30), opacity: 0.55 }),
      // spray and pool
      `<ellipse cx="${w * 0.5}" cy="${h * 0.81}" rx="${w * 0.2}" ry="${h * 0.055}" fill="${C.paper}" opacity="0.5"/>`,
      ridge({ w, h, y: h * 0.86, amp: h * 0.02, seed: 29, fill: mix(C.ocean, C.navy, 0.5) }),
      ridge({ w, h, y: h * 0.94, amp: h * 0.018, seed: 83, fill: mix(C.navy, C.forest, 0.20) }),
    ].join(''),
  }),

  /* Sembalun: the field patchwork from Bukit Selong. Accent: Terracotta */
  'sembalun': ({ w = 1600, h = 1067 } = {}) => doc({
    id: 'sembalun', w, h,
    sky: [mix(C.mist, C.paper, 0.45), mix(C.sand, C.mist, 0.5), mix(C.sand, C.paper, 0.5)],
    sun: sunDisc(w * 0.24, h * 0.20, h * 0.09, C.paper, 0.6),
    body: [
      cone({ w, h, cx: w * 0.62, baseY: h * 0.46, height: h * 0.34, halfWidth: w * 0.36, fill: mix(C.mist, C.navy, 0.34) }),
      ridge({ w, h, y: h * 0.44, amp: h * 0.04, seed: 55, fill: mix(C.mist, C.navy, 0.24) }),
      ridge({ w, h, y: h * 0.52, amp: h * 0.03, seed: 66, fill: mix(C.terracotta, C.mist, 0.62) }),
      fields({ w, h, top: h * 0.54, rows: 7, cols: 5, colorA: mix(C.forest, C.sand, 0.35), colorB: mix(C.terracotta, C.sand, 0.55), seed: 7 }),
    ].join(''),
  }),

  /* Tour by request: a road heading out. Accent: Terracotta */
  'request': ({ w = 1600, h = 1200 } = {}) => doc({
    id: 'request', w, h,
    sky: [mix(C.navy, C.ocean, 0.45), mix(C.terracotta, C.sand, 0.55), mix(C.sand, C.paper, 0.4)],
    sun: sunDisc(w * 0.5, h * 0.42, h * 0.10, C.paper, 0.45),
    body: [
      ridge({ w, h, y: h * 0.44, amp: h * 0.05, seed: 101, fill: mix(C.navy, C.terracotta, 0.45), opacity: 0.8 }),
      ridge({ w, h, y: h * 0.54, amp: h * 0.04, seed: 113, fill: mix(C.navy, C.forest, 0.35) }),
      ridge({ w, h, y: h * 0.64, amp: h * 0.03, seed: 127, fill: mix(C.navy, C.forest, 0.18) }),
      road({ w, h, top: h * 0.64, fill: mix(C.sand, C.navy, 0.30), line: C.paper }),
    ].join(''),
  }),

  /* About: a portrait of the valley we work in. Accent: Forest Green */
  'about': ({ w = 1000, h = 1250 } = {}) => doc({
    id: 'about', w, h,
    sky: [mix(C.mist, C.paper, 0.55), mix(C.mist, C.sand, 0.3), mix(C.sand, C.paper, 0.55)],
    sun: sunDisc(w * 0.70, h * 0.20, h * 0.075, C.paper, 0.55),
    body: [
      cone({ w, h, cx: w * 0.42, baseY: h * 0.44, height: h * 0.22, halfWidth: w * 0.44, fill: mix(C.mist, C.navy, 0.28) }),
      ridge({ w, h, y: h * 0.43, amp: h * 0.025, seed: 301, fill: mix(C.mist, C.navy, 0.18) }),
      ridge({ w, h, y: h * 0.50, amp: h * 0.022, seed: 305, fill: mix(C.forest, C.mist, 0.5) }),
      terraces({ w, h, top: h * 0.54, count: 10, colorA: mix(C.forest, C.mist, 0.34), colorB: mix(C.forest, C.navy, 0.32), seed: 21 }),
    ].join(''),
  }),

  /* Gallery — quieter variations, one accent each */
  'gallery-01': ({ w = 1600, h = 1067 } = {}) => doc({
    id: 'g1', w, h,
    sky: [mix(C.mist, C.paper, 0.6), mix(C.mist, C.sand, 0.3), mix(C.sand, C.paper, 0.55)],
    body: [
      ridge({ w, h, y: h * 0.42, amp: h * 0.05, seed: 201, fill: mix(C.mist, C.navy, 0.26) }),
      terraces({ w, h, top: h * 0.50, count: 8, colorA: mix(C.forest, C.mist, 0.42), colorB: mix(C.forest, C.navy, 0.24), seed: 9 }),
    ].join(''),
  }),

  'gallery-02': ({ w = 1200, h = 1500 } = {}) => doc({
    id: 'g2', w, h,
    sky: [mix(C.mist, C.paper, 0.5), mix(C.ocean, C.mist, 0.55), mix(C.forest, C.navy, 0.5)],
    body: [
      `<path d="M0,${h * 0.22} C${w * 0.4},${h * 0.18} ${w * 0.7},${h * 0.24} ${w},${h * 0.19} L${w},${h} L0,${h} Z" fill="${mix(C.forest, C.navy, 0.44)}"/>`,
      waterfall({ cx: w * 0.44, top: h * 0.22, bottom: h * 0.86, wTop: w * 0.14, wBot: w * 0.34, fill: C.paper, opacity: 0.85 }),
      waterfall({ cx: w * 0.72, top: h * 0.21, bottom: h * 0.80, wTop: w * 0.06, wBot: w * 0.14, fill: C.paper, opacity: 0.6 }),
      ridgeBand({ w, y: h * 0.21, amp: h * 0.03, depth: h * 0.14, seed: 211, octaves: 6,
                  fill: mix(C.forest, C.navy, 0.28), opacity: 0.8 }),
      `<ellipse cx="${w * 0.46}" cy="${h * 0.88}" rx="${w * 0.5}" ry="${h * 0.05}" fill="${C.paper}" opacity="0.4"/>`,
      ridge({ w, h, y: h * 0.92, amp: h * 0.015, seed: 215, fill: mix(C.ocean, C.navy, 0.5) }),
    ].join(''),
  }),

  'gallery-03': ({ w = 1200, h = 1200 } = {}) => doc({
    id: 'g3', w, h,
    sky: [mix(C.sand, C.paper, 0.45), mix(C.sand, C.terracotta, 0.22), mix(C.terracotta, C.sand, 0.35)],
    sun: sunDisc(w * 0.5, h * 0.40, h * 0.13, C.paper, 0.55),
    body: [
      ridge({ w, h, y: h * 0.50, amp: h * 0.035, seed: 221, fill: mix(C.terracotta, C.sand, 0.55), opacity: 0.85 }),
      ridge({ w, h, y: h * 0.60, amp: h * 0.03, seed: 225, fill: mix(C.terracotta, C.navy, 0.35) }),
      ridge({ w, h, y: h * 0.72, amp: h * 0.028, seed: 231, fill: mix(C.terracotta, C.navy, 0.55) }),
      ridge({ w, h, y: h * 0.85, amp: h * 0.022, seed: 235, fill: mix(C.navy, C.terracotta, 0.22) }),
    ].join(''),
  }),

  'gallery-04': ({ w = 1200, h = 1200 } = {}) => doc({
    id: 'g4', w, h,
    sky: [mix(C.mist, C.paper, 0.4), mix(C.sand, C.mist, 0.45), mix(C.sand, C.paper, 0.5)],
    body: [
      cone({ w, h, cx: w * 0.44, baseY: h * 0.50, height: h * 0.26, halfWidth: w * 0.30, fill: mix(C.mist, C.navy, 0.30) }),
      ridge({ w, h, y: h * 0.49, amp: h * 0.03, seed: 261, fill: mix(C.mist, C.navy, 0.20) }),
      fields({ w, h, top: h * 0.52, rows: 6, cols: 4, colorA: mix(C.forest, C.sand, 0.30), colorB: mix(C.terracotta, C.sand, 0.5), seed: 13 }),
    ].join(''),
  }),

  'gallery-05': ({ w = 1200, h = 1200 } = {}) => doc({
    id: 'g5', w, h,
    sky: [mix(C.mist, C.paper, 0.55), mix(C.ocean, C.mist, 0.45), mix(C.navy, C.ocean, 0.5)],
    body: [
      ridge({ w, h, y: h * 0.30, amp: h * 0.05, seed: 241, fill: mix(C.forest, C.mist, 0.5) }),
      ridge({ w, h, y: h * 0.44, amp: h * 0.04, seed: 251, fill: mix(C.forest, C.navy, 0.35) }),
      `<path d="M0,${h * 0.70} Q${w * 0.5},${h * 0.62} ${w},${h * 0.72} L${w},${h} L0,${h} Z" fill="${mix(C.ocean, C.navy, 0.45)}"/>`,
      `<path d="M0,${h * 0.78} Q${w * 0.45},${h * 0.72} ${w},${h * 0.80}" fill="none" stroke="${C.paper}" stroke-width="3" opacity="0.22"/>`,
    ].join(''),
  }),
};

/* ---- Write --------------------------------------------------------------- */

fs.mkdirSync(OUT, { recursive: true });
let total = 0;
for (const [name, build] of Object.entries(SCENES)) {
  const svg = build();
  const file = path.join(OUT, `${name}.svg`);
  fs.writeFileSync(file, svg);
  total += svg.length;
  console.log(`${name}.svg`.padEnd(20), (svg.length / 1024).toFixed(1) + ' KB');
}
console.log(`\n${Object.keys(SCENES).length} files, ${(total / 1024).toFixed(1)} KB total`);
