// Trip catalogue. `image` / `gallery` values are slugs from src/data/images.json.

export const journeys = [
  {
    slug: 'rinjani-trek',
    rating: 4.9,
    reviews: 206,
    priceNote: 'including park permits, guide, porters and all meals',
    title: 'Mount Rinjani',
    kicker: 'Signature trek',
    region: 'Sembalun, East Lombok',
    duration: '2 or 3 days',
    group: 'Max 8 trekkers',
    difficulty: 'Challenging',
    season: 'April – November',
    pricing: {
      unit: 'per person',
      from: 2750000,
      note: 'Private departure, two days to the crater rim or three to the summit. The exact figure depends on the route, the size of your group and where we collect you — ask and we will quote it.',
    },
    image: 'rinjani-caldera',
    gallery: ['rinjani-sunrise', 'rinjani-lake-view', 'rinjani-barujari'],
    tags: ['Mountain & Hills', 'Nature'],
    summary:
      'One mountain, two ways up it. Both climb the Sembalun savannah to the crater rim for sunrise over Segara Anak; the longer one carries on to the 3,726 m summit and down to the lake itself. Tell us which and we will run it privately.',
    highlights: [
      'Sunrise over Segara Anak and the Barujari cone from the rim',
      'A night camped at 2,639 m on the crater edge',
      'On the longer route, the summit ridge with Bali’s Agung on the horizon',
      'On the longer route, the hot springs below the lake',
      'Porters carry camp, food and water — you carry a daypack',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Sembalun to the rim', body: 'Shared by both routes. Morning pick-up and permits at the Sembalun gate, then a long open climb across the savannah and the steep pull up to the rim camp at 2,639 m. Camp set and dinner cooked while the caldera goes dark below you.' },
      { day: 'Day 2 · two-day route', title: 'Sunrise, then down', body: 'Up for first light over the lake and the cone. Breakfast at camp, then back down the way you came, off the mountain around the middle of the day and on to your hotel or the airport.' },
      { day: 'Day 2 · three-day route', title: 'Summit, then the lake', body: 'A pre-dawn start for the scree push to the 3,726 m summit for sunrise. Back to camp for breakfast, then the long descent to Segara Anak — swim, fish, and sit in the hot springs.' },
      { day: 'Day 3 · three-day route', title: 'Senaru rim and out', body: 'Climb to the Senaru rim through cloud forest and descend to the village. Lunch, a shower, and the transfer back.' },
    ],
    includes: ['National park permits', 'Certified guide and porters', 'Tent, sleeping mat and sleeping bag', 'All meals and drinking water on the mountain', 'Hotel or airport transfers'],
    excludes: ['Personal trekking gear and boots', 'Travel insurance', 'Tips for the crew', 'Weekend permit surcharge'],
  },
  {
    slug: 'sembalun-hills',
    rating: 4.8,
    reviews: 74,
    priceNote: 'including transport in Sembalun, guide, trail fees and breakfast',
    title: 'Sembalun Hills Hike',
    kicker: 'Day hike',
    region: 'Sembalun, East Lombok',
    duration: 'Half or full day',
    group: 'Max 10 walkers',
    difficulty: 'Easy to moderate',
    season: 'Year round',
    pricing: {
      unit: 'per person',
      from: 650000,
      note: 'Private departure. The exact figure depends on the hill, the size of your group and where we collect you — ask and we will quote it.',
    },
    image: 'sembalun-valley',
    gallery: ['sembalun-ridge', 'sembalun-fields', 'sembalun-sign'],
    tags: ['Mountain & Hills', 'Nature', 'Day Trips'],
    summary:
      'Sembalun sits in a ring of hills, and the right one depends on the morning. Some are an hour of easy climbing to a ridge above the fields; others are three hours and a proper summit. Tell us how far you want to walk and we will pick the hill — Rinjani is the backdrop from all of them.',
    highlights: [
      'Sunrise over the valley from a ridge, with Rinjani opposite',
      'A route matched to your legs rather than a fixed itinerary',
      'The patchwork of onion, garlic and rice fields on the way down',
      'Breakfast cooked on the hill',
    ],
    itinerary: [
      { day: 'Before we go', title: 'Pick the hill', body: 'We ask how far you want to walk and how early you want to start, then choose from the ridges around the valley. An easy one is about an hour up; the longer ones run to three, and a couple can be camped on overnight if you would rather wake up there.' },
      { day: 'Pre-dawn', title: 'Into the dark', body: 'Pick-up in Sembalun and a short drive to whichever trailhead we have settled on. Head-torches for the climb, with the valley lights below you the whole way.' },
      { day: 'Sunrise', title: 'The ridge', body: 'First light from the ridge, Rinjani opposite and the valley opening underneath. Breakfast cooked up top, and time to walk the ridgeline before turning back.' },
      { day: 'Morning', title: 'Down through the fields', body: 'Back down among the terraces and market gardens, and into Sembalun by late morning. Add a valley viewpoint or a coffee stop on the way out if you have the time.' },
    ],
    includes: ['Local guide', 'Village and trail fees', 'Breakfast and drinking water', 'Head-torch if you need one', 'Transfers within Sembalun'],
    excludes: ['Transfers from outside East Lombok', 'Walking shoes', 'Travel insurance', 'Tips for the guide'],
  },
    {
    slug: 'pink-beach-southeast-gilis',
    rating: 4.8,
    reviews: 131,
    priceNote: 'including private boat, guide, snorkelling gear and all tickets',
    title: 'Pink Beach and the Southeast Gilis',
    kicker: 'Boat day',
    region: 'Jerowaru, East Lombok',
    duration: 'Full day',
    group: 'Max 10 guests',
    difficulty: 'Easy',
    season: 'Year round',
    pricing: {
      unit: 'per person',
      from: 1000000,
      note: 'Covers the boat, the captain, the guide and every ticket. The exact figure depends on the size of your group and where we collect you — ask and we will quote it.',
    },
    image: 'pink-beach-wide',
    gallery: ['pink-beach-boat', 'pink-beach-bay', 'pink-beach-outrigger'],
    tags: ['Beaches', 'Diving & Snorkeling', 'Day Trips', 'Nature'],
    summary:
      'The sand really is pink — red coral ground fine and mixed through the white. A private boat out of Tanjung Luar takes in all three pink beaches, a sandbar that only exists at low tide, and the reef under the three rocks of Gili Petelu.',
    highlights: [
      'Sand the colour of watermelon, at three separate beaches',
      'Gili Pasir, a sandbar that surfaces and vanishes with the tide',
      'Snorkelling under the three rocks of Gili Petelu',
      'A boat and captain to yourselves, not a shared departure',
      'Photographs of the day, taken as you go',
    ],
    itinerary: [
      { day: 'Stop 1', title: 'Tanjung Luar', body: 'The working harbour in the southeast, and where the boat waits. The fish market here is the largest on Lombok — worth ten minutes if you have the stomach for it.' },
      { day: 'Stop 2', title: 'Pink Beach', body: 'The main beach, and the one people come for. Best early, before the light goes flat and the day boats arrive.' },
      { day: 'Stop 3', title: 'Gili Pasir', body: 'A bar of sand with nothing on it, which appears as the tide drops and is gone again by afternoon. Timing is the whole trick.' },
      { day: 'Stop 4', title: 'Gili Petelu', body: 'Three rocks standing out of the water with the reef sheltering behind them. The snorkelling stop, and the best of the water on this coast.' },
      { day: 'Stop 5', title: 'The quieter pink beaches', body: 'Two more stretches of pink sand along the same coast, reachable only by boat and usually empty. We finish here.' },
    ],
    includes: ['Private boat and captain', 'Local guide', 'Snorkelling equipment', 'Entrance ticket at every stop', 'Drinking water', 'Photographs of the day'],
    excludes: ['Lunch', 'Transport to Tanjung Luar', 'Tips for the guide and crew'],
  },
  {
    slug: 'gili-kondo-islands',
    rating: 4.9,
    reviews: 88,
    priceNote: 'including boat, guide, snorkelling gear, lunch and all tickets',
    title: 'Gili Kondo, Bidara and Petagan',
    kicker: 'Boat day',
    region: 'Sambelia, East Lombok',
    duration: 'Full day',
    group: 'Max 10 guests',
    difficulty: 'Easy',
    season: 'Year round',
    pricing: {
      unit: 'per person',
      from: 1300000,
      note: 'Covers the boat, the guide, lunch and every ticket. The exact figure depends on the size of your group and where we collect you — ask and we will quote it.',
    },
    image: 'gili-kondo-island',
    gallery: ['gili-kondo-sandbar', 'gili-kondo-snorkel', 'gili-kondo-spit', 'gili-kondo-boats'],
    tags: ["Gili's", 'Beaches', 'Diving & Snorkeling', 'Day Trips', 'Nature'],
    summary:
      'Three uninhabited islands off the northeast coast, an hour past where most people stop. White sand and shallow coral at Kondo and Bidara, then mangrove channels at Petagan you can swim through when the tide is low enough.',
    highlights: [
      'Coral close enough to the surface that beginners can see all of it',
      'Mangrove tunnels at Gili Petagan, swimmable at low tide',
      'White sand with nobody on it — none of the three is inhabited',
      'Rinjani behind you the whole way out',
      'Lunch on the sand',
    ],
    itinerary: [
      { day: 'Stop 1', title: 'Labuan Pandan', body: 'The harbour on the northeast coast where the boat leaves from. A stop on the way for the old lian trees if the timing works.' },
      { day: 'Stop 2', title: 'Gili Kondo', body: 'The largest of the three and the one with the beach. White sand, shallow water, and Rinjani across the strait behind it.' },
      { day: 'Stop 3', title: 'Gili Bidara', body: 'The snorkelling stop. Coral sits close to the surface here, which makes it the easiest water on this coast to read — good if it is your first time with a mask.' },
      { day: 'Stop 4', title: 'Gili Petagan', body: 'Mangrove rather than beach: channels cut through the roots, taken slowly by boat, and swimmable when the tide drops far enough. Different from anything else on the day.' },
    ],
    includes: ['Boat and captain', 'Local guide', 'Snorkelling equipment', 'Lunch', 'Entrance ticket at every stop', 'Drinking water', 'Photographs of the day'],
    excludes: ['Transport to Labuan Pandan', 'Tips for the guide and crew'],
  },
{
    slug: 'tetebatu-village-life',
    rating: 4.8,
    reviews: 96,
    priceNote: 'including entrance tickets, guide and a driver within Tetebatu',
    title: 'Tetebatu Village Life',
    kicker: 'Day trip',
    region: 'Tetebatu, East Lombok',
    duration: 'Half or full day',
    group: 'Max 10 guests',
    difficulty: 'Easy',
    season: 'Year round',
    pricing: {
      unit: 'per person',
      from: 400000,
      note: 'Covers the day itself — tickets, guide and a driver within Tetebatu. Transport from elsewhere on the island is quoted separately; tell us where you are staying.',
    },
    image: 'tetebatu-walk',
    gallery: ['tetebatu-field', 'monkey-forest', 'tetebatu-plant'],
    tags: ['Culture & Villages', 'Nature', 'Day Trips'],
    summary:
      'A day on the green shoulder of Rinjani, at walking pace. Black monkeys in the forest, terraces worked by hand, a waterfall to stand under, and the two crafts the village still lives on — bamboo and the backstrap loom.',
    highlights: [
      'Ebony langurs in the monkey forest above the village',
      'Rice terraces walked with someone who farms them',
      'A waterfall in the forest, with time to swim',
      'Cloves, vanilla and coffee drying in the yards',
      'Bamboo craft and hand weaving, watched from the workshop floor',
    ],
    itinerary: [
      { day: 'Stop 1', title: 'Monkey forest', body: 'The forest above the village, where black langurs come down through the canopy. Early is better — they are active and the light is still coming through the trees.' },
      { day: 'Stop 2', title: 'Rice terraces', body: 'Out on the paths between the paddies with a guide who works them, through whichever stage the season is at: flooded and mirrored, green, or gold and being cut.' },
      { day: 'Stop 3', title: 'Waterfall', body: 'Down through the trees to one of the falls on the Rinjani side. Bring something to swim in.' },
      { day: 'Stop 4', title: 'Spice gardens', body: 'Cloves, vanilla, coffee and cacao growing and drying around the houses — close enough to crush a leaf and smell it.' },
      { day: 'Stop 5', title: 'Bamboo and weaving', body: 'The two crafts the village still lives on: bamboo worked by hand, and songket woven on a backstrap loom. Try either if you want to.' },
      { day: 'Half day', title: 'A shorter version', body: 'Four or five hours covers the monkey forest, the terraces and one more stop. Tell us which of the five matter most and we will build the morning around them.' },
    ],
    includes: ['Entrance ticket at every stop', 'Local guide', 'Private driver within Tetebatu', 'Drinking water'],
    excludes: ['Meals', 'Transport to and from Tetebatu', 'Tips for the guide and driver'],
  },
    {
    slug: 'benang-waterfalls',
    rating: 4.8,
    reviews: 112,
    priceNote: 'including transport, entrance tickets, guide and water',
    title: 'Benang Stokel and Benang Kelambu',
    kicker: 'Day trip',
    region: 'Aik Berik, Central Lombok',
    duration: 'Full day',
    group: 'Max 10 guests',
    difficulty: 'Easy to moderate',
    season: 'Year round',
    pricing: {
      unit: 'per person',
      from: 700000,
      note: 'Covers the driving, the tickets and a guide for the walk. The exact figure depends on the size of your group and where we collect you — ask and we will quote it.',
    },
    image: 'benang-kelambu',
    gallery: ['benang-kelambu-curtain', 'benang-stokel'],
    tags: ['Waterfalls', 'Nature', 'Day Trips'],
    summary:
      'Two waterfalls on the southern slope of Rinjani that could not be less alike. Benang Stokel drops in one hard column; twenty-five minutes further up, Benang Kelambu comes through the vegetation in dozens of separate threads — kelambu is the Sasak word for a mosquito net, and that is exactly what it looks like.',
    highlights: [
      'Benang Kelambu falling in threads through the greenery, straight into a pool you can stand in',
      'Benang Stokel, a single hard column ten minutes from the gate',
      'The walk between them, uphill through forest inside the Rinjani Geopark',
      'Macaques along the road in from the valley',
      'Photographs of the day, taken as you go',
    ],
    itinerary: [
      { day: 'Stop 1', title: 'Benang Stokel', body: 'Ten minutes on foot from the gate. A single column dropping into a pool with room to swim, and the easier of the two to reach.' },
      { day: 'Stop 2', title: 'Benang Kelambu', body: 'Twenty-five minutes further uphill through the forest. The water arrives through the vegetation rather than over a lip, which is what gives it the curtain. You can stand underneath it.' },
      { day: 'Stop 3', title: 'The monkey forest', body: 'Macaques live along the road through the valley and are used to people. Worth stopping for, and worth not feeding.' },
      { day: 'Stop 4', title: 'The viewpoints', body: 'A few places on the way back where the valley opens up and the rice terraces step down towards Praya. Good light in the late afternoon.' },
    ],
    includes: ['Air-conditioned transport', 'Entrance tickets at the gate', 'Local guide for the walk', 'Drinking water', 'Photographs of the day'],
    excludes: ['Meals', 'Tips for the guide and driver'],
  },
{
    slug: 'north-lombok-waterfalls',
    rating: 4.9,
    reviews: 212,
    priceNote: 'including transport, guide, entry fees and lunch',
    title: 'Sendang Gile and Tiu Kelep',
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
    priceNote: 'including boat transfers, guesthouse and instructor',
    title: 'Gili Reefs: Snorkel, Freedive, Turtles',
    kicker: 'Ocean',
    region: 'Gili Trawangan · Meno · Air',
    duration: '2 days · 1 night',
    group: 'Max 8 guests',
    difficulty: 'Easy',
    season: 'Year round',
    priceFrom: 2400000,
    image: 'freediving',
    gallery: ['coastline-aerial'],
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
    priceNote: 'including transport, guide, craft materials and lunch',
    title: 'Sasak Weaving, Pottery and Village Life',
    kicker: 'Day trip',
    region: 'Sade · Sukarara · Penujak',
    duration: 'Full day',
    group: 'Max 12 guests',
    difficulty: 'Easy',
    season: 'Year round',
    priceFrom: 680000,
    image: 'sasak-house',
    gallery: ['rice-field-huts'],
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
    gallery: ['volcanic-plain', 'rinjani-rim'],
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
 * The figure a card leads with. What a trip actually costs depends on the
 * route, the group and where we collect people, and that conversation happens
 * privately — so only the starting point is published, and only the starting
 * point is in this file.
 */
export const fromPrice = (j) => j.pricing?.from ?? j.priceFrom

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
