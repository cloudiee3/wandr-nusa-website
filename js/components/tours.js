/* ==========================================================================
   wandrnusa — trip cards
   Rendered from js/data/tours.js. Add a trip there, not here.
   ========================================================================== */

import { getTours } from '../data/tours.js';
import { t, tr, getLang } from '../i18n.js';
import { esc } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { waLink, waTourMessage } from '../lib/whatsapp.js';

/**
 * A trip with no photograph yet gets a plain branded panel, not a picture of
 * somewhere else and not an illustration pretending to be one.
 */
function media(tour, lang) {
  if (!tour.photo) {
    return `
      <div class="frame frame-3x2 frame-empty">
        <span class="frame-empty__mark" aria-hidden="true">${icon('mark')}</span>
        <span class="frame-empty__label">${esc(t('tours.photoSoon'))}</span>
      </div>`;
  }
  return `
    <div class="frame frame-3x2">
      <img src="${esc(tour.photo)}" alt="${esc(tr(tour.alt, lang))}"
           loading="lazy" decoding="async" width="1600" height="1067">
    </div>`;
}

function list(label, items, modifier = '') {
  if (!items || !items.length) return '';
  return `
    <div class="card-list ${modifier}">
      <p class="label">${esc(label)}</p>
      <ul class="card-list__items">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>`;
}

export function tourCard(tour, index = 0) {
  const lang = getLang();
  const name = tr(tour.name, lang);
  const note = tr(tour.note, lang);

  return `
    <article class="tour-card reveal" data-reveal-delay="${index * 90}" id="trip-${esc(tour.id)}">
      <div class="tour-card__media">
        ${media(tour, lang)}
      </div>

      <div class="tour-card__body">
        <p class="tour-card__region">${esc(tr(tour.region, lang))}</p>
        <h3 class="tour-card__title">${esc(name)}</h3>

        <div class="tour-card__meta">
          <span>${icon('clock')}${esc(tr(tour.duration, lang))}</span>
          <span>${icon('footsteps')}${esc(tr(tour.effort, lang))}</span>
        </div>

        <p class="tour-card__desc">${esc(tr(tour.description, lang))}</p>

        ${list(t('tours.route'), tr(tour.route, lang))}
        ${list(t('tours.included'), tr(tour.included, lang))}
        ${list(t('tours.notIncluded'), tr(tour.notIncluded, lang), 'card-list--excluded')}
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
