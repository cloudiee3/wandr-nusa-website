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
    'meta.description': 'Private one-day trips around Lombok — Tetebatu, Central Lombok, Senaru and Sembalun — run by guides from the villages you visit. Travel shaped by the people who live here.',

    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.tours': 'Tours',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.skip': 'Skip to content',

    'cta.whatsapp': 'WhatsApp',
    'cta.whatsappLong': 'Plan your trip on WhatsApp',
    'cta.askWhatsapp': 'Ask on WhatsApp',
    'cta.seeTours': 'See the tours',
    'cta.requestTrip': 'Tell us what you have in mind',
    'cta.sendWhatsapp': 'Send on WhatsApp',
    'lang.label': 'Language',

    'hero.eyebrow': 'Lombok · Nusa Tenggara',
    'hero.lead': 'Private one-day trips to Tetebatu, Central Lombok, Senaru and Sembalun — with guides who grew up on these roads.',
    'hero.fact1': 'Private trips only',
    'hero.fact2': 'Hotel pickup across Lombok',
    'hero.fact3': 'Based in Tetebatu',

    'about.eyebrow': 'About us',
    'about.title': 'We only take you where we already go.',
    'about.pillarsLabel': 'How we work',

    'tours.eyebrow': 'One-day trips',
    'tours.title': 'Four days out, each one private.',
    'tours.lead': 'Every trip below runs for your group alone and comes back the same day. Pick one, or ask us to change it — the itinerary is a starting point, not a rule.',
    'tours.noticeStrong': 'Every trip is a private trip.',
    'tours.notice': 'No shared departures and no fixed group. Prices depend on your group size and pickup point, so we discuss them on WhatsApp.',
    'tours.included': "What's included",
    'tours.route': 'Where you go',
    'tours.private': 'Private trip',
    'tours.goodToKnow': 'Good to know',

    'request.eyebrow': 'Tour by request',
    'request.title': 'Somewhere else? Tell us where.',
    'request.lead': 'The four trips above are what we run most weeks. They are not the limit. Send us the days you have and what you want out of them, and we will come back with an itinerary and a price.',
    'request.closing': 'No form to fill in, no deposit to talk it through. Just a message.',

    'gallery.eyebrow': 'From the road',
    'gallery.title': 'Days out, as they actually look.',
    'gallery.quotesEyebrow': 'Guests',
    'gallery.quotesTitle': 'What people said afterwards.',

    'contact.eyebrow': 'Booking',
    'contact.title': 'Start the conversation.',
    'contact.lead': 'Fill this in and it opens WhatsApp with your details already written out. Nothing is sent until you press send there.',
    'contact.name': 'Your name',
    'contact.namePlaceholder': 'e.g. Sofia',
    'contact.date': 'Trip date',
    'contact.people': 'How many people',
    'contact.peoplePlaceholder': 'e.g. 2',
    'contact.destination': 'Destination',
    'contact.destinationRequest': 'Tour by request / somewhere else',
    'contact.destinationPlaceholder': 'Choose a trip',
    'contact.message': 'Anything we should know',
    'contact.messagePlaceholder': 'Where you are staying, what you want out of the day, anyone in the group who needs an easier pace.',
    'contact.submit': 'Open WhatsApp with this',
    'contact.privacy': 'Opens WhatsApp in a new tab. We do not store anything you type here.',
    'contact.required': 'Please fill this in.',
    'contact.reachUs': 'Or reach us directly',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.emailLabel': 'Email',
    'contact.hoursLabel': 'We reply',
    'contact.baseLabel': 'Based in',

    'footer.tagline': 'Private one-day trips in Lombok, run by people from the villages you visit.',
    'footer.areas': 'Where we pick up',
    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to top',
  },

  id: {
    'meta.title': 'wandrnusa — private one-day trip di Lombok',
    'meta.description': 'Private one-day trip keliling Lombok — Tetebatu, Lombok Tengah, Senaru, dan Sembalun — dipandu warga desa yang Anda kunjungi. Travel shaped by the people who live here.',

    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.tours': 'Paket Tour',
    'nav.contact': 'Kontak',
    'nav.menu': 'Menu',
    'nav.skip': 'Lompat ke konten',

    'cta.whatsapp': 'WhatsApp',
    'cta.whatsappLong': 'Atur perjalanan lewat WhatsApp',
    'cta.askWhatsapp': 'Tanya via WhatsApp',
    'cta.seeTours': 'Lihat paket tour',
    'cta.requestTrip': 'Ceritakan rencana Anda',
    'cta.sendWhatsapp': 'Kirim via WhatsApp',
    'lang.label': 'Bahasa',

    'hero.eyebrow': 'Lombok · Nusa Tenggara',
    'hero.lead': 'Private one-day trip ke Tetebatu, Lombok Tengah, Senaru, dan Sembalun — bersama pemandu yang besar di jalan-jalan ini.',
    'hero.fact1': 'Semua private trip',
    'hero.fact2': 'Antar-jemput hotel se-Lombok',
    'hero.fact3': 'Berbasis di Tetebatu',

    'about.eyebrow': 'Tentang kami',
    'about.title': 'Kami hanya mengajak Anda ke tempat yang memang kami datangi.',
    'about.pillarsLabel': 'Cara kami bekerja',

    'tours.eyebrow': 'One-day trip',
    'tours.title': 'Empat hari perjalanan, semuanya privat.',
    'tours.lead': 'Semua trip di bawah ini khusus untuk rombongan Anda sendiri dan pulang di hari yang sama. Pilih salah satu, atau minta diubah — itinerary ini titik awal, bukan aturan.',
    'tours.noticeStrong': 'Semua trip adalah private trip.',
    'tours.notice': 'Tidak digabung rombongan lain dan tidak ada jadwal tetap. Harga tergantung jumlah peserta dan titik jemput, jadi kami bahas langsung di WhatsApp.',
    'tours.included': 'Sudah termasuk',
    'tours.route': 'Tempat yang dikunjungi',
    'tours.private': 'Private trip',
    'tours.goodToKnow': 'Perlu diketahui',

    'request.eyebrow': 'Tour by request',
    'request.title': 'Mau ke tempat lain? Bilang saja.',
    'request.lead': 'Empat trip di atas yang paling sering kami jalankan. Tapi bukan batasnya. Kirimkan berapa hari yang Anda punya dan apa yang Anda cari, nanti kami balas dengan itinerary dan harganya.',
    'request.closing': 'Tidak perlu isi formulir, tidak perlu DP untuk sekadar berdiskusi. Cukup kirim pesan.',

    'gallery.eyebrow': 'Dari perjalanan',
    'gallery.title': 'Suasana harinya, apa adanya.',
    'gallery.quotesEyebrow': 'Tamu kami',
    'gallery.quotesTitle': 'Kata mereka setelah pulang.',

    'contact.eyebrow': 'Pemesanan',
    'contact.title': 'Mulai obrolannya.',
    'contact.lead': 'Isi form ini dan WhatsApp akan terbuka dengan data Anda sudah tertulis. Tidak ada yang terkirim sampai Anda tekan kirim di sana.',
    'contact.name': 'Nama Anda',
    'contact.namePlaceholder': 'mis. Sofia',
    'contact.date': 'Tanggal trip',
    'contact.people': 'Jumlah orang',
    'contact.peoplePlaceholder': 'mis. 2',
    'contact.destination': 'Destinasi',
    'contact.destinationRequest': 'Tour by request / tempat lain',
    'contact.destinationPlaceholder': 'Pilih trip',
    'contact.message': 'Hal lain yang perlu kami tahu',
    'contact.messagePlaceholder': 'Menginap di mana, apa yang dicari dari hari itu, atau kalau ada yang butuh ritme lebih santai.',
    'contact.submit': 'Buka WhatsApp dengan data ini',
    'contact.privacy': 'Membuka WhatsApp di tab baru. Kami tidak menyimpan apa pun yang Anda ketik di sini.',
    'contact.required': 'Mohon diisi.',
    'contact.reachUs': 'Atau hubungi kami langsung',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.emailLabel': 'Email',
    'contact.hoursLabel': 'Jam balas',
    'contact.baseLabel': 'Basis kami',

    'footer.tagline': 'Private one-day trip di Lombok, dijalankan oleh warga desa yang Anda kunjungi.',
    'footer.areas': 'Area penjemputan',
    'footer.explore': 'Jelajahi',
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
