// Trip catalogue. `image` / `gallery` values are slugs from src/data/images.json.

export const journeys = [
  {
    slug: 'rinjani-summit-trek',
    rating: 4.9,
    reviews: 148,
    priceNote: 'including park permits, guide, porters & all meals',
    title: 'Rinjani Summit & Crater Lake',
    kicker: 'Signature trek',
    region: 'Mount Rinjani, Lombok',
    duration: '3 days · 2 nights',
    group: 'Max 8 trekkers',
    difficulty: 'Demanding',
    season: 'April – November',
    priceFrom: 4650000,
    image: 'segara-anak',
    gallery: ['rinjani-crater', 'volcanic-plain', 'segara-anak'],
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
    slug: 'nusa-penida-island-hop',
    rating: 4.7,
    reviews: 184,
    priceNote: 'including fast boat, private 4WD & lunch',
    title: 'Nusa Penida: Kelingking & the West Coast',
    kicker: 'Island hopping',
    region: 'Nusa Penida',
    duration: 'Full day',
    group: 'Max 12 guests',
    difficulty: 'Easy',
    season: 'Year round',
    priceFrom: 1250000,
    image: 'kelingking-beach',
    gallery: ['coastline-aerial', 'kelingking-beach', 'freediving'],
    tags: ['Beaches', 'Nature', 'Day Trips'],
    summary:
      'Fast boat across the Badung Strait, then a 4WD along the west coast to Kelingking, Broken Beach and Angel’s Billabong — timed to reach the cliffs before the afternoon crowds.',
    highlights: [
      'The Kelingking headland from the upper viewpoint',
      'Angel’s Billabong tidal pool and Broken Beach arch',
      'Snorkel stop at Crystal Bay',
      'Early departure to beat the tour buses',
    ],
    itinerary: [
      { day: 'Morning', title: 'Crossing', body: 'Fast boat from Sanur, met on the pier by your driver and guide.' },
      { day: 'Midday', title: 'The west coast', body: 'Kelingking viewpoint, Broken Beach, Angel’s Billabong, with lunch overlooking the strait.' },
      { day: 'Afternoon', title: 'Crystal Bay', body: 'Snorkel or swim before the return boat.' },
    ],
    includes: ['Return fast-boat tickets', 'Private 4WD and driver', 'Guide', 'Lunch', 'Snorkel gear'],
    excludes: ['Hotel transfer to Sanur pier', 'Drinks'],
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
    gallery: ['coastline-aerial', 'freediving', 'kelingking-beach'],
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
    region: 'Anywhere in Nusa Tenggara & Bali',
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
