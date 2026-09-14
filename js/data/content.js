/* ==========================================================================
   wandrnusa — page content (about, pillars, by request, photos, reviews)
   All text is bilingual: { en, id }.
   ========================================================================== */

export const ABOUT = {
  /* The pull quote. Leads on the place, not on us. */
  statement: {
    en: 'Everything on Lombok runs downhill from Rinjani. The rain the mountain catches comes back as the rivers, the waterfalls and the rice terraces — and the day you spend here depends entirely on where on that slope you stand.',
    id: 'Semua yang ada di Lombok mengalir turun dari Rinjani. Hujan yang ditangkap gunung ini kembali menjadi sungai, air terjun, dan sawah terasering — dan hari yang Anda habiskan di sini tergantung di bagian lereng mana Anda berdiri.',
  },
  body: {
    en: [
      'The island changes as you cross it. Dry and wide open in the south, green and steep in the north, cool enough to want a jacket in the high valleys on the east side. You can be in all three before dinner.',
      'Being looked after here is not a service standard, it is just how people are. You will be offered coffee you did not ask for, and it would be rude to refuse it.',
      'Our guides are from these villages rather than sent to them, which is the difference between being shown a place and being taken through it.',
    ],
    id: [
      'Pulau ini berubah saat Anda menyeberanginya. Kering dan terbuka di selatan, hijau dan curam di utara, cukup dingin untuk pakai jaket di lembah-lembah tinggi sisi timur. Ketiganya bisa Anda lewati sebelum makan malam.',
      'Diurus dengan baik di sini bukan standar pelayanan, memang begitu orangnya. Anda akan disuguhi kopi tanpa memintanya, dan menolaknya itu tidak sopan.',
      'Pemandu kami orang desa itu sendiri, bukan orang yang dikirim ke sana — itu bedanya antara ditunjukkan sebuah tempat dan benar-benar dibawa masuk ke dalamnya.',
    ],
  },
};

/* Two about the place, two about us — in that order, deliberately. */
export const PILLARS = [
  {
    id: 'the-mountain',
    title: { en: 'The mountain', id: 'Gunungnya' },
    body: {
      en: 'Rinjani decides the weather, the water and the soil. Stand anywhere on Lombok and you are somewhere on its slope, whether you can see it that morning or not.',
      id: 'Rinjani yang menentukan cuaca, air, dan tanahnya. Berdiri di mana pun di Lombok, Anda sedang berada di lerengnya — terlihat atau tidak pagi itu.',
    },
  },
  {
    id: 'the-water',
    title: { en: 'The water', id: 'Airnya' },
    body: {
      en: 'What falls on the mountain comes back as rivers and waterfalls. In the north it drops in one long clean line. In the middle it comes through the plants on the cliff like a curtain.',
      id: 'Yang turun di gunung kembali jadi sungai dan air terjun. Di utara jatuh lurus dalam satu garis panjang. Di tengah menembus tanaman di tebing seperti kelambu.',
    },
  },
  {
    id: 'our-hospitality',
    title: { en: 'Our hospitality', id: 'Keramahan kami' },
    body: {
      en: 'Cold water in the car, a driver who knows the road in the rain, and someone answering you before, during and after. You should never have to chase us.',
      id: 'Air dingin di mobil, sopir yang hafal jalan termasuk saat hujan, dan orang yang membalas sebelum, selama, dan sesudah. Anda tidak perlu mengejar-ngejar kami.',
    },
  },
  {
    id: 'our-people',
    title: { en: 'Our people', id: 'Orang-orang kami' },
    body: {
      en: 'Guides who grew up on these roads. They know which warung is worth stopping at and which waterfall is better after rain, which is not the sort of thing a map tells you.',
      id: 'Pemandu yang besar di jalan-jalan ini. Mereka tahu warung mana yang layak disinggahi dan air terjun mana yang lebih bagus setelah hujan — hal yang tidak ada di peta.',
    },
  },
];

export const REQUEST = {
  points: [
    { en: 'A route through Lombok that is not on the list above', id: 'Rute di Lombok yang belum ada di daftar di atas' },
    { en: 'Several days strung together, with somewhere to sleep sorted', id: 'Beberapa hari sekaligus, termasuk tempat menginapnya' },
    { en: 'Something built for photography, a gentler pace, or travelling with children', id: 'Disusun untuk fotografi, ritme lebih santai, atau bepergian dengan anak' },
    { en: 'Airport or harbour transfers at either end', id: 'Antar-jemput bandara atau pelabuhan di awal dan akhir' },
    { en: 'Somewhere else across the Nusa Islands — ask, and we will tell you honestly what we can run', id: 'Tempat lain di Kepulauan Nusa — tanya saja, kami jujur soal yang bisa kami jalankan' },
  ],
};

/* --------------------------------------------------------------------------
   PHOTOS
   Only real pictures of real escapes belong here. The grid hides itself until
   there are at least three — a two-photo gallery looks like a mistake, and
   filling the gaps with pictures of somewhere else would be worse.

   To add one: put the file in photos/, add it to the manifest in
   tools/process-photos.mjs, run `npm run photos`, then add an entry here.
   -------------------------------------------------------------------------- */
export const GALLERY = [
  {
    id: 'durian-indah',
    ratio: '4x5',
    src: 'assets/img/gallery/durian-indah.jpg',
    alt: {
      en: 'Durian Indah waterfall dropping through mossy rock and green leaves',
      id: 'Air terjun Durian Indah jatuh di antara batu berlumut dan dedaunan hijau',
    },
  },
];

/* --------------------------------------------------------------------------
   GUEST REVIEWS
   Empty on purpose. The section stays hidden until there is something real to
   put in it.

   Add them like this, using the guest's own words and with their permission:

     { id: 'r1',
       quote: { en: '…', id: '…' },
       name: 'Sofia',
       meta: { en: 'Sembalun, March 2026', id: 'Sembalun, Maret 2026' } },
   -------------------------------------------------------------------------- */
export const TESTIMONIALS = [];
