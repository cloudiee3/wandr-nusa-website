/* ==========================================================================
   wandrnusa — smaller rendered blocks (pillars, request list, gallery,
   testimonials, footer lists)
   ========================================================================== */

import { PILLARS, ABOUT, REQUEST, GALLERY, TESTIMONIALS } from '../data/content.js';
import { SERVICE_AREAS, SOCIALS, CONTACT, WHATSAPP_DISPLAY } from '../config.js';
import { t, tr, getLang } from '../i18n.js';
import { esc } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { waLink } from '../lib/whatsapp.js';

/* ---- About ------------------------------------------------------------- */

export function renderAboutBody() {
  const paras = tr(ABOUT.body, getLang()) || [];
  return paras.map((p) => `<p>${esc(p)}</p>`).join('');
}

export const renderAboutStatement = () => esc(tr(ABOUT.statement, getLang()));

/* ---- Four pillars ------------------------------------------------------- */

export function renderPillars() {
  const lang = getLang();
  return PILLARS.map((p, i) => `
    <div class="pillar reveal" data-reveal-delay="${i * 80}">
      <span class="pillar__num">${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(tr(p.title, lang))}</h3>
      <p>${esc(tr(p.body, lang))}</p>
    </div>`).join('');
}

/* ---- Tour by request ---------------------------------------------------- */

export function renderRequestPoints() {
  const lang = getLang();
  return REQUEST.points.map((p) => `
    <li>${icon('check')}<span>${esc(tr(p, lang))}</span></li>`).join('');
}

/* ---- Gallery ------------------------------------------------------------ */

export function renderGallery() {
  const lang = getLang();
  return GALLERY.map((g, i) => `
    <figure class="gallery-item${g.span ? ` gallery-item--${esc(g.span)}` : ''}${g.stretch ? ' gallery-item--stretch' : ''} reveal"
            data-reveal-delay="${i * 70}">
      <div class="frame frame-${esc(g.ratio || '4x3')}">
        <img src="${esc(g.src)}" data-fallback="${esc(g.placeholder)}"
             alt="${esc(tr(g.alt, lang))}" loading="lazy" decoding="async">
      </div>
    </figure>`).join('');
}

/* ---- Testimonials ------------------------------------------------------- */

export function renderTestimonials() {
  const lang = getLang();
  if (!TESTIMONIALS.length) return '';

  if (TESTIMONIALS.some((q) => q.sample)) {
    console.warn(
      '[wandrnusa] Placeholder testimonials are still live. Replace them in ' +
      'js/data/content.js with real guest reviews before launch.'
    );
  }

  return TESTIMONIALS.map((q, i) => `
    <blockquote class="quote reveal" data-reveal-delay="${i * 80}">
      <span class="quote__mark" aria-hidden="true">&ldquo;</span>
      <p class="quote__text">${esc(tr(q.quote, lang))}</p>
      <footer class="quote__meta">
        <cite class="quote__name">${esc(q.name)}</cite>
        ${q.meta ? esc(tr(q.meta, lang)) : ''}
      </footer>
    </blockquote>`).join('');
}

/** True when the testimonials block has nothing to show. */
export const hasTestimonials = () => TESTIMONIALS.length > 0;

/* ---- Footer ------------------------------------------------------------- */

export const renderServiceAreas = () =>
  SERVICE_AREAS.map((a) => `<span>${esc(a)}</span>`).join('');

export const renderSocials = () =>
  SOCIALS.map((s) => `
    <a href="${esc(s.url)}" target="_blank" rel="noopener me"
       aria-label="${esc(s.label)} — ${esc(s.handle)}" title="${esc(s.handle)}">
      ${icon(s.id === 'email' ? 'mail' : s.id)}
    </a>`).join('');

export function renderFooterContact() {
  return `
    <li>
      <a href="${esc(waLink())}" target="_blank" rel="noopener">
        ${esc(t('contact.whatsappLabel'))} · ${esc(WHATSAPP_DISPLAY)}
      </a>
    </li>
    <li><a href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a></li>
    <li>
      <a href="${esc(CONTACT.mapUrl)}" target="_blank" rel="noopener">
        ${esc(CONTACT.address)}
      </a>
    </li>
    <li>${esc(CONTACT.region)}</li>
    <li>${esc(CONTACT.hours)}</li>`;
}
