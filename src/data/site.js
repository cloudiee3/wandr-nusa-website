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

  phone: '+62 823 4081 9128',
  phoneHref: 'tel:+6282340819128',
  whatsapp: '6282340819128', // digits only, country code first
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
    { label: 'WhatsApp', href: 'https://wa.me/6282340819128' },
    { label: 'TripAdvisor', href: 'https://tripadvisor.com/' },
  ],
}

// Hero copy — edit here rather than in the component.
export const hero = {
  badge: 'Top Destination',
  // The last word is picked out in the accent colour.
  headline: ['Discover New Places,', 'Create Lasting'],
  headlineAccent: 'Memories',
  subhead:
    'Handpicked stays, seamless booking, and local experiences, everything you need to plan your next adventure with confidence.',
}

// Where a road or boat transfer can start or finish. Both the pick-up and
// drop-off selects use this list; "Somewhere else" is appended last.
export const transferGroups = [
  {
    group: 'Airports',
    options: [
      'Lombok International Airport (LOP)',
      'Bali \u2014 Ngurah Rai (DPS)',
    ],
  },
  {
    group: 'Harbours & Jetties',
    options: [
      'Bangsal Harbour',
      'Lembar Harbour',
      'Gili Islands Jetty',
      'Padangbai, Bali',
    ],
  },
  {
    group: 'Towns & Hotel Areas',
    options: [
      'Senggigi',
      'Mataram',
      'Kuta Lombok',
      'Tetebatu',
      'Senaru',
      'Gili Trawangan',
      'Gili Air',
      'Gili Meno',
    ],
  },
  {
    group: 'Rinjani Trailheads',
    options: [
      'Rinjani \u2014 Sembalun Gate',
      'Rinjani \u2014 Senaru Gate',
    ],
  },
]

export const OTHER_PLACE = 'Somewhere else'

// Where we can book a room, across the same three regions the journeys cover.
// Ordered within each group by where travellers actually base themselves.
export const stayGroups = [
  {
    group: 'Lombok',
    options: ['Senggigi', 'Kuta Lombok', 'Mataram', 'Tetebatu', 'Senaru'],
  },
  {
    group: 'Gili Islands',
    options: ['Gili Trawangan', 'Gili Air', 'Gili Meno'],
  },
  {
    group: 'Sumbawa',
    options: ['Sumbawa Besar', 'Moyo Island', 'Lakey Peak, Hu\u2019u', 'Bima'],
  },
  {
    group: 'Nusa Tenggara Timur',
    options: ['Labuan Bajo', 'Moni, Flores', 'Ende, Flores', 'Waingapu, Sumba', 'Tambolaka, Sumba', 'Nemberala, Rote'],
  },
]

// Order and labels follow the reference: Home, About, Discover, Escapes,
// Contact. The routes are unchanged, so existing links still resolve.
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Discover', to: '/journeys' },
  { label: 'Escapes', to: '/destinations' },
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
