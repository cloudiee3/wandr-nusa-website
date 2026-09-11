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
    'meta.title': 'wandrnusa — private escapes in Lombok and the Nusa Islands',
    'meta.description': 'Private escapes across Lombok and the Nusa Islands. Yours alone, planned around you, and never sold by the seat.',
    'nav.home': 'Home',
    'nav.about': 'About',
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
    'hero.lead': 'Private escapes across Lombok and the Nusa Islands — yours alone, planned around you, never sold by the seat.',
    'hero.fact1': 'Never a shared group',
    'hero.fact2': 'Collected from your door',
    'hero.fact3': 'Planned around you',
    'about.eyebrow': 'About us',
    'about.title': 'We make the wandering easy.',
    'about.pillarsLabel': 'How we work',
    'tours.eyebrow': 'Where we go',
    'tours.title': 'Four escapes to begin with.',
    'tours.lead': 'Start here, or start somewhere else entirely. Every route can be moved, stretched or swapped — it is written down so you have something to change, not something to follow.',
    'tours.noticeStrong': 'Every escape is yours alone.',
    'tours.notice': 'No shared seats, no fixed departure, no strangers. What it costs depends on your group and where we collect you, so we settle that between us.',
    'tours.included': 'Included',
    'tours.notIncluded': 'Not included',
    'tours.route': 'Where you go',
    'tours.private': 'Private',
    'tours.goodToKnow': 'Good to know',
    'tours.photoSoon': 'Photo coming soon',
    'request.eyebrow': 'By request',
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
    'footer.tagline': 'Private escapes across Lombok and the Nusa Islands.',
    'footer.areas': 'Where we collect you',
    'footer.explore': 'Pages',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to top',
  },

  id: {
    'meta.title': 'wandrnusa — private escape di Lombok dan Kepulauan Nusa',
    'meta.description': 'Private escape keliling Lombok dan Kepulauan Nusa. Khusus rombongan Anda, disusun sesuai keinginan Anda, tidak pernah dijual per kursi.',
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
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
    'hero.lead': 'Private escape keliling Lombok dan Kepulauan Nusa — khusus rombongan Anda, disusun sesuai keinginan Anda, tidak dijual per kursi.',
    'hero.fact1': 'Tidak pernah digabung',
    'hero.fact2': 'Dijemput dari tempat Anda',
    'hero.fact3': 'Disusun untuk Anda',
    'about.eyebrow': 'Tentang kami',
    'about.title': 'Kami yang urus, Anda tinggal jalan.',
    'about.pillarsLabel': 'Cara kami bekerja',
    'tours.eyebrow': 'Tujuan kami',
    'tours.title': 'Empat escape untuk memulai.',
    'tours.lead': 'Mulai dari sini, atau dari tempat lain sama sekali. Setiap rute bisa digeser, diperpanjang, atau diganti — ini ditulis supaya ada yang bisa Anda ubah, bukan yang harus diikuti.',
    'tours.noticeStrong': 'Setiap escape hanya milik Anda.',
    'tours.notice': 'Tanpa kursi berbagi, tanpa jadwal tetap, tanpa orang asing. Biayanya tergantung jumlah rombongan dan titik jemput, jadi kita bicarakan berdua.',
    'tours.included': 'Termasuk',
    'tours.notIncluded': 'Tidak termasuk',
    'tours.route': 'Tempat yang dikunjungi',
    'tours.private': 'Privat',
    'tours.goodToKnow': 'Perlu diketahui',
    'tours.photoSoon': 'Foto menyusul',
    'request.eyebrow': 'By request',
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
    'footer.tagline': 'Private escape keliling Lombok dan Kepulauan Nusa.',
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
