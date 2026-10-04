export const destinations = [
  {
    slug: 'mount-rinjani',
    name: 'Mount Rinjani',
    island: 'Lombok',
    image: 'rinjani-crater',
    gallery: ['segara-anak', 'rinjani-peak', 'rinjani-rim', 'volcanic-plain'],
    elevation: '3,726 m',
    bestTime: 'Apr – Nov',
    blurb: 'A live volcano with a lake in its chest. The hardest and the best thing you can do on Lombok.',
    body:
      'Rinjani is the second-highest volcano in Indonesia and the centre of Sasak spiritual life. The caldera holds Segara Anak, a crescent lake with hot springs at its edge and a young cone, Barujari, still growing in the middle. The summit push is genuinely hard: loose scree, altitude, and a 2am start. What you get for it is a sunrise over three islands.',
    journeys: ['rinjani-trek', 'tiu-kelep-bukit-selong'],
  },
  {
    slug: 'tetebatu',
    name: 'Tetebatu Highlands',
    island: 'Lombok',
    image: 'rice-terraces',
    gallery: ['monkey-forest', 'tetebatu-plant', 'rice-field-huts'],
    elevation: '600 m',
    bestTime: 'Year round',
    blurb: 'Rice terraces on the southern shoulder of Rinjani, and the quietest nights on the island.',
    body:
      'Tetebatu sits high enough that the air cools after dark and low enough that everything grows. The paddies are worked by hand in terraces that step down the hillside, broken up by stands of ebony and a forest full of black langurs. It is the part of Lombok people mean when they say it feels like Bali did forty years ago.',
    journeys: ['tetebatu-village-life'],
  },
  {
    slug: 'gili-islands',
    name: 'The Gili Islands',
    island: 'Gili Islands',
    image: 'coastline-aerial',
    gallery: ['underwater-statues'],
    elevation: 'Sea level',
    bestTime: 'Year round',
    blurb: 'Three car-free islands off the north-west coast. Bicycles, reef, and nothing with an engine.',
    body:
      'Trawangan is the loud one, Air the liveable one, Meno the quiet one, and the reef between them is better than any of their reputations suggest. Green turtles feed on the shelf off Meno most mornings. There are no cars or motorbikes on any of the three; you walk, cycle, or take a cidomo pony cart.',
    journeys: ['three-gilis'],
  },
  {
    slug: 'north-lombok',
    name: 'North Lombok',
    island: 'Lombok',
    image: 'tiu-kelep',
    gallery: ['jungle-waterfall', 'sendang-gile'],
    elevation: '600 m',
    bestTime: 'Year round',
    blurb: 'Rainforest on the north flank of Rinjani, and the two waterfalls at the end of it.',
    body:
      'Senaru is the trailhead village for the northern Rinjani route, but most people come for Sendang Gile and Tiu Kelep. The first is a short walk down a stone staircase. The second takes a river crossing and a path through the forest, and opens into a wide rock amphitheatre where the water comes down on every side.',
    journeys: ['tiu-kelep-bukit-selong'],
  },
  {
    slug: 'south-coast',
    name: 'The South Coast',
    island: 'Lombok',
    image: 'bukit-merese',
    gallery: ['selong-belanak', 'sasak-house'],
    elevation: 'Sea level',
    bestTime: 'May – Sep',
    blurb: 'Wide empty bays, surf breaks, and the Sasak villages inland from them.',
    body:
      'The south is drier and more open than the rest of the island. Headland after headland of pale sand, with very little built on it. Inland are the craft villages: weaving at Sukarara, pottery at Penujak, and the preserved compound at Sade where the houses are still built of bamboo, thatch and clay.',
    journeys: ['kuta-mandalika'],
  },
]

export const destBySlug = (slug) => destinations.find((d) => d.slug === slug)

// ── Hero search dropdown ────────────────────────────────────
// Lombok is listed place by place, because that is where we run day trips and
// where somebody is choosing between them. Everything further east we sell as
// one package rather than a menu of stops, so it is one line each: naming five
// Sumbawa landmarks implied five separate trips that do not exist.
//
// An option carries `dest` (a destination page), `trip` (a journey we already
// run, which is how the packages work) or neither, which means we have no
// fixed departure there and the journeys page offers to plan one.
export const searchGroups = [
  {
    region: 'Lombok',
    options: [
      { label: 'Mount Rinjani', dest: 'mount-rinjani' },
      { label: 'Gili Trawangan, Meno & Air', dest: 'gili-islands' },
      { label: 'Kuta & Mandalika', dest: 'south-coast' },
      { label: 'Senggigi' },
      { label: 'Tetebatu', dest: 'tetebatu' },
      { label: 'Sendang Gile & Tiu Kelep', dest: 'north-lombok' },
      // Sade used to sit here as its own line, pointing at the same south-coast
      // page as Kuta & Mandalika. The Kuta day already stops there, so it was
      // two labels for one trip.
      { label: 'Explore Lombok', trip: 'explore-lombok' },
    ],
  },
  {
    region: 'Further east',
    options: [
      { label: 'Sumbawa', trip: 'explore-sumbawa' },
      { label: 'Nusa Tenggara Timur' },
    ],
  },
]

/** Stable option values: a destination slug, "trip:<slug>", or "place:<label>". */
export const optionValue = (o) =>
  o.dest ? o.dest : o.trip ? `trip:${o.trip}` : `place:${o.label}`
