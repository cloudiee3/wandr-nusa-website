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
    'meta.title': 'wandrnusa — private one-day trips in Lombok',
    'meta.description': 'Private one-day trips in Lombok: Tetebatu, Central Lombok, Senaru and Sembalun. Your own car and guide, home the same day.',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.tours': 'Trips',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.skip': 'Skip to content',
    'cta.whatsapp': 'WhatsApp',
    'cta.whatsappLong': 'Message us on WhatsApp',
    'cta.askWhatsapp': 'Ask about this trip',
    'cta.seeTours': 'See the trips',
    'cta.requestTrip': 'Tell us your plan',
    'cta.sendWhatsapp': 'Send on WhatsApp',
    'lang.label': 'Language',
    'hero.eyebrow': 'Lombok · Nusa Tenggara',
    'hero.lead': 'Private one-day trips in Lombok. Your own car, your own guide, home the same day.',
    'hero.fact1': 'Private trips only',
    'hero.fact2': 'Hotel pickup across Lombok',
    'hero.fact3': 'Based in Tetebatu',
    'about.eyebrow': 'About us',
    'about.title': 'Your guide is from the village you visit.',
    'about.pillarsLabel': 'How we work',
    'tours.eyebrow': 'One-day trips',
    'tours.title': 'Four places we know well.',
    'tours.lead': 'Each trip is for your group alone and comes back the same day. Ask us to change the route if you want — it is a starting point, not a rule.',
    'tours.noticeStrong': 'Every trip is private.',
    'tours.notice': 'No shared departures. Price depends on how many people you are and where we pick you up, so we talk about it on WhatsApp.',
    'tours.included': 'What\'s included',
    'tours.route': 'Where you go',
    'tours.private': 'Private trip',
    'tours.goodToKnow': 'Good to know',
    'tours.photoSoon': 'Photo coming soon',
    'request.eyebrow': 'Tour by request',
    'request.title': 'Want to go somewhere else?',
    'request.lead': 'These four are what we run most often. They are not the only thing we can do. Tell us how many days you have and what you want to see, and we will send back a plan and a price.',
    'request.closing': 'No form, no deposit to talk it through. Just send a message.',
    'gallery.eyebrow': 'Photos',
    'gallery.title': 'From our trips.',
    'gallery.quotesEyebrow': 'Guests',
    'gallery.quotesTitle': 'What guests say.',
    'contact.eyebrow': 'Booking',
    'contact.title': 'Send us a message.',
    'contact.lead': 'Fill this in and WhatsApp opens with your details already written. Nothing is sent until you press send there.',
    'contact.name': 'Your name',
    'contact.namePlaceholder': 'e.g. Sofia',
    'contact.date': 'Trip date',
    'contact.people': 'How many people',
    'contact.peoplePlaceholder': 'e.g. 2',
    'contact.destination': 'Which trip',
    'contact.destinationRequest': 'Somewhere else',
    'contact.destinationPlaceholder': 'Choose a trip',
    'contact.message': 'Anything we should know',
    'contact.messagePlaceholder': 'Where you are staying, what you want from the day, anyone who needs an easier pace.',
    'contact.submit': 'Open WhatsApp',
    'contact.privacy': 'Opens WhatsApp in a new tab. We do not store what you type here.',
    'contact.required': 'Please fill this in.',
    'contact.reachUs': 'Or contact us directly',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.emailLabel': 'Email',
    'contact.hoursLabel': 'We reply',
    'contact.baseLabel': 'Based in',
    'footer.tagline': 'Private one-day trips in Lombok, run by people from the villages you visit.',
    'footer.areas': 'Where we pick up',
    'footer.explore': 'Pages',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to top',
  },

  id: {
    'meta.title': 'wandrnusa — private one-day trip di Lombok',
    'meta.description': 'Private one-day trip di Lombok: Tetebatu, Lombok Tengah, Senaru, dan Sembalun. Mobil dan pemandu sendiri, pulang hari itu juga.',
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.tours': 'Trip',
    'nav.contact': 'Kontak',
    'nav.menu': 'Menu',
    'nav.skip': 'Lompat ke konten',
    'cta.whatsapp': 'WhatsApp',
    'cta.whatsappLong': 'Hubungi kami di WhatsApp',
    'cta.askWhatsapp': 'Tanya trip ini',
    'cta.seeTours': 'Lihat trip',
    'cta.requestTrip': 'Ceritakan rencana Anda',
    'cta.sendWhatsapp': 'Kirim via WhatsApp',
    'lang.label': 'Bahasa',
    'hero.eyebrow': 'Lombok · Nusa Tenggara',
    'hero.lead': 'Private one-day trip di Lombok. Mobil sendiri, pemandu sendiri, pulang hari itu juga.',
    'hero.fact1': 'Semua private trip',
    'hero.fact2': 'Jemput hotel se-Lombok',
    'hero.fact3': 'Basis di Tetebatu',
    'about.eyebrow': 'Tentang kami',
    'about.title': 'Pemandu Anda orang desa yang Anda kunjungi.',
    'about.pillarsLabel': 'Cara kami bekerja',
    'tours.eyebrow': 'One-day trip',
    'tours.title': 'Empat tempat yang kami kenal betul.',
    'tours.lead': 'Setiap trip khusus rombongan Anda dan pulang di hari yang sama. Mau ubah rutenya? Bilang saja — ini titik awal, bukan aturan.',
    'tours.noticeStrong': 'Semua trip privat.',
    'tours.notice': 'Tidak digabung rombongan lain. Harga tergantung berapa orang dan titik jemputnya, jadi kami bahas langsung di WhatsApp.',
    'tours.included': 'Sudah termasuk',
    'tours.route': 'Tempat yang dikunjungi',
    'tours.private': 'Private trip',
    'tours.goodToKnow': 'Perlu diketahui',
    'tours.photoSoon': 'Foto menyusul',
    'request.eyebrow': 'Tour by request',
    'request.title': 'Mau ke tempat lain?',
    'request.lead': 'Empat trip di atas yang paling sering kami jalankan, tapi bukan satu-satunya. Bilang berapa hari yang Anda punya dan mau lihat apa, nanti kami kirim rencana dan harganya.',
    'request.closing': 'Tidak perlu isi formulir, tidak perlu DP untuk tanya-tanya. Kirim pesan saja.',
    'gallery.eyebrow': 'Foto',
    'gallery.title': 'Dari perjalanan kami.',
    'gallery.quotesEyebrow': 'Tamu',
    'gallery.quotesTitle': 'Kata tamu kami.',
    'contact.eyebrow': 'Pemesanan',
    'contact.title': 'Kirim pesan ke kami.',
    'contact.lead': 'Isi form ini, WhatsApp akan terbuka dengan data Anda sudah tertulis. Tidak ada yang terkirim sampai Anda tekan kirim di sana.',
    'contact.name': 'Nama Anda',
    'contact.namePlaceholder': 'mis. Sofia',
    'contact.date': 'Tanggal trip',
    'contact.people': 'Berapa orang',
    'contact.peoplePlaceholder': 'mis. 2',
    'contact.destination': 'Trip yang mana',
    'contact.destinationRequest': 'Tempat lain',
    'contact.destinationPlaceholder': 'Pilih trip',
    'contact.message': 'Hal lain yang perlu kami tahu',
    'contact.messagePlaceholder': 'Menginap di mana, mau apa dari hari itu, atau kalau ada yang butuh ritme lebih santai.',
    'contact.submit': 'Buka WhatsApp',
    'contact.privacy': 'Membuka WhatsApp di tab baru. Kami tidak menyimpan apa pun yang Anda ketik di sini.',
    'contact.required': 'Mohon diisi.',
    'contact.reachUs': 'Atau hubungi kami langsung',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.emailLabel': 'Email',
    'contact.hoursLabel': 'Jam balas',
    'contact.baseLabel': 'Basis kami',
    'footer.tagline': 'Private one-day trip di Lombok, dijalankan warga dari desa yang Anda kunjungi.',
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
