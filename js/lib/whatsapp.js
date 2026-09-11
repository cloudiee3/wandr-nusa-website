/* ==========================================================================
   wandrnusa — WhatsApp link builder
   --------------------------------------------------------------------------
   Every primary CTA on the site goes through here, so the number and the
   message format are defined in exactly one place.
   ========================================================================== */

import { WHATSAPP_NUMBER, DEFAULT_WA_MESSAGE } from '../config.js';
import { getLang, tr } from '../i18n.js';

/** Digits only — wa.me rejects "+", spaces and dashes. */
const normalise = (n) => String(n).replace(/\D/g, '');

/**
 * Build a wa.me link with a pre-filled message.
 * @param {string} [message] Plain text. Line breaks are preserved.
 */
export function waLink(message) {
  const number = normalise(WHATSAPP_NUMBER);
  const text = message || tr(DEFAULT_WA_MESSAGE, getLang());
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Message used by a tour card's "Ask on WhatsApp" button. */
export function waTourMessage(tour, lang = getLang()) {
  const name = tr(tour.name, lang);
  return lang === 'id'
    ? `Halo Wandr Nusa, saya tertarik dengan "${name}" (private one-day trip). Boleh minta info ketersediaan dan harganya?`
    : `Hello Wandr Nusa, I am interested in the "${name}" private one-day trip. Could you tell me about availability and price?`;
}

/** Message used by the "Tour by request" section. */
export function waRequestMessage(lang = getLang()) {
  return lang === 'id'
    ? 'Halo Wandr Nusa, saya ingin mengatur tour by request. Rencana saya kira-kira seperti ini:'
    : 'Hello Wandr Nusa, I would like to arrange a tour by request. Here is roughly what I have in mind:';
}

/**
 * Message built from the booking form.
 * Kept as labelled lines so it is readable in the WhatsApp thread.
 */
export function waBookingMessage(values, lang = getLang()) {
  const L = lang === 'id'
    ? { intro: 'Halo Wandr Nusa, saya ingin memesan private trip.', name: 'Nama', date: 'Tanggal', people: 'Jumlah orang', dest: 'Destinasi', note: 'Catatan' }
    : { intro: 'Hello Wandr Nusa, I would like to book a private trip.', name: 'Name', date: 'Date', people: 'People', dest: 'Destination', note: 'Notes' };

  const lines = [L.intro, ''];
  if (values.name)        lines.push(`${L.name}: ${values.name}`);
  if (values.date)        lines.push(`${L.date}: ${values.date}`);
  if (values.people)      lines.push(`${L.people}: ${values.people}`);
  if (values.destination) lines.push(`${L.dest}: ${values.destination}`);
  if (values.message)     lines.push('', `${L.note}: ${values.message}`);
  return lines.join('\n');
}
