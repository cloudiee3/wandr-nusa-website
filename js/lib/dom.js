/* ==========================================================================
   wandrnusa — tiny DOM helpers
   ========================================================================== */

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Escape a value before it goes into an HTML template literal. */
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Build an element from an HTML string. */
export function fromHTML(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

/** Replace the contents of a mount point with rendered HTML. */
export function mount(target, html) {
  const el = typeof target === 'string' ? $(target) : target;
  if (!el) return null;
  el.innerHTML = html;
  return el;
}

/**
 * Swap in a fallback illustration when a photo has not been added yet,
 * so a missing file never shows a broken image.
 */
export function withFallback(root = document) {
  $$('img[data-fallback]', root).forEach((img) => {
    if (img.dataset.fallbackBound) return;
    img.dataset.fallbackBound = '1';
    img.addEventListener('error', () => {
      const fb = img.dataset.fallback;
      if (fb && img.src !== fb && !img.src.endsWith(fb)) img.src = fb;
    }, { once: true });
    // Fires when the browser already resolved the src as broken before binding.
    if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
  });
}

/** Reveal elements as they scroll into view. Respects reduced motion. */
export function observeReveals(root = document) {
  const items = $$('.reveal:not(.is-visible)', root);
  if (!items.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = Number(el.dataset.revealDelay || 0);
      setTimeout(() => el.classList.add('is-visible'), delay);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach((el) => io.observe(el));
}
