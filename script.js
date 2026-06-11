const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");
const navLinks = [...document.querySelectorAll(".nav__links a")];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

document.querySelectorAll(".nav__links a, .footer__nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
});

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);

trackedSections.forEach((section) => activeObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
});
