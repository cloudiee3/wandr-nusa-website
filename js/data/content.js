/* ==========================================================================
   wandrnusa — page content (about, pillars, by request, photos, reviews)
   All text is bilingual: { en, id }.
   ========================================================================== */

export const ABOUT = {
  /* The islands section is about the islands. Nothing about us belongs here —
     that lives in SERVICE, much further down the page. */
  statement: {
    en: 'Everything on Lombok runs downhill from Rinjani. The rain the mountain catches comes back as the rivers, the waterfalls and the rice terraces — and the day you spend here depends entirely on where on that slope you stand.',
    id: 'Semua yang ada di Lombok mengalir turun dari Rinjani. Hujan yang ditangkap gunung ini kembali menjadi sungai, air terjun, dan sawah terasering — dan hari yang Anda habiskan di sini tergantung di bagian lereng mana Anda berdiri.',
  },
  body: {
    en: [
      'The island changes as you cross it. Dry and wide open in the south, green and steep in the north, cool enough to want a jacket in the high valleys on the east side. You can be in all three before dinner.',
      'The mountain makes the weather. Cloud gathers on it by late morning, and the valleys below stay green because of what falls up there. In the dry months the light is hard and clean; in the wet months every small stream turns into a waterfall.',
      'And Lombok is only the beginning. The Nusa Islands run east from here — Sumbawa, Flores, Sumba, Timor — each one drier, stranger and further from anywhere than the last.',
    ],
    id: [
      'Pulau ini berubah saat Anda menyeberanginya. Kering dan terbuka di selatan, hijau dan curam di utara, cukup dingin untuk pakai jaket di lembah-lembah tinggi sisi timur. Ketiganya bisa Anda lewati sebelum makan malam.',
      'Gunungnya yang membuat cuaca. Awan berkumpul di sana menjelang siang, dan lembah di bawahnya tetap hijau karena hujan yang turun di atas. Di musim kemarau cahayanya keras dan bersih; di musim hujan setiap parit kecil berubah jadi air terjun.',
      'Dan Lombok baru permulaan. Kepulauan Nusa membentang ke timur dari sini — Sumbawa, Flores, Sumba, Timor — masing-masing makin kering, makin asing, makin jauh dari mana-mana.',
    ],
  },
};

/* Four things the island is made of. All four are about the place. */
export const PILLARS = [
  {
    id: 'the-mountain',
    title: { en: 'The mountain', id: 'Gunungnya' },
    body: {
      en: 'Rinjani decides the weather, the water and the soil. Stand anywhere on Lombok and you are somewhere on its slope, whether you can see it that morning or not. Inside its crater there is a lake the colour of deep glass.',
      id: 'Rinjani yang menentukan cuaca, air, dan tanahnya. Berdiri di mana pun di Lombok, Anda sedang berada di lerengnya — terlihat atau tidak pagi itu. Di dalam kalderanya ada danau sewarna kaca tebal.',
    },
  },
  {
    id: 'the-water',
    title: { en: 'The water', id: 'Airnya' },
    body: {
      en: 'What falls on the mountain comes back as rivers and waterfalls, and there are more of them than anyone bothers to count. In the north the water drops in one long clean line. In the middle it comes through the plants on the cliff like a curtain.',
      id: 'Yang turun di gunung kembali jadi sungai dan air terjun, jumlahnya lebih banyak dari yang pernah dihitung orang. Di utara airnya jatuh lurus dalam satu garis panjang. Di tengah menembus tanaman di tebing seperti kelambu.',
    },
  },
  {
    id: 'the-fields',
    title: { en: 'The fields', id: 'Ladangnya' },
    body: {
      en: 'Volcanic soil grows almost anything. Rice in terraces down the southern slope, tobacco hung to dry in open barns, coffee and cacao under the trees, and garlic and strawberries up where the air is cold.',
      id: 'Tanah vulkanis bisa menumbuhkan hampir apa saja. Padi bertingkat turun di lereng selatan, tembakau digantung di gudang terbuka, kopi dan kakao di bawah pepohonan, bawang putih dan stroberi di ketinggian yang udaranya dingin.',
    },
  },
  {
    id: 'the-villages',
    title: { en: 'The villages', id: 'Desanya' },
    body: {
      en: 'Sasak villages sit on every slope, and each valley does something slightly different — weaving in one, pottery in the next, a market that only happens on certain days in the one after that.',
      id: 'Desa-desa Sasak ada di setiap lereng, dan tiap lembah punya kekhasannya — tenun di satu tempat, gerabah di tempat berikutnya, pasar yang cuma buka di hari tertentu di tempat sesudahnya.',
    },
  },
];

/* --------------------------------------------------------------------------
   TRAVELLING WITH US
   Everything about the service lives here, near the bottom of the page, for
   people who have already decided the islands are worth seeing.
   -------------------------------------------------------------------------- */
export const SERVICE = [
  {
    id: 'collected',
    title: { en: 'We collect you', id: 'Kami jemput Anda' },
    body: {
      en: 'From wherever you are staying, at whatever time makes sense for where we are going that day.',
      id: 'Dari mana pun Anda menginap, pada jam yang masuk akal untuk tujuan hari itu.',
    },
  },
  {
    id: 'guides',
    title: { en: 'Guides from here', id: 'Pemandu orang sini' },
    body: {
      en: 'From these villages rather than sent to them. They know which warung is worth stopping at and which waterfall is better after rain.',
      id: 'Dari desa itu sendiri, bukan dikirim ke sana. Mereka tahu warung mana yang layak disinggahi dan air terjun mana yang lebih bagus setelah hujan.',
    },
  },
  {
    id: 'nothing-fixed',
    title: { en: 'Nothing is fixed', id: 'Tidak ada yang saklek' },
    body: {
      en: 'Routes, pace and how long you stay out are all yours to change, on the day if you want.',
      id: 'Rute, ritme, dan sampai jam berapa Anda di luar, semuanya bisa Anda ubah — bahkan di hari itu juga.',
    },
  },
  {
    id: 'looked-after',
    title: { en: 'Looked after', id: 'Diurus' },
    body: {
      en: 'Cold water in the car, a driver who knows the road in the rain, and someone answering you before, during and after.',
      id: 'Air dingin di mobil, sopir yang hafal jalan termasuk saat hujan, dan orang yang membalas sebelum, selama, dan sesudah.',
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
