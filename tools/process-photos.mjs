/* ==========================================================================
   wandrnusa — photo processor
   --------------------------------------------------------------------------
   Crops, resizes and compresses the source photographs into the exact slots
   that assets/img/README.md defines.

   Run:  node tools/process-photos.mjs <source-dir>

   Adding or swapping a photo is a one-line edit to SLOTS below.
   `focus` is the point the crop is centred on, in 0..1 of the source.
   A centred crop of a tall portrait into 3:2 loses the subject — that is what
   `focus` is for. Tune it by eye against the rendered output.

   Output sizes are set to roughly 2x the width each slot is actually displayed
   at, capped by what the source can supply. Upscaling past the source only
   invents detail and inflates the file, so where a photo is small the slot is
   small — the tool warns whenever a crop comes in under its target.
   ========================================================================== */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = process.argv[2] || path.join(ROOT, 'photos');
const OUT = path.join(ROOT, 'assets', 'img');

const SLOTS = [
  // ---- Tetebatu, our own photographs -----------------------------------
  { out: 'hero/hero.jpg',       w: 1600, h: 900,  max: 500, src: 'Tetebatu Rice Field.jpg',       focus: { x: 0.50, y: 0.54 } },
  { out: 'about.jpg',           w: 640,  h: 800,  max: 300, src: 'Tetebatu Rice Plant.avif',      focus: { x: 0.46, y: 0.52 } },
  { out: 'tours/tetebatu.jpg',  w: 1200, h: 800,  max: 300, src: 'Monkey Forest .avif',           focus: { x: 0.55, y: 0.50 } },
  { out: 'gallery/durian-indah.jpg', w: 800, h: 1000, max: 300, src: 'Durian Indah Waterfall 2.avif', focus: { x: 0.50, y: 0.45 } },
  { out: 'og-image.jpg',        w: 1200, h: 630,  max: 300, src: 'Tetebatu Rice Field.jpg',       focus: { x: 0.50, y: 0.54 } },

  // ---- Stand-ins, licensed for commercial use but not our own pictures.
  //      Replace as soon as you have your own of these two places. -------
  { out: 'tours/lombok-tengah.jpg', w: 1600, h: 1067, max: 300, src: 'pexels-firman-fatthul-154779494-27572318.jpg', focus: { x: 0.50, y: 0.42 }, stock: true },
  { out: 'tours/senaru.jpg',        w: 1600, h: 1067, max: 300, src: 'pexels-vincent-ma-janssen-2823154.jpg',        focus: { x: 0.50, y: 0.50 }, stock: true },
];

const mimeOf = (f) => (f.toLowerCase().endsWith('.avif') ? 'image/avif' : 'image/jpeg');

/* A light, identical grade on every photo. Sources come from different
   cameras and different days, and side by side that reads as inconsistency.
   Deliberately gentle — the art direction rules out heavy filters, so this
   only takes the edge off saturation and lifts contrast a little. */
const GRADE = { saturation: 0.92, contrast: 1.04 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 400, height: 400 } });

let failures = 0;
console.log('slot'.padEnd(26) + 'source → output'.padEnd(30) + 'size');
console.log('-'.repeat(74));

for (const slot of SLOTS) {
  const file = path.join(SRC, slot.src);
  if (!fs.existsSync(file)) { console.error(`MISSING SOURCE  ${slot.src}`); failures++; continue; }

  const b64 = fs.readFileSync(file).toString('base64');
  await page.setContent(
    `<body style="margin:0"><img id="s" src="data:${mimeOf(slot.src)};base64,${b64}"></body>`);
  await page.waitForFunction(() => {
    const i = document.getElementById('s');
    return i && i.complete && i.naturalWidth > 0;
  }, null, { timeout: 20000 });

  // Try progressively lower quality until the file fits its budget.
  let result = null;
  for (const quality of [0.82, 0.74, 0.66, 0.58, 0.50, 0.44]) {
    const dataUrl = await page.evaluate(({ w, h, focus, quality, grade }) => {
      const img = document.getElementById('s');
      const sw = img.naturalWidth, sh = img.naturalHeight;

      // cover-crop: largest source rect matching the target ratio
      const target = w / h;
      let cw = sw, ch = Math.round(sw / target);
      if (ch > sh) { ch = sh; cw = Math.round(sh * target); }

      // place that rect around the focal point, clamped inside the source
      const cx = Math.max(0, Math.min(sw - cw, Math.round(sw * focus.x - cw / 2)));
      const cy = Math.max(0, Math.min(sh - ch, Math.round(sh * focus.y - ch / 2)));

      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.filter = `saturate(${grade.saturation}) contrast(${grade.contrast})`;
      ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
      return { url: c.toDataURL('image/jpeg', quality), sw, sh, cw, ch };
    }, { w: slot.w, h: slot.h, focus: slot.focus, quality, grade: GRADE });

    const buf = Buffer.from(dataUrl.url.split(',')[1], 'base64');
    result = { ...dataUrl, buf, quality };
    if (buf.length / 1024 <= slot.max) break;
  }

  const dest = path.join(OUT, slot.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, result.buf);

  const kb = result.buf.length / 1024;
  const flags = [];
  if (result.cw < slot.w) flags.push(`UPSCALED from ${result.cw}px`);
  if (kb > slot.max) { flags.push(`OVER BUDGET (${slot.max} KB)`); failures++; }
  if (slot.stock) flags.push('stock');

  console.log(
    slot.out.padEnd(26) +
    `${result.sw}x${result.sh} → ${slot.w}x${slot.h}`.padEnd(30) +
    `${kb.toFixed(0)} KB  ${flags.join(' · ')}`
  );
}

await browser.close();
console.log('-'.repeat(74));
console.log(failures ? `${failures} problem(s) — see above` : 'all slots written within budget');
