# Red Beacon Asset Management

A modern, professional one-page marketing website for Red Beacon Asset Management — an ESG and impact investing firm. Built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

**Live site:** [https://rbchelsea98.github.io/RB-AM/](https://rbchelsea98.github.io/RB-AM/)

---

## Features

- **Hero section** — full-viewport headline with animated counters (AUM, clients, ESG track record, retention rate) and a decorative nature leaf motif
- **ESG Trust Strip** — credential bar (PRI Signatory, Net Zero Aligned, SFDR Compliant, B Impact Assessed, 15 Yrs ESG Leadership)
- **Why Us** — four USP cards: ESG-Aligned Portfolios, Proven Sustainable Returns, Transparent Fees, ESG & Financial Experts
- **Impact section** — measurable environmental & social outcomes (CO₂ avoided, clean energy invested, sustainable companies, UN SDGs addressed)
- **Testimonials** — auto-rotating carousel with previous/next controls and dot indicators
- **Contact form** — validated enquiry form delivered via FormSubmit.co (no backend required)
- **Responsive** — mobile-first, with hamburger nav on ≤ 768 px and fluid typography throughout
- **Sustainability design** — deep forest green palette, organic radial gradients in hero and impact section, green-accent card borders, footer ESG commitment line

---

## Tech stack

| Layer | Choice |
|---|---|
| Markup | HTML5 (semantic, ARIA-labelled) |
| Styling | CSS3 — custom properties, Grid, Flexbox, `clamp()` |
| Interactivity | Vanilla JavaScript (ES6+), single `DOMContentLoaded` handler |
| Fonts | Google Fonts — Playfair Display (headings) + Inter (body) |
| Form delivery | [FormSubmit.co](https://formsubmit.co/) AJAX mode |
| Hosting | GitHub Pages |

---

## File overview

| File | Purpose |
|---|---|
| `index.html` | All markup and content — nav, hero, ESG strip, why-us, impact, testimonials, contact, footer |
| `styles.css` | All styling — design tokens, component styles, responsive breakpoints |
| `script.js` | All interactivity — smooth scroll, nav scroll effect, hamburger, fade-in observer, counters, carousel, form validation |
| `logo.svg` | Standalone horizontal lockup (mark + wordmark) for external use |
| `CLAUDE.md` | AI coding guidelines for this repository |
| `.gitignore` | Git ignore rules |

---

## Local development

No install or build step needed. Open the site with any of:

```bash
# Option 1 — open directly
start index.html          # Windows
open index.html           # macOS

# Option 2 — Python static server
python -m http.server 8080
# then visit http://localhost:8080

# Option 3 — VS Code Live Server
# Right-click index.html → Open with Live Server
```

---

## Form setup (FormSubmit.co)

The enquiry form is pre-wired to FormSubmit's AJAX endpoint. Two lines require your real email address before messages will deliver:

1. **`index.html`** — `<form action="https://formsubmit.co/ajax/your-email@example.com">`
2. **`script.js`** — `fetch('https://formsubmit.co/ajax/your-email@example.com', ...)`

Replace `your-email@example.com` with the recipient address in both files. On the **first submission**, FormSubmit will send a one-time activation email — click the link in that email to enable delivery.

---

## Colour palette

All brand values are defined as CSS custom properties in `:root` in `styles.css`.

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#0a3d28` | Deep forest green — nav, headings, dark sections |
| `--color-primary-light` | `#1a5c3e` | Mid green — section labels, hover states |
| `--color-accent` | `#4ecb8a` | Fresh green — CTA buttons, highlights, icon colour |
| `--color-accent-dark` | `#35a872` | Deeper green — button hover, card icon colour |
| `--color-leaf` | `#2d7d4f` | Leaf green — supplementary accent |
| `--color-bg` | `#f4f8f5` | Off-white green tint — light section backgrounds |
| `--color-text` | `#111c17` | Near-black — body copy |
| `--color-text-muted` | `#4a6355` | Muted green-grey — secondary text |
