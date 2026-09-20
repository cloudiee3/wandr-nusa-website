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
    journey: 'tetebatu-highlands',
  },
  {
    id: 'early-rinjani',
    kicker: 'Early bird trek',
    amount: '15%',
    headline: 'Off Rinjani departures booked 90 days ahead',
    body: 'Permits for the summit route are capped. Book early, pay less, and pick your date rather than take one.',
    valid: 'For departures Apr – Nov',
    image: 'rinjani-crater',
    journey: 'rinjani-summit-trek',
  },
]
