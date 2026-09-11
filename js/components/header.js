/* ==========================================================================
   wandrnusa — header behaviour
   Transparent over the hero, solid once past it. Mobile menu. Active link.
   ========================================================================== */

import { $, $$ } from '../lib/dom.js';

export function initHeader() {
  const header = $('.site-header');
  const nav = $('#primary-nav');
  const toggle = $('.nav-toggle');
  if (!header) return;

  /* ---- Solid background once the hero is behind us ---------------------- */
  const hero = $('#home');
  const setSolid = (solid) => header.classList.toggle('site-header--solid', solid);

  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: '-72px 0px 0px 0px', threshold: 0 }
    ).observe(hero);
  } else {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile menu ------------------------------------------------------ */
  const closeMenu = () => {
    nav?.setAttribute('data-open', 'false');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.setAttribute('data-open', String(!open));
  });

  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

  /* ---- Highlight the section you are reading ---------------------------- */
  const links = $$('#primary-nav a[href^="#"]');
  const sections = links
    .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.setAttribute(
        'aria-current',
        a.getAttribute('href') === `#${entry.target.id}` ? 'true' : 'false'
      ));
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((s) => spy.observe(s));
}
