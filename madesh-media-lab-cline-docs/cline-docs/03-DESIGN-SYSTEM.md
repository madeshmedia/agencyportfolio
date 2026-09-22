# Design System — Premium Agency Aesthetic

This is what separates "another agency template" from a site that looks like it belongs to a real, expensive studio. Follow this exactly — do not fall back on default framework styling (no default Bootstrap cards, no emoji-as-icons in production, no pure black/white "AI-generated" gradients).

## 1. Design direction
**Feel:** Confident, modern, editorial-premium. Deep navy base with a single sharp accent color, generous whitespace, large confident type, subtle motion — not a busy, gradient-heavy "startup template" look.

**Reference mood:** high-end creative studio sites (think Basement.studio, Locomotive, Instrument) filtered down to something buildable in a small static site — large type, confident negative space, restrained color, purposeful motion on scroll.

## 2. Color palette

Built around the brand's existing theme color `#0B132B`.

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#0B132B` | Primary dark background (hero, footer, dark sections) |
| `--color-bg-alt` | `#111A36` | Secondary dark surface (cards on dark sections) |
| `--color-surface-light` | `#F7F8FB` | Light section background (alternate sections for rhythm) |
| `--color-surface-white` | `#FFFFFF` | Card backgrounds on light sections |
| `--color-text-primary` | `#0B132B` | Body text on light backgrounds |
| `--color-text-inverse` | `#F5F6FA` | Body text on dark backgrounds |
| `--color-text-muted` | `#6B7280` (light) / `#9AA3C0` (dark) | Secondary/supporting text |
| `--color-accent` | `#D4A24E` (warm gold) | Primary accent — CTAs, highlights, active states |
| `--color-accent-alt` | `#3EC6E0` (electric cyan) | Secondary accent — used sparingly for links/icons/gradients only |
| `--color-border` | `#E4E7F0` (light) / `#232D4F` (dark) | Hairline borders, dividers |
| `--color-success` | `#3FAE64` | Form success states |
| `--color-error` | `#E4574C` | Form error states |

**Rule:** never use more than 2 accent colors on a single screen. Gold (`--color-accent`) is the primary CTA/highlight color throughout the site; cyan is reserved for occasional gradient accents or icon fills — do not let both compete on the same element.

## 3. Typography

- **Display / Headings:** `"Sora"` or `"Clash Display"` (Google Fonts / Fontshare) — geometric, confident, slightly distinctive. Weight 600–700 for H1/H2.
- **Body:** `"Inter"` — weight 400/500, excellent readability at small sizes.
- **Fallback stack:** `"Sora", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

**Type scale (desktop / mobile):**
| Role | Desktop | Mobile | Weight | Line-height |
|---|---|---|---|---|
| H1 (hero) | 64px | 36px | 700 | 1.05 |
| H2 (section) | 44px | 28px | 700 | 1.1 |
| H3 (card/subsection) | 24px | 20px | 600 | 1.3 |
| Body large | 18px | 16px | 400 | 1.6 |
| Body | 16px | 15px | 400 | 1.6 |
| Small / label | 13px | 12px | 500, uppercase, letter-spacing 0.08em | 1.4 |

Eyebrow labels (e.g. "What We Do", "Our Work") use the Small/label style in `--color-accent`, always above the H2.

## 4. Spacing & layout system

- **Base unit:** 8px. All spacing values are multiples of 8 (8/16/24/32/48/64/96/128).
- **Section vertical padding:** 96px desktop / 56px mobile between major sections — this generous spacing is a major part of what reads as "premium."
- **Max content width:** 1200px, centered, with 24px side gutters on mobile / 64px on desktop.
- **Grid:** 12-column grid desktop, collapsing to single column under 768px. Service/portfolio cards: 3-column desktop → 2-column tablet → 1-column mobile.
- **Border radius:** 12px for cards, 8px for buttons/inputs, 999px for pills/badges. Keep this consistent site-wide — do not mix radius values.

## 5. Components

### Buttons
- **Primary:** filled `--color-accent`, dark text (`#0B132B`), 8px radius, subtle shadow on hover (lift 2px + shadow), 14px 28px padding.
- **Secondary:** transparent with 1.5px border in current text color, fills to a subtle tint on hover.
- Never use a raw `<button>` default style. Always include a hover **and** focus-visible state (accessibility).

### Cards (services, portfolio, team)
- White (`--color-surface-white`) on light sections, `--color-bg-alt` on dark sections.
- 12px radius, 1px hairline border (`--color-border`), soft shadow only on hover (`0 12px 32px rgba(11,19,43,0.08)`), translateY(-4px) hover lift.
- Icon treatment: **replace emoji with a real icon set** (Phosphor Icons, Lucide, or custom SVG line icons) rendered inside a 48px rounded square tinted with a soft accent background (`rgba(212,162,78,0.12)`), icon stroke in `--color-accent`. This single change (emoji → real icons) is one of the highest-impact upgrades for premium feel.

### Navigation
- Fixed/sticky header, transparent over hero, solid `--color-bg` with hairline bottom border after scroll (use a scroll listener or `backdrop-filter: blur(12px)` + semi-transparent background for a modern glass effect).
- Active page indicated with a small underline or dot in `--color-accent`, not just color change.
- Mobile: full-screen slide-in menu, not a cramped dropdown — large tap targets (min 44px height), staggered fade-in of links.

### Forms (Contact page)
- Floating-label or clean top-label inputs, 8px radius, 1px border, focus state = border color shifts to `--color-accent` + soft glow (`box-shadow: 0 0 0 3px rgba(212,162,78,0.15)`).
- Inline validation messages in `--color-error` beneath each field, success state (`--color-success`) with a checkmark on submit confirmation.

### Section backgrounds — rhythm
Alternate dark and light sections down each page to create visual rhythm rather than one long light (or long dark) scroll:
- Home: Hero (dark) → About teaser (light) → Services (light) → Why Choose Us (dark) → Featured Work (light) → Process teaser (dark) → CTA band (dark, accent-tinted) → Footer (dark)
- Apply the same alternating logic on every page — never more than 2 consecutive sections in the same tone.

### Motion (keep subtle — premium, not flashy)
- Fade-up on scroll for section headings and cards (16–24px translateY + opacity, ~0.5s ease-out), staggered 60–80ms per item in a grid.
- Hero: subtle entrance animation on load only (not scroll-triggered) — fade + slight scale.
- No parallax gimmicks, no bouncing, no auto-playing carousels for the portfolio — respect `prefers-reduced-motion`.

## 6. Imagery
- Do **not** use generic stock photography of "diverse people in a meeting" — this instantly reads as template.
- Portfolio: real project screenshots in clean device/browser mockup frames (or, until real assets exist, branded placeholder cards using the color system + project name, clearly better than a broken image icon).
- Team: consistent photo treatment (same crop ratio, same background/duotone treatment) OR consistent branded illustrated avatars if photos aren't available — never mix real photos and initials-in-circles on the same page.
- Icons: one consistent icon family site-wide (see Components → Cards above).

## 7. Accessibility & polish baseline
- Minimum contrast: body text 4.5:1, large text 3:1 (verify gold-on-navy and navy-on-light combinations pass).
- All interactive elements have visible `:focus-visible` states.
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`, proper heading hierarchy per page — one `<h1>` per page).
- `alt` text on every image; form inputs have associated `<label>` elements.
