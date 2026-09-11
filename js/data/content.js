/* ==========================================================================
   wandrnusa — page content (about, pillars, by request, photos, reviews)
   All text is bilingual: { en, id }.
   ========================================================================== */

export const ABOUT = {
  statement: {
    en: 'Wandr Nusa is a travel brand from the Nusa Islands. We make private escapes for people who would rather wander than follow a crowd.',
    id: 'Wandr Nusa adalah brand travel dari Kepulauan Nusa. Kami membuat private escape untuk orang yang lebih suka menjelajah daripada ikut rombongan.',
  },
  body: {
    en: [
      'Wandering is the good part. The driving, the tickets, the where-do-we-eat, the is-this-even-the-right-road — that part is ours.',
      'Nothing here is sold by the seat. You get the car, the guide and the day, and the route is drawn around what you actually want out of it.',
      'We are warm and well prepared, but never over-polished or overly formal.',
    ],
    id: [
      'Bagian menjelajahnya yang seru. Nyetirnya, tiketnya, bingung mau makan di mana, ragu ini jalan yang benar atau bukan — itu bagian kami.',
      'Tidak ada yang dijual per kursi di sini. Mobilnya, pemandunya, harinya milik Anda, dan rutenya digambar sesuai apa yang benar-benar Anda cari.',
      'Kami hangat dan siap, tapi tidak dibuat-buat dan tidak kaku.',
    ],
  },
};

export const PILLARS = [
  {
    id: 'local-first',
    title: { en: 'Local first', id: 'Lokal dulu' },
    body: {
      en: 'Everything we run is built on knowing these islands properly — which is why we can take you past the obvious without guessing.',
      id: 'Semua yang kami jalankan berangkat dari benar-benar mengenal pulau-pulau ini — makanya kami bisa membawa Anda melewati yang biasa tanpa menebak-nebak.',
    },
  },
  {
    id: 'well-looked-after',
    title: { en: 'Well looked after', id: 'Diurus dengan baik' },
    body: {
      en: 'Cold water, a driver who knows the road in the rain, and someone answering you before, during and after. You should never have to chase us.',
      id: 'Air dingin, sopir yang hafal jalan termasuk saat hujan, dan orang yang membalas sebelum, selama, dan sesudah. Anda tidak perlu mengejar-ngejar kami.',
    },
  },
  {
    id: 'worth-the-detour',
    title: { en: 'Worth the detour', id: 'Layak jalan memutar' },
    body: {
      en: 'Some crowded places earn it. Some do not. We will tell you which, then take you to the one worth your afternoon.',
      id: 'Ada tempat ramai yang memang pantas. Ada yang tidak. Kami bilang yang mana, lalu antar ke yang pantas menghabiskan sore Anda.',
    },
  },
  {
    id: 'never-overdone',
    title: { en: 'Never overdone', id: 'Tidak berlebihan' },
    body: {
      en: 'No uniforms, no megaphone, no rushing you through somewhere so we can reach the next one. Fewer stops, properly.',
      id: 'Tanpa seragam, tanpa toa, tanpa buru-buru supaya bisa kejar tujuan berikutnya. Lebih sedikit tempat, tapi benar.',
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
