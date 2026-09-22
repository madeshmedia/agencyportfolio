# Build Instructions for Cline

Paste this whole file (or open it alongside the other 4 docs) as your task prompt to Cline. It references the other documents in this folder — keep all 5 files together in the project root or a `/docs` folder so Cline can read them for detail as it works.

## Context for Cline
You are building a premium, multipage marketing website for a digital agency called **Madesh Media Lab**. Full requirements are split across four reference documents in this same folder:
- `01-PROJECT-BRIEF.md` — goals, audience, brand
- `02-SITEMAP-CONTENT.md` — every page's real content/copy, ready to use
- `03-DESIGN-SYSTEM.md` — exact colors, type, spacing, component styles to follow
- `04-TECHNICAL-SPEC.md` — stack, folder structure, SEO, performance rules

Read all four before starting. Do not invent new copy, new services, or new claims — use the content in `02-SITEMAP-CONTENT.md` exactly, and flag (in a code comment or a running `NOTES.md`) anywhere marked with ⚠️ that needs a real asset/number from the client.

## Build order

### Phase 0 — Setup
1. Scaffold the project using the stack in `04-TECHNICAL-SPEC.md` (Astro recommended). Initialize git, set up the folder structure exactly as specified.
2. Create `src/styles/tokens.css` with every color, font, spacing, and radius variable from `03-DESIGN-SYSTEM.md` sections 2–4. This file is the single source of truth — no hardcoded hex codes or px values anywhere else in the codebase.
3. Set up Google Fonts/Fontshare for the two type families (`03-DESIGN-SYSTEM.md` §3), with `font-display: swap` and preconnect.
4. Install an icon package (Lucide or Phosphor) — do not use emoji in the final markup anywhere; every emoji in the content doc is a placeholder for a real icon of matching meaning.
5. Place the supplied logo files (`assets/logo/logo-icon.png`, `assets/logo/logo-full.png`) into the project per `04-TECHNICAL-SPEC.md` §2. Create white/inverted versions (ideally as SVG) for use on dark sections — the black-only originals will be invisible on the navy background sections. Also generate a favicon from `logo-icon.png`.

### Phase 1 — Shared components (build once, reuse on every page)
5. `BaseLayout.astro` — handles `<head>` (meta tags, OG tags, favicon), wraps every page with `Header`, `<main>`, `Footer`, and the floating `WhatsAppButton`.
6. `Header.astro` — nav per `02-SITEMAP-CONTENT.md` global nav list, sticky/glass behavior and mobile slide-in menu per `03-DESIGN-SYSTEM.md` §5.
7. `Footer.astro` — content per `02-SITEMAP-CONTENT.md` footer section.
8. `CTASection.astro` — reusable "Ready to grow your brand online?" band, accepts heading/subheading/button-label/button-link as props so every page's CTA band can reuse it.
9. `ServiceCard.astro`, `PortfolioCard.astro`, `TeamCard.astro`, `FAQItem.astro`, `ContactForm.astro` — build per the component rules in `03-DESIGN-SYSTEM.md` §5 (real icons, correct radius/shadow/hover states, accessible focus states).
10. Create the JSON data files (`services.json`, `portfolio.json`, `team.json`, `faq.json`) from the content in `02-SITEMAP-CONTENT.md` sections 3–6, so both Home's previews and the full dedicated pages read from the same source.

### Phase 2 — Pages (build in this order; each should be fully responsive and visually polished before moving to the next)
11. **Home (`/`)** — all sections per `02-SITEMAP-CONTENT.md` §1, alternating dark/light section rhythm per `03-DESIGN-SYSTEM.md` §5.
12. **Services (`/services`)** — all 7 full service sections per `02-SITEMAP-CONTENT.md` §3, each with its own anchor id for deep-linking.
13. **Portfolio (`/portfolio`)** — filterable grid + 4 case studies per `02-SITEMAP-CONTENT.md` §4, with the live link on the Furniture Store project.
14. **About (`/about`)** — per `02-SITEMAP-CONTENT.md` §2.
15. **Team (`/team`)** — per `02-SITEMAP-CONTENT.md` §5.
16. **Process (`/process`)** — 5-step timeline per `02-SITEMAP-CONTENT.md` §6; this page should showcase extra design craft since content is short (see `03-DESIGN-SYSTEM.md` motion guidance).
17. **FAQ (`/faq`)** — accordion per `02-SITEMAP-CONTENT.md` §7.
18. **Contact (`/contact`)** — form + direct-contact panel per `02-SITEMAP-CONTENT.md` §8 and form behavior in `04-TECHNICAL-SPEC.md` §6.

### Phase 3 — Cross-cutting polish
19. Add scroll fade-up animations to section headings and grid items (staggered) across all pages, respecting `prefers-reduced-motion`.
20. Verify color contrast and add visible `:focus-visible` styles for every interactive element site-wide.
21. Add per-page meta titles/descriptions/OG tags from `02-SITEMAP-CONTENT.md`, plus `sitemap.xml`, `robots.txt`, and `LocalBusiness` JSON-LD on the homepage (`04-TECHNICAL-SPEC.md` §3).
22. Optimize all images (WebP/AVIF, lazy-load below the fold, explicit dimensions).
23. Test responsively at 375px, 768px, 1280px, 1440px on every page.
24. Run Lighthouse on every page and fix anything below the targets in `04-TECHNICAL-SPEC.md` §4.

### Phase 4 — Handover checklist
25. Confirm WhatsApp (`https://wa.me/9779804831080`) and mailto (`madeshmedialab@gmail.com`) links work from every page they appear on.
26. Confirm the contact form actually submits (test with Netlify Forms/Formspree in a deploy preview, not just locally).
27. Compile a `NOTES.md` listing every ⚠️ flagged item from `02-SITEMAP-CONTENT.md` (real stats, real project images, real team photos/names) so the client knows exactly what to supply before public launch.
28. Deploy to Netlify and do a final click-through of all 8 pages on both mobile and desktop.

## Ground rules while building
- Never hardcode a color/spacing value outside `tokens.css` — always reference the variable.
- Never leave an emoji as a final-state icon — swap for the icon library immediately when building each component.
- Reuse components; don't duplicate markup for the same section pattern across pages (e.g., the CTA band).
- Keep commits small and scoped to one phase/step at a time so progress is easy to review.
