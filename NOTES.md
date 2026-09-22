# NOTES.md — Client assets & decisions needed before public launch

## 🎨 Rebrand log (v2 "Tech Lab" — per client redesign request, Sept 2026)

The client rejected the v1 navy `#0B132B` + gold `#D4A24E` + Sora/Inter look
as "too common / AI-generated", so the visual system was re-art-directed
**away from 03-DESIGN-SYSTEM.md** (which it now intentionally deviates from):
- **Palette:** near-black lab canvas `#060913`, electric lime `#C8FF2E`
  (CTAs/highlights), cyan `#3EC6E0` + violet `#8B7CFF` depth glows, warm-paper
  light sections `#F2F1E9`. Tokens architecture unchanged — still 100%
  variable-driven in `src/styles/tokens.css`.
- **Type:** Clash Display (Fontshare, studio-grade) headlines,
  Instrument Sans body, JetBrains Mono tech labels. Lime-on-dark passes AA;
  light sections use a dark-lime `#4E6B00` for icon strokes/links (plain lime
  on white fails contrast — enforced via global overrides).
- **Imagery (no stock, no fake clients):** all visuals are code-crafted —
  3D-tilting "growth console" dashboard on the home hero (`HeroVisual.astro`),
  browser-frame abstract mockups per portfolio project, blueprint grids,
  film grain, mesh orbs. Dashboard figures are **illustrative sample data**
  (marked "SAMPLE" in the UI + code comments) — replace with real anonymized
  client metrics when available (same flag as portfolio screenshots below).
- **Motion:** count-up KPIs, magnetic buttons, 3D tilt + cursor glare, marquee
  services strip, floating glass chips, scroll reveals — all gated behind
  `prefers-reduced-motion` and fine-pointer checks.
- Research via ui-ux-pro-max recommended "kinetic brutalism/pink" which was
  judged too aggressive for SME owners; kept its mechanics (marquee, bento,
  oversized type) with a credible tech-lab skin.

## ⚠️ Real content needed from the client

1. **Stats (homepage hero):** the old site showed "0+ Projects Delivered" and
   "0% Client Focus", which read as broken placeholders. The hero currently
   shows doc-grounded counts instead — **7 Core Services / 5-Step Process /
   24h Reply** (`src/pages/index.astro`, marked with a code comment). Replace
   with real numbers (e.g. "12+ Projects Delivered", "100% Client Focus") or
   keep the grounded version.
2. **Portfolio screenshots (4):** Social Media Designs, Restaurant Online
   Delivery, Branding Projects, Furniture Store Website. Pages currently use
   branded gradient placeholder cards (`PortfolioCard.astro` `.work-visual`).
   Do NOT substitute stock photography that implies a fake client.
3. **Team names + headshots (5):** two co-founders, web designer, two editors.
   Pages currently use role titles with consistent branded avatar tiles
   (`TeamCard.astro`). Supply real names + same-crop photos (or one
   illustrated-avatar set) — never mix photos and monograms on one page.
4. **Contact form handler:** the form (`ContactForm.astro`) is wired for
   **Netlify Forms** (`data-netlify="true"` + honeypot + `form-name`). It only
   delivers on a Netlify-hosted deploy — **test one real submission in a
   deploy preview** (with JS on and off). If hosting moves off Netlify, swap
   to Formspree and update the `fetch('/')` endpoint.
5. **Logo vector masters:** supplied PNGs are black-on-grey-gradient (not
   transparent). White PNGs were keyed to transparent
   (`logo-icon-white.png`, `logo-full-white.png`) and simplified white SVGs
   + `favicon.svg` were redrawn for dark sections. Ask the designer for a
   true vector trace / transparent-black masters; the black PNGs in
   `public/assets/logo/` are currently unused by the site chrome.
6. **OG social image:** `public/assets/images/og-cover.png` is a generated
   placeholder (navy + gold type). A designed 1200×630 cover is recommended.

## Technical decisions (for the record)

- **Stack:** Astro 4 static + plain CSS custom properties (tokens only, no
  Tailwind), per 04-TECHNICAL-SPEC.md.
- **Icons:** `@lucide/astro` v1.47. Two substitutions forced by Lucide v1
  removals/renames: **Instagram/Facebook** render as inline stroke SVGs in
  the same Feather/Lucide style (`Icon.astro`); the branding case study uses
  the **shapes** icon (the `fingerprint` name no longer exists).
- **Sitemap:** `@astrojs/sitemap` pinned to **3.2.1** — v3.7 crashes on Astro
  4 (`astro:routes:resolved` hook missing, `_routes.reduce` TypeError).
  Re-evaluate if Astro is ever upgraded to v5+.
- **Copy rule honored:** all page copy comes verbatim from
  `02-SITEMAP-CONTENT.md`; no new services, claims, or stats invented.
- **Tokens rule honored:** every color/spacing/radius references
  `src/styles/tokens.css` variables; verified no hardcoded hex in styles.

## Pre-launch checklist status

- [x] All 8 pages build (`npm run build`), `sitemap-index.xml` emitted
- [x] Per-page title/meta/OG/canonical + homepage `ProfessionalService` JSON-LD
- [x] `robots.txt` present; sitemap URL referenced
- [x] WhatsApp (`https://wa.me/9779804831080`) + `mailto:` links site-wide
- [x] Contact validation + `?service=` deep-link pre-fill (try `/contact?service=web-design`)
- [ ] Real form submission test on Netlify deploy preview (cannot pass locally)
- [ ] Lighthouse 90+/95+/95+/100 pass on deploy preview (all pages)
- [ ] 375 / 768 / 1280 / 1440px click-through of all 8 pages, mobile + desktop
