# Photographs

Nothing in here is a real photo yet. Every `<img>` on the site points at the
filenames below and quietly falls back to a brand-coloured illustration from
`placeholders/` when the file is missing — so the site never shows a broken
image, and dropping a real photo in needs no code change at all.

**Drop a file in with the exact name below and it appears. That is the whole
process.**

## What goes where

| File | Ratio | Suggested size | Used for |
|------|-------|----------------|----------|
| `hero/hero.jpg` | 16:9 | 2400 × 1350 | the full-screen hero |
| `about.jpg` | 4:5 | 1000 × 1250 | portrait beside the About text |
| `tours/tetebatu.jpg` | 3:2 | 1600 × 1067 | Tetebatu card |
| `tours/lombok-tengah.jpg` | 3:2 | 1600 × 1067 | Benang Kelambu / Stokel card |
| `tours/senaru.jpg` | 3:2 | 1600 × 1067 | Senaru card |
| `tours/sembalun.jpg` | 3:2 | 1600 × 1067 | Sembalun card |
| `tours/request.jpg` | 4:3 | 1600 × 1200 | Tour by request section |
| `gallery/01.jpg` | 3:2 | 1600 × 1067 | gallery, wide |
| `gallery/02.jpg` | 4:5 | 1200 × 1500 | gallery, tall |
| `gallery/03.jpg` … `05.jpg` | 1:1 | 1200 × 1200 | gallery, square |
| `og-image.jpg` | 1.91:1 | 1200 × 630 | link preview on WhatsApp and social |

A new destination follows the same pattern: `tours/<tour id>.jpg`, matching the
`id` you gave it in `js/data/tours.js`.

## Keep them light

Aim for **under 300 KB each** (hero under 500 KB). Nothing here is compressed
for you — a 6 MB photo straight off the camera will make the page slow on a
phone on mobile data, which is how most guests will see it.

Export as JPEG at quality ~75, or WebP if you prefer (change the extension in
the data file to match).

## Art direction

Natural and documentary. No heavy filters, no text baked into the image, no
hard vignettes. Photographs of the actual places, the actual guides, and the
actual guests — that is the entire point of the brand.

## Placeholders

`placeholders/` holds generated SVG illustrations in the brand palette. They are
fallbacks, not artwork to keep. Regenerate or extend them with:

```bash
node tools/make-placeholders.mjs
```
