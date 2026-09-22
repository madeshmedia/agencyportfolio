# Technical Specification

## 1. Recommended stack
Since the site is content-driven (no user accounts, no database) and already hosted on Netlify, keep it static for speed, simplicity, and low hosting cost:

- **Framework:** Astro (preferred) — component reuse (header/footer/nav/CTA band) across multiple static pages, ships zero JS by default, excellent Lighthouse scores out of the box. Plain multipage HTML/CSS/JS is an acceptable fallback if Astro is not desired, but will duplicate header/footer markup across 8 files unless using includes.
- **Styling:** Plain CSS with custom properties (design tokens from 03-DESIGN-SYSTEM.md) in a single `tokens.css`, or Tailwind CSS configured with those same tokens — either is fine, pick one and stay consistent. Do not mix.
- **Icons:** Lucide or Phosphor Icons (SVG, tree-shakeable, no icon font).
- **Fonts:** Google Fonts or Fontshare, self-hosted via `@font-face` or preconnect + `<link>` for performance — avoid render-blocking font loads.
- **Forms:** Netlify Forms (since already on Netlify — add `data-netlify="true"` to the form and a hidden honeypot field) or Formspree if hosting moves. No custom backend needed.
- **Hosting:** Netlify (existing).
- **Animations:** Native CSS transitions + IntersectionObserver for scroll-fade-in (no heavy animation library required; GSAP is optional only if Cline wants richer motion on the hero).

## 2. Folder structure (Astro example)

```
/
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── logo/
│       │   ├── logo-icon-black.png   (supplied)
│       │   ├── logo-full-black.png   (supplied)
│       │   ├── logo-icon-white.svg   (derive: inverted colors, transparent bg)
│       │   └── logo-full-white.svg   (derive: inverted colors, transparent bg)
│       ├── images/
│       │   ├── og-cover.jpg
│       │   └── portfolio/ (project images)
│       └── icons/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── CTASection.astro
│   │   ├── ServiceCard.astro
│   │   ├── PortfolioCard.astro
│   │   ├── TeamCard.astro
│   │   ├── FAQItem.astro
│   │   ├── ContactForm.astro
│   │   └── WhatsAppButton.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   (handles <head>, meta tags, Header, Footer, WhatsApp button)
│   ├── pages/
│   │   ├── index.astro         → /
│   │   ├── about.astro         → /about
│   │   ├── services.astro      → /services
│   │   ├── portfolio.astro     → /portfolio
│   │   ├── team.astro          → /team
│   │   ├── process.astro       → /process
│   │   ├── faq.astro           → /faq
│   │   └── contact.astro       → /contact
│   ├── data/
│   │   ├── services.json       (7 services from content doc)
│   │   ├── portfolio.json      (4 case studies)
│   │   ├── team.json           (5 team members)
│   │   └── faq.json            (6 Q&As)
│   └── styles/
│       ├── tokens.css          (design system variables from 03-DESIGN-SYSTEM.md)
│       └── global.css
├── astro.config.mjs
└── package.json
```

Pulling repeated content (services, portfolio, team, FAQ) into JSON data files means the homepage and dedicated pages render from the same source — no copy-paste drift between the Home preview and the full Services/Portfolio/Team pages.

## 3. SEO requirements (per page)
- Unique `<title>` and `<meta name="description">` per page — see 02-SITEMAP-CONTENT.md for the copy for each.
- One canonical `<h1>` per page.
- Open Graph + Twitter card tags on every page (title, description, image, url) — reuse the pattern from the current site's homepage.
- `sitemap.xml` and `robots.txt` generated (Astro has an official sitemap integration — use it).
- Semantic internal linking: every page links back to /contact and at least one related page (e.g. Services → Portfolio, Portfolio → Contact).
- Local SEO: include NAP-style info (business name, WhatsApp/phone, email, "Nepal") in the footer and on the Contact page for local search relevance; consider adding `LocalBusiness` or `ProfessionalService` JSON-LD structured data on the homepage.

## 4. Performance requirements
- Target Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100.
- Images: serve as WebP/AVIF with fallback, `loading="lazy"` on below-the-fold images, explicit `width`/`height` to prevent layout shift.
- Fonts: `font-display: swap`, preconnect to font host, limit to 2 font families / max 4 weights total.
- No render-blocking third-party scripts above the fold; defer/async anything non-critical.
- CSS: single bundled stylesheet per page via Astro's build (automatic), avoid unused framework CSS if Tailwind is used (built-in purge handles this).

## 5. Responsive breakpoints
```
--bp-mobile: 0–639px      (single column, stacked nav)
--bp-tablet: 640–1023px   (2-column grids)
--bp-desktop: 1024px+     (full grid, 3-column cards, full nav)
```
Mobile-first CSS (`min-width` media queries), test at 375px, 768px, 1280px, 1440px minimum.

## 6. Contact form behavior
- Client-side validation (required fields, email format) before submit, with accessible inline error messages.
- On submit: POST to Netlify Forms endpoint (or Formspree), show a success state in place (no page reload/redirect needed — use `fetch` for a smoother experience, with a plain-HTML-form fallback that still works with JS disabled).
- Pre-fill the "Service Needed" dropdown from a `?service=` query param so links from /services can deep-link into the right option (progressive enhancement — form must work fine without the param too).
- WhatsApp button (`https://wa.me/9779804831080`) and mailto link (`madeshmedialab@gmail.com`) remain as always-visible alternatives, not just form fallback.

## 7. Browser/device support
- Latest 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome (majority of this market's traffic is mobile).
- Graceful degradation for `backdrop-filter` (used in header) — provide a solid-color fallback background.
