/**
 * Abir Al Zubayer — portfolio interactions
 *
 * - Mobile navigation (toggle, escape, outside click, focus return)
 * - Scroll-spy for active nav state
 * - Scroll reveal + skill meter fills
 * - Seamless marquee for the architectures ticker
 */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- nav */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = Array.from(document.querySelectorAll('.nav__links a'));

  const setMenu = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle?.addEventListener('click', () => {
    setMenu(!nav.classList.contains('is-open'));
  });

  // Close on link click, Escape, or click outside the bar
  document.querySelectorAll('.nav__links a, .nav__actions a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
      setMenu(false);
      toggle?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav?.classList.contains('is-open')) return;
    if (!nav.contains(event.target)) setMenu(false);
  });

  /* ----------------------------------------------------------- scrollspy */
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute('href');
      return id?.startsWith('#') && id.length > 1 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    // Track the section occupying the middle band of the viewport.
    const visible = new Map();

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (!bestId) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${bestId}`);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => spy.observe(section));
  }

  /* --------------------------------------------------------------- reveal */
  const revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    revealables.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealables.forEach((el) => revealer.observe(el));
  }

  /* --------------------------------------------------------------- ticker */
  // Duplicate the track once so the -50% keyframe loops seamlessly.
  const ticker = document.querySelector('[data-ticker]');
  if (ticker && !prefersReducedMotion) {
    const originals = Array.from(ticker.children);
    originals.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      ticker.appendChild(clone);
    });
  }

  /* ------------------------------------------------------- header offset */
  // Keep --header-h in sync so anchor scroll-padding matches the real bar.
  const header = document.querySelector('.site-header');
  if (header && 'ResizeObserver' in window) {
    const sync = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
    };
    new ResizeObserver(sync).observe(header);
    sync();
  }
})();
