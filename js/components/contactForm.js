/* ==========================================================================
   wandrnusa — booking form
   --------------------------------------------------------------------------
   Nothing is posted to a server. The form collects the details, formats them
   into a readable message and hands the visitor to WhatsApp with it already
   typed out. Destination options come from js/data/tours.js.
   ========================================================================== */

import { getTours } from '../data/tours.js';
import { t, tr, getLang } from '../i18n.js';
import { esc, $, $$ } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { waLink, waBookingMessage } from '../lib/whatsapp.js';

const REQUIRED = ['name', 'date', 'people', 'destination'];

export function renderContactForm() {
  const lang = getLang();
  const options = getTours()
    .map((tour) => `<option value="${esc(tr(tour.name, lang))}">${esc(tr(tour.name, lang))}</option>`)
    .join('');

  // Today, in the visitor's own timezone — stops past dates being picked.
  const today = new Date();
  const min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return `
    <form class="contact__form" id="booking-form" novalidate>
      <div class="contact__row">
        <div class="field">
          <label for="bf-name">${esc(t('contact.name'))}</label>
          <input id="bf-name" name="name" type="text" autocomplete="name"
                 placeholder="${esc(t('contact.namePlaceholder'))}" required>
          <span class="field-error" data-error-for="name"></span>
        </div>
        <div class="field">
          <label for="bf-date">${esc(t('contact.date'))}</label>
          <input id="bf-date" name="date" type="date" min="${min}" required>
          <span class="field-error" data-error-for="date"></span>
        </div>
      </div>

      <div class="contact__row">
        <div class="field">
          <label for="bf-people">${esc(t('contact.people'))}</label>
          <input id="bf-people" name="people" type="number" min="1" max="40" inputmode="numeric"
                 placeholder="${esc(t('contact.peoplePlaceholder'))}" required>
          <span class="field-error" data-error-for="people"></span>
        </div>
        <div class="field">
          <label for="bf-destination">${esc(t('contact.destination'))}</label>
          <select id="bf-destination" name="destination" required>
            <option value="" disabled selected>${esc(t('contact.destinationPlaceholder'))}</option>
            ${options}
            <option value="${esc(t('contact.destinationRequest'))}">${esc(t('contact.destinationRequest'))}</option>
          </select>
          <span class="field-error" data-error-for="destination"></span>
        </div>
      </div>

      <div class="field">
        <label for="bf-message">${esc(t('contact.message'))}</label>
        <textarea id="bf-message" name="message" rows="4"
                  placeholder="${esc(t('contact.messagePlaceholder'))}"></textarea>
      </div>

      <div class="contact__foot">
        <button class="btn btn-primary" type="submit">
          ${icon('whatsapp')}<span>${esc(t('contact.submit'))}</span>
        </button>
        <p class="caption">${esc(t('contact.privacy'))}</p>
      </div>
    </form>`;
}

/** Wire up validation and the WhatsApp hand-off. Safe to call after re-render. */
export function bindContactForm() {
  const form = $('#booking-form');
  if (!form) return;

  const setError = (name, message) => {
    const input = form.elements[name];
    const slot = $(`[data-error-for="${name}"]`, form);
    if (slot) slot.textContent = message || '';
    if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  $$('input, select, textarea', form).forEach((el) => {
    el.addEventListener('input', () => setError(el.name, ''));
    el.addEventListener('change', () => setError(el.name, ''));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const values = Object.fromEntries(
      ['name', 'date', 'people', 'destination', 'message']
        .map((k) => [k, (form.elements[k]?.value || '').trim()])
    );

    let firstInvalid = null;
    REQUIRED.forEach((name) => {
      const missing = !values[name];
      setError(name, missing ? t('contact.required') : '');
      if (missing && !firstInvalid) firstInvalid = form.elements[name];
    });

    if (firstInvalid) { firstInvalid.focus(); return; }

    const url = waLink(waBookingMessage(values, getLang()));
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url; // popup blocked — go directly
  });
}
