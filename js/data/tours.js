/* ==========================================================================
   wandrnusa — tour catalogue
   --------------------------------------------------------------------------
   ADDING A NEW DESTINATION
   1. Copy any object below and paste it into the array.
   2. Give it a unique `id` (lowercase, no spaces) and bump `order`.
   3. Drop a photo at  assets/img/tours/<id>.jpg  (3:2, ~1600x1067, under 300 KB)
      and point `image` at it. Until that file exists the card falls back to
      `placeholder` on its own — nothing breaks.
   4. That's it. The card, the booking form's destination list and the
      WhatsApp message are all generated from this file.

   RULES
   - Every text field is bilingual: { en: '...', id: '...' }
   - NEVER put a price in here. Prices are discussed on WhatsApp only.
   - `included` is the "What's included" list. Keep items short and concrete.
   ========================================================================== */

export const TOURS = [
  {
    id: 'tetebatu',
    order: 1,
    private: true,
    image: 'assets/img/tours/tetebatu.jpg',
    placeholder: 'assets/img/placeholders/tetebatu.svg',
    name: {
      en: 'Tetebatu One-Day Trip',
      id: 'One-Day Trip Tetebatu',
    },
    region: {
      en: 'East Lombok · Sikur',
      id: 'Lombok Timur · Sikur',
    },
    duration: { en: 'About 8 hours', id: 'Sekitar 8 jam' },
    effort:   { en: 'Easy walking',  id: 'Jalan kaki ringan' },
    description: {
      en: 'The village we know best — 700 metres up on the southern slope of Rinjani, where the rice terraces step downhill and tobacco barns still run the local economy. You walk more than you drive: through the fields, into the monkey forest, out to two waterfalls.',
      id: 'Desa yang paling kami kenal — 700 mdpl di lereng selatan Rinjani, tempat sawah bertingkat turun ke lembah dan gudang tembakau masih jadi tulang punggung ekonomi warga. Lebih banyak jalan kaki daripada naik mobil: menyusuri sawah, masuk hutan monyet, lalu ke dua air terjun.',
    },
    route: {
      en: ['Rice terrace walk', 'Monkey forest track', 'Ulem-Ulem & Sarang Walet waterfalls', 'Tobacco barns', 'Coffee and cacao gardens'],
      id: ['Jalan di sawah terasering', 'Trek hutan monyet', 'Air terjun Ulem-Ulem & Sarang Walet', 'Gudang tembakau', 'Kebun kopi dan kakao'],
    },
    included: {
      en: ['Private car with driver', 'Guide who lives in Tetebatu', 'All entrance fees', 'Bottled water', 'Hotel pickup and drop-off', 'Village walking route'],
      id: ['Mobil privat dengan sopir', 'Pemandu warga Tetebatu', 'Semua tiket masuk', 'Air minum', 'Antar-jemput hotel', 'Rute jalan kaki keliling desa'],
    },
    note: {
      en: 'Mostly flat walking on village paths and paddy bunds. Trainers are fine — the last stretch to the waterfall gets slippery after rain.',
      id: 'Sebagian besar jalan datar lewat jalan desa dan pematang sawah. Sepatu biasa cukup — jalur terakhir ke air terjun licin setelah hujan.',
    },
    alt: {
      en: 'Rice terraces stepping down the southern slope of Rinjani at Tetebatu',
      id: 'Sawah terasering di lereng selatan Rinjani, Tetebatu',
    },
  },

  {
    id: 'lombok-tengah',
    order: 2,
    private: true,
    image: 'assets/img/tours/lombok-tengah.jpg',
    placeholder: 'assets/img/placeholders/lombok-tengah.svg',
    name: {
      en: 'Benang Kelambu, Benang Stokel & River Tubing',
      id: 'Benang Kelambu, Benang Stokel & River Tubing',
    },
    region: {
      en: 'Central Lombok · Aik Berik',
      id: 'Lombok Tengah · Aik Berik',
    },
    duration: { en: 'About 8–9 hours', id: 'Sekitar 8–9 jam' },
    effort:   { en: 'Moderate walking, water', id: 'Jalan sedang, basah-basahan' },
    description: {
      en: 'Two waterfalls in Aik Berik, roughly thirty minutes’ walk apart. Benang Stokel drops in tight ropes of water; Benang Kelambu comes down through the plants on the cliff face, which is where the name comes from. Afternoon on the river in a tube when the level allows.',
      id: 'Dua air terjun di Aik Berik, jaraknya sekitar 30 menit jalan kaki. Benang Stokel jatuh seperti untaian benang; Benang Kelambu turun menembus tanaman di dinding tebing — dari situ namanya. Sorenya river tubing kalau debit air memungkinkan.',
    },
    route: {
      en: ['Benang Stokel waterfall', 'Forest trail between the two', 'Benang Kelambu waterfall', 'Aik Berik river tubing', 'Lunch stop in the village'],
      id: ['Air terjun Benang Stokel', 'Trek hutan antar air terjun', 'Air terjun Benang Kelambu', 'River tubing Aik Berik', 'Makan siang di desa'],
    },
    included: {
      en: ['Private car with driver', 'Local guide', 'All entrance fees', 'Tubing gear, life vest and river guide', 'Bottled water', 'Hotel pickup and drop-off'],
      id: ['Mobil privat dengan sopir', 'Pemandu lokal', 'Semua tiket masuk', 'Peralatan tubing, pelampung, dan pemandu sungai', 'Air minum', 'Antar-jemput hotel'],
    },
    note: {
      en: 'Tubing depends on the river level and is decided on the day — we will tell you straight if it is not safe. Bring a change of clothes.',
      id: 'Tubing tergantung debit sungai dan diputuskan pada hari-H — kami akan bilang apa adanya kalau kondisinya tidak aman. Bawa baju ganti.',
    },
    alt: {
      en: 'Benang Kelambu waterfall falling through plants on the cliff face in Aik Berik',
      id: 'Air terjun Benang Kelambu jatuh menembus tanaman di tebing, Aik Berik',
    },
  },

  {
    id: 'senaru',
    order: 3,
    private: true,
    image: 'assets/img/tours/senaru.jpg',
    placeholder: 'assets/img/placeholders/senaru.svg',
    name: {
      en: 'Senaru One-Day Trip',
      id: 'One-Day Trip Senaru',
    },
    region: {
      en: 'North Lombok · Bayan',
      id: 'Lombok Utara · Bayan',
    },
    duration: { en: 'About 9–10 hours', id: 'Sekitar 9–10 jam' },
    effort:   { en: 'Steps, river crossings', id: 'Banyak tangga, menyeberang sungai' },
    description: {
      en: 'Sendang Gile is a stairway down from the car park. Tiu Kelep is another forty minutes on, with a few river crossings on the way — you arrive wet either way. Senaru village sits at the top of the road and still keeps the Wetu Telu calendar.',
      id: 'Sendang Gile hanya turun anak tangga dari parkiran. Tiu Kelep sekitar 40 menit lebih jauh, dengan beberapa penyeberangan sungai — sampai sana pasti basah. Desa Senaru ada di ujung jalan dan masih memegang kalender Wetu Telu.',
    },
    route: {
      en: ['Senaru traditional village', 'Sendang Gile waterfall', 'River crossings through the forest', 'Tiu Kelep waterfall', 'Rinjani trailhead viewpoint'],
      id: ['Desa adat Senaru', 'Air terjun Sendang Gile', 'Menyeberang sungai lewat hutan', 'Air terjun Tiu Kelep', 'Viewpoint pintu pendakian Rinjani'],
    },
    included: {
      en: ['Private car with driver', 'Guide from Senaru village', 'Entrance fees and village contribution', 'Help at the river crossings', 'Bottled water', 'Hotel pickup and drop-off'],
      id: ['Mobil privat dengan sopir', 'Pemandu warga Senaru', 'Tiket masuk dan kontribusi desa', 'Pendampingan saat menyeberang sungai', 'Air minum', 'Antar-jemput hotel'],
    },
    note: {
      en: 'A long day if you start from south Lombok — around three hours each way. Sandals with grip beat trainers, and bring a dry bag for your phone.',
      id: 'Hari yang panjang kalau berangkat dari Lombok selatan — sekitar tiga jam sekali jalan. Sandal gunung lebih aman daripada sepatu, dan bawa dry bag untuk HP.',
    },
    alt: {
      en: 'Tiu Kelep waterfall in the forest above Senaru, North Lombok',
      id: 'Air terjun Tiu Kelep di hutan atas Senaru, Lombok Utara',
    },
  },

  {
    id: 'sembalun',
    order: 4,
    private: true,
    image: 'assets/img/tours/sembalun.jpg',
    placeholder: 'assets/img/placeholders/sembalun.svg',
    name: {
      en: 'Sembalun One-Day Trip',
      id: 'One-Day Trip Sembalun',
    },
    region: {
      en: 'East Lombok · Sembalun valley',
      id: 'Lombok Timur · Lembah Sembalun',
    },
    duration: { en: 'About 10 hours', id: 'Sekitar 10 jam' },
    effort:   { en: 'Short climbs, cool air', id: 'Sedikit menanjak, udara dingin' },
    description: {
      en: 'The valley on the eastern side of Rinjani, around 1,150 metres up and cold first thing. Bukit Selong looks straight down on the field patchwork. Garlic and strawberries grow here, Desa Beleq keeps the old houses standing, and the crater rim sits on the skyline all day.',
      id: 'Lembah di sisi timur Rinjani, sekitar 1.150 mdpl dan dingin di pagi hari. Bukit Selong memandang langsung ke petak-petak ladang. Bawang putih dan stroberi tumbuh di sini, Desa Beleq masih menjaga rumah-rumah lamanya, dan punggung kaldera terlihat sepanjang hari.',
    },
    route: {
      en: ['Bukit Selong viewpoint', 'Sembalun Lawang fields', 'Desa Beleq old village', 'Garlic and strawberry plots', 'Rinjani trailhead at Sembalun'],
      id: ['Viewpoint Bukit Selong', 'Ladang Sembalun Lawang', 'Desa Beleq', 'Kebun bawang putih dan stroberi', 'Pintu pendakian Rinjani Sembalun'],
    },
    included: {
      en: ['Private car with driver', 'Local guide from Sembalun', 'Entrance and viewpoint fees', 'Bottled water', 'Hotel pickup and drop-off'],
      id: ['Mobil privat dengan sopir', 'Pemandu warga Sembalun', 'Tiket masuk dan viewpoint', 'Air minum', 'Antar-jemput hotel'],
    },
    note: {
      en: 'We start early for the light and to get ahead of the cloud on the rim. Bring a layer — mornings sit around 16–18 °C.',
      id: 'Kami berangkat pagi untuk cahaya terbaik dan sebelum kaldera tertutup awan. Bawa jaket — pagi hari sekitar 16–18 °C.',
    },
    alt: {
      en: 'Patchwork fields of the Sembalun valley seen from Bukit Selong',
      id: 'Petak-petak ladang Lembah Sembalun dilihat dari Bukit Selong',
    },
  },
];

/** Tours in display order. */
export const getTours = () => [...TOURS].sort((a, b) => a.order - b.order);
