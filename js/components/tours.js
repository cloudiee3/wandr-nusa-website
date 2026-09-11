/* ==========================================================================
   wandrnusa — tour cards
   Rendered from js/data/tours.js. Add a destination there, not here.
   ========================================================================== */

import { getTours } from '../data/tours.js';
import { t, tr, getLang } from '../i18n.js';
import { esc } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { waLink, waTourMessage } from '../lib/whatsapp.js';

function includedList(tour, lang) {
  const items = tr(tour.included, lang) || [];
  return `
    <div class="included">
      <p class="included__label">${esc(t('tours.included'))}</p>
      <ul class="included__list">
        ${items.map((item) => `<li>${esc(item)}</li>`).join('')}
      </ul>
    </div>`;
}

function routeList(tour, lang) {
  const items = tr(tour.route, lang) || [];
  if (!items.length) return '';
  return `
    <div>
      <p class="included__label">${esc(t('tours.route'))}</p>
      <ul class="route">${items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>`;
}

export function tourCard(tour, index = 0) {
  const lang = getLang();
  const name = tr(tour.name, lang);
  const note = tr(tour.note, lang);

  return `
    <article class="tour-card reveal" data-reveal-delay="${index * 90}" id="tour-${esc(tour.id)}">
      <div class="tour-card__media">
        <div class="frame frame-3x2">
          <img src="${esc(tour.image)}"
               data-fallback="${esc(tour.placeholder)}"
               alt="${esc(tr(tour.alt, lang))}"
               loading="lazy" decoding="async" width="1600" height="1067">
        </div>
        ${tour.private ? `<span class="pill pill-private tour-card__badge">${esc(t('tours.private'))}</span>` : ''}
      </div>

      <div class="tour-card__body">
        <p class="tour-card__region">${esc(tr(tour.region, lang))}</p>
        <h3 class="tour-card__title">${esc(name)}</h3>

        <div class="tour-card__meta">
          <span>${icon('clock')}${esc(tr(tour.duration, lang))}</span>
          <span>${icon('footsteps')}${esc(tr(tour.effort, lang))}</span>
        </div>

        <p class="tour-card__desc">${esc(tr(tour.description, lang))}</p>

        ${routeList(tour, lang)}
        ${includedList(tour, lang)}
        ${note ? `<p class="tour-card__note"><strong>${esc(t('tours.goodToKnow'))}:</strong> ${esc(note)}</p>` : ''}

        <div class="tour-card__cta">
          <a class="btn btn-primary btn-block"
             href="${esc(waLink(waTourMessage(tour, lang)))}"
             target="_blank" rel="noopener"
             aria-label="${esc(`${t('cta.askWhatsapp')} — ${name}`)}">
            ${icon('whatsapp')}<span>${esc(t('cta.askWhatsapp'))}</span>
          </a>
        </div>
      </div>
    </article>`;
}

export const renderTours = () => getTours().map((tour, i) => tourCard(tour, i)).join('');
