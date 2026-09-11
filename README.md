# wandrnusa — landing page

Single-page site for **Wandr Nusa**, a private tour brand in Lombok / Nusa Tenggara.

Plain HTML, CSS and ES modules. No build step, no framework, no dependencies —
open the folder on any static host and it runs. The content lives in small data
files so adding a destination never means touching layout code.

---

## Before you publish — three things

| # | What | Where |
|---|------|-------|
| 1 | **Real WhatsApp number.** Every CTA on the page points at it. | `js/config.js` → `WHATSAPP_NUMBER` and `WHATSAPP_DISPLAY` |
| 2 | **Real guest reviews.** The site ships with clearly-marked samples, not real quotes. | `js/data/content.js` → `TESTIMONIALS` |
| 3 | **Real photographs.** Until they exist, every image falls back to a brand-coloured illustration. | `assets/img/` — see [`assets/img/README.md`](assets/img/README.md) |

Items 1 and 2 print a warning in the browser console while they are still
placeholders, so you can tell at a glance whether the site is launch-ready.

---

## Run it locally

The site uses ES modules, which browsers refuse to load over `file://`. Serve
the folder instead — any of these work:

```bash
npx serve .          # or
npx http-server -p 8080
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy

Upload the whole folder. There is nothing to compile.

- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, or connect the
  repo. No build command, publish directory `/`.
- **GitHub Pages** — Settings → Pages → deploy from branch, root.
- **Any shared hosting** — upload by FTP into `public_html`.

---

## Adding a destination

This is the job the site is built around. It is one file.

1. Open `js/data/tours.js`.
2. Copy an existing entry, paste it into the array, and edit it:
   - `id` — unique, lowercase, no spaces (used for the anchor link and image name)
   - `order` — position in the grid
   - every text field is bilingual: `{ en: '...', id: '...' }`
   - `included` is the "What's included" list — **never put a price in it**
3. Add a photo at `assets/img/tours/<id>.jpg` and point `image` at it. If that
   file does not exist yet, the card falls back to `placeholder` on its own.

That's all. The tour card, the booking form's destination dropdown and the
card's WhatsApp message are all generated from this file.

To generate a matching placeholder illustration for a new destination, add a
scene to `tools/make-placeholders.mjs` and run `node tools/make-placeholders.mjs`.

---

## Project layout

```
index.html                  page structure and mount points
css/
  tokens.css                brand colours, type scale, spacing — start here
  base.css                  reset, typography, shared primitives
  components.css            buttons, cards, forms, gallery, quotes
  sections.css              per-section layout, header, footer, responsive
js/
  config.js                 WhatsApp number, contact details, socials, pickup areas
  i18n.js                   EN/ID dictionary and language switching
  main.js                   entry point — renders everything, re-renders on language change
  data/
    tours.js                the tour catalogue          ← add destinations here
    content.js              about, pillars, gallery, testimonials
  lib/
    dom.js                  small DOM helpers, image fallback, scroll reveal
    whatsapp.js             every wa.me link is built here
    icons.js                inline SVG icons
  components/
    header.js               nav, mobile menu, scroll state
    tours.js                tour card markup
    sections.js             pillars, gallery, quotes, footer lists
    contactForm.js          booking form + WhatsApp hand-off
assets/
  brand/                    original logo files as supplied
  logo/                     web-optimised logo variants
  img/                      photographs go here (see its README)
tools/
  make-placeholders.mjs     regenerates the fallback illustrations
```

---

## Brand rules baked into the CSS

- **Colours.** Deep Navy `#0B2E4A` for structure, Sea Mist `#D8E5E2` as the soft
  base, paper `#FFFDF8` for light backgrounds. Each section picks exactly **one**
  accent — Ocean Blue `#4F9CC2`, Forest Green `#5B7D69` or Terracotta Clay
  `#B86E52` — set as `--accent` on the section. Soft Sand `#E7D7C1` is a surface
  only, never headline text.
- **Type.** DM Serif Display for headlines, DM Sans for everything else.
- **No prices.** Not on cards, not in the schema markup, nowhere. Price is a
  WhatsApp conversation.
- **Every trip is a private trip**, and the cards say so.

## Language

English is the default; Indonesian is one click away in the header and is
remembered per visitor. Static copy is keyed by `data-i18n` in `index.html` and
translated in `js/i18n.js`. Content copy is bilingual inside the data files.
Both dictionaries must hold the same keys.

## Browser support

Any current browser. The layout uses CSS grid, `clamp()`, `color-mix()` and
`aspect-ratio`; the scripts use ES modules and `IntersectionObserver`. Motion is
disabled automatically for visitors who ask for reduced motion.
