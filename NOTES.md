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
2. **Portfolio entries (6):** the first two cards link to **real client demo
   sites** — Gaming Cafe Lounge (`https://gaming-cafe-demo.vercel.app/`) and
   Himalayan Haven direct-booking demo (`https://directres-omega.vercel.app/`),
   both with `liveUrl` in `portfolio.json` and honest "Live demo" outcomes
   (no invented metrics). The remaining four cards still use branded gradient
   placeholder visuals (`PortfolioCard.astro` `.work-visual`). Do NOT
   substitute stock photography that implies a fake client, and do NOT invent
   live URLs for entries that have none.
3. **Team names + headshots:** DONE for the two co-founders — Mumtaj Rain
   (Founder & Social Media Manager, `public/assets/images/team/mamta.jpeg`)
   and Rabi Kishan Sah (Technical Partner & Web Developer,
   `public/assets/images/team/rabi.png`), wired via `name` + `photo` fields
   in `team.json` and rendered by `TeamCard.astro` (photo with hover zoom,
   icon-avatar fallback). Still needed: names/photos for the web designer
   and two editors — never mix photos and monograms on one page, so those
   three keep avatar tiles until their photos arrive.
4. **Contact form handler:** the `/contact` form (`ContactForm.astro`) posts to
   the **Supabase** `contact_messages` table (`source: 'contact'`) with a
   client-side honeypot (`bot-field`) as a spam trap — this works on any host,
   including the live Vercel deploy. (The old Netlify Forms wiring was removed
   when hosting moved to Vercel; there is no `netlify.toml` anymore, deploy
   config lives in `vercel.json`.)
5. **Homepage message form → Supabase:** the "Tell us about your project"
   section at the end of `src/pages/index.astro` (`MessageForm.astro`)
   writes to the same table (`source: 'homepage'`).
   writes to Supabase project `agencyportfolio`
   (`https://bzxxtgeucvbqeuzoniow.supabase.co`, table `contact_messages`:
   name, email, phone?, service?, message, created_at). Security: RLS is ON
   with an INSERT-only policy and no SELECT policy, so the publishable key
   in the client bundle can submit but never list messages — **read new
   messages in the Supabase dashboard → Table Editor**. Verified end-to-end
   with a live POST (201) plus an anonymous-read check (empty), test row
   removed. Never commit a `service_role` key here.
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
- [ ] Real form submission test on the Vercel deploy (both forms write to Supabase — check Table Editor)
- [ ] Lighthouse 90+/95+/95+/100 pass on deploy preview (all pages)
- [ ] 375 / 768 / 1280 / 1440px click-through of all 8 pages, mobile + desktop
