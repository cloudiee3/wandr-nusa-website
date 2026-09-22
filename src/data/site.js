// ─────────────────────────────────────────────────────────────
//  Everything you'll want to edit first lives in this file.
//  Swap the placeholders below for the real Wandr Nusa details.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Wandr Nusa',
  legalName: 'Wandr Nusa Travel',
  tagline: 'Travel',
  blurb:
    'Small-group and private journeys through Lombok, Mount Rinjani, Nusa Penida and the Gilis — planned and guided by people who live there.',

  // TODO: replace with the real numbers before launch.
  phone: '+62 812 0000 0000',
  phoneHref: 'tel:+628120000000',
  whatsapp: '628120000000', // digits only, country code first
  email: 'hello@wandrnusa.com',

  address: {
    line1: 'Jl. Raya Senggigi',
    city: 'Senggigi, Lombok',
    region: 'West Nusa Tenggara',
    country: 'Indonesia',
  },

  hours: [
    ['Mon – Fri', '08:00 – 19:00 WITA'],
    ['Saturday', '08:00 – 16:00 WITA'],
    ['Sunday', 'Messages answered'],
  ],

  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'WhatsApp', href: 'https://wa.me/628120000000' },
    { label: 'TripAdvisor', href: 'https://tripadvisor.com/' },
  ],
}

// Hero copy — edit here rather than in the component.
export const hero = {
  badge: 'Top Destination',
  headline: ['Discover New Places,', 'Create Lasting Memories'],
  subhead:
    'Handpicked stays, seamless booking, and local experiences, everything you need to plan your next adventure with confidence.',
}

// Where a transfer can start or finish.
export const pickupPoints = [
  'Lombok Intl Airport (LOP)',
  'Bali — Ngurah Rai (DPS)',
  'Bangsal Harbour',
  'Senggigi hotels',
  'Kuta Lombok hotels',
  'Gili Islands jetty',
  'Somewhere else',
]

// Areas we can book a room in.
export const stayAreas = [
  'Senggigi',
  'Kuta Lombok',
  'Tetebatu',
  'Senaru',
  'Gili Air',
  'Gili Trawangan',
  'Gili Meno',
]

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Journeys', to: '/journeys' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/** Builds a wa.me link with a message already typed for the traveller. */
export function whatsappLink(message) {
  const text = encodeURIComponent(
    message || `Hi ${site.name}! I'd like to ask about a trip.`,
  )
  return `https://wa.me/${site.whatsapp}?text=${text}`
}

export const trustSignals = [
  {
    title: 'Licensed Indonesian operator',
    body: 'Registered travel bureau (BPW) with full public-liability cover on every departure.',
  },
  {
    title: 'Certified mountain guides',
    body: 'Rinjani treks run with permitted, wilderness-first-aid trained guides and porters.',
  },
  {
    title: 'Fair-wage local crew',
    body: 'Guides, drivers and porters are hired directly and paid above the regional standard.',
  },
]

export const stats = [
  { value: 1400, suffix: '+', label: 'Travellers guided' },
  { value: 63, suffix: '+', label: 'Itineraries designed' },
  { value: 6, suffix: '', label: 'Islands covered' },
  { value: 98, suffix: '%', label: 'Would travel again' },
  { value: 12, suffix: '+', label: 'Years on these islands' },
]
