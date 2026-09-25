// Seasonal offers shown on the homepage. `valid` is display text, not logic —
// update it when an offer changes.
export const deals = [
  {
    id: 'green-season',
    kicker: 'Green season offer',
    amount: '20%',
    headline: 'Off every Lombok journey',
    body: 'Fewer people on the trail, waterfalls at full flow, and the rice terraces at their greenest.',
    valid: 'Valid 01 Feb – 31 Mar',
    image: 'jungle-waterfall',
    journey: 'tetebatu-village-life',
  },
  {
    id: 'early-rinjani',
    kicker: 'Early bird trek',
    amount: '15%',
    headline: 'Off Rinjani departures booked 90 days ahead',
    body: 'Permits for the summit route are capped. Book early, pay less, and pick your date rather than take one.',
    valid: 'For departures Apr – Nov',
    image: 'rinjani-crater',
    journey: 'rinjani-trek',
  },
]

// Full-bleed slider at the foot of the homepage. Short, punchy, one photo each.
export const offerSlides = [
  {
    id: 'green-season',
    kicker: 'Green season',
    headline: 'Lower prices when the islands are at their greenest',
    amount: '20% off',
    image: 'rice-terraces',
    to: '/journeys/tetebatu-village-life',
  },
  {
    id: 'rinjani-early',
    kicker: 'Early bird trek',
    headline: 'Book Rinjani 90 days out and pick your own date',
    amount: '15% off',
    image: 'volcanic-plain',
    to: '/journeys/rinjani-trek',
  },
  {
    id: 'two-island',
    kicker: 'Two-island week',
    headline: 'Pair any Lombok journey with the Gilis and save the transfer',
    amount: 'Free boat transfers',
    image: 'coastline-aerial',
    to: '/journeys/three-gilis',
  },
]
