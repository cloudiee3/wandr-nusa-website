/* ==========================================================================
   wandrnusa — site configuration
   --------------------------------------------------------------------------
   This is the one file you edit for contact details. Everything on the page
   (header button, every tour card, the booking form, the footer) reads from
   here, so changing the number once changes it everywhere.
   ========================================================================== */

export const SITE = {
  name: 'wandrnusa',
  legalName: 'Wandr Nusa',
  tagline: 'Wander the islands. Leave the rest to us.',
  baseIn: 'Tetebatu, Lombok',
};

/* Country code + number, digits only — no "+", no spaces, no leading zero.
   Indonesia is 62, so 0823-4081-9128 becomes '6282340819128'. */
export const WHATSAPP_NUMBER = '6282340819128';

/* Shown to humans. Keep it in sync with the number above. */
export const WHATSAPP_DISPLAY = '+62 823-4081-9128';

export const CONTACT = {
  email: 'hello@wandrnusa.com',
  /* Where you actually operate from — shown in the footer. */
  address: 'Tetebatu, Sikur, East Lombok',
  region: 'West Nusa Tenggara, Indonesia',
  /* Google Maps link for the footer. Replace with your own pin. */
  mapUrl: 'https://maps.google.com/?q=Tetebatu,+Lombok',
  hours: 'Every day, 07.00 – 21.00 WITA',
};

export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', handle: '@wandrnusa', url: 'https://instagram.com/wandrnusa' },
  { id: 'tiktok',    label: 'TikTok',    handle: '@wandrnusa', url: 'https://tiktok.com/@wandrnusa' },
  { id: 'email',     label: 'Email',     handle: 'hello@wandrnusa.com', url: 'mailto:hello@wandrnusa.com' },
];

/* Villages and towns we pick up from / run trips through. Footer + hero. */
export const SERVICE_AREAS = [
  'Tetebatu', 'Sikur', 'Kotaraja', 'Sembalun', 'Senaru', 'Bayan',
  'Aik Berik', 'Batukliang', 'Mataram', 'Senggigi', 'Kuta Mandalika',
  'Lombok Intl. Airport (LOP)',
];

/* Default message used by CTAs that are not tied to a specific tour. */
export const DEFAULT_WA_MESSAGE = {
  en: 'Hello Wandr Nusa, I would like to ask about your private escapes.',
  id: 'Halo Wandr Nusa, saya ingin bertanya tentang private escape dari Wandr Nusa.',
};
