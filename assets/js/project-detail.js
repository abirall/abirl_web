/* ==========================================================================
   Abir Al Zubayer Portfolio
   project-detail.js

   Renders a single case study into project.html from window.PORTFOLIO_PROJECTS.

   Routing
   -------
   The project is selected with a query parameter on a real file:

       project.html?p=aws-eks-platform

   Because the URL points at an actual document rather than a virtual path, a
   direct link, a bookmark, and a hard refresh all resolve identically on plain
   static hosting no rewrite rules or history fallback required. A trailing
   `#slug` is accepted as a secondary form, and older `?project=` `?slug=`
   parameter names are honoured so existing links keep working.

   Behaviour
   ---------
   * Known slug   → the full case study, with document title, meta description,
                    canonical URL, Open Graph tags, and JSON-LD updated to match.
   * No slug      → an index of every available case study.
   * Unknown slug → a friendly "not found" page marked noindex.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.getElementById('case-root');
  if (!root) return;

  var projects = window.PORTFOLIO_PROJECTS || [];
  var bySlug = window.PORTFOLIO_PROJECT_BY_SLUG || {};
  var SITE = 'https://alzubayer.com/';

  /* ------------------------------------------------------------------ utils */

  var decoder = document.createElement('div');

  /* Data strings may carry HTML entities (&amp;, &ndash;) because they are also
     used as markup. Titles and meta tags need the plain-text form. */
  function plain(html) {
    decoder.innerHTML = String(html == null ? '' : html);
    return (decoder.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function text(tag, className, value) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value == null ? '' : String(value);
    return node;
  }

  function svg(className, paths) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    node.setAttribute('viewBox', '0 0 24 24');
    node.setAttribute('aria-hidden', 'true');
    if (className) node.setAttribute('class', className);
    node.innerHTML = paths;
    return node;
  }

  function picture(image, className, lazy) {
    var pic = document.createElement('picture');
    var source = document.createElement('source');
    source.setAttribute('srcset', image.base + '.webp');
    source.setAttribute('type', 'image/webp');
    var img = document.createElement('img');
    img.setAttribute('src', image.base + '.png');
    if (image.w) img.setAttribute('width', image.w);
    if (image.h) img.setAttribute('height', image.h);
    img.setAttribute('alt', image.alt || '');
    img.setAttribute('decoding', 'async');
    if (lazy) img.setAttribute('loading', 'lazy');
    if (className) img.className = className;
    pic.appendChild(source);
    pic.appendChild(img);
    return pic;
  }

  function chipList(values, extraClass) {
    var list = el('ul', 'case-chips' + (extraClass ? ' ' + extraClass : ''));
    values.forEach(function (value) {
      list.appendChild(el('li', 'case-chip', value));
    });
    return list;
  }

  function readSlug() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('p') || params.get('project') || params.get('slug');
    if (!slug && window.location.hash.length > 1) {
      slug = decodeURIComponent(window.location.hash.slice(1));
    }
    return slug ? String(slug).trim().toLowerCase() : '';
  }

  /* ------------------------------------------------------------ head updates */

  function setMeta(selector, value) {
    var node = document.head.querySelector(selector);
    if (node) node.setAttribute('content', value);
  }

  function applyHead(project) {
    var title = plain(project.name) + ' Case Study | Abir Al Zubayer';
    var description = plain(project.tagline);
    var url = SITE + 'project.html?p=' + project.slug;
    var image = SITE + project.hero.base + '.png';

    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[name="keywords"]', project.tags.map(plain).join(', '));
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', image);

    var canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);

    injectSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CreativeWork',
          '@id': url + '#project',
          name: plain(project.name),
          headline: plain(project.name),
          description: description,
          url: url,
          image: image,
          keywords: project.tags.map(plain).join(', '),
          about: plain(project.goal),
          author: {
            '@type': 'Person',
            name: 'Abir Al Zubayer',
            url: SITE
          },
          isPartOf: { '@type': 'WebSite', '@id': SITE + '#website', url: SITE }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': url + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: SITE + '#projects' },
            { '@type': 'ListItem', position: 3, name: plain(project.name), item: url }
          ]
        }
      ]
    });
  }

  function injectSchema(data) {
    var existing = document.getElementById('case-schema');
    if (existing) existing.parentNode.removeChild(existing);
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'case-schema';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function markNoindex() {
    setMeta('meta[name="robots"]', 'noindex, follow');
  }

  /* --------------------------------------------------------------- rendering */

  var ICON_NOTE = '<circle cx="12" cy="12" r="9" /><path d="M12 16.5v-5.5M12 8h.01" />';
  var ICON_GOAL = '<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2" />';
  var ICON_ARROW = '<path d="M7 17 17 7m0 0H9m8 0v8" />';

  function renderBlock(block) {
    switch (block.t) {
      case 'p':
        return el('p', 'case-p', block.v);

      case 'h':
        return el('h3', 'case-h', block.v);

      case 'quote':
        return el('blockquote', 'case-quote', block.v);

      case 'list': {
        var list = el('ul', 'case-list');
        block.v.forEach(function (item) {
          list.appendChild(el('li', 'case-li', item));
        });
        return list;
      }

      case 'flow': {
        var flow = el('ol', 'case-flow');
        block.v.forEach(function (step) {
          var item = el('li', 'case-flow__step');
          item.appendChild(text('span', 'case-flow__label', step));
          flow.appendChild(item);
        });
        return flow;
      }

      case 'dia': {
        var figure = el('figure', 'case-dia');
        if (block.label) figure.appendChild(text('figcaption', 'case-dia__label', block.label));
        /* Diagrams are box-drawing art: written as text so no character in them
           can be interpreted as markup. */
        figure.appendChild(text('pre', 'case-dia__pre', block.v));
        return figure;
      }

      case 'grid': {
        var grid = el('div', 'case-grid');
        block.v.forEach(function (item) {
          var card = el('div', 'case-grid__item');
          card.appendChild(el('h4', 'case-grid__title', item.h));
          card.appendChild(el('p', 'case-grid__text', item.p));
          grid.appendChild(card);
        });
        return grid;
      }

      case 'groups': {
        var groups = el('div', 'case-groups');
        block.v.forEach(function (group) {
          var box = el('div', 'case-group');
          box.appendChild(el('p', 'case-group__title', group.h));
          box.appendChild(chipList(group.v));
          groups.appendChild(box);
        });
        return groups;
      }

      case 'stats': {
        var stats = el('div', 'case-stats');
        block.v.forEach(function (stat) {
          var box = el('div', 'case-stat');
          box.appendChild(el('p', 'case-stat__value', stat.v));
          box.appendChild(el('p', 'case-stat__key', stat.k));
          stats.appendChild(box);
        });
        return stats;
      }

      case 'note': {
        var note = el('div', 'case-note');
        note.setAttribute('role', 'note');
        note.appendChild(svg('case-note__icon', ICON_NOTE));
        note.appendChild(el('p', null, block.v));
        return note;
      }

      default:
        return el('p', 'case-p', block.v || '');
    }
  }

  function renderHero(project) {
    var hero = el('section', 'case-hero');
    hero.setAttribute('aria-labelledby', 'case-title');

    var grid = el('div', 'case-hero__grid');
    var copy = el('div', 'case-hero__copy');

    var crumbs = el('nav', 'case-crumbs');
    crumbs.setAttribute('aria-label', 'Breadcrumb');
    crumbs.appendChild(el('a', null, 'Home')).setAttribute('href', 'index.html');
    crumbs.appendChild(text('span', 'case-crumbs__sep', '/'));
    crumbs.appendChild(el('a', null, 'Projects')).setAttribute('href', 'index.html#projects');
    crumbs.appendChild(text('span', 'case-crumbs__sep', '/'));
    var current = el('span', null, project.name);
    current.setAttribute('aria-current', 'page');
    crumbs.appendChild(current);
    copy.appendChild(crumbs);

    copy.appendChild(el('p', 'case-hero__eyebrow', project.groupLabel));

    var title = el('h1', 'case-hero__title', project.name);
    title.id = 'case-title';
    copy.appendChild(title);

    copy.appendChild(el('p', 'case-hero__lead', project.tagline));
    copy.appendChild(chipList(project.tags, 'case-hero__tags'));

    var media = el('div', 'case-hero__media');
    media.appendChild(picture(project.hero));

    grid.appendChild(copy);
    grid.appendChild(media);
    hero.appendChild(grid);

    var facts = el('dl', 'case-facts');
    project.meta.forEach(function (fact) {
      var wrap = el('div', 'case-fact');
      wrap.appendChild(el('dt', 'case-fact__label', fact.label));
      wrap.appendChild(el('dd', 'case-fact__value', fact.value));
      facts.appendChild(wrap);
    });
    hero.appendChild(facts);

    return hero;
  }

  function renderToc(project) {
    var aside = el('aside', 'case-toc');
    aside.setAttribute('aria-label', 'On this page');
    aside.appendChild(text('p', 'case-toc__title', 'On this page'));

    var list = el('ol', 'case-toc__list');
    project.sections.forEach(function (section) {
      var item = document.createElement('li');
      var link = el('a', null, section.title);
      link.setAttribute('href', '#' + section.id);
      link.setAttribute('data-toc', section.id);
      item.appendChild(link);
      list.appendChild(item);
    });
    aside.appendChild(list);
    return aside;
  }

  function renderArticle(project) {
    var article = el('article', 'case-article');

    var goal = el('div', 'case-goal');
    goal.appendChild(svg('case-goal__icon', ICON_GOAL));
    var goalCopy = el('div');
    goalCopy.appendChild(text('p', 'case-goal__label', 'Core goal'));
    goalCopy.appendChild(el('p', 'case-goal__text', project.goal));
    goal.appendChild(goalCopy);
    article.appendChild(goal);

    project.sections.forEach(function (section, index) {
      var node = el('section', 'case-section');
      node.id = section.id;
      node.setAttribute('aria-labelledby', section.id + '-title');

      var head = el('header', 'case-section__head');
      head.appendChild(text('span', 'case-section__num', ('0' + (index + 1)).slice(-2)));
      var heading = el('h2', 'case-section__title', section.title);
      heading.id = section.id + '-title';
      head.appendChild(heading);
      node.appendChild(head);

      var body = el('div', 'case-body');
      section.blocks.forEach(function (block) {
        body.appendChild(renderBlock(block));
      });
      node.appendChild(body);

      article.appendChild(node);
    });

    article.appendChild(
      el(
        'p',
        'case-source',
        'This case study is written from the project’s own architecture documentation in this repository (<code>' +
        project.source +
        '</code>). Illustrative figures are labelled where they appear.'
      )
    );

    return article;
  }

  function renderPager(project) {
    var index = projects.indexOf(project);
    var pager = el('nav', 'case-pager');
    pager.setAttribute('aria-label', 'More case studies');

    function link(target, direction, modifier) {
      var node = el('a', 'case-pager__link' + (modifier ? ' case-pager__link--' + modifier : ''));
      node.appendChild(text('span', 'case-pager__dir', direction));
      if (target) {
        node.setAttribute('href', 'project.html?p=' + target.slug);
        node.appendChild(el('span', 'case-pager__name', target.name));
        node.appendChild(text('span', 'case-pager__kind', target.groupLabel));
      } else {
        node.setAttribute('href', 'index.html#projects');
        node.appendChild(text('span', 'case-pager__name', 'All projects'));
        node.appendChild(text('span', 'case-pager__kind', 'Back to the portfolio'));
      }
      return node;
    }

    pager.appendChild(link(projects[index - 1], 'Previous', 'prev'));
    pager.appendChild(link(projects[index + 1], 'Next', 'next'));
    return pager;
  }

  function renderProject(project) {
    root.textContent = '';
    root.appendChild(renderHero(project));

    var layout = el('div', 'case-layout');
    layout.appendChild(renderToc(project));
    layout.appendChild(renderArticle(project));
    root.appendChild(layout);

    root.appendChild(renderPager(project));

    applyHead(project);
    watchToc();
    scrollToAnchor();
  }

  /* The browser resolves #fragment while parsing, before this deferred script has
     built the sections so a shared link like ?p=…#architecture needs the jump
     repeating once its target exists. */
  function scrollToAnchor() {
    if (window.location.hash.length < 2) return;
    var target;
    try {
      target = root.querySelector(window.location.hash);
    } catch (error) {
      return;
    }
    if (target) target.scrollIntoView();
  }

  /* ------------------------------------------------------------- index / 404 */

  function projectListItems() {
    var list = el('ul', 'case-fallback__list');
    projects.forEach(function (project, index) {
      var item = document.createElement('li');
      var link = el('a', 'case-strip__link');
      link.setAttribute('href', 'project.html?p=' + project.slug);
      link.appendChild(text('span', 'case-strip__num', index + 1));
      var copy = el('span');
      copy.appendChild(el('span', 'case-strip__name', project.name));
      copy.appendChild(text('span', 'case-strip__kind', plain(project.groupLabel)));
      link.appendChild(copy);
      link.appendChild(svg('case-strip__arrow', ICON_ARROW));
      item.appendChild(link);
      list.appendChild(item);
    });
    return list;
  }

  function renderIndex() {
    root.textContent = '';
    var wrap = el('section', 'case-fallback');
    wrap.appendChild(text('h1', 'case-fallback__title', 'Project Case Studies'));
    wrap.appendChild(
      el(
        'p',
        'case-fallback__text',
        'Choose a project to read its full case study architecture, infrastructure, DevOps implementation, key features, and outcomes.'
      )
    );
    wrap.appendChild(projectListItems());
    root.appendChild(wrap);

    document.title = 'Project Case Studies Abir Al Zubayer';
  }

  function renderNotFound(slug) {
    root.textContent = '';
    var wrap = el('section', 'case-fallback');
    wrap.appendChild(text('h1', 'case-fallback__title', 'Project not found'));
    wrap.appendChild(
      text(
        'p',
        'case-fallback__text',
        slug
          ? 'There is no case study for “' + slug + '”. It may have been renamed. Pick one of the projects below instead.'
          : 'That project could not be found. Pick one of the projects below instead.'
      )
    );
    wrap.appendChild(projectListItems());

    var actions = el('div', 'case-fallback__actions');
    var back = el('a', 'btn btn--gold', 'Back to Projects');
    back.setAttribute('href', 'index.html#projects');
    actions.appendChild(back);
    wrap.appendChild(actions);

    root.appendChild(wrap);

    document.title = 'Project not found Abir Al Zubayer';
    markNoindex();
  }

  /* ----------------------------------------------------- contents highlighting */

  function watchToc() {
    var links = Array.prototype.slice.call(root.querySelectorAll('[data-toc]'));
    var sections = links
      .map(function (link) {
        return document.getElementById(link.getAttribute('data-toc'));
      })
      .filter(Boolean);

    if (!links.length || !sections.length) return;

    function sync() {
      var header = document.querySelector('.site-header');
      var offset = (header ? header.offsetHeight : 74) + 72;
      var currentId = sections[0].id;

      for (var i = 0; i < sections.length; i += 1) {
        if (sections[i].getBoundingClientRect().top <= offset) currentId = sections[i].id;
      }

      /* At the very bottom of the page the last section may never cross the
         offset line, so pin the final entry instead. */
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        currentId = sections[sections.length - 1].id;
      }

      links.forEach(function (link) {
        var active = link.getAttribute('data-toc') === currentId;
        link.classList.toggle('is-current', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    var queued = false;
    var onScroll = function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        sync();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    sync();
  }

  /* ------------------------------------------------------------------- start */

  /* Routing happens once, on load. Every link between case studies points at a
     real URL (project.html?p=…), so the browser performs a full navigation and
     there is no client-side history to manage. Re-routing on hash changes would
     be actively wrong here: the table of contents links to #overview, #solution
     and so on, and those anchors are section ids, not project slugs. */
  function route() {
    var slug = readSlug();

    if (!projects.length) {
      renderNotFound('');
      return;
    }

    if (!slug) {
      renderIndex();
      return;
    }

    var project = bySlug[slug];
    if (project) {
      renderProject(project);
    } else {
      renderNotFound(slug);
    }
  }

  route();
})();
