/* ==========================================================================
   wandrnusa — the islands explorer
   --------------------------------------------------------------------------
   Ten things the islands have, shown one at a time. Pick one from the list
   and the panel changes. Replaces a grid of ten small static tiles, which
   showed everything at once and gave you no reason to look at any of it.

   It also handles the missing photographs better: one empty panel at a time
   instead of six holes in a grid.

   Layout note: picture and caption sit side by side; all ten labels run in a
   wrapped row beneath, spanning both. A ruled ten-row index read like a
   table — ten seams down the page for something that is really one choice.
   As a wrapped row it is one or two lines, with no rules at all.

   The tabpanel is the caption rather than the picture: on a screen reader,
   choosing an item should read out what the place is, not just "image".

   Content lives in HIGHLIGHTS in js/data/content.js.
   ========================================================================== */

import { HIGHLIGHTS } from '../data/content.js';
import { t, tr, getLang } from '../i18n.js';
import { esc, $, $$ } from '../lib/dom.js';
import { icon } from '../lib/icons.js';

/* 1 → "01". Two digits reads as a set; "1 / 10" reads as a stray number. */
const pad = (n) => String(n).padStart(2, '0');

export function renderIslands() {
  const lang = getLang();
  const total = pad(HIGHLIGHTS.length);

  const media = HIGHLIGHTS.map((h, i) => {
    const label = esc(tr(h.label, lang));
    const inner = h.photo
      ? `<img src="${esc(h.photo)}" alt="${label}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async">`
      : `<span class="frame-empty__mark" aria-hidden="true">${icon('mark')}</span>
         <span class="frame-empty__label">${esc(t('tours.photoSoon'))}</span>`;
    return `
      <figure class="islands__media" id="island-media-${esc(h.id)}" ${i === 0 ? '' : 'hidden'}>
        <div class="frame islands__frame ${h.photo ? '' : 'frame-empty'}">${inner}</div>
      </figure>`;
  }).join('');

  const panels = HIGHLIGHTS.map((h, i) => `
      <div class="islands__panel" id="island-panel-${esc(h.id)}" role="tabpanel"
           aria-labelledby="island-tab-${esc(h.id)}" ${i === 0 ? '' : 'hidden'}>
        <p class="islands__count" aria-hidden="true">${pad(i + 1)} <span>/</span> ${total}</p>
        <h3>${esc(tr(h.label, lang))}</h3>
        <p class="islands__blurb">${esc(tr(h.blurb, lang))}</p>
      </div>`).join('');

  const tabs = HIGHLIGHTS.map((h, i) => `
    <button class="islands__tab pill" type="button" role="tab" id="island-tab-${esc(h.id)}"
            aria-controls="island-panel-${esc(h.id)}" aria-selected="${i === 0}"
            tabindex="${i === 0 ? 0 : -1}" data-island="${esc(h.id)}">
      ${esc(tr(h.label, lang))}
    </button>`).join('');

  /* Three siblings, not two: the label row has to span both columns of the
     grid, so it cannot be nested inside the caption. */
  return `
    <div class="islands__stage">${media}</div>
    <div class="islands__side">${panels}</div>
    <div class="islands__tabs" role="tablist" aria-label="${esc(t('about.pillarsLabel'))}">
      ${tabs}
    </div>`;
}

/** Wire the list up. Safe to call again after a re-render. */
export function bindIslands() {
  const root = $('#islands');
  if (!root) return;
  const tabs = $$('.islands__tab', root);
  if (!tabs.length) return;

  const select = (id, focus) => {
    tabs.forEach((tab) => {
      const on = tab.dataset.island === id;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
      const panel = $(`#island-panel-${tab.dataset.island}`, root);
      if (panel) panel.hidden = !on;
      const fig = $(`#island-media-${tab.dataset.island}`, root);
      if (fig) fig.hidden = !on;
    });
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => select(tab.dataset.island)));

  /* Arrow keys move through the list, the way a tablist should. */
  root.addEventListener('keydown', (e) => {
    const i = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    if (i < 0) return;
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (step) {
      e.preventDefault();
      select(tabs[(i + step + tabs.length) % tabs.length].dataset.island, true);
    } else if (e.key === 'Home') {
      e.preventDefault(); select(tabs[0].dataset.island, true);
    } else if (e.key === 'End') {
      e.preventDefault(); select(tabs[tabs.length - 1].dataset.island, true);
    }
  });
}
