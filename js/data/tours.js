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
   - Say nothing about private vs shared or group size. Whether a trip is
     shared, and how many people come, is settled per booking on WhatsApp.
   - `alt` describes what is actually in the picture.
   ========================================================================== */

export const TOURS = [
  {
    id: 'tetebatu',
    order: 1,
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
      en: 'Cool air and terraces stepping down the mountain, with black langurs sitting in the canopy watching you pass. The water comes off Rinjani here in short clean falls you reach on foot, through the fields, past barns where tobacco is hung up to dry.',
      id: 'Udara sejuk dan sawah bertingkat turun dari gunung, dengan lutung hitam duduk di tajuk pohon memperhatikan Anda lewat. Airnya turun dari Rinjani jadi air terjun pendek yang jernih, dicapai dengan jalan kaki lewat sawah, melewati gudang tempat tembakau digantung.',
    },
    route: {
      en: ['Rice terraces', 'Monkey forest', 'Waterfalls', 'Tobacco barns'],
      id: ['Sawah terasering', 'Hutan monyet', 'Air terjun', 'Gudang tembakau'],
    },
    included: {
      en: ['Car and driver', 'Local guide', 'Entrance fees', 'Drinking water', 'Collection and drop-off'],
      id: ['Mobil dan sopir', 'Pemandu lokal', 'Tiket masuk', 'Air minum', 'Antar-jemput'],
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
    photo: 'assets/img/tours/lombok-tengah.jpg',
    alt: {
      en: 'Water falling in thin strands through the plants on the cliff at Benang Kelambu, into a shallow pool',
      id: 'Air jatuh seperti untaian benang menembus tanaman di tebing Benang Kelambu, ke kolam dangkal',
    },
    name: {
      en: 'Benang Kelambu, Benang Stokel & River Tubing',
      id: 'Benang Kelambu, Benang Stokel & River Tubing',
    },
    region: { en: 'Central Lombok · Aik Berik', id: 'Lombok Tengah · Aik Berik' },
    duration: { en: 'A full day', id: 'Seharian penuh' },
    effort: { en: 'Some walking, you get wet', id: 'Jalan sedang, basah-basahan' },
    description: {
      en: 'Two waterfalls about half an hour apart on foot. Stokel drops in straight ropes of water. Kelambu comes down through the plants on the cliff in hundreds of thin strands — kelambu means curtain, and once you see it the name is obvious. Afterwards the river, in a tube, moving slowly.',
      id: 'Dua air terjun berjarak sekitar setengah jam jalan kaki. Stokel jatuh lurus seperti untaian benang. Kelambu turun menembus tanaman di tebing dalam ratusan helai tipis — begitu melihatnya, namanya jadi masuk akal. Sesudahnya, menyusuri sungai naik ban, pelan-pelan.',
    },
    route: {
      en: ['Benang Stokel', 'Forest path between the two', 'Benang Kelambu', 'River tubing'],
      id: ['Benang Stokel', 'Jalan hutan antar keduanya', 'Benang Kelambu', 'River tubing'],
    },
    included: {
      en: ['Car and driver', 'Local guide', 'Entrance fees', 'Tubing equipment and river guide', 'Drinking water', 'Collection and drop-off'],
      id: ['Mobil dan sopir', 'Pemandu lokal', 'Tiket masuk', 'Peralatan tubing dan pemandu sungai', 'Air minum', 'Antar-jemput'],
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
      en: 'The north side, where the forest closes over the road and the air turns heavy. Sendang Gile is a set of steps down. Tiu Kelep is further in, and you cross the river to reach it, so you arrive wet whatever you are wearing. The village at the top of the road keeps its own calendar.',
      id: 'Sisi utara, tempat hutan menutup jalan dan udara terasa berat. Sendang Gile cuma turun anak tangga. Tiu Kelep lebih jauh ke dalam, dan kita menyeberang sungai untuk sampai — jadi basah, apa pun yang Anda pakai. Desa di ujung jalan punya kalendernya sendiri.',
    },
    route: {
      en: ['Senaru village', 'Sendang Gile', 'River crossings', 'Tiu Kelep'],
      id: ['Desa Senaru', 'Sendang Gile', 'Menyeberang sungai', 'Tiu Kelep'],
    },
    included: {
      en: ['Car and driver', 'Local guide', 'Entrance fees and village contribution', 'Drinking water', 'Collection and drop-off'],
      id: ['Mobil dan sopir', 'Pemandu lokal', 'Tiket masuk dan kontribusi desa', 'Air minum', 'Antar-jemput'],
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
    photo: 'assets/img/tours/sembalun.jpg',
    alt: {
      en: 'The Sembalun valley seen from the ridge, its fields laid out in a patchwork under cloud-covered mountains',
      id: 'Lembah Sembalun dilihat dari punggungan, ladangnya berpetak-petak di bawah gunung yang tertutup awan',
    },
    name: { en: 'Sembalun', id: 'Sembalun' },
    region: { en: 'East Lombok · Sembalun', id: 'Lombok Timur · Sembalun' },
    duration: { en: 'A long day', id: 'Hari yang panjang' },
    effort: { en: 'Short climbs, cold morning', id: 'Sedikit menanjak, pagi dingin' },
    description: {
      en: 'A high valley on the eastern side, cold enough in the morning to want a jacket. From the ridge the fields lie out below in squares, and the rim of the crater sits on the skyline all day. Garlic and strawberries grow up here, which tells you how different the air is.',
      id: 'Lembah tinggi di sisi timur, pagi harinya dingin sampai butuh jaket. Dari punggungan, ladang terhampar berpetak-petak di bawah, dan bibir kaldera terlihat di cakrawala sepanjang hari. Bawang putih dan stroberi tumbuh di sini — dari situ Anda tahu betapa berbedanya udaranya.',
    },
    route: {
      en: ['Bukit Selong viewpoint', 'The valley fields', 'Desa Beleq', 'Rinjani trailhead'],
      id: ['Viewpoint Bukit Selong', 'Ladang lembah', 'Desa Beleq', 'Pintu pendakian Rinjani'],
    },
    included: {
      en: ['Car and driver', 'Local guide', 'Entrance and viewpoint fees', 'Drinking water', 'Collection and drop-off'],
      id: ['Mobil dan sopir', 'Pemandu lokal', 'Tiket masuk dan viewpoint', 'Air minum', 'Antar-jemput'],
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
