/* ==========================================================================
   wandrnusa — page content (about, pillars, by request, photos, reviews)
   All text is bilingual: { en, id }.
   ========================================================================== */

export const ABOUT = {
  /* The islands section is about the islands. Nothing about us belongs here —
     that lives in SERVICE, much further down the page. */
  statement: {
    en: 'Lombok is small enough to cross in a morning and varied enough that you will not want to. Volcano, reef, rice terrace, hill country and coastline, all inside eighty kilometres.',
    id: 'Lombok cukup kecil untuk diseberangi dalam satu pagi, dan cukup beragam sampai Anda tidak ingin buru-buru. Gunung api, terumbu, sawah terasering, perbukitan, dan garis pantai — semuanya dalam delapan puluh kilometer.',
  },
  body: {
    en: [
      'The south is dry and open, with long empty beaches and headlands between them. The west drops into the sea at Senggigi, and just offshore the three Gilis sit on their reefs, flat and bright and car-free.',
      'Inland it climbs. Rice terraces step up the slopes, coffee and cacao grow under the shade trees, and the hills roll on until Rinjani closes off the north. Higher again there are valleys cold enough for strawberries, and waterfalls in more of them than anyone bothers to count.',
      'And people have been making things here for a very long time. Sasak villages weave, throw pots, dry tobacco and hold markets that only happen on certain days. Lombok is also only the beginning — the Nusa Islands run east from here through Sumbawa, Flores, Sumba and Timor.',
    ],
    id: [
      'Selatannya kering dan terbuka, dengan pantai-pantai panjang yang sepi dan tanjung di antaranya. Baratnya turun ke laut di Senggigi, dan tak jauh dari pantai tiga Gili duduk di atas terumbunya — datar, terang, tanpa mobil.',
      'Ke arah dalam, tanahnya naik. Sawah terasering menaiki lereng, kopi dan kakao tumbuh di bawah pohon peneduh, dan perbukitan bergulung sampai Rinjani menutup bagian utara. Lebih tinggi lagi ada lembah yang cukup dingin untuk stroberi, dan air terjun di lebih banyak lembah daripada yang pernah dihitung orang.',
      'Dan orang sudah membuat sesuatu di sini sejak lama sekali. Desa-desa Sasak menenun, membuat gerabah, menjemur tembakau, dan menggelar pasar yang hanya buka di hari tertentu. Lombok pun baru permulaan — Kepulauan Nusa membentang ke timur lewat Sumbawa, Flores, Sumba, dan Timor.',
    ],
  },
};

/* --------------------------------------------------------------------------
   WHAT IS HERE
   One tile per thing the island has. A tile with `photo: null` renders as a
   plain branded panel with its label, so the grid still reads and the gap is
   obvious. Add the photo, set the path, and the tile fills in.
   -------------------------------------------------------------------------- */
export const HIGHLIGHTS = [
  { id: 'beaches',     photo: null,
    label: { en: 'Beaches',        id: 'Pantai' },
    note:  { en: 'Long and empty along the south coast', id: 'Panjang dan sepi di pesisir selatan' } },
  { id: 'gilis',       photo: null,
    label: { en: 'The Gilis',      id: 'Gili' },
    note:  { en: 'Three flat islands on a reef, no cars', id: 'Tiga pulau datar di atas terumbu, tanpa mobil' } },
  { id: 'mountain',    photo: 'assets/img/islands/mountain.jpg',
    label: { en: 'The mountain',   id: 'Gunung' },
    note:  { en: 'Rinjani, and the lake inside its crater', id: 'Rinjani, dan danau di dalam kalderanya' } },
  { id: 'waterfalls',  photo: 'assets/img/islands/waterfalls.jpg',
    label: { en: 'Waterfalls',     id: 'Air terjun' },
    note:  { en: 'In more valleys than anyone counts', id: 'Di lebih banyak lembah dari yang terhitung' } },
  { id: 'rice-fields', photo: 'assets/img/islands/rice-fields.jpg',
    label: { en: 'Rice fields',    id: 'Sawah' },
    note:  { en: 'Terraced up every slope that will hold them', id: 'Bertingkat di setiap lereng yang sanggup' } },
  { id: 'hills',       photo: null,
    label: { en: 'Hill country',   id: 'Perbukitan' },
    note:  { en: 'Between the coast and the mountain', id: 'Antara pesisir dan gunung' } },
  { id: 'coffee',      photo: null,
    label: { en: 'Coffee',         id: 'Kopi' },
    note:  { en: 'Grown under shade trees with the cacao', id: 'Tumbuh di bawah pohon peneduh bersama kakao' } },
  { id: 'culture',     photo: null,
    label: { en: 'Culture',        id: 'Budaya' },
    note:  { en: 'Sasak, and older than the guidebooks', id: 'Sasak, dan lebih tua dari buku panduan' } },
  { id: 'village-life',photo: 'assets/img/islands/village-life.jpg',
    label: { en: 'Village life',   id: 'Kehidupan desa' },
    note:  { en: 'Markets on certain days, tobacco drying', id: 'Pasar di hari tertentu, tembakau dijemur' } },
  { id: 'crafts',      photo: null,
    label: { en: 'Arts and crafts',id: 'Seni dan kriya' },
    note:  { en: 'Weaving in one valley, pottery in the next', id: 'Tenun di satu lembah, gerabah di lembah berikutnya' } },
];

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
