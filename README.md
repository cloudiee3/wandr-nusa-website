# Wandr Nusa Travel — website

Marketing site for Wandr Nusa Travel: Lombok, Mount Rinjani, Nusa Penida and the Gilis.
React + Vite + Tailwind, deployed as a static site.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built site locally
```

## The files you'll actually edit

| What you want to change | File |
|---|---|
| Phone, WhatsApp, email, address, opening hours, socials | `src/data/site.js` |
| Trips: titles, prices, itineraries, what's included | `src/data/journeys.js` |
| Destinations: descriptions, best season, which trips belong to each | `src/data/destinations.js` |
| Testimonials, homepage section copy | `src/pages/Home.jsx` |
| Colours, fonts, spacing | `tailwind.config.js` and `src/index.css` |

**Before launch**, replace the placeholders in `src/data/site.js` — the phone number,
WhatsApp number and email are all dummies. The WhatsApp number is digits only with the
country code first, no `+` and no spaces: `628123456789`.

## Photos

Originals live in `source-assets/photos/`. They are never served directly — they're far
too big. `npm run assets` reads them, writes responsive WebP versions into `public/img/`
at 480/800/1280/1920px, and regenerates `src/data/images.json` with each photo's aspect
ratio, alt text and a blurred placeholder.

To add a photo:

1. Drop the file into `source-assets/photos/`.
2. Add an entry to `PHOTO_MAP` in `scripts/build-assets.mjs` — a short slug, the filename,
   and a sentence of alt text.
3. `npm run assets`
4. Reference it anywhere by slug: `<Img name="your-slug" />`

The same script regenerates the logo files and favicons from `source-assets/brand/`.

## Fonts

Poppins, Inter, Cormorant Garamond and JetBrains Mono are **self-hosted** in
`public/fonts/` — the site makes no request to Google. `npm run fonts` re-downloads them
if the font stack in `scripts/fetch-fonts.mjs` changes.

## The enquiry form

`src/components/EnquiryForm.jsx` is a three-step form that posts to **Netlify Forms**.
It works with no backend: Netlify detects the hidden `<form name="enquiry">` in
`index.html` at build time, and submissions appear under *Forms* in the Netlify dashboard.
Set up an email notification there so enquiries reach an inbox.

Every step also offers "WhatsApp instead", which opens WhatsApp with the traveller's
answers already written into the message.

In local development there is no form handler, so submitting shows the success state
without sending anything.

## Deploying

`netlify.toml` is already configured — build `npm run build`, publish `dist`, with a
catch-all redirect so deep links like `/journeys/rinjani-summit-trek` work on refresh.

Connect the repository in Netlify and it will deploy on every push. Any other static host
works too, as long as it rewrites unknown paths to `index.html`.

## Structure

```
src/
  components/    Navbar, Footer, Img, EnquiryForm, JourneyCard, …
  pages/         Home, Destinations, Journeys, About, Contact, Legal, NotFound
  data/          site.js, journeys.js, destinations.js, images.json
scripts/
  build-assets.mjs   photos + logos -> public/
  fetch-fonts.mjs    self-hosted webfonts
```
