/* ==========================================================================
   wandrnusa — page content (about, pillars, request, gallery, guest reviews)
   All text is bilingual: { en, id }.
   ========================================================================== */

export const ABOUT = {
  statement: {
    en: 'Wandr Nusa is a Nusa Tenggara travel brand. We show visitors the islands through people, places, and routes we genuinely know.',
    id: 'Wandr Nusa adalah brand travel Nusa Tenggara. Kami mengajak tamu mengenal pulau-pulau ini lewat orang, tempat, dan rute yang benar-benar kami kenal.',
  },
  body: {
    en: [
      'We started in Tetebatu, a village on the south side of Rinjani. Most of our trips still leave from there.',
      'Every trip is private. One car, one guide, your group only. No fixed departure time and nobody else in the van.',
      'We are warm and well prepared, but never over-polished or overly formal.',
    ],
    id: [
      'Kami mulai dari Tetebatu, desa di sisi selatan Rinjani. Sampai sekarang sebagian besar trip kami berangkat dari sana.',
      'Semua trip privat. Satu mobil, satu pemandu, hanya rombongan Anda. Tidak ada jadwal tetap dan tidak digabung orang lain.',
      'Kami hangat dan siap, tapi tidak dibuat-buat dan tidak kaku.',
    ],
  },
};

export const PILLARS = [
  {
    id: 'local-first',
    title: { en: 'Local first', id: 'Warga lokal dulu' },
    body: {
      en: 'Your guide grew up in the village you are visiting. They know the farmers, the shortcuts, and which warung makes good coffee.',
      id: 'Pemandu Anda besar di desa yang Anda kunjungi. Dia kenal petaninya, jalan pintasnya, dan warung mana yang kopinya enak.',
    },
  },
  {
    id: 'well-looked-after',
    title: { en: 'Well looked after', id: 'Diurus dengan baik' },
    body: {
      en: 'Private car, cold water, a driver who knows the road in the rain. We answer WhatsApp before, during and after your trip.',
      id: 'Mobil privat, air dingin, sopir yang hafal jalan termasuk saat hujan. WhatsApp kami balas sebelum, selama, dan sesudah trip.',
    },
  },
  {
    id: 'worth-the-detour',
    title: { en: 'Worth the detour', id: 'Layak jalan memutar' },
    body: {
      en: 'Some busy stops are busy for a reason. Some are not. We will tell you which, and take you to the better one.',
      id: 'Ada spot ramai yang memang bagus. Ada yang tidak. Kami bilang yang mana, lalu antar ke yang lebih baik.',
    },
  },
  {
    id: 'never-overdone',
    title: { en: 'Never overdone', id: 'Tidak berlebihan' },
    body: {
      en: 'No uniforms, no megaphone, no five stops before lunch. One day, done properly.',
      id: 'Tanpa seragam, tanpa toa, tanpa lima destinasi sebelum makan siang. Satu hari, dikerjakan dengan benar.',
    },
  },
];

export const REQUEST = {
  points: [
    { en: 'A route through Lombok that is not on the list above', id: 'Rute di Lombok yang belum ada di daftar di atas' },
    { en: 'Two or three days together, with somewhere to sleep sorted', id: 'Dua atau tiga hari sekaligus, termasuk tempat menginapnya' },
    { en: 'A day built for photography, a family pace, or older travellers', id: 'Satu hari yang disusun untuk fotografi, ritme keluarga, atau tamu lansia' },
    { en: 'Airport or harbour transfers at either end', id: 'Antar-jemput bandara atau pelabuhan di awal dan akhir' },
    { en: 'Somewhere else in Nusa Tenggara — ask, and we will say honestly what we can run', id: 'Tempat lain di Nusa Tenggara — tanya saja, kami jujur soal yang bisa kami jalankan' },
  ],
};

/* --------------------------------------------------------------------------
   PHOTOS
   Only real pictures of real trips belong here. The grid hides itself until
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
   put in it — invented reviews on a page that promises "routes we genuinely
   know" would undo the whole point.

   Add them like this, using the guest's own words and with their permission:

     { id: 'r1',
       quote: { en: '…', id: '…' },
       name: 'Sofia',
       meta: { en: 'Tetebatu, March 2026', id: 'Tetebatu, Maret 2026' } },
   -------------------------------------------------------------------------- */
export const TESTIMONIALS = [];
