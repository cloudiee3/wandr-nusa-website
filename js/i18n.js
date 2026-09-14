/* ==========================================================================
   wandrnusa — bilingual UI strings + language switching
   --------------------------------------------------------------------------
   English is the default. Indonesian is one click away and remembered.

   Mark static markup with data-i18n="key" (text) or data-i18n-attr="attr:key"
   (attribute, e.g. placeholder / aria-label / content). Everything rendered
   from JS calls t(key) or tr(bilingualObject).
   ========================================================================== */

export const LANGS = ['en', 'id'];
export const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'wandrnusa:lang';

export const STRINGS = {
  en: {
    'about.mapNote': 'Not a map — directions and rough distances from the mountain. Everything on it is within a day of the coast.',
    'map.alt': 'A diagram showing the four places we go, arranged around Rinjani by direction and distance.',
    'service.eyebrow': 'Travelling with us',
    'service.title': 'How a day actually goes.',
    'service.lead': 'None of this is complicated. It is just the part that would otherwise be yours to sort out.',
    'request.eyebrow': 'By request',
    'meta.title': 'wandrnusa — escapes in Lombok and the Nusa Islands',
    'meta.description': 'Lombok and the Nusa Islands — a volcano, the waterfalls it feeds, and the villages in between.',
    'nav.home': 'Home',
    'nav.about': 'The islands',
    'nav.tours': 'Escapes',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.skip': 'Skip to content',
    'cta.whatsapp': 'WhatsApp',
    'cta.whatsappLong': 'Start planning on WhatsApp',
    'cta.askWhatsapp': 'Ask about this escape',
    'cta.seeTours': 'See where we go',
    'cta.requestTrip': 'Tell us where',
    'cta.sendWhatsapp': 'Send on WhatsApp',
    'lang.label': 'Language',
    'hero.eyebrow': 'Lombok · Nusa Islands · Indonesia',
    'hero.lead': 'A volcano, the waterfalls it feeds, and the villages in between — all of it within a day of wherever you are staying.',
    'hero.fact1': 'A volcano at the centre',
    'hero.fact2': 'Waterfalls in every valley',
    'hero.fact3': 'Villages on every slope',
    'about.eyebrow': 'The islands',
    'about.title': 'Everything is close together here.',
    'about.pillarsLabel': 'What is here',
    'tours.eyebrow': 'Where we go',
    'tours.title': 'Four corners of one island.',
    'tours.lead': 'Four parts of Lombok that look nothing like each other — a cool valley of terraces, two waterfalls in the middle of the island, the wet forest of the north, and a high plain on the eastern side.',
    'tours.noticeStrong': 'When to come.',
    'tours.notice': 'The dry months give you clear light and easy roads. The wet months give you fuller waterfalls and greener terraces. There is no bad half of the year, only a different one.',
    'tours.included': 'Included',
    'tours.notIncluded': 'Not included',
    'tours.route': 'Where you go',
    'tours.goodToKnow': 'Good to know',
    'tours.photoSoon': 'Photo coming soon',
    'service.eyebrow': 'Travelling with us',
    'request.title': 'Somewhere else in mind?',
    'request.lead': 'The four above are a starting point, not a catalogue. Tell us how long you have and what pulls at you, and we will build the rest around it.',
    'request.closing': 'No forms. No deposit to talk it through. Just a message.',
    'gallery.eyebrow': 'Photos',
    'gallery.title': 'From the road.',
    'gallery.quotesEyebrow': 'Guests',
    'gallery.quotesTitle': 'What guests say.',
    'contact.eyebrow': 'Get in touch',
    'contact.title': 'Tell us where you want to wander.',
    'contact.lead': 'Fill this in and WhatsApp opens with your details already written. Nothing is sent until you press send.',
    'contact.name': 'Your name',
    'contact.namePlaceholder': 'e.g. Sofia',
    'contact.date': 'Date',
    'contact.people': 'How many of you',
    'contact.peoplePlaceholder': 'e.g. 2',
    'contact.destination': 'Where to',
    'contact.destinationRequest': 'Somewhere else',
    'contact.destinationPlaceholder': 'Choose one',
    'contact.message': 'Anything we should know',
    'contact.messagePlaceholder': 'Where you are staying, what you are hoping for, anyone who needs a gentler pace.',
    'contact.submit': 'Open WhatsApp',
    'contact.privacy': 'Opens WhatsApp in a new tab. We store nothing you type here.',
    'contact.required': 'Please fill this in.',
    'contact.reachUs': 'Or reach us directly',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.emailLabel': 'Email',
    'contact.hoursLabel': 'We reply',
    'contact.baseLabel': 'Based in',
    'footer.tagline': 'Escapes across Lombok and the Nusa Islands.',
    'footer.areas': 'Where we collect you',
    'footer.explore': 'Pages',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to top',
  },

  id: {
    'about.mapNote': 'Bukan peta — arah dan perkiraan jarak dari gunung. Semuanya dalam jarak sehari dari pesisir.',
    'map.alt': 'Diagram yang menunjukkan empat tempat tujuan kami, tersusun mengelilingi Rinjani menurut arah dan jaraknya.',
    'service.eyebrow': 'Perjalanan bersama kami',
    'service.title': 'Bagaimana harinya berjalan.',
    'service.lead': 'Tidak ada yang rumit di sini. Ini bagian yang kalau tidak, harus Anda urus sendiri.',
    'request.eyebrow': 'By request',
    'meta.title': 'wandrnusa — escape di Lombok dan Kepulauan Nusa',
    'meta.description': 'Lombok dan Kepulauan Nusa — sebuah gunung api, air terjun yang lahir darinya, dan desa-desa di antaranya.',
    'nav.home': 'Beranda',
    'nav.about': 'Pulau ini',
    'nav.tours': 'Escape',
    'nav.contact': 'Kontak',
    'nav.menu': 'Menu',
    'nav.skip': 'Lompat ke konten',
    'cta.whatsapp': 'WhatsApp',
    'cta.whatsappLong': 'Mulai atur lewat WhatsApp',
    'cta.askWhatsapp': 'Tanya escape ini',
    'cta.seeTours': 'Lihat tujuan kami',
    'cta.requestTrip': 'Sebutkan tujuannya',
    'cta.sendWhatsapp': 'Kirim via WhatsApp',
    'lang.label': 'Bahasa',
    'hero.eyebrow': 'Lombok · Kepulauan Nusa · Indonesia',
    'hero.lead': 'Sebuah gunung api, air terjun yang lahir darinya, dan desa-desa di antaranya — semuanya dalam jarak sehari dari tempat Anda menginap.',
    'hero.fact1': 'Gunung api di tengahnya',
    'hero.fact2': 'Air terjun di tiap lembah',
    'hero.fact3': 'Desa di tiap lereng',
    'about.eyebrow': 'Pulau ini',
    'about.title': 'Semuanya berdekatan di sini.',
    'about.pillarsLabel': 'Apa saja yang ada',
    'tours.eyebrow': 'Tujuan kami',
    'tours.title': 'Empat sisi dari satu pulau.',
    'tours.lead': 'Empat bagian Lombok yang sama sekali tidak mirip satu sama lain — lembah sejuk penuh terasering, dua air terjun di tengah pulau, hutan basah di utara, dan dataran tinggi di sisi timur.',
    'tours.noticeStrong': 'Kapan sebaiknya datang.',
    'tours.notice': 'Musim kemarau memberi cahaya bersih dan jalan yang mudah. Musim hujan memberi air terjun yang lebih deras dan terasering yang lebih hijau. Tidak ada separuh tahun yang buruk, hanya berbeda.',
    'tours.included': 'Termasuk',
    'tours.notIncluded': 'Tidak termasuk',
    'tours.route': 'Tempat yang dikunjungi',
    'tours.goodToKnow': 'Perlu diketahui',
    'tours.photoSoon': 'Foto menyusul',
    'service.eyebrow': 'Travelling with us',
    'request.title': 'Ada tempat lain di kepala Anda?',
    'request.lead': 'Empat di atas titik awal, bukan katalog. Bilang berapa lama waktu Anda dan apa yang menarik Anda, sisanya kami susun di sekitar itu.',
    'request.closing': 'Tanpa formulir. Tanpa DP untuk sekadar bicara. Cukup satu pesan.',
    'gallery.eyebrow': 'Foto',
    'gallery.title': 'Dari perjalanan.',
    'gallery.quotesEyebrow': 'Tamu',
    'gallery.quotesTitle': 'Kata tamu kami.',
    'contact.eyebrow': 'Hubungi kami',
    'contact.title': 'Ceritakan Anda ingin ke mana.',
    'contact.lead': 'Isi ini dan WhatsApp terbuka dengan data Anda sudah tertulis. Tidak ada yang terkirim sampai Anda tekan kirim.',
    'contact.name': 'Nama Anda',
    'contact.namePlaceholder': 'mis. Sofia',
    'contact.date': 'Tanggal',
    'contact.people': 'Berapa orang',
    'contact.peoplePlaceholder': 'mis. 2',
    'contact.destination': 'Tujuan',
    'contact.destinationRequest': 'Tempat lain',
    'contact.destinationPlaceholder': 'Pilih satu',
    'contact.message': 'Hal lain yang perlu kami tahu',
    'contact.messagePlaceholder': 'Menginap di mana, apa yang Anda harapkan, atau kalau ada yang butuh ritme lebih santai.',
    'contact.submit': 'Buka WhatsApp',
    'contact.privacy': 'Membuka WhatsApp di tab baru. Kami tidak menyimpan apa pun yang Anda ketik di sini.',
    'contact.required': 'Mohon diisi.',
    'contact.reachUs': 'Atau hubungi kami langsung',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.emailLabel': 'Email',
    'contact.hoursLabel': 'Jam balas',
    'contact.baseLabel': 'Basis kami',
    'footer.tagline': 'Escape keliling Lombok dan Kepulauan Nusa.',
    'footer.areas': 'Area penjemputan',
    'footer.explore': 'Halaman',
    'footer.contact': 'Kontak',
    'footer.follow': 'Ikuti',
    'footer.rights': 'Hak cipta dilindungi.',
    'footer.backToTop': 'Kembali ke atas',
  },
};

let current = DEFAULT_LANG;
const listeners = new Set();

/** Read the saved language, falling back to the browser's, then English. */
export function initLang() {
  let lang = null;
  try { lang = localStorage.getItem(STORAGE_KEY); } catch { /* private mode */ }
  if (!LANGS.includes(lang)) {
    const nav = (navigator.language || '').toLowerCase();
    lang = nav.startsWith('id') ? 'id' : DEFAULT_LANG;
  }
  current = lang;
  return current;
}

export const getLang = () => current;

export function setLang(lang) {
  if (!LANGS.includes(lang) || lang === current) return;
  current = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* private mode */ }
  listeners.forEach((fn) => fn(lang));
}

export const onLangChange = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

/** Look up a UI string by key. Falls back to English, then the key itself. */
export function t(key, lang = current) {
  return STRINGS[lang]?.[key] ?? STRINGS[DEFAULT_LANG][key] ?? key;
}

/** Resolve a bilingual value from the data files: { en, id } -> string. */
export function tr(value, lang = current) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] ?? value[DEFAULT_LANG] ?? '';
}

/** Apply the current language to all static markup carrying data-i18n. */
export function applyStaticStrings(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
  document.documentElement.lang = current;
  document.title = t('meta.title');
}
