# wandrnusa — landing page

Single-page site for **Wandr Nusa**, a private tour brand in Lombok / Nusa Tenggara.

Plain HTML, CSS and ES modules. No build step, no framework, no dependencies —
open the folder on any static host and it runs. The content lives in small data
files so adding a destination never means touching layout code.

---

## Before you publish

| # | What | Where |
|---|------|-------|
| 1 | **A photo of Sembalun.** Its card shows a "photo coming soon" panel until you add one. | upload to [`photos/`](photos/README.md) |
| 2 | **Your own photos of Central Lombok and Senaru.** Both currently use licensed stand-ins that are not the actual places. | same |
| 3 | **Guest reviews.** The reviews block is empty and hidden. Add real ones and it appears. | `js/data/content.js` → `TESTIMONIALS` |

Nothing here blocks the site from going live — each one just makes it more
honestly yours. The WhatsApp number is already set to +62 823-4081-9128 in
`js/config.js`.

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
   - `id` — unique, lowercase, no spaces (used for the anchor link)
   - `order` — position in the grid
   - every text field is bilingual: `{ en: '...', id: '...' }`
   - `included` is the "What's included" list — **never put a price in it**
3. Upload a photo to `photos/`, add it to `tools/process-photos.mjs`, run
   `npm run photos`, then point `photo` at the processed file.

That's all. The tour card, the booking form's destination dropdown and the
card's WhatsApp message are all generated from this file.

Leave `photo: null` until you have a real picture of that place. The card shows
a plain branded panel instead, which is honest — borrowing a photo of somewhere
else is not.

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
  img/                      processed photographs, written by npm run photos
photos/                     source photographs — upload here (see its README)
tools/
  process-photos.mjs        crops and compresses photos into assets/img/
  build-preview.mjs         bundles the whole site into one .html file
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
