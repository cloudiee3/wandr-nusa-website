/* ==========================================================================
   wandrnusa — smaller rendered blocks (about, pillars, request list,
   photos, guest reviews, footer lists)
   ========================================================================== */

import { PILLARS, SERVICE, ABOUT, REQUEST, GALLERY, TESTIMONIALS } from '../data/content.js';
import { SERVICE_AREAS, SOCIALS, CONTACT, WHATSAPP_DISPLAY } from '../config.js';
import { t, tr, getLang } from '../i18n.js';
import { esc } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { waLink } from '../lib/whatsapp.js';

/* A photo grid needs enough pictures to read as a grid. Below this it looks
   like something failed to load, so the block hides instead. */
const MIN_GALLERY = 3;

/* ---- About -------------------------------------------------------------- */

export const renderAboutStatement = () => esc(tr(ABOUT.statement, getLang()));

export const renderAboutBody = () =>
  (tr(ABOUT.body, getLang()) || []).map((p) => `<p>${esc(p)}</p>`).join('');

/* ---- Four pillars ------------------------------------------------------- */

export function renderPillars() {
  const lang = getLang();
  return PILLARS.map((p, i) => `
    <div class="pillar reveal" data-reveal-delay="${i * 80}">
      <h3>${esc(tr(p.title, lang))}</h3>
      <p>${esc(tr(p.body, lang))}</p>
    </div>`).join('');
}

/* ---- Travelling with us -------------------------------------------------- */

export function renderService() {
  const lang = getLang();
  return SERVICE.map((item, i) => `
    <div class="pillar reveal" data-reveal-delay="${i * 80}">
      <h3>${esc(tr(item.title, lang))}</h3>
      <p>${esc(tr(item.body, lang))}</p>
    </div>`).join('');
}

/* ---- Tour by request ---------------------------------------------------- */

export const renderRequestPoints = () =>
  REQUEST.points.map((p) => `
    <li>${icon('check')}<span>${esc(tr(p, getLang()))}</span></li>`).join('');

/* ---- Photos ------------------------------------------------------------- */

export const hasGallery = () => GALLERY.length >= MIN_GALLERY;

export function renderGallery() {
  const lang = getLang();
  return GALLERY.map((g, i) => `
    <figure class="gallery-item reveal" data-reveal-delay="${i * 70}">
      <div class="frame frame-${esc(g.ratio || '4x3')}">
        <img src="${esc(g.src)}" alt="${esc(tr(g.alt, lang))}" loading="lazy" decoding="async">
      </div>
    </figure>`).join('');
}

/* ---- Guest reviews ------------------------------------------------------ */

export const hasTestimonials = () => TESTIMONIALS.length > 0;

export function renderTestimonials() {
  const lang = getLang();
  return TESTIMONIALS.map((q, i) => `
    <blockquote class="quote reveal" data-reveal-delay="${i * 80}">
      <p class="quote__text">${esc(tr(q.quote, lang))}</p>
      <footer class="quote__meta">
        <cite class="quote__name">${esc(q.name)}</cite>
        ${q.meta ? esc(tr(q.meta, lang)) : ''}
      </footer>
    </blockquote>`).join('');
}

/* ---- Footer ------------------------------------------------------------- */

export const renderServiceAreas = () =>
  SERVICE_AREAS.map((a) => `<span>${esc(a)}</span>`).join('');

export const renderSocials = () =>
  SOCIALS.map((s) => `
    <a href="${esc(s.url)}" target="_blank" rel="noopener me"
       aria-label="${esc(s.label)} — ${esc(s.handle)}" title="${esc(s.handle)}">
      ${icon(s.id === 'email' ? 'mail' : s.id)}
    </a>`).join('');

export const renderFooterContact = () => `
  <li><a href="${esc(waLink())}" target="_blank" rel="noopener">${esc(WHATSAPP_DISPLAY)}</a></li>
  <li><a href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a></li>
  <li><a href="${esc(CONTACT.mapUrl)}" target="_blank" rel="noopener">${esc(CONTACT.address)}</a></li>
  <li>${esc(CONTACT.region)}</li>
  <li>${esc(CONTACT.hours)}</li>`;
