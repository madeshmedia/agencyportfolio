# Project Brief — Madesh Media Lab Website Rebuild

## 1. What we're building
A premium, multipage marketing website for **Madesh Media Lab**, a digital marketing agency in Nepal serving local and international clients. The current site is a single scrolling page (madeshmedialab.netlify.app); this rebuild expands it into a full multipage site with a more premium, high-end agency feel — think "boutique creative studio" rather than "template landing page."

## 2. Brand snapshot
- **Name:** Madesh Media Lab
- **Tagline:** "From Vision to Digital Reality"
- **One-line positioning:** Strategy, creativity, and technology combined to help brands build authority, attract customers, and grow online.
- **Category:** Digital marketing agency — social media, content, ads, web design, branding, strategy
- **Location / market:** Nepal-based, serves local + international clients
- **Tone of voice:** Confident, energetic, straight-talking, no jargon, results-focused. Young-entrepreneur energy, not corporate-stiff.
- **Existing theme color:** `#0B132B` (deep navy) — carry this through as the anchor brand color (see 03-DESIGN-SYSTEM.md for the full premium palette built around it).
- **Logo assets:** Supplied — see `assets/logo/` in this package.
  - `logo-icon.png` — standalone mark (the "M" wordmark blended with a bird/wing motif), black on transparent/gradient background. Use for favicon, small header logo on mobile, social avatars.
  - `logo-full.png` — full lockup with icon + "MADESH MEDIA LAB / DIGITAL MARKETING AGENCY" wordmark, black. Use for the main header logo (desktop) and footer.
  - Both are currently black-only. Since the site is dark-background-heavy (`#0B132B` sections per the design system), Cline should also produce **white/light versions** of both files (simple color inversion, transparent background, SVG if possible for crispness) for use on dark sections — the current site referenced `logo-white.png` for exactly this reason. Vectorizing the icon (SVG) is recommended so it scales cleanly at favicon size and stays crisp on retina displays.

## 3. Why we're rebuilding
The current site is functional but single-page and visually generic (default template feel — flat cards, emoji icons, stock spacing). Goals for the rebuild:
1. **Premium visual identity** — real iconography, refined type system, intentional layout, motion/interaction polish (no emoji as icons, no default Bootstrap-card look).
2. **Multipage architecture** — dedicated pages for Services, Portfolio, About, Team, Process, and Contact so each can be deeper, better for SEO, and easier to update independently.
3. **Stronger conversion path** — clearer CTAs, a real lead-capture form, service-specific "Get Started" paths, and social proof placed higher in the journey.
4. **Better credibility signals** — the current site has placeholder stats ("0+ Projects Delivered", "0% Client Focus"). These must be replaced with real or honestly-framed numbers (see content doc — flagged decisions needed from the client).

## 4. Target audience
- **Primary:** Small–mid size local businesses (restaurants, retail, service businesses) in Nepal who need a stronger digital presence but don't have in-house marketing.
- **Secondary:** International/emerging brands looking for an affordable, responsive, full-service digital partner.
- Buyers are typically owners/founders — not marketing directors — so copy should stay outcome-focused (leads, sales, visibility) rather than jargon-heavy.

## 5. Core objectives (in priority order)
1. Communicate credibility and premium quality within 3 seconds of landing (hero + visual polish).
2. Make it effortless to understand the 7 services and self-select what they need.
3. Show proof of work (portfolio) in a way that feels tangible, not generic mockups.
4. Convert visitors into consultation bookings via a low-friction contact flow (form + WhatsApp + email, all already in use).
5. Rank locally for "digital marketing agency Nepal" and related service + city terms.

## 6. Success criteria
- Fully responsive (mobile-first; most traffic will be mobile in this market).
- Fast load (Lighthouse Performance 90+, since this doubles as a credibility proof point — "we build fast websites").
- Clear, consistent premium visual system across all pages (not just the homepage).
- Working, validated contact form wired to the client's email/WhatsApp.
- Clean, semantic, SEO-ready markup with proper metadata per page.

## 7. Constraints & notes for Cline
- No paid CMS/backend requirement — this is a static multipage site (HTML/CSS/JS or a static-site framework — see 04-TECHNICAL-SPEC.md for the recommendation).
- Must preserve existing working contact channels: WhatsApp (`+977 9804831080`) and email (`madeshmedialab@gmail.com`).
- Content in 02-SITEMAP-CONTENT.md is adapted from the client's existing live copy — reuse it, don't invent new claims, and flag anywhere a real number/asset is needed instead of a placeholder.
- Follow 03-DESIGN-SYSTEM.md exactly for colors/type/spacing — this is what makes the result read as "premium" rather than "another template."
- Build and verify page-by-page in the order given in 05-CLINE-BUILD-INSTRUCTIONS.md.
