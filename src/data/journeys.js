// Trip catalogue. `image` / `gallery` values are slugs from src/data/images.json.

export const journeys = [
  {
    slug: 'rinjani-summit-trek',
    rating: 4.9,
    reviews: 148,
    priceNote: 'including park permits, guide, porters & all meals',
    title: 'Rinjani Summit & Crater Lake',
    kicker: 'Signature trek',
    region: 'Mount Rinjani, East Lombok',
    duration: '3 days · 2 nights',
    group: 'Max 8 trekkers',
    difficulty: 'Demanding',
    season: 'April – November',
    pricing: {
      unit: 'per person',
      tiers: [
        { from: 2, to: 2, price: 4650000 },
        { from: 3, to: 4, price: 4150000 },
        { from: 5, to: 6, price: 3750000 },
      ],
      note: 'Private departure. The per-person price falls as the group grows.',
    },
    image: 'rinjani-sunrise',
    gallery: ['rinjani-peak', 'rinjani-lake-view', 'segara-anak'],
    tags: ['Mountain & Hills', 'Nature'],
    summary:
      'Three days on Indonesia’s second-highest volcano — up through the pine ridge to Plawangan, a pre-dawn push to the 3,726 m rim, then down to camp beside the hot springs of Segara Anak.',
    highlights: [
      'Sunrise from the summit ridge, with Bali’s Agung on the horizon',
      'Two nights camped on the crater rim and lakeshore',
      'Soak in the Aik Kalak hot springs below Segara Anak',
      'Porters carry camp, food and water — you carry a daypack',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Sembalun to Plawangan II', body: 'Pick-up from your hotel, permits at the Sembalun gate, then a long open climb across the savannah to the rim camp at 2,639 m. Dinner cooked at camp as the light goes.' },
      { day: 'Day 2', title: 'Summit, then down to the lake', body: 'A 2am start for the scree push to the summit for sunrise. Back to camp for breakfast, then the descent to Segara Anak — swim, fish, and sit in the hot springs.' },
      { day: 'Day 3', title: 'Senaru rim and out', body: 'Climb to the Senaru rim through cloud forest and descend to the village. Lunch, shower, and transfer back to your hotel or the airport.' },
    ],
    includes: ['National park permits', 'Certified guide + porters', 'All camping equipment', 'All meals and drinking water on the mountain', 'Hotel transfers'],
    excludes: ['Personal trekking gear', 'Travel insurance', 'Tips for the crew'],
  },
  {
    slug: 'rinjani-crater-rim',
    rating: 4.9,
    reviews: 206,
    priceNote: 'including permits, guide, porters & all meals',
    title: 'Rinjani Crater Rim from Sembalun',
    kicker: 'Most booked trek',
    region: 'Sembalun, East Lombok',
    duration: '2 days · 1 night',
    group: 'Max 8 trekkers',
    difficulty: 'Challenging',
    season: 'April – November',
    pricing: {
      unit: 'per person',
      tiers: [
        { from: 2, to: 2, price: 3450000 },
        { from: 3, to: 4, price: 3050000 },
        { from: 5, to: 6, price: 2750000 },
      ],
      note: 'Private departure. The per-person price falls as the group grows.',
    },
    image: 'rinjani-barujari',
    gallery: ['rinjani-lake-view', 'rinjani-crater', 'rinjani-sunrise'],
    tags: ['Mountain & Hills', 'Nature'],
    summary:
      'The view people come to Rinjani for, without the 2am summit push. Up through the Sembalun savannah to the rim at Plawangan, a night on the crater edge, and the lake and its cone laid out below at first light.',
    highlights: [
      'Segara Anak and the Barujari cone from the rim at sunrise',
      'A night camped at 2,639 m on the crater edge',
      'The long open savannah climb, with Rinjani ahead the whole way',
      'Porters carry camp, food and water — you carry a daypack',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Sembalun to the rim', body: 'Morning pick-up and permits at the Sembalun gate. A long open climb across the savannah, then the steep pull up to the rim camp at 2,639 m. Camp is set and dinner cooked while the caldera goes dark below you.' },
      { day: 'Day 2', title: 'Sunrise, then down', body: 'Up for first light over the lake and the cone. Breakfast at camp, then back down the way you came, off the mountain around the middle of the day and on to your hotel or the airport.' },
    ],
    includes: ['National park permits', 'Certified guide and porters', 'Tent, sleeping mat and sleeping bag', 'All meals and drinking water on the mountain', 'Hotel or airport transfers'],
    excludes: ['Personal trekking gear and boots', 'Travel insurance', 'Tips for the crew', 'Weekend permit surcharge'],
  },
  {
    slug: 'pergasingan-sunrise',
    rating: 4.8,
    reviews: 74,
    priceNote: 'including transport, guide, permits & breakfast on the hill',
    title: 'Pergasingan Hill Sunrise',
    kicker: 'Day hike',
    region: 'Sembalun, East Lombok',
    duration: 'Full day',
    group: 'Max 10 walkers',
    difficulty: 'Moderate',
    season: 'Year round',
    pricing: {
      unit: 'per person',
      tiers: [
        { from: 2, to: 2, price: 950000 },
        { from: 3, to: 4, price: 750000 },
        { from: 5, to: 6, price: 650000 },
      ],
      note: 'Private departure. The per-person price falls as the group grows.',
    },
    image: 'rinjani-peak',
    gallery: ['volcanic-plain', 'rice-terraces', 'rinjani-sunrise'],
    tags: ['Mountain & Hills', 'Nature', 'Day Trips'],
    summary:
      'The whole Sembalun valley from 1,670 m, with Rinjani filling the sky behind it. Three hours up in the dark, sunrise on the ridge, and down past the rice terraces before the heat arrives. The way to see Rinjani without committing to it.',
    highlights: [
      'Sunrise over the Sembalun valley from the ridge',
      'Rinjani from base to summit, close enough to trace the trekking route',
      'The patchwork terraces below Bukit Selong on the way down',
      'Breakfast cooked on the hill',
    ],
    itinerary: [
      { day: 'Pre-dawn', title: 'Into the dark', body: 'Pick-up in Sembalun and a short drive to the trailhead. Head-torches on for the climb — steep in places, about three hours at an unhurried pace, with the valley lights below you the whole way.' },
      { day: 'Sunrise', title: 'The ridge', body: 'First light from the ridge, with Rinjani opposite and the valley opening underneath. Breakfast cooked up top, and time to walk the ridgeline before turning back.' },
      { day: 'Morning', title: 'Down through the terraces', body: 'The descent takes around two and a half hours and comes out among the terraces. Back in Sembalun by late morning, with the option to add Bukit Selong on the way out.' },
    ],
    includes: ['Local guide', 'Village and trail fees', 'Breakfast and drinking water', 'Head-torch if you need one', 'Transfers within Sembalun'],
    excludes: ['Transfers from outside East Lombok', 'Walking shoes', 'Travel insurance', 'Tips for the guide'],
  },
  {
    slug: 'tetebatu-highlands',
    rating: 4.8,
    reviews: 96,
    priceNote: 'including homestay, all meals & village fees',
    title: 'Tetebatu Rice Terraces & Sasak Villages',
    kicker: 'Slow travel',
    region: 'Central Lombok',
    duration: '2 days · 1 night',
    group: 'Max 10 guests',
    difficulty: 'Easy',
    season: 'Year round',
    priceFrom: 1850000,
    image: 'tetebatu-field',
    gallery: ['rice-terraces', 'monkey-forest', 'sasak-house'],
    tags: ['Mountain & Hills', 'Nature', 'Culture & Villages'],
    summary:
      'The green shoulder of Rinjani, at walking pace. Terraced paddies, a black-monkey forest, a tobacco-drying village, and a night in a homestay where dinner is cooked over wood.',
    highlights: [
      'Morning walk through working rice terraces with a farmer',
      'Ebony langurs in the Taman Wisata monkey forest',
      'Weaving and pottery in a Sasak village compound',
      'Homestay dinner — ayam taliwang and plecing kangkung',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Into the highlands', body: 'Drive up through Kotaraja, stop at the market, then a slow afternoon loop through the paddies. Sunset over the terraces with Rinjani behind them.' },
      { day: 'Day 2', title: 'Forest and craft', body: 'Early walk to the monkey forest and Ulem-Ulem waterfall, then a weaving compound in Pringgasela before the drive back to the coast.' },
    ],
    includes: ['Private driver and guide', 'One night homestay', 'All meals', 'Village and forest entrance fees'],
    excludes: ['Drinks beyond meals', 'Personal shopping'],
  },
  {
    slug: 'north-lombok-waterfalls',
    rating: 4.9,
    reviews: 212,
    priceNote: 'including transport, guide, entry fees & lunch',
    title: 'Sendang Gile & Tiu Kelep Waterfalls',
    kicker: 'Day trip',
    region: 'Senaru, North Lombok',
    duration: 'Full day',
    group: 'Max 12 guests',
    difficulty: 'Moderate',
    season: 'Year round',
    priceFrom: 750000,
    image: 'sendang-gile',
    gallery: ['tiu-kelep', 'jungle-waterfall', 'durian-indah'],
    tags: ['Waterfalls', 'Nature', 'Day Trips'],
    summary:
      'Two of the best waterfalls in Indonesia, twenty minutes apart. A stone staircase to Sendang Gile, then a river crossing and jungle path to the wide amphitheatre of Tiu Kelep.',
    highlights: [
      'Swim in the plunge pool beneath Tiu Kelep',
      'Rainforest walk along the old irrigation tunnel',
      'Lunch in Senaru village looking up at the Rinjani rim',
      'Optional stop at Durian Indah on the drive home',
    ],
    itinerary: [
      { day: 'Morning', title: 'Coast to Senaru', body: 'Hotel pick-up and the coast road north past Malimbu, then up to the Senaru trailhead.' },
      { day: 'Midday', title: 'Both falls', body: 'Sendang Gile first, then the river crossing to Tiu Kelep. Time to swim at each.' },
      { day: 'Afternoon', title: 'Village lunch and return', body: 'Sasak lunch in Senaru before the drive back — usually back at your hotel by 17:00.' },
    ],
    includes: ['Air-conditioned transport', 'Local guide', 'Entrance fees', 'Lunch and water'],
    excludes: ['Towel', 'Tips'],
  },
  {
    slug: 'gili-reef-freedive',
    rating: 4.8,
    reviews: 73,
    priceNote: 'including boat transfers, guesthouse & instructor',
    title: 'Gili Reefs: Snorkel, Freedive, Turtles',
    kicker: 'Ocean',
    region: 'Gili Trawangan · Meno · Air',
    duration: '2 days · 1 night',
    group: 'Max 8 guests',
    difficulty: 'Easy',
    season: 'Year round',
    priceFrom: 2400000,
    image: 'freediving',
    gallery: ['coastline-aerial', 'freediving', 'jungle-waterfall'],
    tags: ["Gili's", 'Diving & Snorkeling', 'Beaches'],
    summary:
      'Three car-free islands and the reef between them. A guided snorkel circuit, an intro freedive session with a certified instructor, and a night on Gili Air where the only traffic is bicycles.',
    highlights: [
      'Green turtles on the Meno reef shelf',
      'Intro freediving — breath-hold technique and a guided line dive',
      'Sunset from the west side of Gili Air',
      'Boat circuit between all three islands',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Crossing and reef circuit', body: 'Boat from Bangsal, drop bags, then the three-island snorkel circuit including the turtle shelf off Meno.' },
      { day: 'Day 2', title: 'Freedive session', body: 'Morning theory and pool-calm bay session with an instructor, then a guided line dive before the afternoon boat back.' },
    ],
    includes: ['Return boat transfers', 'One night beachfront guesthouse', 'Snorkel circuit with guide', 'Intro freedive session', 'Breakfast'],
    excludes: ['Lunch and dinner', 'Certification course fees'],
  },
  {
    slug: 'sasak-culture-day',
    rating: 5.0,
    reviews: 61,
    priceNote: 'including transport, guide, craft materials & lunch',
    title: 'Sasak Weaving, Pottery & Village Life',
    kicker: 'Day trip',
    region: 'Sade · Sukarara · Penujak',
    duration: 'Full day',
    group: 'Max 12 guests',
    difficulty: 'Easy',
    season: 'Year round',
    priceFrom: 680000,
    image: 'sasak-house',
    gallery: ['rice-field-huts', 'sasak-house', 'rice-road-aerial'],
    tags: ['Culture & Villages', 'Day Trips'],
    summary:
      'A day with the Sasak — the people of Lombok. Thatch-and-clay houses at Sade, backstrap looms at Sukarara, and the coil-built pottery of Penujak, with time to try each craft yourself.',
    highlights: [
      'Sade village — lumbung rice barns and swept-clay floors',
      'Try a backstrap loom with a Sukarara weaver',
      'Throw and burnish a pot at Penujak',
      'Lunch in a family compound',
    ],
    itinerary: [
      { day: 'Morning', title: 'Sade', body: 'Walk the village with a resident guide — construction, layout and the customary law that still governs it.' },
      { day: 'Midday', title: 'Sukarara', body: 'Songket weaving, and an hour at the loom if you want it. Lunch nearby.' },
      { day: 'Afternoon', title: 'Penujak', body: 'Pottery workshop, then back to the coast.' },
    ],
    includes: ['Transport and driver', 'Sasak-speaking guide', 'All village fees', 'Craft materials', 'Lunch'],
    excludes: ['Textiles or pottery you buy', 'Tips'],
  },
  {
    slug: 'custom-private-journey',
    rating: 5.0,
    reviews: 39,
    priceNote: 'quoted per itinerary, itemised in full',
    title: 'A Journey Built Around You',
    kicker: 'Bespoke',
    region: 'Anywhere in Nusa Tenggara',
    duration: 'From 4 days',
    group: 'Private — any size',
    difficulty: 'Your pace',
    season: 'Year round',
    priceFrom: null,
    image: 'rice-road-aerial',
    gallery: ['tetebatu-plant', 'volcanic-plain', 'coastline-aerial'],
    tags: ['Private & Custom Trips', 'Sailing'],
    summary:
      'Tell us how long you have, what you like, and how hard you want to walk. We’ll come back with a routed itinerary, honest costs, and the same guides we use on our own departures.',
    highlights: [
      'One planner from first message to last transfer',
      'Honest, itemised pricing — no hidden commissions',
      'Families, photographers, honeymoons, small groups',
      'Flights, hotels and permits handled for you',
    ],
    itinerary: [
      { day: 'Step 1', title: 'Tell us the shape of it', body: 'Dates, how many of you, what you want out of it. A message is enough to start.' },
      { day: 'Step 2', title: 'We draft a route', body: 'Within two working days you get a day-by-day plan with costs broken out, plus two alternatives.' },
      { day: 'Step 3', title: 'We refine, then run it', body: 'Revise as many times as you like. Once it’s right we book everything and guide it ourselves.' },
    ],
    includes: ['Dedicated trip planner', 'Unlimited itinerary revisions', 'All bookings and permits', 'On-trip support line'],
    excludes: ['International flights', 'Visa fees'],
  },
]

export const categories = [
  'All',
  'Mountain & Hills',
  'Waterfalls',
  'Beaches',
  'Nature',
  "Gili's",
  'Diving & Snorkeling',
  'Sailing',
  'Culture & Villages',
  'Day Trips',
  'Private & Custom Trips',
]

/** "4.65m" / "750k" — the figure only, for cards that render the currency separately. */
export function priceFigure(value) {
  if (!value) return null
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'm'
  return (value / 1000).toFixed(0) + 'k'
}

/**
 * The lowest per-person price across a trip's group tiers â the figure a card
 * shows. Derived rather than stored, so a headline price cannot drift away
 * from the table it is meant to summarise.
 */
export const fromPrice = (j) =>
  j.pricing ? Math.min(...j.pricing.tiers.map((t) => t.price)) : j.priceFrom

/** "2", "3 â 4", "5 â 6" â how a tier is labelled in the price table. */
export const tierLabel = (t) =>
  t.from === t.to ? `${t.from}` : `${t.from} – ${t.to}`

export const bySlug = (slug) => journeys.find((j) => j.slug === slug)

/** 4 650 000 -> "IDR 4.65m" — compact enough for a card. */
export function formatPrice(value) {
  if (!value) return 'On request'
  if (value >= 1_000_000) {
    const m = (value / 1_000_000).toFixed(2).replace(/\.?0+$/, '')
    return `IDR ${m}m`
  }
  return `IDR ${(value / 1000).toFixed(0)}k`
}
