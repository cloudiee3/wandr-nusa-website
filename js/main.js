/* ==========================================================================
   wandrnusa — entry point
   Renders every data-driven block, then re-renders on a language change.
   ========================================================================== */

import { initLang, setLang, getLang, onLangChange, applyStaticStrings } from './i18n.js';
import { SITE, WHATSAPP_DISPLAY, CONTACT } from './config.js';
import { $, $$, mount, observeReveals } from './lib/dom.js';
import { icon } from './lib/icons.js';
import { waLink, waRequestMessage } from './lib/whatsapp.js';
import { renderTours } from './components/tours.js';
import {
  renderAboutBody, renderAboutStatement, renderHighlights, renderRequestPoints,
  renderGallery, hasGallery, renderTestimonials, hasTestimonials, renderService,
  renderServiceAreas, renderSocials, renderFooterContact,
} from './components/sections.js';
import { renderContactForm, bindContactForm } from './components/contactForm.js';
import { initHeader } from './components/header.js';
import { renderMap } from './components/map.js';

/* ---- Things that only need doing once ----------------------------------- */

function paintIcons() {
  $$('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
}

function paintStaticContact() {
  $$('[data-wa-display]').forEach((el) => { el.textContent = WHATSAPP_DISPLAY; });
  $$('[data-contact-email]').forEach((el) => {
    el.textContent = CONTACT.email;
    if (el.tagName === 'A') el.href = `mailto:${CONTACT.email}`;
  });
  $$('[data-contact-hours]').forEach((el) => { el.textContent = CONTACT.hours; });
  $$('[data-contact-base]').forEach((el) => { el.textContent = `${CONTACT.address}, ${CONTACT.region}`; });
  $$('[data-site-name]').forEach((el) => { el.textContent = SITE.name; });
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
}

/* ---- Everything that depends on the current language --------------------- */

function renderAll() {
  applyStaticStrings();

  mount('#about-statement', renderAboutStatement());
  mount('#about-body', renderAboutBody());
  mount('#highlights', renderHighlights());
  mount('#map', renderMap());
  mount('#tour-grid', renderTours());
  mount('#request-points', renderRequestPoints());
  mount('#service-grid', renderService());

  // Photos and reviews each appear only once there is real material for them,
  // and the whole section drops out if neither has any.
  const photos = hasGallery();
  const reviews = hasTestimonials();
  if (photos) mount('#gallery-grid', renderGallery());
  if (reviews) mount('#quotes', renderTestimonials());
  const galleryBlock = $('#gallery-block');
  const quotesBlock = $('#quotes-block');
  if (galleryBlock) galleryBlock.hidden = !photos;
  if (quotesBlock) quotesBlock.hidden = !reviews;
  const gallerySection = $('#gallery');
  if (gallerySection) gallerySection.hidden = !(photos || reviews);

  mount('#contact-form-mount', renderContactForm());
  bindContactForm();

  mount('#footer-areas', renderServiceAreas());
  mount('#footer-socials', renderSocials());
  mount('#footer-contact', renderFooterContact());

  // Generic WhatsApp CTAs (hero, header, footer, floating button)
  $$('[data-wa]').forEach((el) => {
    el.href = el.dataset.wa === 'request' ? waLink(waRequestMessage(getLang())) : waLink();
  });

  paintIcons();
  observeReveals();
}

/* ---- Language toggle ----------------------------------------------------- */

function initLangToggle() {
  const buttons = $$('.lang button');
  const sync = () => buttons.forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.lang === getLang())));

  buttons.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
  onLangChange(() => { sync(); renderAll(); });
  sync();
}

/* ---- Boot ---------------------------------------------------------------- */

function boot() {
  initLang();
  paintStaticContact();
  renderAll();
  initLangToggle();
  initHeader();

  $('#back-to-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
