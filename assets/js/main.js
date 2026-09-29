/**
 * Abir Al Zubayer portfolio interactions
 *
 * - Mobile navigation (toggle, escape, outside click, focus return)
 * - Scroll-spy with a sliding active indicator
 * - Header "scrolled" state + scroll progress bar
 * - Scroll reveal, skill meter fills, and number count-ups
 * - Two-row marquee for the architectures ticker
 * - Pointer spotlight on cards and a subtle tilt on the hero console
 * - Page-leave fade for browsers without cross-document view transitions
 *
 * Everything is progressive: without JS the content is fully visible, and
 * with prefers-reduced-motion the decorative motion is skipped.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------------------------------------------------------- nav */
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const linksWrap = document.querySelector('.nav__links');
  const indicator = document.querySelector('.nav__indicator');
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

  /* Slide the indicator pill under whichever link is active. Hidden (via CSS)
     in the stacked mobile menu, where offsetLeft is meaningless. */
  const moveIndicator = () => {
    if (!indicator || !linksWrap) return;
    const active = linksWrap.querySelector('a.is-active');
    if (!active || active.offsetWidth === 0) {
      linksWrap.classList.remove('has-indicator');
      return;
    }
    linksWrap.style.setProperty('--ind-x', `${active.offsetLeft}px`);
    linksWrap.style.setProperty('--ind-w', `${active.offsetWidth}px`);
    linksWrap.classList.add('has-indicator');
  };

  const setActive = (href) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === href);
    });
    moveIndicator();
  };

  // Hover preview: the pill follows the pointer, then settles back.
  if (finePointer && indicator && linksWrap) {
    navLinks.forEach((link) => {
      link.addEventListener('pointerenter', () => {
        linksWrap.style.setProperty('--ind-x', `${link.offsetLeft}px`);
        linksWrap.style.setProperty('--ind-w', `${link.offsetWidth}px`);
      });
    });
    linksWrap.addEventListener('pointerleave', moveIndicator);
  }

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

        if (bestId) setActive(`#${bestId}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => spy.observe(section));
  }

  /* -------------------------------------- header state + progress bar */
  const progress = document.querySelector('.scroll-progress');
  let scrollQueued = false;

  const onScrollFrame = () => {
    scrollQueued = false;
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 24);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : '0');
    }
  };

  window.addEventListener(
    'scroll',
    () => {
      if (scrollQueued) return;
      scrollQueued = true;
      window.requestAnimationFrame(onScrollFrame);
    },
    { passive: true }
  );
  onScrollFrame();

  /* ----------------------------------------------------------- count-up */
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (Number.isNaN(target)) return;
    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };

  /* --------------------------------------------------------------- reveal */
  const revealables = document.querySelectorAll('.reveal');
  const counters = Array.from(document.querySelectorAll('[data-count]'));

  const onRevealed = (el) => {
    counters
      .filter((counter) => !counter.dataset.counted && el.contains(counter))
      .forEach((counter) => {
        counter.dataset.counted = 'true';
        countUp(counter);
      });
  };

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    revealables.forEach((el) => el.classList.add('is-visible'));
  } else {
    // Start counters from zero only when we're going to animate them.
    counters.forEach((counter) => {
      counter.textContent = (0).toFixed(parseInt(counter.dataset.decimals || '0', 10));
    });

    // threshold 0 + a bottom inset works for elements taller than the viewport
    // (long case-study sections), where a ratio threshold might never be met.
    const revealer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          onRevealed(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    revealables.forEach((el) => revealer.observe(el));

    // Counters that don't live inside a .reveal get their own observer.
    const loose = counters.filter((counter) => !counter.closest('.reveal'));
    if (loose.length) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.counted = 'true';
          countUp(entry.target);
          observer.unobserve(entry.target);
        });
      });
      loose.forEach((counter) => counterObserver.observe(counter));
    }
  }

  /* --------------------------------------------------------------- ticker */
  // Duplicate the track once so the -50% keyframe loops seamlessly, then add a
  // second, reversed, outlined row for depth.
  const ticker = document.querySelector('[data-ticker]');
  if (ticker && !prefersReducedMotion) {
    const originals = Array.from(ticker.children);
    originals.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      ticker.appendChild(clone);
    });

    const reverse = ticker.cloneNode(false);
    reverse.removeAttribute('data-ticker');
    reverse.classList.add('ticker__track--reverse');
    reverse.setAttribute('aria-hidden', 'true');
    const items = originals.filter((node) => !node.classList.contains('ticker__item--lead')).reverse();
    [...items, ...items].forEach((node) => reverse.appendChild(node.cloneNode(true)));
    ticker.after(reverse);
  }

  /* ------------------------------------------------ hero: pause offscreen */
  const hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      hero.classList.toggle('is-paused', !entry.isIntersecting);
    }).observe(hero);
  }

  /* -------------------------------------------------- pointer spotlight */
  const SPOTLIGHT = [
    '.work-card',
    '.article-card',
    '.cert-card',
    '.tcard',
    '.vision-card',
    '.mastery-card',
    '.case-grid__item',
    '.case-pager__link'
  ].join(',');

  if (finePointer && !prefersReducedMotion) {
    document.querySelectorAll(SPOTLIGHT).forEach((card) => {
      card.classList.add('has-spotlight');
      card.addEventListener(
        'pointermove',
        (event) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
          card.style.setProperty('--my', `${event.clientY - rect.top}px`);
        },
        { passive: true }
      );
    });

    // Gentle 3D tilt that follows the pointer
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      const area = el.parentElement || el;
      area.addEventListener(
        'pointermove',
        (event) => {
          const rect = area.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          el.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
          el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`);
        },
        { passive: true }
      );
      area.addEventListener('pointerleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ------------------------------------------------------ page transitions */
  // Chromium animates cross-document navigations natively via @view-transition
  // in base.css. Elsewhere, fade the page out briefly before leaving.
  const nativeTransitions = 'CSSViewTransitionRule' in window;

  if (!nativeTransitions && !prefersReducedMotion) {
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!/^https?:|^file:/.test(url.protocol)) return;
      if (/\.pdf$/i.test(url.pathname)) return;

      // Same document (only the hash differs): let smooth scrolling handle it.
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
      if (samePage) return;

      event.preventDefault();
      root.classList.add('is-leaving');
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 220);
    });
  }

  // Coming back through the bfcache must not leave the page faded out.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) root.classList.remove('is-leaving');
  });

  /* ---------------------------------------------------------- theme toggle */
  // The initial theme is applied by the inline script in <head> (no flash).
  // The device's light/dark setting is always the default. A click on the
  // button overrides it for the current session only (sessionStorage), so
  // every new visit starts from the device theme again.
  const themeBtn = document.querySelector('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const systemLight = window.matchMedia('(prefers-color-scheme: light)');

  const currentTheme = () => (root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeMeta?.setAttribute('content', theme === 'light' ? '#f6f6f3' : '#07080b');
    if (themeBtn) {
      const next = theme === 'light' ? 'dark' : 'light';
      themeBtn.setAttribute('aria-label', `Switch to ${next} theme`);
      themeBtn.setAttribute('aria-pressed', String(theme === 'light'));
    }
  };

  const storedTheme = () => {
    try {
      return sessionStorage.getItem('theme');
    } catch (error) {
      return null;
    }
  };

  applyTheme(currentTheme());

  themeBtn?.addEventListener('click', () => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    try {
      sessionStorage.setItem('theme', next);
    } catch (error) {
      /* storage unavailable: the choice lasts for this page only */
    }

    if (!document.startViewTransition || prefersReducedMotion) {
      applyTheme(next);
      return;
    }

    // Circular reveal expanding from the button
    const rect = themeBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add('theme-vt');
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove('theme-vt'));
  });

  systemLight.addEventListener?.('change', (event) => {
    const saved = storedTheme();
    if (saved !== 'light' && saved !== 'dark') applyTheme(event.matches ? 'light' : 'dark');
  });

  /* ------------------------------------------------------- header offset */
  // Keep --header-h in sync so anchor scroll-padding matches the real bar.
  if (header && 'ResizeObserver' in window) {
    const sync = () => {
      root.style.setProperty('--header-h', `${header.offsetHeight}px`);
      moveIndicator();
    };
    new ResizeObserver(sync).observe(header);
    sync();
  } else {
    moveIndicator();
  }

  // Web fonts change link widths once they load.
  document.fonts?.ready.then(moveIndicator);
  window.addEventListener('resize', moveIndicator);
})();
