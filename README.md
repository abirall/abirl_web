# Abir Al Zubayer Portfolio Website

[![Live](https://img.shields.io/badge/live-alzubayer.com-f4a300?style=flat-square)](https://alzubayer.com/)
[![HTML5](https://img.shields.io/badge/HTML-5-e34f26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS-3-1572b6?style=flat-square&logo=css3&logoColor=white)](#)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6-f7df1e?style=flat-square&logo=javascript&logoColor=black)](#)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#license)

> Production portfolio of **Abir Al Zubayer** (Abir DevOps) a DevOps & Cloud Engineer based in Dhaka, Bangladesh. The site showcases cloud infrastructure expertise, Kubernetes mastery, CI/CD automation, and real-world project case studies.

---

## Live Site

**[https://alzubayer.com/](https://alzubayer.com/)**

---

## Screenshot

![Hero Section](assets/img/hero/abir-profile.webp)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [SEO & Schema](#seo--schema)
- [Performance](#performance)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

---

## Features

### Sections

| Section | Description |
|---|---|
| **Hero** | Name, avatar, tagline ("DevOps Engineer Specializing in Scalable Cloud Infrastructure"), CTA buttons, YouTube link |
| **Social Row + Vision/Goal** | GitHub, LinkedIn, YouTube links; slate-panel vision & goal cards |
| **Architecture Ticker** | Seamless CSS-marquee listing 28+ technologies (Microservice, K8s, Docker, ArgoCD, Terraform, Prometheus, etc.) |
| **Work Process** | Three-image case-study grid: reduced deployment time, automated CI/CD, 99.9% uptime |
| **Certifications** | AWS Solutions Architect, Microsoft Azure, Red Hat RHCSA each with a descriptive paragraph |
| **Core Mastery** | Kubernetes & Docker deep-dive: zero-trust networking (Istio + Calico), GitOps delivery (ArgoCD + Helm), with progress meters |
| **Featured Projects** | Cloud Cost Optimizer and Developer Platform Medium-linked article cards |
| **Recent Work** | Three LinkedIn-linked portfolio cards: K8s Monitoring, GitOps Delivery, AWS EKS Platform |
| **Testimonials** | Five client reviews, 5.0 average rating, star ratings, delivery timeframes |
| **Deep Knowledge** | Three Medium article cards ("Learn with Abir") |
| **About** | Photo gallery (5 images) + bio box with eye icon |
| **Footer / Contact** | Phone, email, "Ready to Elevate Your Skills" CTA, social icons, nav links |

### UX Highlights

- **Skip-to-content** link for keyboard navigation
- **Sticky header** with scroll-spy active-state tracking
- **Mobile-responsive** hamburger menu with escape-key and outside-click dismissal
- **Scroll-triggered reveal** animations (CSS + Intersection Observer)
- **`prefers-reduced-motion`** support reveals appear instantly, ticker pauses
- **Progressive image loading** WebP with PNG fallback via `<picture>`, all images `loading="lazy"` + `decoding="async"`
- **Fluid typography** via `clamp()` scales from mobile through 4K
- **`--header-h` CSS custom property** synced live via `ResizeObserver` for accurate anchor scroll-padding

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 (semantic, accessible, WAI-ARIA landmarks) |
| **Styling** | CSS3 custom properties, fluid type scale, CSS-only marquee |
| **Scripting** | Vanilla JS (ES6 module IIFE) no frameworks, no dependencies |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts, asynchronously loaded) |
| **Images** | WebP + PNG fallback, SVGs for icons |
| **Icons** | Inline SVGs + external SVG sprites |
| **SEO** | Structured data (JSON-LD), Open Graph, Twitter Cards, canonical URL, `robots.txt`, `sitemap.xml` |

### Zero Dependencies

The site ships **no npm packages, no build step, and no JavaScript framework**. All code is hand-written HTML, CSS, and vanilla JS.

---

## Project Structure

```
abir_al_zubayer/
├── index.html                  # Single-page portfolio (all sections)
├── 404.html                    # Custom error page
├── robots.txt                  # Crawler directives + sitemap pointer
├── sitemap.xml                 # XML sitemap for search engines
├── guidelines.txt              # Brand guidelines (color, font)
├── link.txt                    # Reference links
├── resume.pdf                  # Public-facing resume
├── Website_Ui.pdf              # UI design reference
│
└── assets/
    ├── css/
    │   ├── base.css            # Design tokens, reset, layout, typography, components, utilities
    │   └── sections.css        # Per-section styles (header, hero, ticker, cards, footer, etc.)
    │
    ├── js/
    │   └── main.js             # Navigation toggle, scroll-spy, reveal animations, ticker, header offset
    │
    ├── logo/
    │   ├── mark.svg            # Favicon / nav brand mark
    │   ├── logo.svg            # Full logo (color)
    │   ├── logo-black.svg      # Full logo (black variant)
    │   └── logo-white.svg      # Full logo (white variant)
    │
    ├── icons/                  # 14 SVG icons
    │   ├── aws.svg             ├── azure.svg          ├── redhat.svg
    │   ├── cluster.svg         ├── shield.svg         ├── eye.svg
    │   ├── vision.svg          ├── goal.svg           ├── call.svg
    │   ├── mail.svg            ├── github.svg         ├── linkedin.svg
    │   ├── medium.svg          └── youtube.svg
    │
    ├── img/
    │   ├── hero/               # Profile avatar, hero background, cert background
    │   ├── about/              # 5 about-section photos (PNG + WebP each)
    │   ├── process/            # 3 work-process case study images
    │   ├── projects/           # 2 featured project card images
    │   ├── work/               # 3 recent-work portfolio images
    │   ├── knowledge/          # 3 deep-knowledge article images
    │   └── testimonials/       # 5 testimonial user photos
    │
    └── docs/
        └── abir-al-zubayer-resume.pdf   # Resume (downloadable from nav)
```

---

## SEO & Schema

### On-Page SEO

- **Title tag**: "Abir Al Zubayer DevOps Engineer in Bangladesh Kubernetes Docker & AWS"
- **Meta description**: 160-character optimized description with primary keywords
- **Meta keywords**: DevOps Engineer Bangladesh, Kubernetes, Docker, AWS, Azure, Terraform, CI/CD
- **Canonical URL**: `https://alzubayer.com/`
- **Geo meta tags**: `geo.region` (BD), `geo.placename` (Dhaka, Bangladesh)
- **Robots**: `index, follow` with `max-image-preview:large`

### Social Meta

- **Open Graph**: `profile` type with first/last name, username, locale, image (1200×630)
- **Twitter Cards**: `summary_large_image` with alt text

### Structured Data (JSON-LD)

The page embeds a full `@graph` with four linked entities:

| Entity | Type | Key Properties |
|---|---|---|
| **Abir Al Zubayer** | `Person` | jobTitle, email, telephone, address, nationality, 23 `knowsAbout` entries, 3 credentials (AWS, Azure, Red Hat), 5 `sameAs` social profiles |
| **Website** | `WebSite` | name, alternateName, description, publisher reference |
| **Webpage** | `ProfilePage` | primary image, about reference, main entity link |
| **Recent Work** | `ItemList` | 3 `ListItem` → `CreativeWork` entries (K8s Monitoring, GitOps Delivery, AWS EKS Platform) with LinkedIn URLs |

Built for maximum visibility in Google Knowledge Graph, AI-powered search (GEO), and featured snippets (AEO).

---

## Performance

| Optimization | Implementation |
|---|---|
| **Font loading** | Preconnect to Google Fonts, async CSS with `media="print" onload` + `<noscript>` fallback |
| **Image loading** | WebP priority, PNG fallback, `loading="lazy"`, `decoding="async"`, `fetchpriority="high"` on hero avatar |
| **Hero image** | `<link rel="preload">` for above-the-fold profile image |
| **CSS** | Two files (`base.css` + `sections.css`), no render-blocking beyond the critical path |
| **JavaScript** | Single deferred script (`defer`), no framework overhead, ~4 KB uncompressed |
| **No dependencies** | Zero npm packages, zero external JS libraries |
| **Caching** | Asset URLs are cache-friendly (versioning via filename changes) |
| **Theme color** | `#1a1a1a` for browser chrome on mobile |

---

## Getting Started

### Prerequisites

Nothing. A web browser and a text editor.

### Local Development

```bash
# Clone the repository
git clone https://github.com/abirall/abir_al_zubayer.git
cd abir_al_zubayer

# Serve with any static server, e.g.:
npx serve .           # Node.js
python -m http.server # Python 3
# Or open index.html directly in your browser
```

Edit `index.html`, `assets/css/base.css`, `assets/css/sections.css`, or `assets/js/main.js` no build step required.

### Image Pipeline (Optional)

The site uses both `.webp` and `.png` versions of images. To generate WebP from PNGs:

```bash
# Using ImageMagick
magick input.png -quality 85 output.webp

# Or cwebp
cwebp -q 85 input.png -o output.webp
```

---

## Brand

| Token | Value |
|---|---|
| **Primary Color** | `#F4A300` (Gold) |
| **Text Color** | `#1A1A1A` (Near-black) |
| **Accent** | `#FFF3D6` (Light gold) |
| **Font** | Inter (400, 500, 600, 700, 800) |

---

## Deployment

The site is a **static HTML/CSS/JS** application. Deploy to any static host:

| Provider | Setup |
|---|---|
| **GitHub Pages** | Push to `main` branch, enable Pages in repo settings |
| **Netlify** | Connect repo, publish directory = root, deploy |
| **Vercel** | Connect repo, auto-detects static site |
| **Cloudflare Pages** | Connect repo, build command = (empty), output = `/` |
| **Nginx / Apache** | Point document root to the project directory |
| **S3 + CloudFront** | Sync `aws s3 sync . s3://bucket/` |

The domain `alzubayer.com` is the canonical production URL. `robots.txt` and `sitemap.xml` reference it.

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Contact

**Abir Al Zubayer** DevOps Engineer, Dhaka, Bangladesh

| Channel | Link |
|---|---|
| **Website** | [alzubayer.com](https://alzubayer.com/) |
| **Email** | [abiralzubayer0@gmail.com](mailto:abiralzubayer0@gmail.com) |
| **Phone** | [+880 17567 59642](tel:+8801756759642) |
| **GitHub** | [@abirall](https://github.com/abirall) |
| **LinkedIn** | [abir-al-zubayer](https://www.linkedin.com/in/abir-al-zubayer/) |
| **YouTube** | [@AbirDevOps](https://www.youtube.com/@AbirDevOps) |
| **Medium** | [@abirall](https://medium.com/@abirall) |

---

<p align="center">
  <sub>Built with vanilla HTML, CSS & JS no frameworks, no build tools, no compromises.</sub>
</p>
