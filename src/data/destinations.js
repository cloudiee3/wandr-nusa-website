export const destinations = [
  {
    slug: 'mount-rinjani',
    name: 'Mount Rinjani',
    island: 'Lombok',
    image: 'rinjani-crater',
    gallery: ['segara-anak', 'volcanic-plain', 'rinjani-crater'],
    elevation: '3,726 m',
    bestTime: 'Apr – Nov',
    blurb: 'A live volcano with a lake in its chest. The hardest and the best thing you can do on Lombok.',
    body:
      'Rinjani is the second-highest volcano in Indonesia and the centre of Sasak spiritual life. The caldera holds Segara Anak — a crescent lake with hot springs at its edge and a young cone, Barujari, still growing in the middle. The summit push is genuinely hard: loose scree, altitude, and a 2am start. What you get for it is a sunrise over three islands.',
    journeys: ['rinjani-summit-trek'],
  },
  {
    slug: 'tetebatu',
    name: 'Tetebatu Highlands',
    island: 'Lombok',
    image: 'tetebatu-field',
    gallery: ['rice-terraces', 'tetebatu-plant', 'monkey-forest'],
    elevation: '600 m',
    bestTime: 'Year round',
    blurb: 'Rice terraces on the southern shoulder of Rinjani, and the quietest nights on the island.',
    body:
      'Tetebatu sits high enough that the air cools after dark and low enough that everything grows. The paddies are worked by hand in terraces that step down the hillside, broken up by stands of ebony and a forest full of black langurs. It is the part of Lombok people mean when they say it feels like Bali did forty years ago.',
    journeys: ['tetebatu-highlands', 'sasak-culture-day'],
  },
  {
    slug: 'nusa-penida',
    name: 'Nusa Penida',
    island: 'Nusa Islands',
    image: 'kelingking-beach',
    gallery: ['kelingking-beach', 'coastline-aerial', 'freediving'],
    elevation: 'Sea level – 524 m',
    bestTime: 'Year round',
    blurb: 'Limestone cliffs dropping straight into water the colour of a swimming pool.',
    body:
      'The west coast of Penida is the one you have seen — Kelingking’s headland, the arch at Broken Beach, the tidal pool at Angel’s Billabong. The island rewards an early start more than almost anywhere in Indonesia: reach the cliffs by 09:00 and you get them close to empty. Manta Point on the south coast runs year round.',
    journeys: ['nusa-penida-island-hop'],
  },
  {
    slug: 'gili-islands',
    name: 'The Gili Islands',
    island: 'Gilis',
    image: 'coastline-aerial',
    gallery: ['freediving', 'coastline-aerial', 'kelingking-beach'],
    elevation: 'Sea level',
    bestTime: 'Year round',
    blurb: 'Three car-free islands off the north-west coast. Bicycles, reef, and nothing with an engine.',
    body:
      'Trawangan is the loud one, Air the liveable one, Meno the quiet one — and the reef between them is better than any of their reputations suggest. Green turtles feed on the shelf off Meno most mornings. There are no cars or motorbikes on any of the three; you walk, cycle, or take a cidomo pony cart.',
    journeys: ['gili-reef-freedive'],
  },
  {
    slug: 'north-lombok',
    name: 'North Lombok',
    island: 'Lombok',
    image: 'sendang-gile',
    gallery: ['tiu-kelep', 'jungle-waterfall', 'durian-indah'],
    elevation: '600 m',
    bestTime: 'Year round',
    blurb: 'Rainforest on the north flank of Rinjani, and the two waterfalls at the end of it.',
    body:
      'Senaru is the trailhead village for the northern Rinjani route, but most people come for Sendang Gile and Tiu Kelep. The first is a short walk down a stone staircase. The second takes a river crossing and a path through the forest, and opens into a wide rock amphitheatre where the water comes down on every side.',
    journeys: ['north-lombok-waterfalls'],
  },
  {
    slug: 'south-coast',
    name: 'The South Coast',
    island: 'Lombok',
    image: 'rice-field-huts',
    gallery: ['sasak-house', 'rice-road-aerial', 'rice-field-huts'],
    elevation: 'Sea level',
    bestTime: 'May – Sep',
    blurb: 'Wide empty bays, surf breaks, and the Sasak villages inland from them.',
    body:
      'The south is drier and more open than the rest of the island — headland after headland of pale sand with very little built on it. Inland are the craft villages: weaving at Sukarara, pottery at Penujak, and the preserved compound at Sade where the houses are still built of bamboo, thatch and clay.',
    journeys: ['sasak-culture-day'],
  },
]

export const destBySlug = (slug) => destinations.find((d) => d.slug === slug)
