/* ==========================================================================
   wandrnusa — escapes
   --------------------------------------------------------------------------
   ⚠️  ROUTE / INCLUDED / NOT INCLUDED ARE AWAITING YOUR CONFIRMATION.

   The `route` and `included` lists below were written from general knowledge
   of the region, not from your actual operation, and you have said they
   contain mistakes. Treat every one as a draft until you have checked it.
   `notIncluded` is deliberately empty — nothing is guessed there. Send the
   real lists and they go straight in; the section is already wired up and
   appears the moment an entry has one.

   ADDING AN ESCAPE
   1. Copy an entry, give it a unique `id` and an `order`.
   2. Put the photo in photos/, add it to tools/process-photos.mjs, run
      `npm run photos`, then point `photo` at the processed file.
   3. Leave `photo: null` until you have a real picture of that place — the
      card shows a plain branded panel, which is honest. Never borrow a photo
      of somewhere else.

   RULES
   - Every text field is bilingual: { en, id }
   - Never put a price here. Price is a conversation.
   - `alt` describes what is actually in the picture.
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
    duration: { en: 'A full day', id: 'Seharian penuh' },
    effort: { en: 'Easy walking', id: 'Jalan kaki ringan' },
    description: {
      en: 'Rice terraces stacked up the southern slope of Rinjani, a forest full of langurs, and waterfalls you reach on foot. The kind of day where you walk more than you drive.',
      id: 'Sawah bertingkat di lereng selatan Rinjani, hutan penuh lutung, dan air terjun yang dicapai dengan jalan kaki. Hari yang lebih banyak jalan daripada naik mobil.',
    },
    route: {
      en: ['Rice terraces', 'Monkey forest', 'Waterfalls', 'Tobacco barns'],
      id: ['Sawah terasering', 'Hutan monyet', 'Air terjun', 'Gudang tembakau'],
    },
    included: {
      en: ['Private car and driver', 'Local guide', 'Entrance fees', 'Drinking water', 'Collection and drop-off'],
      id: ['Mobil privat dan sopir', 'Pemandu lokal', 'Tiket masuk', 'Air minum', 'Antar-jemput'],
    },
    notIncluded: null,
    note: {
      en: 'Mostly flat walking on village paths. Trainers are fine. The last stretch to the water is slippery after rain.',
      id: 'Sebagian besar jalan datar lewat jalan desa. Sepatu biasa cukup. Jalur terakhir ke air licin kalau habis hujan.',
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
      en: 'Benang Kelambu, Benang Stokel & River Tubing',
      id: 'Benang Kelambu, Benang Stokel & River Tubing',
    },
    region: { en: 'Central Lombok · Aik Berik', id: 'Lombok Tengah · Aik Berik' },
    duration: { en: 'A full day', id: 'Seharian penuh' },
    effort: { en: 'Some walking, you get wet', id: 'Jalan sedang, basah-basahan' },
    description: {
      en: 'Benang Stokel falls in straight ropes. Benang Kelambu comes down through the plants on the cliff like a curtain, which is where it gets its name. Then the river, in a tube, if the water is behaving.',
      id: 'Benang Stokel jatuh lurus seperti untaian benang. Benang Kelambu turun menembus tanaman di tebing seperti kelambu — dari situ namanya. Lalu turun ke sungai naik ban, kalau airnya bersahabat.',
    },
    route: {
      en: ['Benang Stokel', 'Forest path between the two', 'Benang Kelambu', 'River tubing'],
      id: ['Benang Stokel', 'Jalan hutan antar keduanya', 'Benang Kelambu', 'River tubing'],
    },
    included: {
      en: ['Private car and driver', 'Local guide', 'Entrance fees', 'Tubing equipment and river guide', 'Drinking water', 'Collection and drop-off'],
      id: ['Mobil privat dan sopir', 'Pemandu lokal', 'Tiket masuk', 'Peralatan tubing dan pemandu sungai', 'Air minum', 'Antar-jemput'],
    },
    notIncluded: null,
    note: {
      en: 'Tubing depends on the river and gets decided on the day. If it is not safe we will say so. Bring a change of clothes.',
      id: 'Tubing tergantung kondisi sungai dan diputuskan hari itu juga. Kalau tidak aman, kami bilang. Bawa baju ganti.',
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
    duration: { en: 'A long day', id: 'Hari yang panjang' },
    effort: { en: 'Steps and river crossings', id: 'Banyak tangga, menyeberang sungai' },
    description: {
      en: 'Two waterfalls, one easy and one earned. You cross the river to reach the second, so you arrive wet either way. The village at the top of the road still keeps the Wetu Telu calendar.',
      id: 'Dua air terjun, satu gampang, satu harus diperjuangkan. Menyeberang sungai untuk sampai yang kedua, jadi tetap basah. Desa di ujung jalan masih memegang kalender Wetu Telu.',
    },
    route: {
      en: ['Senaru village', 'Sendang Gile', 'River crossings', 'Tiu Kelep'],
      id: ['Desa Senaru', 'Sendang Gile', 'Menyeberang sungai', 'Tiu Kelep'],
    },
    included: {
      en: ['Private car and driver', 'Local guide', 'Entrance fees and village contribution', 'Drinking water', 'Collection and drop-off'],
      id: ['Mobil privat dan sopir', 'Pemandu lokal', 'Tiket masuk dan kontribusi desa', 'Air minum', 'Antar-jemput'],
    },
    notIncluded: null,
    note: {
      en: 'A long way from the south of the island, so we start early. Sandals with grip beat trainers, and bring a dry bag for your phone.',
      id: 'Jauh dari selatan pulau, jadi kami berangkat pagi. Sandal gunung lebih aman daripada sepatu, dan bawa dry bag untuk HP.',
    },
  },

  {
    id: 'sembalun',
    order: 4,
    private: true,
    /* Photo on its way — set this to 'assets/img/tours/sembalun.jpg' once the
       file is in photos/ and `npm run photos` has been run. */
    photo: null,
    alt: {
      en: 'The Sembalun valley from above, its fields laid out in a patchwork below the cloud-covered ridges',
      id: 'Lembah Sembalun dari ketinggian, ladangnya berpetak-petak di bawah punggungan yang tertutup awan',
    },
    name: { en: 'Sembalun', id: 'Sembalun' },
    region: { en: 'East Lombok · Sembalun', id: 'Lombok Timur · Sembalun' },
    duration: { en: 'A long day', id: 'Hari yang panjang' },
    effort: { en: 'Short climbs, cold morning', id: 'Sedikit menanjak, pagi dingin' },
    description: {
      en: 'A valley high on the eastern side of Rinjani, cold enough in the morning to want a jacket. Fields laid out in a patchwork below you, the crater rim on the skyline all day.',
      id: 'Lembah tinggi di sisi timur Rinjani, pagi harinya dingin sampai butuh jaket. Ladang berpetak-petak di bawah, punggung kaldera terlihat sepanjang hari.',
    },
    route: {
      en: ['Bukit Selong viewpoint', 'The valley fields', 'Desa Beleq', 'Rinjani trailhead'],
      id: ['Viewpoint Bukit Selong', 'Ladang lembah', 'Desa Beleq', 'Pintu pendakian Rinjani'],
    },
    included: {
      en: ['Private car and driver', 'Local guide', 'Entrance and viewpoint fees', 'Drinking water', 'Collection and drop-off'],
      id: ['Mobil privat dan sopir', 'Pemandu lokal', 'Tiket masuk dan viewpoint', 'Air minum', 'Antar-jemput'],
    },
    notIncluded: null,
    note: {
      en: 'We start early for the light, before cloud closes over the rim. Bring a jacket — the mornings are genuinely cold.',
      id: 'Kami berangkat pagi untuk cahayanya, sebelum kaldera tertutup awan. Bawa jaket — paginya benar-benar dingin.',
    },
  },
];

/** Escapes in display order. */
export const getTours = () => [...TOURS].sort((a, b) => a.order - b.order);
