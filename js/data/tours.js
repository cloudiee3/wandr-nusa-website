/* ==========================================================================
   wandrnusa — trips
   --------------------------------------------------------------------------
   ADDING A TRIP
   1. Copy an entry, paste it into the array, give it a unique `id` and an
      `order`.
   2. Put a photo at  photos/<something>.jpg  and add it to the manifest in
      tools/process-photos.mjs, then run `npm run photos`.
   3. Point `photo` at the processed file. Leave `photo: null` until you have
      a real picture of that place — the card shows a plain branded panel
      instead, which is honest. Do not borrow a photo of somewhere else.

   RULES
   - Every text field is bilingual: { en, id }
   - Never put a price here. Price is a WhatsApp conversation.
   - `alt` describes what is actually in the picture, not what you wish it
     showed. It is read aloud to blind visitors and shown when a photo fails.
   ========================================================================== */

export const TOURS = [
  {
    id: 'tetebatu',
    order: 1,
    private: true,
    photo: 'assets/img/tours/tetebatu.jpg',
    alt: {
      en: 'Black langurs sitting in the trees at the monkey forest above Tetebatu',
      id: 'Lutung hitam di pepohonan hutan monyet di atas Tetebatu',
    },
    name: { en: 'Tetebatu', id: 'Tetebatu' },
    region: { en: 'East Lombok · Sikur', id: 'Lombok Timur · Sikur' },
    duration: { en: 'About 8 hours', id: 'Sekitar 8 jam' },
    effort: { en: 'Easy walking', id: 'Jalan kaki ringan' },
    description: {
      en: 'A village 700 metres up on the south side of Rinjani. You walk more than you drive here — through the rice terraces, into the monkey forest, then out to two waterfalls.',
      id: 'Desa di ketinggian 700 mdpl, sisi selatan Rinjani. Di sini lebih banyak jalan kaki daripada naik mobil — lewat sawah terasering, masuk hutan monyet, lalu ke dua air terjun.',
    },
    route: {
      en: ['Rice terraces', 'Monkey forest', 'Ulem-Ulem waterfall', 'Sarang Walet waterfall', 'Tobacco barns'],
      id: ['Sawah terasering', 'Hutan monyet', 'Air terjun Ulem-Ulem', 'Air terjun Sarang Walet', 'Gudang tembakau'],
    },
    included: {
      en: ['Private car and driver', 'Guide who lives in Tetebatu', 'All entrance fees', 'Drinking water', 'Hotel pickup and drop-off'],
      id: ['Mobil privat dan sopir', 'Pemandu warga Tetebatu', 'Semua tiket masuk', 'Air minum', 'Antar-jemput hotel'],
    },
    note: {
      en: 'Flat walking on village paths. Trainers are fine. The last part to the waterfall is slippery after rain.',
      id: 'Jalannya datar, lewat jalan desa. Sepatu biasa cukup. Jalur terakhir ke air terjun licin kalau habis hujan.',
    },
  },

  {
    id: 'lombok-tengah',
    order: 2,
    private: true,
    photo: 'assets/img/tours/lombok-tengah.jpg',
    stock: true,
    alt: {
      en: 'Two waterfalls falling side by side through dense green forest',
      id: 'Dua air terjun jatuh berdampingan di hutan hijau yang rapat',
    },
    name: {
      en: 'Benang Kelambu, Benang Stokel & river tubing',
      id: 'Benang Kelambu, Benang Stokel & river tubing',
    },
    region: { en: 'Central Lombok · Aik Berik', id: 'Lombok Tengah · Aik Berik' },
    duration: { en: 'About 9 hours', id: 'Sekitar 9 jam' },
    effort: { en: 'Some walking, you get wet', id: 'Jalan sedang, basah-basahan' },
    description: {
      en: 'Two waterfalls in Aik Berik, about thirty minutes apart on foot. Benang Stokel falls in straight ropes. Benang Kelambu comes down through the plants on the cliff. River tubing after lunch when the water is right.',
      id: 'Dua air terjun di Aik Berik, sekitar 30 menit jalan kaki satu sama lain. Benang Stokel jatuh lurus seperti untaian benang. Benang Kelambu turun menembus tanaman di tebing. Sorenya river tubing kalau debit airnya pas.',
    },
    route: {
      en: ['Benang Stokel waterfall', 'Forest path between the two', 'Benang Kelambu waterfall', 'River tubing', 'Lunch in the village'],
      id: ['Air terjun Benang Stokel', 'Jalan hutan antar air terjun', 'Air terjun Benang Kelambu', 'River tubing', 'Makan siang di desa'],
    },
    included: {
      en: ['Private car and driver', 'Local guide', 'All entrance fees', 'Tubing gear, life vest and river guide', 'Drinking water', 'Hotel pickup and drop-off'],
      id: ['Mobil privat dan sopir', 'Pemandu lokal', 'Semua tiket masuk', 'Peralatan tubing, pelampung, dan pemandu sungai', 'Air minum', 'Antar-jemput hotel'],
    },
    note: {
      en: 'Tubing depends on the river level and we decide on the day. We will tell you straight if it is not safe. Bring a change of clothes.',
      id: 'Tubing tergantung debit sungai dan diputuskan hari itu juga. Kalau tidak aman, kami bilang apa adanya. Bawa baju ganti.',
    },
  },

  {
    id: 'senaru',
    order: 3,
    private: true,
    photo: 'assets/img/tours/senaru.jpg',
    stock: true,
    alt: {
      en: 'A wide waterfall dropping into a pool surrounded by jungle',
      id: 'Air terjun lebar jatuh ke kolam dikelilingi hutan',
    },
    name: { en: 'Senaru', id: 'Senaru' },
    region: { en: 'North Lombok · Bayan', id: 'Lombok Utara · Bayan' },
    duration: { en: 'About 10 hours', id: 'Sekitar 10 jam' },
    effort: { en: 'Steps and river crossings', id: 'Banyak tangga, menyeberang sungai' },
    description: {
      en: 'Sendang Gile is a short walk down from the car park. Tiu Kelep is forty minutes further and you cross the river a few times to get there, so you will get wet. Senaru village at the top of the road still keeps the Wetu Telu calendar.',
      id: 'Sendang Gile cuma turun sebentar dari parkiran. Tiu Kelep 40 menit lebih jauh dan kita menyeberang sungai beberapa kali, jadi pasti basah. Desa Senaru di ujung jalan masih memegang kalender Wetu Telu.',
    },
    route: {
      en: ['Senaru village', 'Sendang Gile waterfall', 'River crossings', 'Tiu Kelep waterfall', 'Rinjani trailhead'],
      id: ['Desa adat Senaru', 'Air terjun Sendang Gile', 'Menyeberang sungai', 'Air terjun Tiu Kelep', 'Pintu pendakian Rinjani'],
    },
    included: {
      en: ['Private car and driver', 'Guide from Senaru', 'Entrance fees and village contribution', 'Help at the river crossings', 'Drinking water', 'Hotel pickup and drop-off'],
      id: ['Mobil privat dan sopir', 'Pemandu warga Senaru', 'Tiket masuk dan kontribusi desa', 'Pendampingan saat menyeberang sungai', 'Air minum', 'Antar-jemput hotel'],
    },
    note: {
      en: 'A long day from south Lombok — about three hours each way. Wear sandals with grip. Bring a dry bag for your phone.',
      id: 'Hari yang panjang kalau dari Lombok selatan — sekitar tiga jam sekali jalan. Pakai sandal gunung. Bawa dry bag untuk HP.',
    },
  },

  {
    id: 'sembalun',
    order: 4,
    private: true,
    /* No photo yet. The picture that was here was not Sembalun, so it is gone.
       Put a real one at photos/, add it to tools/process-photos.mjs, then set
       this to 'assets/img/tours/sembalun.jpg'. */
    photo: null,
    alt: {
      en: 'The Sembalun valley seen from Bukit Selong',
      id: 'Lembah Sembalun dilihat dari Bukit Selong',
    },
    name: { en: 'Sembalun', id: 'Sembalun' },
    region: { en: 'East Lombok · Sembalun', id: 'Lombok Timur · Sembalun' },
    duration: { en: 'About 10 hours', id: 'Sekitar 10 jam' },
    effort: { en: 'Short climbs, cold morning', id: 'Sedikit menanjak, pagi dingin' },
    description: {
      en: 'A valley on the east side of Rinjani, 1,150 metres up and cold first thing. Bukit Selong looks straight down on the fields. Garlic and strawberries grow here. The crater rim sits on the skyline all day.',
      id: 'Lembah di sisi timur Rinjani, 1.150 mdpl dan dingin di pagi hari. Bukit Selong memandang langsung ke petak-petak ladang. Bawang putih dan stroberi tumbuh di sini. Punggung kaldera terlihat sepanjang hari.',
    },
    route: {
      en: ['Bukit Selong viewpoint', 'Sembalun fields', 'Desa Beleq', 'Garlic and strawberry plots', 'Rinjani trailhead'],
      id: ['Viewpoint Bukit Selong', 'Ladang Sembalun', 'Desa Beleq', 'Kebun bawang putih dan stroberi', 'Pintu pendakian Rinjani'],
    },
    included: {
      en: ['Private car and driver', 'Guide from Sembalun', 'Entrance and viewpoint fees', 'Drinking water', 'Hotel pickup and drop-off'],
      id: ['Mobil privat dan sopir', 'Pemandu warga Sembalun', 'Tiket masuk dan viewpoint', 'Air minum', 'Antar-jemput hotel'],
    },
    note: {
      en: 'We start early for the light, before cloud covers the rim. Bring a jacket — mornings are 16–18 °C.',
      id: 'Kami berangkat pagi untuk cahayanya, sebelum kaldera tertutup awan. Bawa jaket — pagi hari 16–18 °C.',
    },
  },
];

/** Trips in display order. */
export const getTours = () => [...TOURS].sort((a, b) => a.order - b.order);
