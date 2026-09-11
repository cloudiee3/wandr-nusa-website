/* ==========================================================================
   wandrnusa — editorial content (about, pillars, gallery, testimonials)
   All text is bilingual: { en, id }.
   ========================================================================== */

export const ABOUT = {
  statement: {
    en: 'Wandr Nusa is a Nusa Tenggara travel brand. We show visitors the islands through people, places, and routes we genuinely know.',
    id: 'Wandr Nusa adalah brand travel Nusa Tenggara. Kami memperkenalkan pulau-pulau ini lewat orang, tempat, dan rute yang benar-benar kami kenal.',
  },
  body: {
    en: [
      'We started in Tetebatu, a village on the southern slope of Rinjani, and that is still where most of our days begin. From there we run private one-day trips out to Central Lombok, Senaru and Sembalun.',
      'Every trip is private. No group of strangers, no fixed departure, no coach. One car, your own guide, and a day that moves at the speed you actually want.',
      'We are warm and well prepared, but never over-polished or overly formal.',
    ],
    id: [
      'Kami mulai dari Tetebatu, desa di lereng selatan Rinjani, dan sampai sekarang hampir semua hari kami mulai dari sana. Dari situ kami menjalankan private one-day trip ke Lombok Tengah, Senaru, dan Sembalun.',
      'Semua trip bersifat privat. Tidak digabung dengan rombongan lain, tidak ada jadwal keberangkatan tetap, tidak pakai bus besar. Satu mobil, pemandu Anda sendiri, dan hari yang berjalan sesuai ritme Anda.',
      'Kami hangat dan siap, tapi tidak dibuat-buat dan tidak kaku.',
    ],
  },
};

export const PILLARS = [
  {
    id: 'local-first',
    title: { en: 'Local first', id: 'Warga lokal dulu' },
    body: {
      en: 'Our guides are from the villages we take you to. The coffee stop, the farmer in the field, the shortcut past the tobacco barns — it is their neighbourhood, not a script.',
      id: 'Pemandu kami adalah warga desa yang kita datangi. Warung kopinya, petani di ladang, jalan pintas lewat gudang tembakau — itu kampung mereka sendiri, bukan naskah hafalan.',
    },
  },
  {
    id: 'well-looked-after',
    title: { en: 'Well looked after', id: 'Diurus dengan baik' },
    body: {
      en: 'A private car, cold water, a driver who knows the road in the rain, and someone answering on WhatsApp before, during and after your day.',
      id: 'Mobil privat, air dingin, sopir yang hafal jalan termasuk saat hujan, dan seseorang yang membalas WhatsApp sebelum, selama, dan sesudah perjalanan Anda.',
    },
  },
  {
    id: 'worth-the-detour',
    title: { en: 'Worth the detour', id: 'Layak diambil jalan memutar' },
    body: {
      en: 'Sometimes the busy stop is the right one. Sometimes there is something better twenty minutes further on. We will tell you which, and why.',
      id: 'Kadang spot yang ramai memang yang terbaik. Kadang ada yang lebih bagus 20 menit lebih jauh. Kami akan bilang yang mana, dan alasannya.',
    },
  },
  {
    id: 'never-overdone',
    title: { en: 'Never overdone', id: 'Tidak berlebihan' },
    body: {
      en: 'No matching uniforms, no megaphone, no rushing you through five stops before lunch. One day, done properly.',
      id: 'Tanpa seragam serempak, tanpa pengeras suara, tanpa mengejar lima destinasi sebelum makan siang. Satu hari, dikerjakan dengan benar.',
    },
  },
];

export const REQUEST = {
  points: [
    {
      en: 'A route through Lombok that is not on the list above',
      id: 'Rute di Lombok yang belum ada di daftar di atas',
    },
    {
      en: 'Two or three days strung together, with where to sleep sorted',
      id: 'Dua atau tiga hari digabung, termasuk urusan tempat menginap',
    },
    {
      en: 'A day built around photography, a family pace, or older travellers',
      id: 'Satu hari yang disusun untuk fotografi, ritme keluarga, atau tamu lansia',
    },
    {
      en: 'Airport or harbour transfers on either end of your trip',
      id: 'Antar-jemput bandara atau pelabuhan di awal dan akhir perjalanan',
    },
    {
      en: 'Somewhere else in Nusa Tenggara — tell us where and we will be honest about what we can run',
      id: 'Destinasi lain di Nusa Tenggara — sebutkan saja, kami akan jujur soal yang bisa kami jalankan',
    },
  ],
};

/* --------------------------------------------------------------------------
   GALLERY
   Drop photos into assets/img/gallery/ and point `src` at them.
   `span: 'wide'` makes an item 8 columns instead of 4.
   `stretch: true` makes it fill its row's height instead of holding `ratio`,
   which keeps the mosaic free of gaps when ratios differ.
   -------------------------------------------------------------------------- */
export const GALLERY = [
  { id: 'g1', span: 'wide', ratio: '3x2', src: 'assets/img/gallery/01.jpg', placeholder: 'assets/img/placeholders/gallery-01.svg',
    alt: { en: 'Rice terraces below the village at Tetebatu', id: 'Sawah terasering di bawah desa Tetebatu' } },
  { id: 'g2', stretch: true, ratio: '4x5', src: 'assets/img/gallery/02.jpg', placeholder: 'assets/img/placeholders/gallery-02.svg',
    alt: { en: 'Water falling through plants at Benang Kelambu', id: 'Air jatuh menembus tanaman di Benang Kelambu' } },
  { id: 'g3', ratio: '1x1', src: 'assets/img/gallery/03.jpg', placeholder: 'assets/img/placeholders/gallery-03.svg',
    alt: { en: 'Drying tobacco inside a barn near Kotaraja', id: 'Tembakau dijemur di gudang dekat Kotaraja' } },
  { id: 'g4', ratio: '1x1', src: 'assets/img/gallery/04.jpg', placeholder: 'assets/img/placeholders/gallery-04.svg',
    alt: { en: 'The Sembalun valley seen from Bukit Selong', id: 'Lembah Sembalun dari Bukit Selong' } },
  { id: 'g5', ratio: '1x1', src: 'assets/img/gallery/05.jpg', placeholder: 'assets/img/placeholders/gallery-05.svg',
    alt: { en: 'Crossing the river on the way to Tiu Kelep', id: 'Menyeberang sungai menuju Tiu Kelep' } },
];

/* --------------------------------------------------------------------------
   ⚠️  TESTIMONIALS — PLACEHOLDER COPY, REPLACE BEFORE LAUNCH
   These four entries are written as layout samples so the section can be
   designed and reviewed. They are NOT real guest reviews. Replace each one
   with a genuine review (Google, TripAdvisor, WhatsApp, with permission) and
   delete the `sample: true` flag — it prints a console warning while it is
   still there. An empty array hides the whole block.
   -------------------------------------------------------------------------- */
export const TESTIMONIALS = [
  {
    id: 't1',
    sample: true,
    quote: {
      en: 'Sample review — replace with a real one. Two sentences from a guest about a specific moment on the day works better than general praise.',
      id: 'Contoh ulasan — ganti dengan ulasan asli. Dua kalimat tamu tentang momen spesifik lebih bagus daripada pujian umum.',
    },
    name: 'Guest name',
    meta: { en: 'Tetebatu one-day trip', id: 'One-day trip Tetebatu' },
  },
  {
    id: 't2',
    sample: true,
    quote: {
      en: 'Sample review — replace with a real one. Mentioning the guide by name and what they did tends to be the most convincing part.',
      id: 'Contoh ulasan — ganti dengan ulasan asli. Menyebut nama pemandu dan apa yang dia lakukan biasanya paling meyakinkan.',
    },
    name: 'Guest name',
    meta: { en: 'Senaru one-day trip', id: 'One-day trip Senaru' },
  },
  {
    id: 't3',
    sample: true,
    quote: {
      en: 'Sample review — replace with a real one. Keep the guest’s own wording, including the parts that are not perfectly polished.',
      id: 'Contoh ulasan — ganti dengan ulasan asli. Pertahankan bahasa asli tamu, termasuk bagian yang tidak rapi.',
    },
    name: 'Guest name',
    meta: { en: 'Tour by request', id: 'Tour by request' },
  },
];
